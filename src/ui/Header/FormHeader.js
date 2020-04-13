import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import Link from '../Link';
import backImage from './back.svg';
import { font14A1 } from '../uiFonts';

const Root = styled('div')(({ theme }) => ({
    display:         'flex',
    backgroundColor: _get(theme, 'colors.primary'),
    height:          50,
    alignItems:      'center',
    justifyContent:  'space-between',
    padding:         '0 16px',
    color:           '#FFFFFF',
}));

const Back = styled(Link)({
    display:    'inline-block',
    height:     24,
    width:      24,
    marginLeft: -8,
    background: `transparent url("${backImage}") center center/16px 16px no-repeat`,
});

const Title = styled('div')({
    ...font14A1,
    display:    'flex',
    alignItems: 'center',
});

const Action = styled('div')({
    ...font14A1,
});

const FormHeader = ({ title, action, back }) => (
    <Root>
        <Title><Back {...back} /> {title}</Title>
        <Action>{action}</Action>
    </Root>
);

FormHeader.propTypes = {
    title:  PropTypes.node.isRequired,
    action: PropTypes.node,
    back:   PropTypes.shape({
        to:     PropTypes.string.isRequired,
        params: PropTypes.shape(),
    }).isRequired,
};

FormHeader.defaultProps = {
    action: null,
};

export default FormHeader;
