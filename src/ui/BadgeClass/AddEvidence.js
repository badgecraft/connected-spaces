import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { compose, mapProps, withStateHandlers, branch, renderComponent, withHandlers } from 'recompose';
import _get from 'lodash/get';
import { graphql } from 'react-apollo';
import Button from '../Button';
import Form from './AddEvidenceForm';
import { extractComment, extractFiles } from './DisplayEvidence';
import startQuestMutation from './startQuest.gql';
import submitTaskEvidenceMutation from './submitTaskEvidence.gql';
import cancelTaskCheckMutation from './cancelTaskCheck.gql';
import Files from './EvidenceFiles';

const AddButton = compose(
    graphql(startQuestMutation, { name: 'startQuest' }),
    withHandlers({
        onClick: ({ setBusy, startQuest, badgeClass, setFormVisibility }) => () => {
            setBusy(true);
            Promise.resolve()
                .then(() => _get(badgeClass, 'perms.mission.value') === 1
                    ? startQuest({ variables: { id: badgeClass.id } }).then(res => _get(res, 'data.startQuest.started'))
                    : true)
                .then((questRunning) => {
                    if (questRunning) {
                        setFormVisibility(true);
                    }
                })
                .catch(err => console.error('error', err))
                .then(() => setBusy(false));
        },
    }),
    mapProps(({ busy, onClick, task }) => ({
        type:     'button',
        variant:  'primary',
        size:     'smaller',
        label:    _get(task, 'status') === 'waitForFix' ? t`Update evidence` : t`Add evidence`,
        disabled: busy,
        onClick,
    })),
)(Button);

const ImproveButton = compose(
    graphql(cancelTaskCheckMutation, { name: 'cancelTaskCheck' }),
    withHandlers({
        onClick: ({ setBusy, cancelTaskCheck, task }) => () => {
            setBusy(true);
            cancelTaskCheck({ variables: { id: task.id } })
                .catch(err => console.error('error', err))
                .then(() => setBusy(false));
        },
    }),
    mapProps(({ busy, onClick }) => ({
        type:     'button',
        variant:  'secondary',
        size:     'smaller',
        label:    t`Cancel check to improve`,
        disabled: busy,
        onClick,
    })),
)(Button);

const SubmitForm = compose(
    graphql(submitTaskEvidenceMutation, { name: 'submitTaskEvidence' }),
    withHandlers({
        onSubmit: (opts) => ({ files, ...values }) => {
            const { setBusy, submitTaskEvidence, task, setFormVisibility, onBadgeGained } = opts;
            setBusy(true);
            submitTaskEvidence({ variables: { ...values, id: task.id, files: files.map(f => f.publicPath) } })
                .then(res => {
                    const added = _get(res, 'data.submitTaskEvidence.added');
                    const submitted = _get(res, 'data.requestTaskCheck.submitted');
                    const gained = _get(res, 'data.requestTaskCheck.badgeGained');
                    if (added && submitted) {
                        setFormVisibility(false);
                    }

                    if (gained) {
                        onBadgeGained(gained);
                    }
                })
                .catch(err => console.error('error', err))
                .then(() => setBusy(false));
        },
    }),
)(Form);

const EvidenceFiles = mapProps(({ task }) => ({
    files:   extractFiles(task),
    comment: extractComment(task),
    task,
}))(Files);

const CriterionEvidence = mapProps(({ criterion }) => ({
    files:   extractFiles(criterion),
    comment: extractComment(criterion),
}))(Files);

const WaitForApprove = (props) => (
    <React.Fragment key="wfa">
        {_get(props, 'criterion.task') && <EvidenceFiles task={_get(props, 'criterion.task')} />}
        <ImproveButton {...props} />
    </React.Fragment>
);

WaitForApprove.propTypes = {
    criterion: PropTypes.shape({
        task: PropTypes.shape(),
    }).isRequired,
};

const canUpdateEvidence = (task) => (task && ['waitForEvidence', 'waitForFix'].indexOf(task.status) !== -1);

export default compose(
    withStateHandlers(({ defaultOpen, task }) => ({
        visibleForm: !!defaultOpen && canUpdateEvidence(task),
        busy:        false,
    }), {
        setFormVisibility:    () => visibleForm => ({ visibleForm }),
        toggleFormVisibility: ({ visibleForm }) => () => ({ visibleForm: !visibleForm }),
        setBusy:              () => busy => ({ busy }),
    }),
    branch(({ visibleForm }) => visibleForm, renderComponent(SubmitForm)),
    branch(
        ({ task, badgeClass }) => canUpdateEvidence(task) || _get(badgeClass, 'perms.mission.value') === 1,
        renderComponent(AddButton),
    ),
    branch(({ task }) => task && task.status === 'waitForApprove', renderComponent(WaitForApprove)),
    branch(({ task }) => task && task.status === 'finished', renderComponent(EvidenceFiles)),
    branch(
        ({ criterion }) => criterion && criterion.evidences && criterion.evidences.length > 0,
        renderComponent(CriterionEvidence),
    ),
)(() => null);
