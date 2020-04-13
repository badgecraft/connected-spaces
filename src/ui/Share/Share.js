import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import styled from '@emotion/styled';
import { t } from 'ttag';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    EmailShareButton,
    EmailIcon,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';
import { font12A4, font16A5 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Root = styled(Box)({});

const Icons = styled('div')(({ withMargin }) => ({
    marginTop:      4,
    display:        'flex',
    flexWrap:       'wrap',
    alignItems:     'center',
    justifyContent: 'center',
    '> div':        {
        ...(withMargin && { marginRight: 5 }),
        marginBottom: 8,
        cursor:       'pointer',
        'last-child': { marginRight: 0 },
    },
}));

const Text = styled('div')(({ theme }) => ({
    ...font12A4,
    color:       '#3E3564',
    marginRight: 12,

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

const ToEnableBox = styled('div')({
    textAlign: 'center',
});

const Share = ({ url, vertical, enabled, toEnable, ...props }) => (
    <Root my={vertical ? 0 : 3} {...props}>
        {!vertical && <Text>{t`Share:`}</Text>}
        <Icons withMargin={!vertical}>
            <FacebookShareButton url={url} disabled={!enabled}>
                <FacebookIcon round size={32} />
            </FacebookShareButton>

            <TwitterShareButton url={url} disabled={!enabled}>
                <TwitterIcon round size={32} />
            </TwitterShareButton>

            <LinkedinShareButton url={url} disabled={!enabled}>
                <LinkedinIcon round size={32} />
            </LinkedinShareButton>

            <PinterestShareButton url={url} disabled={!enabled}>
                <PinterestIcon round size={32} />
            </PinterestShareButton>

            <RedditShareButton url={url} disabled={!enabled}>
                <RedditIcon round size={32} />
            </RedditShareButton>

            <WhatsappShareButton url={url} disabled={!enabled}>
                <WhatsappIcon round size={32} />
            </WhatsappShareButton>

            <EmailShareButton url={url} disabled={!enabled}>
                <EmailIcon round size={32} />
            </EmailShareButton>
        </Icons>
        {!enabled && (<ToEnableBox>{toEnable}</ToEnableBox>)}
    </Root>
);

Share.propTypes = {
    url:      PropTypes.string.isRequired,
    vertical: PropTypes.bool,
    enabled:  PropTypes.bool,
    toEnable: PropTypes.node,
};

Share.defaultProps = {
    vertical: false,
    enabled:  true,
    toEnable: null,
};

export default Share;
