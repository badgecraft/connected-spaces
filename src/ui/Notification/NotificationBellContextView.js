import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext, nest, withHandlers, withProps } from 'recompose';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { themedMinWidth } from '../uiUtils';
import outsidify from '../Modal/outsidify';
import { font12 } from '../uiFonts';
import close from './close.svg';
import Button from '../Button';
import MarkAllAsRead from './MarkAllAsRead';
import Spinner from '../Spinner/LineSpinner';
import NotifyItem from './NotifyItem/NotifyItem';
import CheckItem from './EvidenceCheck/EvidenceCheckItem';

const Anchor = styled('div')(({ theme }) => ({
    position: 'absolute',
    right:    0,

    [themedMinWidth('tablet', theme)]: {
        position: 'relative',
    },
}));

const Box = styled('div')(({ theme }) => ({
    position: 'relative',
    top:      4,
    width:    '100vw',
    zIndex:   7000,

    [themedMinWidth('tablet', theme)]:  {
        position:   'absolute',
        width:      ['400px', '50vw'],
        marginLeft: ['-400px', '-50vw'],
        top:        14,
    },
    [themedMinWidth('desktop', theme)]: {
        width:      ['400px', '35vw'],
        marginLeft: ['-400px', '-35vw'],
    },
}));

const Block = outsidify()(styled('div')({
    backgroundColor: '#ffffff',
    boxShadow:       '0 3px 12px 0 rgba(48,6,114,0.11)',
    overflow:        'hidden',
    borderRadius:    15,
    color:           '#3E3564',
}));

const SeeAllBox = styled('div')({
    textAlign: 'right',
    padding:   '8px 16px 8px 16px',
    borderTop: '1px solid #E5E3ED',
});

const List = styled('div')({
    borderBottom: '1px solid #E5E3ED',
});

const ListTitle = styled('div')({
    ...font12,
    borderBottom:   '1px solid #E5E3ED',
    padding:        '8px 16px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
});

const Items = styled('div')({
    minHeight: 4,
});

const Empty = styled('div')({
    ...font12,
    padding:   '8px 16px',
    textAlign: 'center',
});

const Close = styled('button')({
    width:      16,
    height:     16,
    border:     '0 none',
    outlet:     'none',
    background: `transparent url("${close}") center center/12px 12px no-repeat`,
    cursor:     'pointer',
});

const SeeAllBtn = compose(
    getContext({ pushRoute: PropTypes.func.isRequired }),
    withHandlers({
        onClick: ({ onClose, pushRoute, to }) => () => {
            onClose();
            pushRoute({ to });
        },
    }),
    withProps({
        type:    'button',
        variant: 'secondary',
        size:    'small',
    }),
)(Button);

const View = nest(Anchor, Box, Block);

const NotificationBellContextView = ({ onClose, paths, notifications, evidences, loading }) => (
    <View onClose={onClose}>
        {evidences.total > 0 && <List>
            <ListTitle>
                {t`Evidences to check`}
                <Close onClick={onClose} />
            </ListTitle>
            <Items>
                {evidences.list.slice(0, 1).map(item => (<CheckItem key={item.id} item={item} />))}
            </Items>
            {evidences.total > 1 && <SeeAllBox>
                <SeeAllBtn to={paths.evidencesToCheck} onClose={onClose} label={t`Check all evidences`} />
            </SeeAllBox>}
        </List>}
        <List>
            <ListTitle>
                {t`Notifications`}
                {notifications.unread > 0 && <MarkAllAsRead />}
            </ListTitle>
            {loading && <Spinner />}
            {!loading && notifications.total === 0 && <Empty>{t`You don't have any notifications`}</Empty>}
            <Items>
                {notifications.list.slice(0, 3).map(item => (<NotifyItem key={item.id} item={item} />))}
            </Items>
            {notifications.total > 3 && <SeeAllBox>
                <SeeAllBtn to={paths.notifications} onClose={onClose} label={t`See all`} />
            </SeeAllBox>}
        </List>
    </View>
);

NotificationBellContextView.propTypes = {
    onClose:       PropTypes.func.isRequired,
    paths:         PropTypes.shape({
        notifications:    PropTypes.string.isRequired,
        evidencesToCheck: PropTypes.string.isRequired,
    }).isRequired,
    notifications: PropTypes.shape({
        unread: PropTypes.number.isRequired,
        total:  PropTypes.number.isRequired,
        list:   PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
    evidences:     PropTypes.shape({
        total: PropTypes.number.isRequired,
        list:  PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
    loading:       PropTypes.bool.isRequired,
};

export default NotificationBellContextView;
