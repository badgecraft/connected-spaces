import React from 'react';
import PropTypes from 'prop-types';
import { withProps, compose, getContext } from 'recompose';
import _get from 'lodash/get';
import { jt } from 'ttag';
import Item from './_RawNotifyItem';
import NotifyLink from './_NotifyLink';

export default compose(
    getContext({
        paths: PropTypes.shape({
            badgeView:         PropTypes.string.isRequired,
            personalBadgeView: PropTypes.string.isRequired,
        }).isRequired
    }),
    withProps(({ item, paths }) => {
        const id = _get(item, 'badgeClass.long.userBadge.id');
        const mine = _get(item, 'badgeClass.long.userBadge.mine');

        const badge = (
            <NotifyLink
                key="l"
                viewPerm={!!id}
                site={_get(item, 'site')}
                to={mine ? paths.personalBadgeView : paths.badgeView}
                params={{ id }}
            >{_get(item, 'badgeClass.name')}</NotifyLink>
        );

        return {
            picture: _get(item, 'badgeClass.picture'),
            text:    jt`You have received ${badge} badge!`,
        };
    }),
)(Item);
