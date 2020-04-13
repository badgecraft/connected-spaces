import PropTypes from 'prop-types';
import { lifecycle, compose, getContext } from 'recompose';

export default ({ onEscapeProp = 'onEscape' } = {}) => compose(
    getContext({ addEscapeListener: PropTypes.func.isRequired }),
    lifecycle({
        componentDidMount() {
            const { addEscapeListener } = this.props;
            const escapeCallback = this.props[onEscapeProp];
            if (addEscapeListener && escapeCallback) {
                this.escapifyUnmountListener = addEscapeListener(escapeCallback);
            }
        },
        componentWillUnmount() {
            if (this.escapifyUnmountListener) {
                this.escapifyUnmountListener();
            }
        }
    }),
);
