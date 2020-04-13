import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import { branch, renderComponent, compose } from 'recompose';
import { t } from 'ttag';
import Event from './EventItem';
import NoResults from './NoResults';
import Loading from '../Spinner/ListSpinner';
import Button from '../../ui/Button';
import { themedMaxWidth, themedMinWidth } from '../../ui/uiUtils';

const Container = styled(Box)(({ horizontal, theme }) => ({
    display:        'flex',
    flexWrap:       'wrap',
    justifyContent: 'center',
    ...(horizontal && {
        [themedMaxWidth('mobile', theme)]: {
            flexWrap:       'nowrap',
            whiteSpace:     'nowrap',
            overflowX:      'scroll',
            justifyContent: 'flex-start',
        },
    })
}));

const More = styled('div')(({ theme, horizontal }) => ({
    display:      'inline-block',
    textAlign:    'center',
    marginBottom: 16,
    ...(horizontal
        ? {
            paddingLeft:  32,
            paddingRight: 32,
        }
        : { width: '100%' }),

    [themedMinWidth('tablet', theme)]: {
        width:   '100%',
        display: 'block',
    },
}));

const EventList = (allProps) => {
    const {
        list = [],
        horizontal,
        hasNext,
        loadNext,
        loading,
        variant,
        width,
        ...props
    } = allProps;
    return (
        <Container
            horizontal={horizontal}
            pl={[2, 1, 2]}
            mr={[horizontal ? 0 : 2, -1]}
            pr={[horizontal ? 2 : 0, 1, 2]}
            mt={[2, 3, 3]}
            mb={[0, 4]}
            ml={[0, -1]}
            {...props}
        >
            {list.map(event => (<Event
                variant={variant}
                key={event.id}
                event={event}
                horizontal={horizontal}
            />))}
            {hasNext && (
                <More horizontal={horizontal}>
                    <Button
                        variant="secondary"
                        size="smaller"
                        type="button"
                        onClick={() => loadNext()}
                        label={t`Load more...`}
                        disabled={loading}
                    />
                </More>
            )}
        </Container>
    );
};

EventList.propTypes = {
    total:      PropTypes.number.isRequired,
    list:       PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,
    horizontal: PropTypes.bool,
    hasNext:    PropTypes.bool.isRequired,
    loadNext:   PropTypes.func.isRequired,
    loading:    PropTypes.bool.isRequired,
    variant:    PropTypes.oneOf(['default', 'control']),
};

EventList.defaultProps = {
    horizontal: false,
    variant:    'default',
};

export default compose(
    branch(({ loading, list }) => loading && list.length === 0, renderComponent(Loading)),
    branch(({ loading, total }) => !loading && total === 0, renderComponent(NoResults)),
)(EventList);
