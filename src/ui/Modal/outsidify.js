import { lifecycle } from 'recompose';
import onClickOutside from 'react-onclickoutside';

export default ({ onOutsideClickProp = 'onClose', outsideBreakpoint = 0 } = {}) => Component => onClickOutside(lifecycle({
    handleClickOutside() {
        if (document.body.offsetWidth >= outsideBreakpoint) {
            const callback = this.props[onOutsideClickProp];
            if (callback) {
                callback();
            }
        }
    },
})(Component))
