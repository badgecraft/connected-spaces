import { withProps, compose, branch, renderNothing, getContext } from 'recompose';
import PropTypes from 'prop-types';
import Tag from './Tag';

const CategoryTag = compose(
    branch(({ category }) => !category, renderNothing),
    getContext({
        paths: PropTypes.shape({
            opportunitiesInCategory: PropTypes.string.isRequired,
        }).isRequired,
    }),
    withProps(({ category, paths }) => ({
        withHash: false,
        label:    category.name,
        to:       paths.opportunitiesInCategory,
        params:   { id: category.id },
    })),
)(Tag);

CategoryTag.propTypes = {
    category: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

CategoryTag.displayName = 'CategoryTag';

export default CategoryTag;
