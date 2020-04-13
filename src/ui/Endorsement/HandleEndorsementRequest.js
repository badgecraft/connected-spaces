import PropTypes from 'prop-types';
import { compose, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { t } from 'ttag';
import _get from 'lodash/get';
import Form from './HandleEndorsementRequestForm';
import mutation from './handleEndorsementRequestMutation.gql';
import validationHandler from '../uiFormValidateHandler';
import withFlash from '../Flash/withFlash';
import { withPushRoute } from '../uiUtils';

const FORM = 'handleEndorsementRequest';
const valueSelector = formValueSelector(FORM);
const translations = {
    required:                       () => t`Required`,
    'id.invalidState':              () => t`Endorsement already handled`,
    'organisation.same':            () => t`Endorser cannot be from the same organisation as the object`,
    'organisation.alreadyEndorsed': () => t`This organisation already endorsed`,
};

const HandleEndorsementRequest = compose(
    withFlash,
    withPushRoute,

    withProps(({ endorsement }) => ({
        disabled:      _get(endorsement, 'status') !== 'endorserRequest',
        initialValues: {
            action:       null,
            comment:      '',
            organisation: null,
            ...(endorsement.status === 'endorserRejected' && {
                action:  'reject',
                comment: endorsement.endorserComment,
            }),

            ...(['pendingVerify', 'signed'].indexOf(endorsement.status) !== -1 && {
                action:  'reject',
                comment: endorsement.endorserComment,
            }),
        },
    })),
    graphql(mutation, { name: 'runHandle' }),
    withHandlers({
        onSubmit: ({ endorsement: { id }, runHandle, flash, pushRoute, onAcceptPath }) => (values) =>
            runHandle({ variables: { ...values, id } })
                .then(validationHandler({ mutation: 'handleEndorsementRequest', translations }))
                .then((res) => {
                    const endorserId = _get(res, 'endorsement.endorser.id');
                    flash(t`Endorsement request handled`);
                    if (endorserId) {
                        pushRoute({ to: onAcceptPath, params: { id: endorserId } });
                    } else {
                        pushRoute({ to: '/' });
                    }
                }),
    }),
    reduxForm({ form: FORM, enableReinitialize: true }),
    connect(state => ({
        action: valueSelector(state, 'action'),
    })),
)(Form);

HandleEndorsementRequest.propTypes = {
    endorsement:  PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    onAcceptPath: PropTypes.string.isRequired,
};

export default HandleEndorsementRequest;
