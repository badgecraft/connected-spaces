import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import { jt } from 'ttag';
import Ago from '../Ago';
import { font16A6, font14A3 } from '../uiFonts';

const Root = styled('div')({
    display:       'flex',
    marginBottom:  4,
    padding:       12,
    boxShadow:     '0 6px 12px 0 rgba(48,6,114,0.11)',
    width:         '100%',
    alignItems:    'flex-start',
    minHeight:     '64px',
    flexDirection: 'column',
});

const Who = styled('div')({
    ...font16A6,
    marginBottom: 8,
});
const Name = styled('span')(({ visible }) => ({
    display:    visible ? 'inline-block' : 'none',
    marginLeft: 8,
}));

const Status = styled('div')({
    ...font14A3,
});

const created = ago => jt`Review requested ${ago}`;
const inProgress = ago => jt`Review in progress, started ${ago}`;
const finished = ago => jt`Review finished ${ago}`;

const RequestedReviewItem = ({ item }) => {
    const email = _get(item, 'invite.email');
    const name = _get(item, 'invite.user.name');
    return (
        <Root>
            <Who>{email} <Name visible={!!name}>({name})</Name></Who>
            {!item.startedAt && !item.finishedAt && (<Status>{created(<Ago key="a" ts={item.createdAt} />)}</Status>)}
            {item.startedAt && !item.finishedAt && (<Status>{inProgress(<Ago key="a" ts={item.startedAt} />)}</Status>)}
            {item.finishedAt && (<Status>{finished(<Ago key="a" ts={item.finishedAt} />)}</Status>)}
        </Root>
    );
};

RequestedReviewItem.propTypes = {
    item: PropTypes.shape({
        id:         PropTypes.string.isRequired,
        createdAt:  PropTypes.number,
        startedAt:  PropTypes.number,
        finishedAt: PropTypes.number,
        invite:     PropTypes.shape({
                email: PropTypes.string.isRequired,
                user:  PropTypes.shape({
                    id:   PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                }),
            }
        ).isRequired,
    }).isRequired,
};

export default RequestedReviewItem;
