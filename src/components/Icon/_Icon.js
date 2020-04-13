import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import _icons from './icons';
import { breakpoints, Colors } from '../Constants';

export const DEFAULT_SIZE = 30;

const getSizes = sizeDef => {
    if (sizeDef instanceof Array) {
        return sizeDef;
    }

    return [sizeDef, sizeDef, sizeDef]
};

const getSize = (index, sizeDef) => {
    const sizes = getSizes(sizeDef);
    const idx = index > sizes.length ? (sizes.length - 1) : index;
    return sizes[idx];
};

const toPx = sz => `${sz}px`;

const Icon = styled('span')(({ bgSize, size = DEFAULT_SIZE, image, dark }) => ({
    display:              'inline-block',
    width:                `${getSize(0, size)}px`,
    height:               `${getSize(0, size)}px`,
    backgroundImage:      `url("${image}")`,
    backgroundPosition:   'center center',
    backgroundRepeat:     'no-repeat',
    backgroundSize:       [
        'contain',
        `${bgSize || size || DEFAULT_SIZE}px ${bgSize || size || DEFAULT_SIZE}px`,
    ],
    verticalAlign:        'middle',
    position:             'relative',
    textAlign:            'center',
    lineHeight:           `${getSize(0, size)}px`,
    fontSize:             12,
    fontWeight:           500,
    overflow:             'hidden',
    color:                dark ? Colors.iconDarkText : Colors.iconText,
    [breakpoints.tablet]: {
        width:      toPx(getSize(1, size)),
        height:     toPx(getSize(1, size)),
        lineHeight: toPx(getSize(1, size)),
    },
}));

Icon.propTypes = {
    size:  PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    image: PropTypes.string.isRequired,
};

Icon.defaultProps = {
    size: DEFAULT_SIZE,
};

export const icons = _icons;
export default Icon;
