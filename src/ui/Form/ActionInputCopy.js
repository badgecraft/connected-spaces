import { compose, lifecycle, withHandlers, withStateHandlers, mapProps } from 'recompose';
import { t } from 'ttag';
import uiCopyHandler from '../uiCopyHandler';
import ActionInput from './ActionInput';

const ActionInputCopy = compose(
    withStateHandlers({ submitLabel: t`Copy`, tick: 0, tickEnabled: false }, {
        onTick:   ({ tick, tickEnabled }) => () => {
            if (!tickEnabled) {
                return null;
            }

            if (tick > 5) {
                return { tickEnabled: false, tick: 0, submitLabel: t`Copy` };
            }
            return { tick: tick + 1 };
        },
        onCopied: () => () => {
            return { submitLabel: t`Copied`, tick: 0, tickEnabled: true };
        },
    }),
    lifecycle({
        componentDidMount() {
            this.interval = setInterval(this.props.onTick, 1000);
        },
        componentWillUnmount() {
            clearInterval(this.interval);
        },
    }),
    withHandlers({ onSubmit: uiCopyHandler }),
    mapProps(({ onTick, onCopied, ...props }) => props),
)(ActionInput);

ActionInputCopy.displayName = 'ActionInputCopy';

export default ActionInputCopy;