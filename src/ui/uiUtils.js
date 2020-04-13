import _get from 'lodash/get';
import { getContext, mapProps } from 'recompose';
import _omit from 'lodash/omit';
import PropTypes from 'prop-types';

export const minWidth = width => `@media (min-width: ${width}px)`;

export const maxWidth = width => `@media (max-width: ${width}px)`;

export const themedMinWidth = (name, theme) => minWidth(_get(theme, ['breakpointWidths', name]));

export const themedMaxWidth = (name, theme) => maxWidth(_get(theme, ['breakpointWidths', name]));

export const minWidthFromProps = themedMinWidth;

export const maxWidthFromProps = themedMaxWidth;

export const withVisibilityStyle = ({ fromTablet, mobileOnly, theme }) => {
    if (fromTablet) {
        return {
            display:                           'none',
            [themedMinWidth('tablet', theme)]: { display: 'block' },
        }
    }

    if (mobileOnly) {
        return {
            [themedMinWidth('tablet', theme)]: { display: 'none' },
        };
    }
    return {};
};

export const skipProps = (...propNames) => mapProps(props => _omit(props, ...propNames));

export const runOnConfirm = ({ question, func }) => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(question);
    if (confirm) {
        return func();
    }

    return null;
};

export const runAfterConfirm = runOnConfirm;

export const withPushRoute = getContext({ pushRoute: PropTypes.func.isRequired });

export const required = () => {
    throw new Error('Missing required parameter');
};

export const noEmptyItems = array => (array || []).filter(item => item);

export const listWithoutValue = (value, items) => noEmptyItems(items).filter(item => item !== value);

export const listWithValue = (value, items) => noEmptyItems([...listWithoutValue(value, items), value]);

export const listWithOrWithoutValue = (value, items, pred) => pred
    ? listWithValue(value, items)
    : listWithoutValue(value, items);

export const getPreferenceValue = (viewerPreferences, name, defaultValue = null) => (viewerPreferences || [])
    .filter(item => item && item.name === name)
    .reduce((map, last) => last.value, defaultValue);

// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmail = emailStr => EMAIL_REGEX.test(emailStr);

export const isParentNode = (child, parent, maxDepth = -1) => {
    if (!child || !parent || !child.parentNode || maxDepth === 0) {
        return false;
    }

    return child.parentNode === parent || isParentNode(child.parentNode, parent, maxDepth < 0 ? -1 : maxDepth - 1);
};

export const isParentNodeOfAny = (child, parents = [], maxDepth = -1) => parents
    .some(parent => isParentNode(child, parent, maxDepth));

export const isParentNodeOfAnyChildren = (child, parent, maxDepth) => isParentNodeOfAny(
    child,
    parent && Array.prototype.slice.call(parent.children, 0) || [],
    maxDepth,
);