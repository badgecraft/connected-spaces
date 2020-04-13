import { mapProps, compose } from 'recompose';
import View from './InviteRowView';

export default compose(
    mapProps(({ meta: { error }, input, ...props }) => ({
        ...props,
        ...input,
        error,
    })),
)(View);
