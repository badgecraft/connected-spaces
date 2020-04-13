import React from 'react';
import PropTypes from 'prop-types';
import { defaultProps, withProps } from 'recompose';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import { t } from 'ttag';
import Link from '../Link';
import { themedMinWidth } from '../uiUtils';
import { font14A4, font16, font18A1 } from '../uiFonts';

const Content = defaultProps({ mx: [3, 2, 4] })(styled(Box)(
    ({ bg, align, color }) => ({
        ...(bg && { backgroundColor: bg }),
        ...(align && { textAlign: align }),
        ...(color && { color }),
    })
));

const Head = styled(Box)({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
});

const EventBox = withProps(({ mt = 3 }) => ({ mt, mb: 3, mx: 0, p: 3 }))(
    styled(Content)(({ theme }) => ({
        backgroundColor: '#ffffff',
        boxShadow:       '0 14px 14px 0 rgba(0,0,0,0.07)',
        color:           '#3E3564',
        fontSize:        12,
        lineHeight:      '16px',
        letterSpacing:   '0.12px',

        [themedMinWidth('tablet', theme)]: {
            fontSize:   16,
            lineHeight: '19px',
        },
    })),
);

const Heading = styled('h2')(({ theme }) => ({
    ...font16,
    color: '#3E3564',

    [themedMinWidth('tablet', theme)]: {
        ...font18A1,
    },
}));

const ActionLink = styled(Link)({
    ...font14A4,
    color:          '#3E3564',
    lineHeight:     '14px',
    textDecoration: 'underline',
});

const DetailBox = ({ title, children, action, actionTitle, actionEl, ...props }) => (
    <EventBox {...props}>
        {title && <Head title={title} my={1}>
            <Heading>{title}</Heading>
            {action && <ActionLink {...action}>{actionTitle || t`See all`}</ActionLink>}
            {actionEl}
        </Head>}
        {children}
    </EventBox>
);

DetailBox.propTypes = {
    title:       PropTypes.node,
    actionTitle: PropTypes.node,
    action:      PropTypes.shape({}),
    children:    PropTypes.node,
    actionEl:    PropTypes.node,
};

DetailBox.defaultProps = {
    action:      null,
    actionTitle: null,
    actionEl:    null,
    children:    null,
    title:       null,
};

export default DetailBox;
