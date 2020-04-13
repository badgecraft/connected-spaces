import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { withProps, compose, getContext } from 'recompose';
import { jt } from 'ttag';
import { graphql } from 'react-apollo';
import Item from './_RawNotifyItem';
import { LinkOrBold } from './notifyItemUtils';
import GenericActions from './_GenericNotifyItemActions';
import NotifyLink from './_NotifyLink';
import acceptMutation from './acceptBadgeIssueRequestMutation.gql';

const Actions = graphql(acceptMutation, { name: 'runAcceptMutation' })(GenericActions);

const toLink = ({ item, paths }) => {
    const userBadgeId = _get(item, 'badgeClass.long.userBadge.id');
    if (userBadgeId) {
        return {
            to:     _get(item, 'badgeClass.long.userBadge.mine') ? paths.personalBadgeView : paths.badgeView,
            params: { id: userBadgeId },
        };
    }

    const id = _get(item, 'badgeClass.id');
    const projectId = _get(item, 'badgeClass.long.projectId');
    const canView = _get(item, 'badgeClass.perms.view.value') === 1;

    if (canView && id && projectId) {
        return {
            to:     paths.badgeClassView,
            params: { id, projectId },
        };
    }

    return null;
};

export default compose(
    getContext({
        paths: PropTypes.shape({
            badgeView:         PropTypes.string.isRequired,
            personalBadgeView: PropTypes.string.isRequired,
            badgeClassView:    PropTypes.string.isRequired,
        }).isRequired
    }),
    withProps(({ item, paths }) => {
        const link = toLink({ item, paths });
        const badge = (
            <NotifyLink
                key="l"
                viewPerm={!!link}
                site={_get(item, 'site')}
                {...link}>{_get(item, 'badgeClass.name')}</NotifyLink>
        );
        const issuer = (<LinkOrBold key="i">{_get(item, 'issuer.displayName')}</LinkOrBold>);
        return {
            picture: _get(item, 'badgeClass.picture'),
            text:    jt`You have badge issue request for ${badge} by ${issuer}`,
            actions: (<Actions item={item} />)
        };
    }),
)(Item);
