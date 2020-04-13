import { toLink } from '../../ui/Link';
import { paths } from '../Constants';

// eslint-disable-next-line import/prefer-default-export
export const getActivityMeta = ({ project, context }) => [
    {
        property: 'og:url',
        content:  toLink({ to: paths.activityView, params: context.params, baseURL: context.baseURL }),
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: project.name },
    { property: 'og:description', content: project.description },
    {
        property: 'og:image',
        content:  toLink({ to: project.coverPicture || project.picture, baseURL: context.baseURL }),
    },
];
