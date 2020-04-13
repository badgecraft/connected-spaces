import styled from '@emotion/styled';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { branch, renderComponent } from 'recompose';
import { font16A6 } from '../uiFonts';

const TextInput = styled('input')(({ theme, error }) => ({
    ...font16A6,
    boxSizing:       'border-box',
    width:           '100%',
    border:          `1px solid ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
    lineHeight:      '33px',
    borderRadius:    10,
    color:           _get(theme, 'colors.form.text', '#3E3564'),
    padding:         '1px 10px',
    outline:         'none',
    '::placeholder': {
        color: '#C4C0D4',
    },
    '&:focus':       {
        borderColor: _get(theme, 'colors.form.outline', '#c4c4c4'),
    },
    ...(error && {
        borderColor: _get(theme, 'colors.form.error', '#d65757'),
    }),
}));

const TextArea = styled('textarea')(({ theme, error }) => ({
    ...font16A6,
    boxSizing:       'border-box',
    width:           '100%',
    border:          `1px solid ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
    borderRadius:    10,
    color:           _get(theme, 'colors.form.text', '#3E3564'),
    padding:         10,
    minHeight:       90,
    outline:         'none',
    resize:          'vertical',
    '::placeholder': {
        color: '#C4C0D4',
    },
    '&:focus':       {
        borderColor: _get(theme, 'colors.form.outline', '#c4c4c4'),
    },
    ...(error && {
        borderColor: _get(theme, 'colors.form.error', '#d65757'),
    }),
}));

const Input = branch(
    ({ multiLine }) => multiLine, renderComponent(TextArea),
)(TextInput);

Input.propTypes = {
    multiLine: PropTypes.bool,
};

Input.defaultProps = {
    multiLine: false,
};

export default Input;
