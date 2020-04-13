import PropTypes from 'prop-types';
import { branch, renderNothing, compose, getContext } from 'recompose';
import View from './ReviewRequestQuickInfoView';

const ReviewRequestQuickInfo = compose(
    branch(({ reviewRequest }) => !reviewRequest, renderNothing),
    getContext({
        baseURL: PropTypes.string.isRequired,
        paths:   PropTypes.shape({}).isRequired,
    }),
)(View);

ReviewRequestQuickInfo.propTypes = {
    reviewRequest: PropTypes.shape({}).isRequired,
};

ReviewRequestQuickInfo.displayName = 'ReviewRequestQuickInfo';

export default ReviewRequestQuickInfo;
