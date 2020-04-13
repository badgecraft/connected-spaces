import { compose, withProps } from 'recompose';
import { reduxForm } from 'redux-form';
import { t } from 'ttag';
import _get from 'lodash/get';
import _trim from 'lodash/trim';
import { graphql } from 'react-apollo';
import EventForm from './_EventForm';
import createEventQuery from './createEvent.gql';
import validationHandler from '../../ui/uiFormValidateHandler';
import history from '../../server/history';
import { toLink } from '../Link';
import { paths } from '../Constants';
import translations from './eventFormTranslations';
import withFlash from '../../ui/Flash/withFlash';
import withMaybeDuration from './withMaybeDuration';

export default compose(
    withFlash,
    withProps(({ organisation, viewer }) => {
        const id = _get(organisation, 'id', null);
        return {
            type:          'create',
            initialValues: {
                type:         'none',
                online:       undefined,
                organisation: id,
                name:         '',
                category:     '',
                address:      '',
                locationId:   '',
                coverPicture: null,
                description:  '',
                website:      '',
                eventStart:   null,
                eventEnd:     null,
                coHosts:      [],
                contacts:     [],
                skills:       [],
                videos:       [],
                tz:           _get(organisation, 'tz', _get(viewer, 'tz', null)),
            },
            title:         t`Add new opportunity`,
            // eslint-disable-next-line max-len
            subTitle:      t`Event can be any type of activity that is openly accessible to young people to participate. After saving, the event will be published on the map.`,
            back:          id ? { to: paths.orgDashboard, params: { id } } : { to: paths.dashboard },
        };
    }),
    graphql(createEventQuery, {
        props: ({ mutate, ownProps: { flash } }) => ({
            onSubmit: ({ coHosts = [], videos = [], material = [], ...variables }) => mutate({
                variables:      {
                    ...variables,
                    contexts: ['event', 'badges'],
                    coHosts:  (coHosts || []).map((item) => ({
                        name: _trim(item.name || ''),
                    })).filter(item => item.name),
                    videos:   (videos || []).filter(item => item && _trim(item.input)),
                    material: (material || []).filter(item => item && (item.url || item.label)),
                },
                refetchQueries: ['getSpaceEvents', 'organisationEvents'],
            })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     'createProject',
                    translations,
                    merge:        { location: 'address' },
                }))
                .then(({ project: { id, name } }) => {
                    flash(t`Event ${name} created`);
                    history.push(toLink({
                        to:     paths.activityViewBadgeInit,
                        params: { id },
                    }));
                }),
        }),
    }),
    reduxForm({ form: 'EventCreate' }),
    withMaybeDuration,
)(EventForm);
