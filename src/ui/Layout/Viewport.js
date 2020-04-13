import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { themedMinWidth } from '../uiUtils';

const Viewport = styled('div')(({ theme, variant }) => ({
    // width:       ['100%', '100vw'], // todo check if that does not break connected spaces
    width:       '100%',
    maxWidth:    '100vw',
    marginLeft:  'auto',
    marginRight: 'auto',
    // overflowX:   'hidden', // creates a problem with connected cover page

    ...(variant === 'list' && {
        paddingTop: 16,
    }),

    [themedMinWidth('tablet', theme)]:  {
        width: theme.breakpointWidths.tablet,
    },
    [themedMinWidth('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}));

Viewport.propTypes = {
    variant: PropTypes.oneOf(['default', 'list']),
};

Viewport.defaultProps = {
    variant: 'default',
};

export default Viewport;
