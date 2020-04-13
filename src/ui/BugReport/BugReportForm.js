import { compose, withHandlers, withState } from 'recompose';
import { reduxForm, formValueSelector, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { t } from 'ttag';
import _toString from 'lodash/toString';
import _trim from 'lodash/trim';
import View from './BugReportFormView';
import mutation from './reportBug.gql';
// import withFlash from '../_helpers/withFlash';

const FORM_NAME = 'BugReport';
const typeSelector = formValueSelector(FORM_NAME);

const toErrors = values => {
    const errors = [];

    if (!_trim(_toString(values.description))) {
        errors.push({ description: t`Please provide a description` });
    }

    if (!_trim(_toString(values.email))) {
        errors.push({ email: t`Please provide an email` });
    }

    return errors;
};

export default compose(
    // withFlash,
    withState('busy', 'setBusy', false),
    connect(state => ({ state })),
    graphql(mutation, { name: 'reportBug' }),
    withHandlers({
        onSubmit: ({ state, reportBug, setBusy, flash, onClose }) => values => {
            const errors = toErrors(values);
            if (errors.length > 0) {
                throw new SubmissionError(errors.reduce((map, err) => ({ ...map, ...err }), {}));
            }
            const redux = JSON.stringify(state);
            // apollo data is way to big right now, so let's not include it
            // const apollo = JSON.stringify(_get(client, "cache.data"));

            setBusy(true);
            return reportBug({ variables: { ...values, redux, apollo: null } })
                .then(() => flash(t`Your request was sent. Thank You!`))
                .catch(() => null)
                .then(() => {
                    setBusy(false);
                    onClose();
                })
        },
    }),
    reduxForm({
        // todo form validation and check that errors would be displayed
        form:          FORM_NAME,
        initialValues: {
            type:        'bugReport',
            description: '',
            email:       '',
        },
    }),
    connect(state => ({ type: typeSelector(state, 'type') })),
)(View);
