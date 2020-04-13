import { compose, branch, renderNothing, renderComponent, getContext, mapProps, withProps } from 'recompose';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import _get from 'lodash/get';
import Button from '../Button';
import { toLink } from '../Link';

const joinCheck = ({ project }) => _get(project, 'perms.join.value') === 1;
const Join = mapProps(({ paths, project, size, fullWidth }) => ({
    type:    'link',
    variant: 'primary',
    label:   t`Join`,
    to:      paths.activityAttend,
    params:  { id: project.id },
    size,
    fullWidth,
}))(Button);

const loginAndJoinCheck = ({ project }) => {
    const cantLeave = _get(project, 'perms.leave.value') !== 1;
    const cantJoin = _get(project, 'perms.join.value') !== 1;
    return cantLeave && cantJoin && (_get(project, 'perms.join.reason') || []).indexOf('not-logged-in') !== -1;
};
const LoginAndJoin = mapProps(({ project: { id }, paths, size, fullWidth }) => ({
    type:    'link',
    variant: 'primary',
    label:   t`Join`,
    href:    toLink({
        to:     paths.authorizeWithBack,
        params: { id, back: toLink({ to: paths.activityAttend, params: { id } }) },
    }),
    size,
    fullWidth,
}))(Button);

const viewJoinedCheck = ({ project }) => {
    const canLeave = _get(project, 'perms.leave.value') === 1;
    const alreadyJoined = (_get(project, 'perms.join.reason') || []).indexOf('already-user') !== -1;
    return canLeave || alreadyJoined;
};
const ViewJoined = mapProps(({ paths, project, size, fullWidth }) => ({
    type:    'link',
    variant: 'secondary',
    label:   t`View joined`,
    to:      paths.activityView,
    params:  { id: project.id },
    size,
    fullWidth,
}))(Button);

const ActivityCardAction = compose(
    getContext({
        paths: PropTypes.shape({
            activityView:      PropTypes.string.isRequired,
            activityAttend:    PropTypes.string.isRequired,
            authorizeWithBack: PropTypes.string.isRequired,
        }).isRequired
    }),
    withProps(({ size = 'smaller', fullWidth = true }) => ({ size, fullWidth })),
    branch(joinCheck, renderComponent(Join)),
    branch(loginAndJoinCheck, renderComponent(LoginAndJoin)),
    branch(({ noView }) => noView, renderNothing),
    branch(viewJoinedCheck, renderComponent(ViewJoined)),
    branch(({ project }) => !project || _get(project, 'perms.view.value') !== 1, renderNothing),
    mapProps(({ paths, project, size, fullWidth }) => ({
        type:    'link',
        variant: 'primary',
        label:   t`View`,
        to:      paths.activityView,
        params:  { id: project.id },
        size,
        fullWidth,
    })),
)(Button);

ActivityCardAction.propTypes = {
    project: PropTypes.shape({
        perms: PropTypes.shape({
            view:  PropTypes.shape({
                value: PropTypes.oneOf([0, 1]).isRequired,
            }).isRequired,
            join:  PropTypes.shape({
                value:  PropTypes.oneOf([0, 1]).isRequired,
                reason: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            }).isRequired,
            leave: PropTypes.shape({
                value:  PropTypes.oneOf([0, 1]).isRequired,
                reason: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    noView:  PropTypes.bool,
};

ActivityCardAction.defaultProps = {
    noView: false,
};

ActivityCardAction.displayName = 'ActivityCardAction';

export default ActivityCardAction;
