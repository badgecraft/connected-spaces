import React from 'react';
import styled from '@emotion/styled';
import Footer from '../UI/Footer';
import { withVisibilityStyle } from '../../ui/uiUtils';

const FooterRoot = styled('div')({ width: '100%' }, withVisibilityStyle);

const PlaylistCreateFooter = () => (
    <FooterRoot fromTablet>
        <Footer />
    </FooterRoot>
);

export default PlaylistCreateFooter;
