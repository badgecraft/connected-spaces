import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { Field } from 'redux-form';
import { font12, font12A2, font16A3, font16A7 } from '../../ui/uiFonts';
import { themedMinWidth } from '../../ui/uiUtils';
import Form from '../../ui/Form/FormContainer';
import FieldSet from '../../ui/Form/FieldSet';
import Step from './Step';
import ActivitySelect from '../../ui/Form/ActivitySearch/ActivitySearchField';
import Bottom from './PlaylistCreateBottomMenu';
import { toBack, toCancel } from './playlistUtils';
import Actions from './PlaylistActions';
import NewActivity from '../../ui/Form/ActivitySearch/NewActivityQuick';

export const Heading = styled('h2')(({ theme }) => ({
    ...font12A2,
    color: '#3E3564',

    [themedMinWidth('tablet', theme)]: {
        ...font16A3,
    },
}));

export const Desc = styled('p')(({ theme }) => ({
    margin:  '6px 0',
    padding: 0,
    ...font12,

    [themedMinWidth('tablet', theme)]: {
        margin: '2px 0',
        ...font16A7,
    },
}));

const Help = styled('p')(({ theme }) => ({
    ...font12,
    paddingTop:    40,
    paddingBottom: 40,
    textAlign:     'center',

    [themedMinWidth('tablet', theme)]: {
        paddingTop:    80,
        paddingBottom: 80,
        ...font16A7,
    },
}));

// todo how to add the newly created activity as selected from the list
// todo disabled state on ActivitySelect

const PlaylistStep2 = (props) => {
    const {
        submitting,
        step,
        totalSteps,
        handleSubmit,
        newActivityOpen,
        setNewActivityOpen,
        organisation,
        appendActivity,
        prevStep,
        error,
        mode,
        playlist,
    } = props;
    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit} method="POST">
                <FieldSet title={t`Add activities`} subTitle={<Step fromTablet current={step} total={totalSteps} />}>
                    <Heading>{t`Find some activities for your playlist`}</Heading>
                    <Desc>{t`You can add activities created by you, or by other organisers. If opportunity will expire, your playlist list will be unpublished, unless you will take out the expired opportunity.`}</Desc>

                    <Field
                        name="playlistActivities"
                        component={ActivitySelect}
                        empty={() => (
                            <Help>{t`Use search or copy and paste link to opportunity (you can find the link on top of the browser window)`}</Help>
                        )}
                        onAddActivityClick={() => setNewActivityOpen(true)}
                        disabled={submitting}
                        organisation={organisation}
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
            {newActivityOpen && <NewActivity
                organisation={organisation}
                onCancel={() => setNewActivityOpen(false)}
                onSuccess={(createdProject) => {
                    setNewActivityOpen(false);
                    appendActivity(createdProject);
                }}
            />}
        </React.Fragment>
    );
};

PlaylistStep2.propTypes = {
    step:       PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,

    submitting:   PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error:        PropTypes.string,

    newActivityOpen:    PropTypes.bool.isRequired,
    setNewActivityOpen: PropTypes.func.isRequired,

    appendActivity: PropTypes.func.isRequired,
    organisation:   PropTypes.string.isRequired,
    playlist:       PropTypes.shape(),
    mode:           PropTypes.oneOf(['create', 'edit']).isRequired,

    prevStep: PropTypes.func.isRequired,
};

PlaylistStep2.defaultProps = {
    error:    null,
    playlist: null,
};

export default PlaylistStep2;
