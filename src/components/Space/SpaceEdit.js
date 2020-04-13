import { compose, withProps } from 'recompose';
import { reduxForm } from 'redux-form';
import { t } from 'ttag';
import _get from 'lodash/get';
import { graphql } from 'react-apollo';
import SpaceForm from './SpaceForm';
import { toLink } from '../Link';
import paths from '../../constants/paths';
import validationHandler from '../../core/formValidationResult';
import history from '../../server/history';
import mutation from './updateSpace.gql';
import translations from './spaceFormTranslations';
import withFlash from '../../ui/Flash/withFlash';

const defaultContacts = [
    { name: 'facebook', value: '' },
    { name: 'twitter', value: '' },
    { name: 'google', value: '' },
    { name: 'email', value: '' },
    { name: 'phone', value: '' },
];

const fillValues = contacts => item => ({ ...item, value: _get(contacts.find(c => c.name === item.name), 'value') });

export default compose(
    withFlash,
    withProps(({ organisation }) => {
        const name = _get(organisation, 'name', '');
        return {
            type:             'update',
            title:            t`Update ${name} details`,
            initialValues:    {
                ...organisation,
                category: _get(organisation, 'category.id', null),
                contacts: [...defaultContacts].map(fillValues(organisation.contacts)),
                isPublic: organisation.isPublic ? 1 : 0,
            },
            back:             null,
            nameEditDisabled: _get(organisation, 'verifyStatus') !== 'notVerified'
            // back:          {
            //     to:     paths.spaceView,
            //     params: { id: organisation.id },
            // },
        };
    }),
    graphql(mutation, {
        props: ({ mutate, ownProps: { id, flash } }) => ({
            onSubmit: ({ isPublic, ...variables }) => mutate({
                variables: {
                    ...variables,
                    isPublic: parseInt(isPublic, 10) === 1,
                    id,
                },
            })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     'updateOrganisation',
                    translations,
                    merge:        { location: 'address' },
                }))
                .then(({ organisation }) => {
                    const { name } = organisation;
                    flash(t`Organisation ${name} updated`);
                    history.push(toLink({ to: paths.orgDashboardSettings, params: organisation }));
                }),
        }),
    }),
    reduxForm({ form: 'SpaceEdit' })
)(SpaceForm);
