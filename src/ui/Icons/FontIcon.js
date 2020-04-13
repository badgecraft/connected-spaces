import styled from '@emotion/styled';
import iconMap from '../fonts/icons.json';

export default styled('i')(({ content, style = {} }) => ({
    '&:before': {
        fontFamily:          'icons !important',
        fontStyle:           'normal',
        fontWeight:          'normal !important',
        fontVariant:         'normal',
        textTransform:       'none',
        lineHeight:          '1px',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        content:             `"${iconMap[content] || ''}"`,
        ...style,
    },
}));
