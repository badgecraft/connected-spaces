import { css } from '@emotion/core';
import iconsTTF from './icons.ttf';
import iconsWOFF from './icons.woff';
import iconsWOFF2 from './icons.woff2';
import iconsEOT from './icons.eot';
// import iconsSVG from './icons.svg'; // url("./icons.svg?5e16ae5759a85f2f23a1dfad03e31fc4#icons") format("svg");

export default css`
    @font-face {
        font-family: 'icons';
        src:    url("${iconsEOT}") format("embedded-opentype"),
                url("${iconsWOFF}") format("woff2"),
                url("${iconsWOFF2}") format("woff"),
                url("${iconsTTF}") format("truetype");
    }
`;
