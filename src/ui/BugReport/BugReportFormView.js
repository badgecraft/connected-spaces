import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { t } from 'ttag';
import styled from '@emotion/styled';
import Modal from '../Modal';
import FieldSet from '../Form/FieldSet';
import FormActions from '../Form/FormActions';
import modalify from '../Modal/modalify';
import Input from '../Form/InputField';
import Button from '../Button';
import Select from '../Form/SelectField';

const Root = modalify()(styled('form')({
    overflow:        'hidden',
    backgroundColor: '#EEEEEE',
    padding:         10,
    borderRadius:    10,
}));

const toDescriptionLabel = (type) => {
    switch (type) {
        case 'featureRequest':
            return t`Describe the feature`;
        default:
            return t`Describe your problem`;
    }
};

const toTitle = (type) => {
    switch (type) {
        case 'featureRequest':
            return t`Request a feature`;
        default:
            return t`Report a bug`;
    }
};

// todo need a spinner
const BugReportForm = ({ handleSubmit, type, busy, onClose }) => (
    <Modal>
        <Root onSubmit={handleSubmit} onEscape={onClose} onClose={onClose}>
            <FieldSet title={toTitle(type)} noShadow transparent>
                <div>{t`Support is available only in English.`}</div>
                <Field
                    name="type"
                    component={Select}
                    label={t`What type of support you need?`}
                    required
                    options={[
                        {
                            value: "bugReport",
                            label: t`Bug report`,
                        },
                        {
                            value: "featureRequest",
                            label: t`Feature request`,
                        },
                        {
                            value: "other",
                            label: t`Other/Unclear`,
                        }
                    ]}
                    disabled={busy}
                />

                <Field
                    name="description"
                    component={Input}
                    label={toDescriptionLabel(type)}
                    multiLine
                    required
                    disabled={busy}
                />

                <Field
                    name="email"
                    component={Input}
                    label={t`Your contact email`}
                    required
                    disabled={busy}
                />
            </FieldSet>
            <FormActions>
                <Button variant="secondary" type="button" onClick={onClose} disabled={busy}>{t`Cancel`}</Button>
                <Button variant="primary" type="submit" disabled={busy}>{t`Submit report`}</Button>
            </FormActions>
        </Root>
    </Modal>
);

BugReportForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    type:         PropTypes.string.isRequired,
    busy:         PropTypes.bool.isRequired,
    onClose:      PropTypes.func.isRequired,
};

export default BugReportForm;
