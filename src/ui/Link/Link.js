import React from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import _omit from 'lodash/omit';
import { getContext } from 'recompose';
import _get from 'lodash/get';
import qs from 'query-string';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export const toLink = ({ to = '/', params = {}, baseURL = '', query = {}, hash = null }) => {
    const qr = qs.stringify(query);
    const path = pathToRegexp.compile(to)(params);
    let qsInPath = '';
    if (qr) {
        qsInPath = `${path.indexOf('?') === -1 ? '?' : '&'}${qr}`;
    }
    return `${baseURL}${path}${qsInPath}${hash ? `#${hash}` : ''}`;
};

class Link extends React.Component {
    handleClick = event => {
        const { onClick, onAfterClick, pushPath, disableNextScroll } = this.props;
        if (onClick) {
            onClick(event);
            if (onAfterClick) {
                onAfterClick();
            }
            return;
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        event.preventDefault();
        pushPath(toLink(this.props), { disableNextScroll });
        if (onAfterClick) {
            onAfterClick();
        }
    };

    render() {
        const { href, to, params, query, children, hash, variant, ...props } = this.props;
        // todo would be better to pass only a attributes
        const pass = _omit(props, 'dispatch', 'dark', 'pushPath', 'noBorder', 'active', 'baseURL', 'variant',
            'colorType', 'disableNextScroll', 'underlined', 'enabled', 'onAfterClick', 'fade', 'fullWidth');
        if (href || _get(props, 'target') === '_blank' || variant === 'href') {
            return (<a href={href || toLink({ to, params, query, hash })} {...pass}>{children}</a>);
        }
        return (
            <a href={toLink({ to, params, query })} {...pass} onClick={this.handleClick}>{children}</a>
        );
    }
}

Link.propTypes = {
    href:              PropTypes.string,
    to:                PropTypes.string,
    hash:              PropTypes.string,
    params:            PropTypes.shape(),
    query:             PropTypes.shape(),
    children:          PropTypes.node,
    onClick:           PropTypes.func,
    onAfterClick:      PropTypes.func,
    pushPath:          PropTypes.func.isRequired,
    variant:           PropTypes.string,
    disableNextScroll: PropTypes.bool,
};

Link.defaultProps = {
    href:              null,
    to:                '',
    hash:              null,
    onClick:           null,
    onAfterClick:      null,
    params:            {},
    query:             {},
    children:          (<span />),
    variant:           'default',
    disableNextScroll: false,
};

export default getContext({ pushPath: PropTypes.func })(Link);
