import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _pick from 'lodash/pick';
import fCompose from 'lodash/fp/compose';
import prop from 'lodash/fp/prop';
import { mapProps } from 'recompose';
import { breakpointWidths } from "../Constants";

const screens = [
    body => body && {
        [`@media (max-width: ${breakpointWidths.mobile}px)`]: body
    } || {},
    body => body && {
        [`@media (min-width: ${breakpointWidths.mobile}px) and (max-width: ${breakpointWidths.tablet})`]: body
    } || {},
    body => body && {
        [`@media (min-width: ${breakpointWidths.tablet}px)`]: body
    } || {},
];

const noop = () => ({});

const isEnabled = (index, fieldName, ref) => {
    const values = _get(ref, fieldName, []);

    if (Array.isArray(values)) {
        return !!_get(values, index, false);
    }

    return !!values;
};

const toFunc = objOrFunc => typeof objOrFunc === "function" ? objOrFunc : (() => objOrFunc);

export const mediaProps = propName => (...args) => {
    const list = [...args].map(toFunc);
    const last = (list.length && list[list.length - 1]) || noop;

    return screens.map((sizeFunc, index) =>
        props => sizeFunc(isEnabled(index, propName, props) && (list[index] || last)(props)));
};

export const fullWidth = mediaProps("fullWidth");

export const skipProps = (...propNames) => mapProps(props => _omit(props, ...propNames));

export const viewProps = props => _pick(props, 'className', 'p', 'py', 'px', 'm', 'my', 'mx');

export const not = value => !value;

export const notProp = propName => fCompose(not, prop(propName));
