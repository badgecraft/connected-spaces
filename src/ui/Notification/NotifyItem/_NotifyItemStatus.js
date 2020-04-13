import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { font12 } from '../../uiFonts';

const Root = styled('div')({
    ...font12,
    color: '#989898',
});

const toMessage = ({ status, __typename }) => {
    switch (status) {
        case 'accepted':
            return t`Accepted`;
        case 'rejected':
            if (__typename === 'EvidenceCheckedNotification') {
                return t`Need improvement`;
            }
            return t`Rejected`;
        case 'canceled':
            return t`Canceled`;
        case 'negligible':
        case 'waiting':
        default:
            return null;
    }
};

export const NotifyItemStatus = ({ item }) => {
    const message = toMessage(item);
    if (!message) {
        return null;
    }

    return (<Root>{message}</Root>);
};

NotifyItemStatus.propTypes = {
    item: PropTypes.shape({
        __typename: PropTypes.string.isRequired,
        status:     PropTypes.oneOf(['accepted', 'rejected', 'waiting', 'negligible', 'canceled']).isRequired,
    }).isRequired,
};

export default NotifyItemStatus;
