import { withState, compose, branch, renderNothing, withHandlers } from 'recompose';
import View from './NotVerifiedPrimaryEmailView';

export default compose(
    withState('visible', 'setVisible', true),
    branch(({ visible }) => !visible, renderNothing),
    withHandlers({
        onClick: ({ setVisible }) => () => setVisible(false),
    }),
)(View);
