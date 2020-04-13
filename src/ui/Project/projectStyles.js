import styled from '@emotion/styled';
import _get from 'lodash/get';
import { font8 } from '../uiFonts';

// eslint-disable-next-line import/prefer-default-export
export const PlaylistLabel = styled('span')(({ theme }) => ({
    ...font8,
    borderRadius:    3,
    backgroundColor: _get(theme, 'colors.primary'),
    color:           '#ffffff',
    whiteSpace:      'nowrap',
    padding:         '6px 4px 5px 3px',
    flexShrink:      0,
    verticalAlign:   'middle',
}));
