import styled from '@emotion/styled';
import Link from '../../ui/Link';
import { breakpoints, Colors } from '../Constants';
import { font12A2, font16A3 } from '../../ui/uiFonts';

const Category = styled(Link)({
    ...font12A2,
    color:                Colors.eventSecondary,
    backgroundColor:      Colors.skillSecondary,
    borderRadius:         15,
    display:              'inline-block',
    margin:               '13px 0',
    padding:              '0 16px',
    lineHeight:           '22px',
    [breakpoints.mobile]: {
        ...font16A3,
        borderRadius: 21,
        lineHeight:   '30px',
    },
});

export default Category;
