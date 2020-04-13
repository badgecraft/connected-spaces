import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import Link from '../../Link';
import { font14 } from '../../uiFonts';

const Root = styled('div')({
    display: 'inline-block',
});

const SLink = styled(Link)({
    ...font14,
    marginRight:    8,
    '&:last-child': {
        marginRight: 'unset',
    },
    '&:hover':      {
        textDecoration: 'underline',
    },
});

const NotifyItemControl = ({ item, onAccept, onReject, busy }) => (
    <Root>
        {onAccept && <SLink
            onClick={(evt) => {
                evt.preventDefault();
                onAccept(item);
            }}
            disabled={busy}
        >{t`Accept`}</SLink>}
        {' '}
        {onReject && <SLink
            onClick={(evt) => {
                evt.preventDefault();
                onReject(item);
            }}
            disabled={busy}
        >{_get(item, '__typename') === 'EvidenceCheckedNotification' ? t`Ask to improve` : t`Reject`}</SLink>}
    </Root>
);

NotifyItemControl.propTypes = {
    item:     PropTypes.shape({
        __typename: PropTypes.string.isRequired,
    }).isRequired,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
    busy:     PropTypes.bool.isRequired,
};

export default NotifyItemControl;
