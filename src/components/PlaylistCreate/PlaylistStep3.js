import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { Field } from 'redux-form';
import Form from '../../ui/Form/FormContainer';
import FieldSet from '../../ui/Form/FieldSet';
import Step from './Step';
import Sort from '../../ui/Form/ActivitySearch/ActivitySortField';
import Bottom from './PlaylistCreateBottomMenu';
import { toBack, toCancel } from './playlistUtils';
import Actions from './PlaylistActions';

const PlaylistStep3 = (props) => {
    const { submitting, step, totalSteps, handleSubmit, prevStep, error, organisation, playlist, mode } = props;
    return (
        <Form onSubmit={handleSubmit} method="POST">
            <FieldSet title={t`Set up order`} subTitle={<Step fromTablet current={step} total={totalSteps} />}>
                <Field
                    name="playlistActivities"
                    component={Sort}
                    disabled={submitting}
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

PlaylistStep3.propTypes = {
    submitting:   PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error:        PropTypes.string,

    step:       PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    prevStep:   PropTypes.func.isRequired,

    organisation: PropTypes.string,
    playlist:     PropTypes.shape(),
    mode:         PropTypes.oneOf(['create', 'edit']).isRequired,
};

PlaylistStep3.defaultProps = {
    error:        null,
    organisation: null,
    playlist:     null,
};

export default PlaylistStep3;
