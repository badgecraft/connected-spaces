import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { Box } from '@rebass/emotion';
import { Field } from 'redux-form';
import { withProps } from 'recompose';
import Select from '../Form/SelectField';
import FieldSet from '../Form/FieldSet';
import Button from '../Button';
import FormSavedFlash from '../Flash/FormSavedFlash';

const Save = withProps({ type: 'button', label: t`Save`, variant: 'primary' })(Button);

const viewPolicyOptions = [
    { value: 'anyone', label: t`View policy - available for anyone` },
    { value: 'authorizedUsers', label: t`View policy - visible to authorized users` },
    { value: 'organisationUsers', label: t`View policy - visible for organisation users` },
    { value: 'projectUsers', label: t`View policy - visible to project users` },
    { value: 'none', label: t`View policy - visible to no one (except owner)` },
];

const viewEmailOptions = [
    { value: 'anyone', label: t`Email policy - available for anyone` },
    { value: 'authorizedUsers', label: t`Email policy - email visible to authorized users` },
    { value: 'organisationUsers', label: t`Email policy - email visible for organisation users ` },
    { value: 'projectUsers', label: t`Email policy - email visible to project users` },
    { value: 'none', label: t`Email policy - visible to no one` },
];

const UserPrivacyFormView = ({ handleSubmit, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
        <FieldSet title={t`Privacy settings`}>
            <Box width={1}>
                <Field
                    component={Select}
                    name="emailViewType"
                    label={t`Email visibility policy`}
                    disabled={submitting}
                    options={viewEmailOptions}
                    help={t`Select who can view your email`}
                />
            </Box>

            <Box width={1}>
                <Field
                    component={Select}
                    name="defaultBadgePolicy"
                    label={t`New badge visibility policy`}
                    disabled={submitting}
                    options={viewPolicyOptions}
                    help={t`Select default policy for new badges`}
                />
            </Box>

            <Box width={1}>
                <Field
                    component={Select}
                    name="defaultEvidencePolicy"
                    label={t`New badge evidence policy`}
                    disabled={submitting}
                    options={viewPolicyOptions}
                    help={t`Select default policy for new badge evidence`}
                />
            </Box>

            <Save onClick={handleSubmit} disabled={submitting || pristine} />
            <FormSavedFlash />
        </FieldSet>
    </form>
);

UserPrivacyFormView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine:     PropTypes.bool.isRequired,
    submitting:   PropTypes.bool.isRequired,
};

export default UserPrivacyFormView;
