import { t } from 'ttag';
import { reduxForm } from 'redux-form';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo'
import _get from 'lodash/get';
import createSpaceQuery from './createSpace.gql';
import validationHandler from '../../core/formValidationResult';
import history from '../../server/history';
import { toLink } from '../Link';
import paths from '../../constants/paths';
import SpaceForm from './SpaceForm';
import translations from './spaceFormTranslations';
import withFlash from '../../ui/Flash/withFlash';

export default compose(
    withFlash,
    withProps(({ viewer }) => ({
        type:             'create',
        title:            t`Add new place`,
        subTitle:         t`Place can be an organisation, public space where youth activities will be offered`,
        initialValues:    {
            name:        '',
            category:    '',
            locationId:  '',
            picture:     null,
            description: '',
            website:     '',
            language:    '',
            country:     '',
            contacts:    [
                { name: 'facebook', value: '' },
                { name: 'twitter', value: '' },
                { name: 'google', value: '' },
                { name: 'email', value: '' },
                { name: 'phone', value: '' },
            ],
            isPublic:    1,
            tz:          _get(viewer, 'tz', null),
            joinType:    'none',
        },
        back:             {
            to: paths.dashboard,
        },
        nameEditDisabled: false,
    })),
    graphql(createSpaceQuery, {
        props: ({ mutate, ownProps: { flash } }) => ({
            onSubmit: ({ isPublic, ...variables }) => mutate({
                variables: { ...variables, isPublic: parseInt(isPublic, 10) === 1 },
            })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     'createOrganisation',
                    translations,
                    merge:        { location: 'address' },
                }))
                .then(({ organisation: { id, name } }) => {
                    flash(t`Organisation ${name} created`);
                    history.push(toLink({ to: paths.orgDashboard, params: { id } }));
                }),
        }),
    }),
    reduxForm({ form: 'SpaceCreate' }),
)(SpaceForm);
