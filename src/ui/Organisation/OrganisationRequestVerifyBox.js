import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose, branch, renderNothing } from 'recompose';
import { t, jt } from 'ttag';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { font14A4 } from '../uiFonts';
import query from './organisationVerifyStatus.gql';
import Button from '../Button';

const Verify = styled('div')({
    ...font14A4,
    textAlign:     'center',
    verticalAlign: 'middle',
    marginTop:     16,
    marginBottom:  16,
});

const OrganisationVerifyBox = ({ organisation: { id, verifyStatus }, verifyPath }) => {
    if (verifyStatus === 'pending') {
        return (<Verify>{t`Pending document check for organisation verification`}</Verify>)
    }

    if (verifyStatus === 'notVerified') {
        const requestButton = (<Button
            key="b"
            label={t`Request verification`}
            type="link"
            to={verifyPath}
            params={{ id }}
            size="smaller"
            variant="primary"
        />);
        return (<Verify>{jt`Organisation is not verified ${requestButton}`}</Verify>);
    }
    return null;
};

OrganisationVerifyBox.propTypes = {
    organisation: PropTypes.shape({
        id:           PropTypes.string.isRequired,
        name:         PropTypes.string.isRequired,
        verifyStatus: PropTypes.oneOf(['notVerified', 'pending', 'verified']).isRequired,
        perms:        PropTypes.shape({
            edit: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
        }).isRequired,
    }).isRequired,
    verifyPath:   PropTypes.string.isRequired,
};

export default compose(
    graphql(query, {
        options: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        props:   ({ data: { loading, maybeOrganisation } }) => ({
            loading,
            organisation: _get(maybeOrganisation, 'organisation', null),
        }),
    }),
    branch(({ loading, organisation }) => loading && !organisation, renderNothing),
    branch(({ organisation }) => _get(organisation, 'perms.edit.value') !== 1, renderNothing),
    branch(
        ({ organisation }) => ['pending', 'notVerified'].indexOf(_get(organisation, 'verifyStatus')) === -1,
        renderNothing,
    ),
)(OrganisationVerifyBox);
