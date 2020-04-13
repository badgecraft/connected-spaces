import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _pick from 'lodash/pick';
import { jt, t } from 'ttag';
import Button from '../Button';
import { font16A3 } from '../uiFonts';

const Root = styled('div')({
    ...font16A3,
    backgroundColor: '#ffffff',
    position:        'fixed',
    left:            0,
    right:           0,
    bottom:          0,
    minHeight:       20,

    boxShadow: '0 -3px 12px 0 rgba(48,6,114,0.11)',
    padding:   '16px 32px',
});

const CookieWarning = ({ onClick, ...props }) => {
    const button = (<Button variant="primary" key="b" type="button" onClick={onClick} label={t`I agree`} />);

    return (
        <Root {..._pick(props, 'className')}>
            {jt`We use cookies to ensure you get the best experience of using this site. 
            Visit Privacy policy to find out how we use cookies. ${button}`}
        </Root>
    );
};

CookieWarning.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default CookieWarning;
