import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { branch, renderNothing, compose, withProps } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import Button from '../Button';
import Input from '../Form/InputField';
import Evidences from './EvidencesField';
import { toSubmitText } from './badgeClassUtils';
import Feedback from './FeedbackList';
import { extractComment, extractFiles } from './DisplayEvidence';

const Root = styled('form')({});

const Actions = styled('div')({
    marginBottom: 8,
});

const CommentBox = styled('div')({
    marginBottom: 8,
});

const SubmitBox = styled('div')({
    textAlign: 'right',
});

/*
<Button type="button" variant="secondary" size="small" label={t`Public`} disabled={busy || submitting || true} />
 */

const AddEvidenceForm = ({ criterion, task, handleSubmit, busy, submitting }) => (
    <Root method="post" onSubmit={handleSubmit}>
        <Actions>
            <Button
                type="label"
                variant="secondary"
                size="small"
                label={t`Add file`}
                disabled={busy || submitting}
                htmlFor={`evidencesFile_${task.id}`}
            />
        </Actions>

        <Field
            id={task.id}
            name="files"
            component={Evidences}
            disabled={busy || submitting}
        />

        <Feedback task={task} />

        <CommentBox>
            <Field
                name="comment"
                component={Input}
                multiLine
                placeholder={t`Comment evidence here...`}
                disabled={busy || submitting}
            />
        </CommentBox>
        <SubmitBox>
            <Button
                type="submit"
                label={toSubmitText(criterion)}
                variant="primary"
                size="smaller"
                disabled={busy || submitting}
            />
        </SubmitBox>
    </Root>
);

AddEvidenceForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    task:         PropTypes.shape({
        id:        PropTypes.string.isRequired,
        evidences: PropTypes.arrayOf(PropTypes.shape({
            __typename: PropTypes.oneOf(['TextEvidence', 'FileEvidence']).isRequired,
            readOnly:   PropTypes.bool.isRequired,
            text:       PropTypes.string,
            file:       PropTypes.shape({
                publicPath: PropTypes.string.isRequired,
            }),
        })).isRequired,
        feedback:  PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    criterion:    PropTypes.shape().isRequired,
    busy:         PropTypes.bool.isRequired,
    submitting:   PropTypes.bool.isRequired,
};

export default compose(
    branch(({ task }) => !task, renderNothing),
    withProps(({ task }) => ({
        form:          `AddEvidenceTask${task.id}`,
        initialValues: {
            comment: extractComment(task),
            files:   extractFiles(task),
        },
    })),
    reduxForm({}),
)(AddEvidenceForm);
