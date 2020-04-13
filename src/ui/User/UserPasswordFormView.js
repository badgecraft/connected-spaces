import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { Field } from 'redux-form';
import { Box } from '@rebass/emotion';
import { withProps } from 'recompose';
import FieldSet from '../Form/FieldSet';
import Input from '../Form/InputField';
import Button from '../Button';
import FormSavedFlash from '../Flash/FormSavedFlash';
import OtherFormErrors from '../Form/OtherFormErrors';

const Save = withProps({ type: 'button', label: t`Change`, variant: 'primary' })(Button);

const UserPasswordFormView = ({ handleSubmit, submitting, pristine, type }) => (
    <form onSubmit={handleSubmit}>
        <FieldSet title={type === 'create' ? t`Create password` : t`Change password`}>
            <OtherFormErrors />
            {type === 'change' && <Box width={1}>
                <Field
                    component={Input}
                    name="cPassword"
                    type="password"
                    disabled={submitting}
                    label={t`Current password`}
                    required
                />
            </Box>}

            <Box width={1}>
                <Field
                    component={Input}
                    name="password"
                    type="password"
                    disabled={submitting}
                    label={t`New password`}
                    required
                />
            </Box>

            <Box width={1}>
                <Field
                    component={Input}
                    name="rePassword"
                    type="password"
                    disabled={submitting}
                    label={t`Repeat new password`}
                    required
                />
            </Box>

            <Save onClick={handleSubmit} disabled={submitting || pristine} />
            <FormSavedFlash message={t`Changed.`} />
        </FieldSet>
    </form>
);

UserPasswordFormView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting:   PropTypes.bool.isRequired,
    pristine:     PropTypes.bool.isRequired,
    type:         PropTypes.oneOf(['create', 'change']).isRequired,
};

export default UserPasswordFormView;
