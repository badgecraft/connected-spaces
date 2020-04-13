import React from 'react';
import PropTypes from 'prop-types'
import { t, jt } from 'ttag';
import { Field, FieldArray } from 'redux-form';
import _pick from 'lodash/pick';
import styled from '@emotion/styled';
import { Flex, Box } from '@rebass/emotion';
import { withProps, compose, withHandlers } from 'recompose';
import uiStringifyDuration from '../../ui/uiStringifyDuration';
import Form from '../../ui/Form/FormContainer';
import FieldSet from '../../ui/Form/FieldSet';
import Input from '../../ui/Form/InputField';
import CategorySelect from '../../ui/Form/SiteCategorySelectField';
import CoHosts from '../../ui/Form/CoHostsField';
import DateTimePicker from '../../ui/Form/OptionalDateTimePickerField';
import Address from '../../ui/Form/AddressInputField';
import Uploader from '../../ui/Form/Uploader/UploaderField';
import FormStatus from '../Form/_FormStatus'; // todo move to ui
import Button from '../../ui/Button';
import FormActions, { FormActionButtons, FormActionStatus } from '../Form/_FormActions'; // todo move to ui
import OrganisationSelect from '../../ui/Form/OrganisationSelectField';
import OrganisationReadOnly from '../../ui/Form/OrganisationReadOnly';
import SkillSelect from '../../ui/Form/SkillSelectField';
import Select from '../../ui/Form/SelectField';
import Videos from '../../ui/Form/VideosField';
import TimeZone from '../../ui/Form/TimeZoneField';
import Info from './EventCreateInfo';
import Dialog from '../Space/SpaceNotVerifiedEmailDialog';
import OtherErrors from '../../ui/Form/OtherFormErrors';
import Material from '../../ui/Form/MaterialField';
import Link from '../../ui/Link';
import { Remove } from '../../ui/Form/Optional';
import { font14A3 } from '../../ui/uiFonts';
import FormField from '../../ui/Form/FormField';

const ULink = styled(Link)({
    textDecoration: 'underline',
});

const SetDurationBtn = styled('button')(({ quick }) => ({
    ...font14A3,
    border:          '0 none',
    outline:         'none',
    backgroundColor: 'transparent',
    textDecoration:  'underline',
    cursor:          'pointer',
    paddingLeft:     0,
    paddingRight:    0,
    lineHeight:      '14px',
    marginRight:     8,

    ...(quick && { lineHeight: '28px' }),

    '&:last-of-type': {
        marginRight: 0,
    },
}));

const QuickSet = compose(
    withProps(({ value }) => {
        const label = uiStringifyDuration(value);
        return {
            type:     'button',
            children: label,
            label,
            quick:    true,
        };
    }),
    withHandlers({
        onClick: ({ setMaybeDuration, label }) => () => setMaybeDuration(label),
    }),
)(SetDurationBtn);

const EventForm = (props) => {
    const {
        error, handleSubmit, change, project, type, submitting, form, back, maybeDuration, setMaybeDuration,
    } = props;
    const escoLink = (
        <ULink
            key="l" href="https://ec.europa.eu/esco/portal/skill"
            target="_blank">{t`ESCO skills classification`}</ULink>
    );
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <Dialog
                explanation={t`In order to create an event you must have verified email. Please check your mailbox`}
            />
            <Info />

            <FieldSet title={t`Basic information`}>
                <Field
                    name="type"
                    component={Select}
                    label={t`Choose the type of activity`}
                    options={[
                        { label: t`Event`, value: 'event' },
                        { label: t`Internship`, value: 'internship' },
                        { label: t`Volunteering`, value: 'volunteering' },
                        { label: t`Digital experience`, value: 'digitalXp' },
                        { label: t`Youth project`, value: 'youthProject' },
                        { label: t`Open space`, value: 'openSpace' },
                        { label: t`Course`, value: 'course' },
                        { label: t`Workshop`, value: 'workshop' },
                    ]}
                    disabled={submitting}
                />

                <Field
                    name="name"
                    component={Input}
                    required
                    label={t`What is the name of your opportunity?`}
                    disabled={submitting}
                />

                <Field
                    name="description"
                    component={Input}
                    multiLine
                    label={t`Describe your opportunity`}
                    help={t`Good detailed description helps to attract the right participants.`}
                    disabled={submitting}
                />

                <Field
                    name="category"
                    component={CategorySelect}
                    required
                    label={t`Add a category`}
                    help={t`This will help others find your opportunity.`}
                    disabled={submitting}
                />

                <Field
                    name="skills"
                    component={SkillSelect}
                    label={t`What skills people will improve?`}
                    disabled={submitting}
                    help={jt`We use the ${escoLink} of the European Commission.`}
                />

                {type === 'create' && <Field
                    name="organisation"
                    component={OrganisationSelect}
                    required
                    label={t`Organiser`}
                    viewerTeam={['owners', 'admins']}
                    disabled={submitting}
                />}

                {type === 'update' && <OrganisationReadOnly
                    {..._pick(project.organisation, 'name', 'picture', 'pictureMeta')}
                    label={t`Organiser`}
                />}

                <FieldArray
                    name="coHosts"
                    component={CoHosts}
                    label={t`Co-Organisers`}
                    disabled={submitting}
                />
            </FieldSet>
            <FieldSet title={t`Date & Location`}>
                <Field
                    name="tz"
                    component={TimeZone}
                    label={t`Timezone`}
                    help={t`It will help displaying event times correctly`}
                    disabled={submitting}
                />

                <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 2]} pr={[0, 0, 1]}>
                        <Field
                            name="eventStart"
                            label={<React.Fragment key="eventStart">
                                <span>{t`Start date and time`}</span>
                                <Remove key="r" removeLabel={t`Remove`} onChange={() => change('eventStart', null)} />
                            </React.Fragment>}
                            component={DateTimePicker}
                            disabled={submitting}
                            addLabel={t`Add start date and time`}
                        />
                    </Box>
                    <Box width={[1, 1, 1 / 2]} pl={[0, 0, 1]}>
                        <Field
                            name="eventEnd"
                            component={DateTimePicker}
                            label={<React.Fragment key="eventEnd">
                                <span>{t`End date and time`}</span>
                                <Remove key="r" removeLabel={t`Remove`} onChange={() => change('eventEnd', null)} />
                            </React.Fragment>}
                            disabled={submitting}
                            addLabel={t`Add end date and time`}
                        />
                    </Box>
                </Flex>

                <Flex flexWrap="wrap">
                    <Box width={[1, 1, 1 / 2]} pr={[0, 0, 1]}>
                        <Field
                            name="duration"
                            component={Input}
                            label={<React.Fragment key="duration">
                                <span>{t`Activity duration`}</span>
                                {maybeDuration && <SetDurationBtn
                                    type="button"
                                    onClick={() => setMaybeDuration(maybeDuration)}
                                >{t`Duration suggestion: ${maybeDuration}`}</SetDurationBtn>}
                            </React.Fragment>}
                            help={t`How long the activity will last`}
                            disabled={submitting}
                        />
                    </Box>
                    <Box width={[1, 1, 1 / 2]} pl={[0, 0, 3]}>
                        <FormField label={t`Quick values for duration`}>
                            <QuickSet setMaybeDuration={setMaybeDuration} value={600} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={900} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={1200} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={1500} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={1800} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={2700} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={3600} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={5400} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={7200} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={10800} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={14400} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={18000} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={21600} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={25200} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={28800} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={86400} />
                            <QuickSet setMaybeDuration={setMaybeDuration} value={172800} />
                        </FormField>
                    </Box>
                </Flex>

                <Field
                    name="address"
                    component={Address}
                    label={t`Opportunity location`}
                    onLocationChangeId={id => change('locationId', id)}
                    disabled={submitting}
                />
            </FieldSet>

            <FieldSet title={t`Media`}>
                <Field
                    name="coverPicture"
                    component={Uploader}
                    details={t`Add opportunity page cover image`}
                    label={t`Cover`}
                    bucket="projectCover"
                    required
                    width={1200}
                    height={628}
                    disabled={submitting}
                />

                <FieldArray
                    name="videos"
                    component={Videos}
                    label={t`Links to youtube or vimeo videos`}
                    disabled={submitting}
                />

                <FieldArray
                    name="material"
                    component={Material}
                    label={t`Materials`}
                    disabled={submitting}
                    bucket="content"
                />

                {/* <Field */}
                {/* name="photos" */}
                {/* component={Uploader} */}
                {/* details="Add additional photos" */}
                {/* label="Photos" */}
                {/* /> */}
            </FieldSet>

            <FormActions>
                <FormActionStatus>
                    <OtherErrors form={form} />
                    <FormStatus error={error} info={t`You can edit these details at any time.`} />
                </FormActionStatus>

                <FormActionButtons>
                    {back && <Button variant="secondary" type="link" label={t`Cancel`}{...back} />}
                    {' '}
                    <Button variant="primary" type="submit" label={t`Publish`} disabled={submitting} />
                </FormActionButtons>
            </FormActions>
        </Form>
    );
};

EventForm.propTypes = {
    error:            PropTypes.string,
    handleSubmit:     PropTypes.func.isRequired,
    change:           PropTypes.func.isRequired,
    type:             PropTypes.oneOf(['create', 'update']).isRequired,
    project:          PropTypes.shape({
        organisation: PropTypes.shape({
            picture:     PropTypes.string.isRequired,
            name:        PropTypes.string.isRequired,
            pictureMeta: PropTypes.shape(),
        }).isRequired,
    }),
    submitting:       PropTypes.bool.isRequired,
    form:             PropTypes.string.isRequired,
    back:             PropTypes.shape({
        to:     PropTypes.string.isRequired,
        params: PropTypes.shape(),
    }).isRequired,
    maybeDuration:    PropTypes.string,
    setMaybeDuration: PropTypes.func.isRequired,
};

EventForm.defaultProps = {
    error:         null,
    project:       null,
    maybeDuration: null,
};

export default EventForm;
