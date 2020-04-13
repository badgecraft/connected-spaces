import { mapProps } from 'recompose';
import View from './EmailAdder';

export default mapProps(({ meta: { error }, input, ...props }) => ({
    ...input,
    ...props,
    error,
}))(View);
