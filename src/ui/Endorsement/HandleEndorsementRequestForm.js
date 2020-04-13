import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { t } from 'ttag';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import Button from '../Button';
import RadioField from '../Form/RadioField';
import InputField from '../Form/InputField';
import OrganisationSelectField from '../Form/OrganisationSelectField';
import Markdown from '../Markdown';
import OtherFormErrors from '../Form/OtherFormErrors';
import { font16A3, font16A1, font16, font14A3 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import Info from './EndorsementInfo';

const Actions = styled('div')({ textAlign: 'right' });

const H2 = styled('h2')(({ theme }) => ({
    ...font16A3,
    textAlign:    'center',
    color:        _get(theme, 'colors.error'),
    marginBottom: 16,

    [themedMinWidth('tablet', theme)]: {},
}));

const Object = styled('div')(({ picture, theme }) => ({
    minHeight:   81,
    paddingLeft: 89,
    paddingTop:  8,
    background:  `transparent url("${picture}") center left/81px 81px no-repeat`,

    [themedMinWidth('tablet', theme)]: {
        minHeight:      162,
        paddingLeft:    170,
        backgroundSize: '162px 162px',
    },
}));

const ObjectType = styled('div')({
    ...font16A1,
});

const ObjectName = styled('div')({
    ...font16,
    marginTop:    8,
    marginBottom: 8,
});

const ObjectRequester = styled('div')({
    ...font14A3,
});

const toTypeTitle = (type) => {
    switch (type) {
        case 'BadgeClass':
            return t`Endorse badge`;
        case 'Project':
            return t`Endorse project`;
        case 'Organisation':
            return t`Endorse organisation`;
        default:
            return null;
    }
};

const toSubmitLabel = action => {
    switch (action) {
        case 'accept':
            return t`Endorse`;
        default:
            return t`Submit`;
    }
};

const HandleEndorsementRequestForm = ({ handleSubmit, submitting, endorsement, action, form, disabled }) => {
    const user = _get(endorsement, 'endorseeUser.name');
    const eObject = _get(endorsement, 'object');
    return (
        <form onSubmit={handleSubmit} method="POST">
            {disabled && <H2>{t`Endorsement request already handled`}</H2>}

            <Info />

            <Object picture={eObject.picture}>
                <ObjectType>{toTypeTitle(eObject.__typename)}</ObjectType>
                <ObjectName>{eObject.name}</ObjectName>
                <ObjectRequester>
                    {t`Endorsement requested by ${user}`}
                </ObjectRequester>
            </Object>

            <Markdown source={endorsement.requestMessage} />

            <Field
                name="action"
                component={RadioField}
                options={[
                    { value: 'accept', label: t`Yes endorse` },
                    { value: 'reject', label: t`No, I don't want to endorse` },
                ]}
                disabled={submitting || disabled}
                required
            />

            {action === 'accept' && (<React.Fragment key="a">
                <Field
                    name="organisation"
                    component={OrganisationSelectField}
                    label={t`Endorser organisation`}
                    viewerTeam={['owners']}
                    required
                    disabled={submitting || disabled}
                    help={t`Select organisation which will endorse the object`}
                />
            </React.Fragment>)}

            {action && <Field
                name="comment"
                component={InputField}
                label={t`Endorsement text`}
                help={t`Endorsement text will be visible for users`}
                required
                multiLine
                disabled={submitting || disabled}
            />}

            <Actions>
                <OtherFormErrors form={form} />
                <Button
                    type="submit"
                    variant="primary"
                    label={toSubmitLabel(action)}
                    disabled={submitting || !action || disabled}
                />
            </Actions>
        </form>
    );
};

HandleEndorsementRequestForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting:   PropTypes.bool.isRequired,
    endorsement:  PropTypes.shape({
        requestMessage: PropTypes.string.isRequired,
        endorseeUser:   PropTypes.shape({
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
        object:         PropTypes.shape({
            id:      PropTypes.string.isRequired,
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
            perms:   PropTypes.shape({
                view: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    action:       PropTypes.string,
    form:         PropTypes.string.isRequired,
    disabled:     PropTypes.bool.isRequired,
};

HandleEndorsementRequestForm.defaultProps = {
    action: null,
};

export default HandleEndorsementRequestForm;
