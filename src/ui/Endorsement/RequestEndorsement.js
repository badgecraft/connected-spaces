import PropTypes from 'prop-types';
import { compose, withHandlers, withProps } from 'recompose';
import { reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import _pick from 'lodash/pick';
import { t } from 'ttag';
import View from './RequestEndorsementForm';
import mutation from './requestBadgeClassEndorsement.gql';
import validateHandler from '../uiFormValidateHandler';
import withFlash from '../Flash/withFlash';
import query from './badgeClassEndorsementsQuery.gql'

const fixValues = ({ requestRecipient, ...values }) => ({
    ...values,
    requestRecipient: _pick(requestRecipient, 'type', 'value'),
});

const RequestEndorsement = compose(
    withFlash,
    graphql(mutation, { name: 'runRequest' }),
    withHandlers({
        onSubmit: ({ runRequest, id, flash, onClose }) => values =>
            runRequest({
                variables:      { ...fixValues(values), id },
                refetchQueries: [{ query, variables: { id } }],
            })
                .then(validateHandler({
                    mutation:     'requestBadgeClassEndorsement',
                    translations: {
                        required:     () => t`Required`,
                        invalidEmail: () => t`Please enter a valid email`,
                    },
                }))
                .then(() => {
                    flash(t`Endorsement request sent.`);
                    onClose();
                }),
    }),
    withProps({
        initialValues: {
            requestRecipient: { type: 'email', value: '' },
            requestMessage:   '',
        },
    }),
    reduxForm({ form: 'RequestEndorsement' }),
)(View);

RequestEndorsement.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default RequestEndorsement;
