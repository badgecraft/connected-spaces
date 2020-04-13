import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { t, ngettext, msgid } from 'ttag';
import _get from 'lodash/get';
import Form from './OrganisationRequestVerifyForm';
import mutation from './requestOrganisationVerify.gql';
import uiFormValidateHandler from '../uiFormValidateHandler';
import withFlash from '../Flash/withFlash';
import query from './organisationVerifyStatus.gql';
import { withPushRoute } from '../uiUtils';

const translations = {
    'files.minLength':   ({ min: _min }) => {
        const min = parseInt(_min, 10) || 1;
        return ngettext(msgid`Provide at least ${min} file`, `Provide at least ${min} files`, min);
    },
    pendingVerification: () => t`You already have a pending verification`,
};

const OrganisationRequestVerify = compose(
    withFlash,
    withPushRoute,
    graphql(query, {
        props: ({ data: { loading, maybeOrganisation } }) => {
            const verifyStatus = _get(maybeOrganisation, 'organisation.verifyStatus', null);
            return {
                organisation: _get(maybeOrganisation, 'organisation'),
                disabled:     loading || !verifyStatus || verifyStatus !== 'notVerified',
                verifyStatus,
            };
        },
    }),
    graphql(mutation, { name: 'runRequestVerify' }),
    withProps({
        initialValues: {
            files:   [],
            comment: '',
        },
    }),
    withHandlers({
        onSubmit: ({ id, runRequestVerify, flash, pushRoute, afterPath }) => ({ files = [], ...values }) =>
            runRequestVerify({ variables: { ...values, id, files: files.map(item => item.publicPath) } })
                .then(uiFormValidateHandler({
                    mutation:     'requestOrganisationVerify',
                    generalError: t`Please fix errors`,
                    translations,
                }))
                .then(() => {
                    pushRoute(afterPath);
                    flash(t`Organisation verify request sent.`);
                }),
    }),
    reduxForm({ form: 'organisationRequestVerify' }),
)(Form);

OrganisationRequestVerify.propTypes = {
    id: PropTypes.string.isRequired,
};

export default OrganisationRequestVerify;
