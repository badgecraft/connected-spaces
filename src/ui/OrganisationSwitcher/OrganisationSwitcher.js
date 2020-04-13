import PropTypes from 'prop-types';
import { compose, getContext, withHandlers, withState } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import query from './organisationSwitcher.gql';
import View from './OrganisationSwitcherView';
import outsidify from '../Modal/outsidify';
import { createGraphqlPropsPager } from '../uiPaging';

const isNot = current => item => `${current.type}/${current.id}` !== `${item.type}/${item.id}`;

export default compose(
    getContext({
        pushRoute: PropTypes.func,
        lang:      PropTypes.string,
    }),
    graphql(query, {
        options: ({ organisation, lang }) => ({
            errorPolicy: 'all',
            variables:   {
                current: organisation || '',
                lang,
            },
        }),
        props:   createGraphqlPropsPager({
            resultPath: 'me.organisations',
            append:     ({ list: items, ...result }, raw, { organisation, viewer, organisationPath, personalPath }) => {
                const viewerItem = viewer && {
                    id:      viewer.id,
                    name:    `${viewer.displayName} (Me)`,
                    picture: viewer.picture,
                    type:    'user',
                };
                const currentOrganisation = organisation
                    ? (_get(raw, 'maybeOrganisation.organisation') || {
                        id:      organisation,
                        name:    '',
                        picture: null,
                    }) : null;

                const first = [currentOrganisation, viewerItem].filter(item => item);
                const current = first[0];
                const allItems = [
                    ...first,
                    ...items.filter(isNot(current)),
                ].filter(item => item);
                const snapList = allItems.slice(0, 3);

                return {
                    ...result,
                    organisations:             allItems.filter(isNot(current)),
                    snapList,
                    totalAfterSnap:            result.total - snapList.filter(item => item).length,
                    organisationPath,
                    personalPath,
                    createOrganisationPath:    '/organisers/create',
                    createOrganisationAllowed: _get(raw, 'site.newOrganisers') !== 'closed',
                };
            },
        }),
    }),
    // branch(({ total }) => total === 0, renderNothing), // todo maybe render 'become an organiser button'
    withState('expanded', 'setExpanded', false),
    withHandlers({
        openOrganisation: ({ pushRoute }) => pushRoute,
        openPersonal:     ({ pushRoute, personalPath }) => () => pushRoute({ to: personalPath }),
        onClose:          ({ setExpanded }) => () => setExpanded(false),
    }),
    outsidify(),
)(View);
