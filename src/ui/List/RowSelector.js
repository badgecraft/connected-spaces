import { withStateHandlers } from 'recompose';
import View from './RowSelectorView';

export default withStateHandlers(
    ({ current = 1 }) => ({ current }),
    { onChange: () => current => ({ current }) },
)(View);
