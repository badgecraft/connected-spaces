import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withProps } from 'recompose';
import { Box, Flex } from '@rebass/emotion';
import { t } from 'ttag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import { breakpoints, Colors, paths } from '../Constants';
import logo from '../Icon/svg2/badgecraft.svg';
import _Link from '../Link';
import Newsletter from '../NewsletterSignUp';
import { languages } from '../../i18n-loader';
import { font12, font12A5, font16A1, font20A2 } from '../../ui/uiFonts';
import query from './footer.gql';

const Link = styled(_Link)({
    '&:hover': {
        textDecoration: 'underline',
    },
});

const Container = styled(Flex)(({ alignItems }) => ({
    flexWrap: 'wrap',
    color:    Colors.tagDefaultText,
    ...(alignItems && { alignItems }),
}));

const Ul = styled(Flex)({ flexWrap: 'wrap' });

const Text = styled(Box)({
    ...font12,
    color:                '#3E3564',
    [breakpoints.mobile]: {
        ...font16A1,
        marginTop: 17,
    },
});

const LiText = styled(Box)({
    ...font12,
    lineHeight:           '23px',
    margin:               '5px 0',
    color:                '#3E3564',
    [breakpoints.mobile]: {
        ...font16A1,
    },
});
const Li = withProps({ width: [1 / 2, 1] })(LiText);

const Title = styled('h6')({
    ...font12A5,
    color:                Colors.tagDefaultText,
    margin:               '10px 0 5px',
    [breakpoints.mobile]: {
        ...font20A2,
    },
});

const LanguageContainer = styled(Flex)({
    flexWrap:             'wrap',
    ...font12,
    paddingLeft:          72,
    color:                Colors.tagDefaultText,
    [breakpoints.mobile]: {
        paddingLeft: 0,
        ...font16A1,
    },
    'a:hover':            {
        textDecoration: 'underline',
    },
});

const CoImg = styled('img')({
    maxWidth: '100%',
});

const Footer = ({ coFundedBy, footer }) => (
    <React.Fragment key="f">
        <Container mx={3}>
            <Box width={[1, 1 / 2, 1 / 4]} order={[1, 4, 1]} mt={[0, 4, 0]} px={2}>
                <Link href="https://www.badgecraft.eu" target="_blank">
                    <img src={logo} width={124} height={22} alt="Badgecraft" />
                </Link>
                {/* eslint-disable-next-line max-len */}
                <Text>{t`Connected Spaces interactive maps and playLIsts are developed by the international partnership with the co-funding of Erasmus+ programme.`}</Text>
            </Box>

            {footer
                ? footer.map(({ title, links = [] }, idx) => (
                    <Box
                        key={title}
                        width={[1, 1 / footer.length, 1 / (footer.length * 2)]}
                        order={[idx + 2, idx + 1, idx + 2]}
                        px={2}
                    >
                        <Title>{title}</Title>
                        <Ul>
                            {links.map(link => (
                                <Li key={`${link.path}${link.title}`}><Link href={link.path}>{link.title}</Link></Li>
                            ))}
                        </Ul>
                    </Box>
                ))
                : <React.Fragment key="ip">
                    <Box width={[1, 1 / 3, 1 / 6]} order={[2, 1, 2]} px={2}>
                        <Title>{t`Information to Platform`}</Title>
                        <Ul>
                            <Li><Link href={paths.about}>{t`About us`}</Link></Li>
                            <Li><Link href={paths.blog}>{t`Blog`}</Link></Li>
                            <Li><Link href={paths.qa}>{t`Questions & Answers`}</Link></Li>
                            <Li><Link href={paths.contacts}>{t`Contacts`}</Link></Li>
                        </Ul>
                    </Box>
                    <Box width={[1, 1 / 3, 1 / 6]} order={[3, 2, 3]} px={2}>
                        <Title>{t`Legal`}</Title>
                        <Ul>

                            <Li><Link href={paths.privacy}>{t`Privacy policy`}</Link></Li>
                            <Li><Link href={paths.security}>{t`Data security`}</Link></Li>
                            <Li><Link href={paths.termsOfService}>{t`Terms of Service`}</Link></Li>
                        </Ul>
                    </Box>
                    <Box width={[1, 1 / 3, 1 / 6]} order={[4, 3, 4]} px={2}>
                        <Title>{t`Discover`}</Title>
                        <Ul>
                            <Li><Link href={paths.home}>{t`Map`}</Link></Li>
                            <Li><Link target="_blank" href={paths.openBadges}>{t`Open Badges`}</Link></Li>
                            <Li><Link target="_blank" href={paths.cities}>{t`Cities and regions`}</Link></Li>
                        </Ul>
                    </Box>
                </React.Fragment>}
            <Box width={[1, 1 / 2, 1 / 4]} order={5} mt={[0, 4, 0]} mb={[4, 0]} px={2}>
                <Newsletter />
            </Box>
        </Container>
        <LanguageContainer mx={3} my={2}>
            <Box width={1} mb={2} px={2}>
                {t`Change to other language`}:
            </Box>
            <Box width={1} px={2}>
                <Container mx={-2} mb={3}>
                    {languages.map(({ code, name }) => (
                        <Box key={code} px={2}>
                            <a href={`?lang=${code}`}>{name}</a>
                        </Box>
                    ))}
                </Container>
            </Box>
        </LanguageContainer>
        <Container mx={3} alignItems="center">
            <Box width={[1, 1 / 2, 1 / 4]} px={2}>
                <CoImg
                    src="/img/erasmusplus.jpg"
                    alt={t`Co-funded by the Erasmus+ programme of the European Union`}
                />
            </Box>
            <Box width={[1, 1 / 2, 3 / 4]} pl={[80, 2, 2]} pr={[2, 2, 80]}>
                <Container>
                    {coFundedBy.map(item => (
                        <Box key={item.image} width={[1, 1, coFundedBy.length / 1]}>
                            <CoImg
                                src={item.image}
                                alt={item.title}
                            />
                        </Box>
                    ))}
                </Container>
            </Box>
        </Container>
    </React.Fragment>
);

Footer.propTypes = {
    coFundedBy: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
    })).isRequired,
    footer:     PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            path:  PropTypes.string.isRequired,
        })).isRequired,
    })),
};

Footer.defaultProps = {
    footer: null,
};

export default graphql(query, {
    options: {
        fetchPolicy: 'cache-first',
    },
    props:   ({ data }) => ({
        coFundedBy: _get(data, 'site.coFundedBy') || [],
        footer:     _get(data, 'site.footer'),
    }),
})(Footer);
