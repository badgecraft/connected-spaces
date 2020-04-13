import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Card from './ActivityCard';
import Scroll from './ActivityCardPickerScroll';

const Root = styled('div')({
    width:   400,
    display: 'flex',
});

const VisibleCard = styled('div')({
    zIndex: 150,
});

const BackRoot = styled('div')({
    width:   50,
    display: 'inline-block',
});

const Rel = styled('div')({
    position: 'relative',
});

const AbsL = styled('div')({
    position: 'absolute',
    top:      10,
    left:     0,
});

const AbsR = styled('div')({
    position: 'absolute',
    top:      10,
    left:     100,
});

const exists = info => info && (info.project || info.loading);

const ActivityCardPicker = ({ prev, current, next, toNext, toPrev }) => (
    <Root onClick={evt => evt.stopPropagation()}>
        <BackRoot>
            <Rel>
                {exists(prev) && <AbsL>
                    <Card
                        project={prev.project}
                        loading={prev.loading}
                        onClick={evt => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            toPrev();
                        }}
                        variant="clean"
                    />
                </AbsL>}
                {exists(next) && <AbsR>
                    <Card
                        project={next.project}
                        loading={next.loading}
                        onClick={evt => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            toNext();
                        }}
                        variant="clean"
                    />
                </AbsR>}
            </Rel>
        </BackRoot>
        <VisibleCard>
            <Card
                project={current.project}
                loading={current.loading}
                renderAction={project => (
                    <Scroll project={project} left={exists(prev) && toPrev} right={exists(next) && toNext} />
                )}
            />
        </VisibleCard>
    </Root>
);

ActivityCardPicker.propTypes = {
    prev:    PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        project: PropTypes.shape({}),
    }).isRequired,
    current: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        project: PropTypes.shape({}),
    }).isRequired,
    next:    PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        project: PropTypes.shape({}),
    }).isRequired,
    toNext:  PropTypes.func.isRequired,
    toPrev:  PropTypes.func.isRequired,
};

export default ActivityCardPicker;
