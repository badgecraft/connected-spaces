import { compose, withProps } from 'recompose';
import { reduxForm } from 'redux-form';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _trim from 'lodash/trim';
import { t } from 'ttag';
import { graphql } from 'react-apollo';
import EventForm from './_EventForm';
import { toLink } from '../Link';
import paths from '../../constants/paths';
import validationHandler from '../../ui/uiFormValidateHandler';
import history from '../../server/history';
import mutation from './updateEvent.gql';
import withFlash from '../../ui/Flash/withFlash';
import translations from './eventFormTranslations';
import withMaybeDuration from './withMaybeDuration';

export default compose(
    withFlash,
    withProps(({ project: { organisation, id, coHosts, category, contacts, ...project } }) => {
        const name = _get(project, 'name', '');
        return {
            type:          'update',
            title:         t`Update event ${name}`,
            initialValues: {
                ...project,
                coHosts:      (coHosts || []).map(r => _pick(r, 'name')),
                category:     _get(category, 'id', null),
                contacts:     (contacts || []).map(r => _pick(r, 'name', 'value')),
                skills:       (project.skills || []).map(s => s.id),
                videos:       (project.videos || []).map(v => _pick(v, 'input')),
                organisation: project.organisationId,
                material:     (project.material || []).map(v => _pick(v, 'url', 'label')),
                duration:     _get(project, 'duration.str'),
            },
            id,
            back:          {
                to:     paths.activityView,
                params: { id },
            },
        };
    }),
    graphql(mutation, {
        props: ({ mutate, ownProps: { id, flash } }) => ({
            onSubmit: ({ eventEnd, coHosts = [], videos = [], material = [], ...variables }) => mutate({
                variables: {
                    id,
                    eventEnd: eventEnd || null,
                    ...variables,
                    coHosts:  (coHosts || []).map((item) => ({
                        name: _trim(item.name || ''),
                    })).filter(item => item.name),
                    videos:   videos.filter(item => item && item.input),
                    material: (material || []).filter(item => item && (item.url || item.label)),
                },
            }).then(validationHandler({
                generalError: t`Please fix errors above`,
                mutation:     'updateProject',
                translations,
                merge:        { location: 'address' },
            })).then(({ project }) => {
                const { name } = project;
                flash(t`Event ${name} updated`);
                history.push(toLink({ to: paths.activityView, params: project }));
            }),
        }),
    }),
    reduxForm({ form: 'EventEdit' }),
    withMaybeDuration,
)(EventForm);
