import React from 'react';
import { mapProps } from 'recompose';
import Icon, { icons as _icons } from '../Icon/_Icon';
import Button from './Button';

export default mapProps(({ image, size, ...props }) => ({
    ...props,
    variant:  'icon',
    children: (<Icon image={image} size={size} />),
}))(Button);

export const icons = _icons;
