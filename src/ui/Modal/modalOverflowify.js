import { lifecycle } from 'recompose';

export default ({ overflowBreakpoint = 0 } = {}) => lifecycle({
    componentDidMount() {
        this.overflow = document.body.style.overflow;
        this.topOffset = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
        if (document.body.offsetWidth >= overflowBreakpoint) {
            document.body.style.overflow = 'hidden';
        }
    },

    componentWillUnmount() {
        document.body.style.overflow = this.overflow;
        window.scrollTo(0, this.topOffset);
    },
});
