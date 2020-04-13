import React from 'react';
import PropTypes from 'prop-types';
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { graphql } from 'react-apollo';
import Box from '../Project/DetailBox';
import Select from '../Form/SelectField';
import { viewPolicyOptions } from './badgeClassUtils';
import Button from '../Button';
import mutation from './updateBadge.gql';
import validationHandler from '../uiFormValidateHandler';

const Controls = styled('div')({
    textAlign: 'right',
});

const UserBadgeQuickControl = ({ submitting, handleSubmit, pristine }) => (
    <Box title={t`Badge view policy control`}>
        <form method="POST" onSubmit={handleSubmit}>
            <Field
                name="viewPolicy"
                component={Select}
                label={t`Badge view policy`}
                disabled={submitting}
                options={viewPolicyOptions}
            />

            <Field
                name="evidencePolicy"
                component={Select}
                label={t`Badge evidence view policy`}
                disabled={submitting}
                options={viewPolicyOptions}
            />

            <Controls>
                <Button
                    type="submit"
                    variant="primary"
                    size="smaller"
                    label={t`Save settings`}
                    disabled={submitting || pristine}
                />
            </Controls>
        </form>
    </Box>
);

UserBadgeQuickControl.propTypes = {
    submitting:   PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine:     PropTypes.bool.isRequired,
};

export default compose(
    branch(({ userBadge }) => !userBadge, renderNothing),
    branch(({ userBadge }) => _get(userBadge, 'perms.policy.value') !== 1, renderNothing),
    graphql(mutation, { name: 'runUpdateBadge' }),
    withHandlers({
        onSubmit: ({ userBadge: { id }, runUpdateBadge }) => values =>
            runUpdateBadge({ variables: { id, ...values } }).then(validationHandler({
                generalError: t`Please fix errors above`,
                mutation:     'updateBadge',
                translations: {},
            })),
    }),
    withProps(({ userBadge }) => ({
        initialValues: _pick(userBadge, 'viewPolicy', 'evidencePolicy'),
    })),
    reduxForm({
        form:               'UserBadgeQuickControl',
        enableReinitialize: true,
    }),
)(UserBadgeQuickControl);
