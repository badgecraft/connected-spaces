import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { withProps, compose, getContext } from 'recompose';
import { jt } from 'ttag';
import { graphql } from 'react-apollo';
import Item from './_RawNotifyItem';
import { LinkOrBold } from './notifyItemUtils';
import GenericActions from './_GenericNotifyItemActions';
import acceptMutation from './acceptOrganisationInviteMutation.gql';

const Actions = graphql(acceptMutation, { name: 'runAcceptMutation' })(GenericActions);

export default compose(
    getContext({
        paths: PropTypes.shape({
            orgDashboard: PropTypes.string,
        }).isRequired
    }),
    withProps(({ item, paths }) => {
        const organisation = (<LinkOrBold
            key="o"
            link={paths.orgDashboard && _get(item, 'organisation.long.viewerTeam') === 'owners' && item.organisation}
            to={paths.orgDashboard}
            params={item.organisation}
        >{_get(item, 'organisation.name')}</LinkOrBold>);
        const issuer = (<LinkOrBold key="i">{_get(item, 'issuer.displayName')}</LinkOrBold>);
        return {
            picture: _get(item, 'organisation.picture'),
            text:    jt`You have been invited to ${organisation} by ${issuer}`,
            actions: (<Actions item={item} refetchQueries={['organisationSwitcher']} />)
        };
    }),
)(Item);
