import styled from '@emotion/styled';
import _get from 'lodash/get';
import { font12A6 } from '../uiFonts';

export default styled('div')(({ theme, inline = false }) => ({
    ...font12A6,
    color:     _get(theme, 'colors.form.error', '#d65757'),
    minHeight: 14,
    ...(inline && { display: 'inline-block' }),
}));
