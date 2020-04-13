import PropTypes from 'prop-types';
import { branch, compose, withProps, renderNothing, getContext } from 'recompose';
import { t } from 'ttag';
import { connect } from 'react-redux';
import { hasSubmitSucceeded } from 'redux-form';
import LocalFlashMessage from './LocalFlashMessage';

const FormSavedFlash = compose(
    getContext({ _reduxForm: PropTypes.shape().isRequired }),
    connect((state, { _reduxForm }) => ({ saved: hasSubmitSucceeded(_reduxForm.form)(state) })),
    branch(({ saved }) => !saved, renderNothing),
    withProps(({ message }) => ({ message: message || t`Saved.` })),
)(LocalFlashMessage);

FormSavedFlash.displayName = 'FormSavedFlash';

export default FormSavedFlash;
