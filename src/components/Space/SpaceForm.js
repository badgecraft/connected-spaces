import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { Field, FieldArray } from 'redux-form';
import FieldSet from '../Form/_FieldSet';
import Input from '../../ui/Form/InputField';
import Form from '../../ui/Form/FormContainer';
import CountrySelect from '../../ui/Form/CountryField';
import LanguageSelect from '../../ui/Form/LanguageField';
import AddressInput from '../../ui/Form/AddressInputField';
import FormActions, { FormActionButtons, FormActionStatus } from '../Form/_FormActions'; // todo change
import Button from '../../ui/Button';
import FormStatus from '../Form/_FormStatus'; // todo change
import ContactsArray from '../../ui/Form/ContactsArrayField';
import Uploader from '../../ui/Form/Uploader/UploaderField';
import OtherErrors from '../../ui/Form/OtherFormErrors';
import TimeZone from '../../ui/Form/TimeZoneField';
import Radio from '../../ui/Form/RadioField';
import Dialog from './SpaceNotVerifiedEmailDialog';

// todo when organisation verified, display 'question' on name with details, why it cannot be changed.
const SpaceCreate = (props) => {
    const { submitting, handleSubmit, error, title, subTitle, change, form, back, nameEditDisabled } = props;
    return (
        <Form method="post" onSubmit={handleSubmit}>
            <FieldSet title={title}>
                <Dialog
                    explanation={
                        t`In order to create an organiser you must have verified email. Please check your mailbox`
                    }
                />

                <h2>{subTitle}</h2>

                <Field
                    name="name"
                    component={Input}
                    required
                    disabled={submitting || nameEditDisabled}
                    label={t`Name of organisation/place`}
                    maxLength={64}
                    {...(nameEditDisabled && {
                        help: t`Name editing is not allowed, when organisation is pending or already verified`
                    })}
                />

                <Field name="description" component={Input} multiLine disabled={submitting} label={t`Description`} />

                <Field name="country" component={CountrySelect} required disabled={submitting} label={t`Country`} />

                <Field
                    name="tz"
                    component={TimeZone}
                    disabled={submitting}
                    label={t`Timezone`}
                />

                <Field
                    name="language"
                    component={LanguageSelect}
                    required
                    disabled={submitting}
                    label={t`Primary language of activities`} />

                <Field
                    name="address"
                    component={AddressInput}
                    disabled={submitting}
                    label={t`Address`}
                    onLocationChangeId={id => change('locationId', id)}
                />

                <Field name="website" component={Input} disabled={submitting} label={t`Website`} />

                <Field
                    name="isPublic"
                    component={Radio}
                    disabled={submitting}
                    label={t`Available for public`}
                    help={t`Weather your organisation is publicly available`}
                    options={[{ value: 1, label: t`Yes` }, { value: 0, label: t`No` },]}
                />

                <Field
                    name="joinType"
                    component={Radio}
                    disabled={submitting}
                    label={t`Allow joining organisation`}
                    help={t`Weather anyone can just join organisation by e.g. scanning qr code`}
                    options={[{ value: 'none', label: t`No` }, { value: 'join', label: t`Yes` }]}
                />
            </FieldSet>

            <FieldSet title={t`Contacts`}>
                <FieldArray name="contacts" disabled={submitting} component={ContactsArray} />
            </FieldSet>

            <FieldSet title={t`Media`}>
                <Field
                    name="picture"
                    component={Uploader}
                    details={t`Add logo`}
                    label={t`Logo`}
                    bucket="organisation"
                    width={200}
                    height={200}
                />
            </FieldSet>

            <FormActions>
                <FormActionStatus>
                    <OtherErrors form={form} />
                    <FormStatus error={error} info={t`You can edit these details at any time.`} />
                </FormActionStatus>

                <FormActionButtons>
                    {back && <Button variant="secondary" type="link" label={t`Cancel`} {...back} />}
                    {' '}
                    <Button variant="primary" type="submit" label={t`Publish`} />
                </FormActionButtons>
            </FormActions>
        </Form>
    );
};

SpaceCreate.propTypes = {
    handleSubmit:     PropTypes.func.isRequired,
    submitting:       PropTypes.bool.isRequired,
    change:           PropTypes.func.isRequired,
    error:            PropTypes.string,
    title:            PropTypes.string.isRequired,
    subTitle:         PropTypes.string,
    form:             PropTypes.string.isRequired,
    back:             PropTypes.shape({
        to:     PropTypes.string.isRequired,
        params: PropTypes.shape(),
    }),
    nameEditDisabled: PropTypes.bool.isRequired,
};

SpaceCreate.defaultProps = {
    error:    null,
    subTitle: null,
    back:     null,
};

export default SpaceCreate;
