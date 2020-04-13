import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ActivityCardAction from './ActivityCardAction';
import prevIcon from './prev.svg';
import nextIcon from './next.svg';

const Box = styled('div')(({ left }) => ({
    width:     48,
    textAlign: left ? 'left' : 'right',
}));

const Arrow = styled('button')(({ left }) => ({
    display:    'inline-block',
    background: `transparent url("${left ? prevIcon : nextIcon}") center center/contain no-repeat`,
    width:      30,
    height:     30,
    outline:    'none',
    border:     '0 none',
    cursor:     'pointer',
}));

const Root = styled('div')({
    display:        'flex',
    width:          '100%',
    alignItems:     'center',
    justifyContent: 'center',
});

const Action = styled('div')({
    flexGrow: 1,
});

const ActivityCardPickerScroll = ({ project, left, right }) => (
    <Root>
        <Box left>
            {left && <Arrow left onClick={left} />}
        </Box>
        <Action>
            <ActivityCardAction project={project} />
        </Action>
        <Box>
            {right && <Arrow onClick={right} />}
        </Box>
    </Root>
);

ActivityCardPickerScroll.propTypes = {
    project: PropTypes.shape({}).isRequired,
    left:    PropTypes.func,
    right:   PropTypes.func,
};

ActivityCardPickerScroll.defaultProps = {
    left:  null,
    right: null,
};

export default ActivityCardPickerScroll;
