import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import { breakpoints } from '../Constants';

export const MobileOnly = styled(Box)({
    [breakpoints.mobile]: { display: 'none' },
});

export const TabletAndHigher = styled(Box)({
    whiteSpace:              'nowrap',
    [breakpoints.tabletMax]: { display: 'none' },
});

export const DesktopAndHigher = styled(Box)({
    [breakpoints.desktopMax]: { display: 'none' },
});
