import PropTypes from 'prop-types';
import { getFormSubmitErrors, getFormMeta } from 'redux-form';
import { connect } from 'react-redux';
import { compose, getContext, mapProps } from 'recompose';
import OtherFormErrorsView from './OtherFormErrorsView';
import { toArrayOfErrorStrings } from './formUtils';

const OtherFormErrors = compose(
    getContext({ _reduxForm: PropTypes.shape({}) }),
    mapProps(({ form, _reduxForm, ...props }) => ({
        ...props,
        form: form || _reduxForm.form,
    })),
    connect(
        (state, { form }) => {
            const formErrors = getFormSubmitErrors(form)(state) || {};
            const meta = getFormMeta(form)(state) || {};
            return { errors: toArrayOfErrorStrings(formErrors, meta) };
        },
    ),
)(OtherFormErrorsView);

OtherFormErrors.propTypes = {
    form: PropTypes.string,
};

OtherFormErrors.defaultProps = {
    form: null,
};

export default OtherFormErrors;
