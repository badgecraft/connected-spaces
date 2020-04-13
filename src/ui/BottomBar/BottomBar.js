import PropTypes from 'prop-types';
import { branch, compose, renderNothing, renderComponent, getContext, withState } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import userPrimaryEmailQuery from './userPrimaryEmail.gql';
import Email from './NotVerifiedPrimaryEmail';
import Cookie from './CookieWarning';

export default compose(
    branch(() => typeof window === 'undefined', renderNothing),
    getContext({ cookies: PropTypes.shape() }),
    withState('hasCookie', 'setCookie', ({ cookies, cookieName }) => !!cookies.get(cookieName)),
    graphql(userPrimaryEmailQuery, {
        props: ({ data: { loading, ...data } }) => ({
            loading,
            id:              _get(data, 'me.id', null),
            hasPrimaryEmail: !!_get(data, 'me.primaryEmail', null),
            emails:          _get(data, 'me.emails', []),
        }),
    }),
    branch(({ hasCookie }) => !hasCookie, renderComponent(Cookie)),
    branch(({ loading, id, bottomConfig }) => loading || !id || _get(bottomConfig, 'noEmail'), renderNothing),
    branch(({ hasPrimaryEmail }) => !hasPrimaryEmail, renderComponent(Email)),
)(() => null);
