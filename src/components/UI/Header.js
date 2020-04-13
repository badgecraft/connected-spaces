import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/emotion';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import { breakpoints } from '../Constants';
import Link from '../Link';
import paths from '../../constants/paths';
import { MobileOnly, DesktopAndHigher } from './DeviceCondition';
import withSite from '../_helpers/withSite';
import { font14A3, font28A1 } from '../../ui/uiFonts';

const Container = styled(Flex)({
    alignItems:           'center',
    justifyContent:       'center',
    height:               48,
    margin:               0,
    boxShadow:            '0 3px 12px 0 rgba(48,6,114,0.11)',
    [breakpoints.tablet]: {
        height: '102px',
    },
});

const LeftLogo = styled('div')({
    display:              'none',
    [breakpoints.tablet]: {
        display: 'block',
        padding: '0 16px',
    },
});

const Left = styled(Box)({
    minWidth:             48,
    padding:              '0 16px',
    [breakpoints.tablet]: {
        display: 'none',
    },
});

const Title = styled(Box)`
    flex-grow: 1;
`;

const Right = styled(Box)({
    minWidth:   48,
    display:    'flex',
    alignItems: 'center',
    padding:    '0 16px',
});

const EmptyButton = styled('div')({ width: 48, height: 48 });

const LogoContainer = styled('div')`
    text-align: center;
`;

const LogoTitle = styled('div')(({ theme }) => ({
    ...font28A1,
    color: _get(theme, 'colors.primary'),
}));

const LogoTitleDesc = styled('div')({
    ...font14A3,
    color: '#3E3564',
});

const Logo = ({ logoUrl, title }) => (
    <LogoContainer>
        <MobileOnly><Link to={paths.home}>{logoUrl &&
        <img alt={t`Home`} src={logoUrl} width={84} />}</Link></MobileOnly>
        <DesktopAndHigher>
            <LogoTitle>{title}</LogoTitle>
            <LogoTitleDesc>
                {t`Platform for you to find and connect learning experience with Open Badges and Playlists`}
            </LogoTitleDesc>
        </DesktopAndHigher>
    </LogoContainer>
);

Logo.propTypes = {
    logoUrl: PropTypes.string,
    title:   PropTypes.string,
};

Logo.defaultProps = {
    logoUrl: null,
    title:   null,
};

const Header = ({ left, children, right, withMobileLogo, site, ...props }) => {
    const logoUrl = _get(site, 'logoUrl');
    const title = _get(site, 'title');

    return (
        <Container mx={2} {..._pick(props, 'className')}>
            <LeftLogo>
                <Link to={paths.home}><img alt={t`Home`} src={logoUrl} width={123} /></Link>
            </LeftLogo>
            <Left>{left || <EmptyButton />}</Left>
            <Title>{children || (withMobileLogo && <Logo logoUrl={logoUrl} title={title} />)}</Title>
            <Right>{right || <EmptyButton />}</Right>
        </Container>
    );
};

Header.propTypes = {
    left:           PropTypes.node,
    children:       PropTypes.node,
    right:          PropTypes.node,
    withMobileLogo: PropTypes.bool,
    site:           PropTypes.shape({
        title:   PropTypes.string.isRequired,
        logoUrl: PropTypes.string.isRequired,
    }),
};

Header.defaultProps = {
    left:           null,
    children:       null,
    right:          null,
    withMobileLogo: false,
    site:           null,
};

export default withSite(Header);
