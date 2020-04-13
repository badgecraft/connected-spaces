import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { branch, renderComponent, mapProps } from 'recompose';
import { Colors } from '../Constants';
import Field from './FormField';

// TODO counter
// TODO multi line with markdown editor
const TextInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    border: 1px solid ${({ error }) => error ? Colors.error : Colors.inputBorder};
    background-color: ${Colors.inputBg};
    line-height: 33px;
    border-radius: 10px;
    color: ${Colors.heading};
    padding: 1px 10px;
    
    font-size: 16px;
`;

const TextArea = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    border: 1px solid ${({ error }) => error ? Colors.error : Colors.inputBorder};
    background-color: ${Colors.inputBg};
    
    border-radius: 10px;
    color: ${Colors.heading};
    padding: 10px;
    
    font-size: 16px;
    
    min-height: 90px;
`;

export const RawInput = branch(
    ({ multiLine }) => multiLine, renderComponent(TextArea),
)(TextInput);

RawInput.propTypes = {
    multiLine: PropTypes.bool,
};

RawInput.defaultProps = {
    multiLine: false,
};

export default mapProps(({ meta: { error }, input, label, help, required, ...props }) => ({
    children: <RawInput error={error} {...props} {...input} />,
    error,
    help,
    label,
    required,
}))(Field);
