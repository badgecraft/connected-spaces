import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _pick from 'lodash/pick';
import { font18, font24 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Container = styled('fieldset')(({ theme, noShadow = false, hasSubtitle, transparent }) => ({
    border:                            '0 none',
    margin:                            '8px auto',
    width:                             '100%',
    padding:                           '33px 16px 16px 16px',
    backgroundColor:                   transparent ? 'transparent' : '#ffffff',
    [themedMinWidth('tablet', theme)]: {
        padding: '42px 25px 25px 25px',
    },
    '&:last-child':                    { marginBottom: 37 },
    ...(!noShadow && {
        boxShadow: '0 3px 12px 0 rgba(48,6,114,0.11)',
    }),
    legend:                            {
        paddingTop:                        8,
        ...font18,
        lineHeight:                        '39px',
        position:                          'relative',
        top:                               22,
        color:                             _get(theme, 'form.fieldset.color', '#3E3564'),
        ...(hasSubtitle && {
            width:          '100%',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
        }),
        [themedMinWidth('tablet', theme)]: {
            paddingTop: 12,
            ...font24,
        },
    },
}));

const SubTitle = styled('span')({});

const FieldSet = ({ title, subTitle, children, ...props }) => (
    <Container {..._omit(props, ['data-balloon', 'data-balloon-pos'])} hasSubtitle={!!subTitle}>
        {title && <legend>
            <span {..._pick(props, ['data-balloon', 'data-balloon-pos'])}>{title}</span>
            {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </legend>}
        {children}
    </Container>
);

FieldSet.propTypes = {
    title:       PropTypes.node,
    subTitle:    PropTypes.node,
    children:    PropTypes.node.isRequired,
    transparent: PropTypes.bool,
};

FieldSet.defaultProps = {
    title:       null,
    subTitle:    null,
    transparent: false,
};

export default FieldSet;
