import { branch, compose, renderComponent, renderNothing, withProps } from 'recompose';
import { t } from 'ttag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import Button from '../../ui/Button';
import { paths } from '../Constants';
import query from './becomeOrganiserCheck.gql';

const Organiser = compose(
    branch(({ newOrganisers }) => !newOrganisers, renderNothing),
    withProps({
        variant: 'primary',
        label:   t`Become an organiser`,
        type:    'link',
        to:      paths.spaceCreate,
    }),
)(Button);

const Activity = withProps({
    variant: 'primary',
    label:   t`Create activity`,
    type:    'link',
    to:      paths.eventCreate,
})(Button);

const Playlist = withProps({
    variant: 'primary',
    label:   t`Create playlist`,
    type:    'link',
    to:      paths.playlistCreate,
})(Button);

export default compose(
    graphql(query, {
        props: ({ data }) => ({
            count:         _get(data, 'me.organisations.total', null),
            newOrganisers: _get(data, 'site.newOrganisers') !== 'closed',
        }),
    }),
    branch(({ count }) => count === null, renderNothing),
    branch(({ count }) => count === 0, renderComponent(Organiser)),
    branch(({ count, forType }) => count > 0 && forType === 'activity', renderComponent(Activity)),
    branch(({ count, forType }) => count > 0 && forType === 'playlist', renderComponent(Playlist)),
)(() => null);
