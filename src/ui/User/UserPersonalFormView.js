import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { Field } from 'redux-form';
import { Box, Flex } from '@rebass/emotion';
import { withProps } from 'recompose';
import { createFilter } from 'react-select';
import FieldSet from '../Form/FieldSet';
import Uploader from '../Form/Uploader/UploaderField';
import Input from '../Form/InputField';
import Select from '../Form/SelectField';
import Button from '../Button';
import FormSavedFlash from '../Flash/FormSavedFlash';

const Save = withProps({ type: 'button', label: t`Save`, variant: 'primary' })(Button);

const filterLanguages = createFilter({
    stringify: opt => `${opt.label} ${opt.value} ${opt.data ? opt.data.name : ''}`,
});

const UserPersonalFormView = (props) => {
    const { handleSubmit, submitting, pristine, countries, languages, timeZones, loading } = props;
    const disabled = submitting || loading;
    return (
        <form onSubmit={handleSubmit}>
            <FieldSet title={t`Personal information`}>
                <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 2]} order={[1, 1, 2]}>
                        <Field
                            component={Uploader}
                            name="picture"
                            width={96}
                            height={96}
                            bucket="user-avatar"
                            variant="avatar"
                            disabled={disabled}
                        />
                    </Box>
                    <Box width={[1, 1, 1 / 2]} order={[2, 2, 1]}>
                        <Field
                            component={Input}
                            name="displayName"
                            label={t`Display name`}
                            required
                            disabled={disabled}
                            help={t`Account display name tooltip.`}
                        />
                    </Box>
                </Flex>

                <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 3]} pr={[0, 0, 2]}>
                        <Field
                            component={Select}
                            name="country"
                            label={t`Country`}
                            disabled={disabled}
                            options={countries}
                        />
                    </Box>
                    <Box width={[1, 1, 1 / 3]} pl={[0, 0, 0]}>
                        <Field
                            component={Select}
                            name="lang"
                            label={t`Language`}
                            disabled={disabled}
                            options={languages}
                            filterOption={filterLanguages}
                        />
                    </Box>
                    <Box width={[1, 1, 1 / 3]} pl={[0, 0, 2]}>
                        <Field
                            component={Select}
                            name="tz"
                            label={t`Time zone`}
                            disabled={disabled}
                            options={timeZones}
                        />
                    </Box>
                </Flex>

                <Save onClick={handleSubmit} disabled={submitting || pristine || loading} />
                <FormSavedFlash />
            </FieldSet>
        </form>
    );
};

UserPersonalFormView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting:   PropTypes.bool.isRequired,
    pristine:     PropTypes.bool.isRequired,
    loading:      PropTypes.bool.isRequired,
    countries:    PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    languages:    PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    timeZones:    PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default UserPersonalFormView;
