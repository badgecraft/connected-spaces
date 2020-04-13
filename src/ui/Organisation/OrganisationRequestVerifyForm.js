import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { t } from 'ttag';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import Input from '../Form/InputField';
import Attachments from '../Form/Uploader/AttachmentsField';
import Button from '../Button';
import OtherFormErrors from '../Form/OtherFormErrors';
import FormActions from '../Form/FormActions';
import { font16A3, font18 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const H1 = styled('h1')(({ theme }) => ({
    ...font16A3,
    marginTop:    16,
    marginBottom: 16,

    [themedMinWidth('tablet', theme)]: {
        ...font18,
    },
}));

const H2 = styled('h2')(({ theme }) => ({
    ...font16A3,
    marginBottom: 16,

    [themedMinWidth('tablet', theme)]: {},
}));

const OrganisationRequestVerifyForm = (props) => {
    const { cancelPath, handleSubmit, form, submitting, disabled, verifyStatus, organisation } = props;
    const name = _get(organisation, 'name');
    return (
        <form onSubmit={handleSubmit} method="post">
            {disabled
                ? <React.Fragment key="p">
                    {verifyStatus === 'pending' && <H1>{t`Verification is pending`}</H1>}
                </React.Fragment>
                : <React.Fragment key="vi">
                    <H1>{t`Request ${name} verification`}</H1>
                    <H2>{t`Verified badge issuer increase trust and credibility`}</H2>
                </React.Fragment>}

            <Field
                name="files"
                component={Attachments}
                disabled={submitting || disabled}
                label={t`Include any legal proof that your organisation is registered and operational`}
                help={t`This can be legal registration documents, entry in the official and public registers of companies.`}
                required
                bucket="content"
                visibility="protected"
            />

            <Field
                name="comment"
                component={Input}
                disabled={submitting || disabled}
                multiLine
                label={t`Verification request info`}
                help={t`Add any information that would help us to do verification process`}
            />

            <OtherFormErrors form={form} />

            <FormActions>
                <Button
                    variant="secondary"
                    type="link"
                    disabled={submitting}
                    label={disabled ? t`Close` : t`Cancel`}
                    {...cancelPath}
                />
                <Button
                    type="submit"
                    variant="primary"
                    label={t`Submit`}
                    disabled={submitting || disabled}
                />
            </FormActions>
        </form>
    );
};

OrganisationRequestVerifyForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    form:         PropTypes.string.isRequired,
    submitting:   PropTypes.bool.isRequired,
    disabled:     PropTypes.bool.isRequired,
    verifyStatus: PropTypes.oneOf(['notVerified', 'pending', 'verified']),
    cancelPath:   PropTypes.shape().isRequired,
    organisation: PropTypes.shape({
        name:    PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }).isRequired,
};

OrganisationRequestVerifyForm.defaultProps = {
    verifyStatus: null,
};

export default OrganisationRequestVerifyForm;
