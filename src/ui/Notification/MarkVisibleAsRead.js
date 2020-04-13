import React from 'react';
import PropTypes from 'prop-types';

export default class MarkVisibleAsRead extends React.Component {
    static propTypes = {
        children:              PropTypes.node.isRequired,
        markAsRead:            PropTypes.func.isRequired,
        visibilityTimout:      PropTypes.number,
        visibilityPushTimeout: PropTypes.number,
    };

    static defaultProps = {
        visibilityTimout:      100,
        visibilityPushTimeout: 500,
    };

    static childContextTypes = {
        onVisibilityChange: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.timeouts = {};
        this.state = {
            marked: [],
            toMark: [],
        };
    }

    getChildContext = () => ({
        onVisibilityChange: this.handleNotifyChange,
    });

    componentDidMount() {
        this.interval = setInterval(this.runMarker, this.props.visibilityPushTimeout);
    }

    componentWillUnmount() {
        Object.keys(this.timeouts).forEach(id => clearTimeout(this.timeouts[id]));
        clearInterval(this.interval);
    }

    handleNotifyChange = ({ id, isVisible, viewed }) => {
        if (viewed) {
            return;
        }
        const { marked } = this.state;
        if (!isVisible) {
            clearTimeout(this.timeouts[id]);
            delete this.timeouts[id];
        } else if (!this.timeouts[id] && marked.indexOf(id) === -1) {
            this.timeouts[id] = setTimeout(() => {
                const { toMark } = this.state;
                this.setState({ toMark: [...toMark, id] });
            }, this.props.visibilityTimout);
        }
    };

    runMarker = () => {
        const { toMark, marked } = this.state;
        if (toMark.length > 0) {
            this.setState({ marked: [...marked, toMark], toMark: [] });
            this.props.markAsRead(toMark);
        }
    };

    render = () => {
        const { children } = this.props;
        return children;
    }
}
