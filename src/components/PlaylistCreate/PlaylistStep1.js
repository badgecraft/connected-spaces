import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { Field, FieldArray } from 'redux-form';
import styled from '@emotion/styled';
import Form from '../../ui/Form/FormContainer';
import Info from './PlaylistCreateInfo';
import FieldSet from '../../ui/Form/FieldSet';
import Step from './Step';
import Input from '../../ui/Form/InputField';
import Videos from '../../ui/Form/VideosField';
import OrganisationSelect from '../../ui/Form/OrganisationSelectField';
import Uploader from '../../ui/Form/Uploader/UploaderField';
import Bottom from './PlaylistCreateBottomMenu';
import { toBack, toCancel } from './playlistUtils';
import Actions from './PlaylistActions';

const Hr = styled('hr')({
    border:    0,
    borderTop: '1px solid #E5E3ED',
    margin:    '16px 0',
    padding:   0,
    height:    1,
    display:   'block',
});

/*
todo: need a process how to add other parties as co-organisers with notification to them.
import CoOrganisationSelect from '../../ui/Form/MultiOrganisationSelectField';
<Field
    name="coOrganisers"
    component={CoOrganisationSelect}
    label={t`Co-Organisers`}
    disabled={submitting}
    viewerTeam={["owner"]}
/>
 */

const PlaylistStep1 = (props) => {
    const { submitting, step, totalSteps, prevStep, handleSubmit, error, organisation, mode, playlist } = props;
    return (
        <Form onSubmit={handleSubmit} method="POST">
            {mode === 'create' && <Info />}
            <FieldSet title={t`Basic information`} subTitle={<Step fromTablet current={step} total={totalSteps} />}>
                <Field
                    name="name"
                    component={Input}
                    label={t`Learning playlist name`}
                    required
                    disabled={submitting}
                />

                <Field
                    name="description"
                    component={Input}
                    multiLine
                    label={t`Describe your learning playlist`}
                    help={t`Good detailed description helps to attract the right participants`}
                    disabled={submitting}
                />

                <FieldArray
                    name="videos"
                    component={Videos}
                    label={t`Links to youtube or vimeo videos`}
                />

                <Hr />

                {mode === 'create' && (<Field
                    name="organisation"
                    component={OrganisationSelect}
                    label={t`Organiser`}
                    required
                    disabled={submitting}
                    placeholder={t`Please select the main organiser`}
                />)}

                <Field
                    name="coverPicture"
                    component={Uploader}
                    label={t`Upload cover for your playlist`}
                    width={1200}
                    height={628}
                    details={t`Add learning playlist cover image (1200x628)`}
                    bucket="projectCover"
                    required
                />
            </FieldSet>

            <Bottom
                back={toBack(step, prevStep, error)}
                forward={<Actions
                    handleSubmit={handleSubmit}
                    submitting={submitting}
                    back={toCancel({ organisation, playlist, mode })}
                />}
            />
        </Form>
    );
};

PlaylistStep1.propTypes = {
    playlist:     PropTypes.shape(),
    mode:         PropTypes.oneOf(['create', 'edit']).isRequired,
    submitting:   PropTypes.bool.isRequired,
    step:         PropTypes.number.isRequired,
    totalSteps:   PropTypes.number.isRequired,
    prevStep:     PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error:        PropTypes.string,
    organisation: PropTypes.string,
};

PlaylistStep1.defaultProps = {
    error:        null,
    organisation: null,
    playlist:     null,
};

export default PlaylistStep1;
