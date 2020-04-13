import React from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import _omit from 'lodash/omit';
import history from '../../server/history';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export const toLink = ({ to = '/', params = {}, baseURL = '' }) => `${baseURL}${pathToRegexp.compile(to)(params)}`;

// todo replace with ui/Link
class Link extends React.Component {

    handleClick = event => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        event.preventDefault();
        history.push(toLink(this.props));
    };

    render() {
        const { href, to, params, children, ...props } = this.props;
        const pass = _omit(props, 'dispatch', 'dark');
        if (href) {
            return (<a href={href} {...pass}>{children}</a>);
        }
        return (
            <a href={toLink({ to, params })} {...pass} onClick={this.handleClick}>{children}</a>
        );
    }
}

Link.propTypes = {
    href:     PropTypes.string,
    to:       PropTypes.string,
    params:   PropTypes.shape(),
    // eslint-disable-next-line react/no-typos
    children: PropTypes.PropTypes.node,
    onClick:  PropTypes.func,
};

Link.defaultProps = {
    href:     null,
    to:       '',
    onClick:  null,
    params:   {},
    children: (<span />),
};

export default Link;
