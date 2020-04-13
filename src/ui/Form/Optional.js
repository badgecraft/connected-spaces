import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { font14A3 } from '../uiFonts';

const Container = styled('div')({ margin: '14px 0' });

const Button = styled('button')({
    ...font14A3,
    border:          '0 none',
    outline:         'none',
    backgroundColor: 'transparent',
    textDecoration:  'underline',
    cursor:          'pointer',
    paddingLeft:     0,
    paddingRight:    0,
});

export const Add = ({ input: { onChange }, addLabel }) => (
    <Container>
        <Button type="button" onClick={() => onChange(new Date().toISOString())}>{addLabel}</Button>
    </Container>
);

Add.propTypes = {
    addLabel: PropTypes.string.isRequired,
    input:    PropTypes.shape({
        onChange: PropTypes.func.isRequired,
    }).isRequired,
};

export const Remove = ({ removeLabel, onChange }) => (
    <Button type="button" onClick={() => onChange(null)}>{removeLabel}</Button>
);

Remove.propTypes = {
    removeLabel: PropTypes.string.isRequired,
    onChange:    PropTypes.func.isRequired,
};
