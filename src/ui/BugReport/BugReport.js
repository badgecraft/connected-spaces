import { compose, branch, renderComponent, withStateHandlers } from 'recompose';
import Button from './BugReportButton';
import Form from './BugReportForm';

export default compose(
    withStateHandlers({ open: false }, {
        onOpen:  () => () => ({ open: true }),
        onClose: () => () => ({ open: false }),
    }),
    branch(({ open }) => open, renderComponent(Form)),
)(Button);
