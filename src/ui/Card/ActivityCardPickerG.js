import { branch, compose, renderNothing, withProps, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import Picker from './ActivityCardPicker';
import query from './ActivityCardPickerG.gql';

const propertiesByName = name => {
    const idProperty = `${name}Id`;
    return {
        options: (props) => ({
            fetchPolicy: 'cache-first',
            errorPolicy: 'all',
            variables:   { id: props[idProperty] },
        }),
        skip:    props => !props[idProperty],
        props:   ({ data: { loading, maybeProject } }) => ({
            [name]: { project: _get(maybeProject, 'project', null), loading },
        }),
    };
};

const ActivityCardPickerG = compose(
    branch(({ projects }) => !projects || projects.length === 0, renderNothing),
    withStateHandlers(
        () => ({ position: 0 }),
        {
            toNext: ({ position }, { projects }) => () => ({
                position: position + 1 < projects.length ? position + 1 : position,
            }),
            toPrev: ({ position }) => () => ({
                position: position - 1 >= 0 ? position - 1 : position,
            }),
        }
    ),
    withProps(({ position, projects }) => ({
        prev:   { project: null, loading: false },
        prevId: projects[position - 1] || null,

        current:   { project: null, loading: false },
        currentId: projects[position] || null,

        next:   { project: null, loading: false },
        nextId: projects[position + 1] || null,
    })),
    graphql(query, propertiesByName('prev')),
    graphql(query, propertiesByName('current')),
    graphql(query, propertiesByName('next')),
)(Picker);

ActivityCardPickerG.displayName = 'ActivityCardPickerG';

export default ActivityCardPickerG;
