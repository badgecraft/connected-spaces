import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import { t } from 'ttag';
import publishButtonQuery from './publishButton.gql';
import Button from '../../ui/Button';
import Form from '../../ui/Form/FormContainer';
import FieldSet from '../../ui/Form/FieldSet';
import Step from './Step';
import { Heading } from './PlaylistStep2';
import Mandatory from '../../ui/Form/ActivitySearch/ActivityMandatoryField';
import Bottom from './PlaylistCreateBottomMenu';
import { toBack, toCancel } from './playlistUtils';
import Actions from './PlaylistActions';

const PublishButton = compose(
    withProps({
        variant: 'primary',
        type:    'submit',
    }),
    graphql(publishButtonQuery, {
        props: ({ data, loading }) => {
            const allPublished = (data.maybeProjects || []).map(item => _get(item, 'project.status'))
                .every(status => status === 'published');

            if (loading) {
                return {
                    disabled: true,
                    label:    t`Save...`,
                };
            }

            return { label: allPublished ? t`Publish` : t`Save as draft` };
        },
    }),
)(Button);

const PlaylistStep4 = ({ submitting, step, totalSteps, handleSubmit, prevStep, error, idList, organisation, playlist, mode }) => (
    <Form onSubmit={handleSubmit} method="POST">
        <FieldSet
            title={t`Select mandatory activities`}
            subTitle={<Step fromTablet current={step} total={totalSteps} />}
        >
            <Heading>{t`Choose opportunities that are necessary to complete`}</Heading>

            <Field
                name="playlistActivities"
                component={Mandatory}
                disabled={submitting}
            />

        </FieldSet>

        <Bottom
            back={toBack(step, prevStep, error)}
            forward={<Actions
                next={<PublishButton
                    disabled={submitting}
                    onClick={handleSubmit}
                    list={idList}
                />}
                handleSubmit={handleSubmit}
                submitting={submitting}
                back={toCancel({ organisation, playlist, mode })}
            />}
        />
    </Form>
);

PlaylistStep4.propTypes = {
    submitting:   PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error:        PropTypes.string,

    step:       PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    prevStep:   PropTypes.func.isRequired,

    idList:       PropTypes.arrayOf(PropTypes.string).isRequired,
    organisation: PropTypes.string,
    playlist:     PropTypes.shape(),
    mode:         PropTypes.oneOf(['create', 'edit']).isRequired,
};

PlaylistStep4.defaultProps = {
    error:        null,
    organisation: null,
    playlist:     null,
};

export default PlaylistStep4;
