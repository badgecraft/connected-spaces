import PropTypes from 'prop-types';
import { withProps, compose, getContext } from 'recompose';
import _get from 'lodash/get';
import Thumb from './BadgeThumb';

export default compose(
    getContext({
        paths: PropTypes.shape({
            badgeClassView: PropTypes.string.isRequired,
        }).isRequired,
    }),
    withProps(({ badgeClass, paths }) => ({
        link: _get(badgeClass, 'perms.view.value') === 1 ? {
            to:     paths.badgeClassView,
            params: { id: badgeClass.id, projectId: badgeClass.projectId }
        } : null,
    })),
)(Thumb);
