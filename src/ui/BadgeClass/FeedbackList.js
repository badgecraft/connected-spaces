import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderNothing } from 'recompose';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { t } from 'ttag';
import { font12, font14A3 } from '../uiFonts';
import Ago from '../Ago';

const Root = styled('div')({});

const Feedback = styled('div')(({ value }) => ({
    borderLeft:   '2px solid silver',
    paddingLeft:  8,
    marginTop:    8,
    marginBottom: 8,
    ...(value === 1 && {
        borderColor: '#19B453',
    }),
    ...(value === -1 && {
        borderColor: '#DB4437',
    }),
}));

const Pic = styled('div')(({ picture }) => ({
    width:        32,
    height:       32,
    display:      'inline-block',
    background:   `transparent url("${picture}") center center/contain no-repeat`,
    borderRadius: '50%',
    marginRight:  8,
}));

const From = styled('div')({
    display:    'flex',
    alignItems: 'center',
    ...font12,
});

const Comment = styled('div')({
    ...font14A3,
    marginTop: 8,
});

const Status = styled('span')({
    '>span': {
        color: '#A59FC0',
    },
});

const toStatus = ({ value, user }) => {
    const name = _get(user, 'name');
    switch (value) {
        case 1:
            return t`Approved by ${name}`;
        case -1:
            return t`Asked to improve by ${name}`;
        default:
            return null;
    }
};

const FeedbackList = ({ task }) => (
    <Root>{task.feedback.map(fb => (
        <Feedback key={fb.id} value={fb.value}>
            <From>
                <Pic picture={_get(fb, 'user.picture')} />
                <Status>
                    {toStatus(fb)}
                    <br /><Ago ts={fb.timestamp} />
                </Status>
            </From>
            <Comment>{fb.comment}</Comment>
        </Feedback>
    ))}</Root>
);

FeedbackList.propTypes = {
    task: PropTypes.shape({
        feedback: PropTypes.arrayOf(PropTypes.shape({
            id:        PropTypes.string.isRequired,
            timestamp: PropTypes.number.isRequired,
            comment:   PropTypes.string.isRequired,
            value:     PropTypes.number.isRequired,
            user:      PropTypes.shape({
                picture: PropTypes.string.isRequired,
                name:    PropTypes.string.isRequired,
            }).isRequired,
        })).isRequired,
    }).isRequired,
};

export default branch(({ task }) => !task || !task.feedback || task.feedback.length === 0, renderNothing)(FeedbackList);
