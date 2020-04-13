import { withProps } from 'recompose';
import PropTypes from 'prop-types';
import Tag from './Tag';
import { translateCategoryName } from '../Form/formUtils';

const CategoryTagView = withProps(({ name, ...props }) => ({
    ...props,
    label:    translateCategoryName(name),
    withHash: false,
}))(Tag);

CategoryTagView.propTypes = {
    name: PropTypes.string.isRequired,
};

CategoryTagView.displayName = 'CategoryTagView';

export default CategoryTagView;
