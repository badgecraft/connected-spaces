import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { withProps, compose, getContext } from 'recompose';
import { jt } from 'ttag';
import { graphql } from 'react-apollo';
import Item from './_RawNotifyItem';
import { LinkOrBold } from './notifyItemUtils';
import GenericActions from './_GenericNotifyItemActions';
import acceptMutation from './acceptProjectInviteMutation.gql';
import refetchActivity from '../../Activity/activityView.gql';

const Actions = graphql(acceptMutation, { name: 'runAcceptMutation' })(GenericActions);

export default compose(
    getContext({
        paths: PropTypes.shape({ activityView: PropTypes.string.isRequired }).isRequired
    }),
    withProps(({ item, paths }) => {
        const canView = _get(item, 'project.perms.view.value') === 1;
        const id = _get(item, 'project.id');
        const project = (
            <LinkOrBold
                key="p"
                link={canView}
                to={paths.activityView}
                params={{ id }}
            >{_get(item, 'project.name')}</LinkOrBold>
        );
        const issuer = (<LinkOrBold key="i">{_get(item, 'issuer.displayName')}</LinkOrBold>);
        return {
            picture: _get(item, 'project.picture'),
            text:    jt`You have been invited to project ${project} by ${issuer}`,
            actions: (<Actions item={item} refetchQueries={[{ query: refetchActivity, variables: { id } }]} />)
        };
    }),
)(Item);
