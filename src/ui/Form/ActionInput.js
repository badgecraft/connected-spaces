import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import { font16A6, font16A4 } from '../uiFonts';
import add from './add2.svg';

const TextInput = styled('input')(({ theme, error, variant }) => ({
    ...font16A6,
    boxSizing:       'border-box',
    width:           '100%',
    border:          `1px solid ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    // backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
    lineHeight:      '33px',
    borderRadius:    10,
    color:           _get(theme, 'colors.form.text', '#3E3564'),
    padding:         '1px 100px 1px 12px',
    outline:         'none',
    textOverflow:    'ellipsis',
    ...(variant === 'default' && {
        background:  `${_get(theme, 'colors.form.inputBg', '#FCFCFC')} url("${add}") 12px center/12px 12px no-repeat`,
        paddingLeft: 36,
    }),
    '::placeholder': {
        color: '#C4C0D4',
    },
    '&:focus':       {
        borderColor: _get(theme, 'colors.primary'),
    },
    ...(error && {
        borderColor: _get(theme, 'colors.form.error', '#d65757'),
    }),
}));

const Add = styled('button')(({ theme }) => ({
    ...font16A4,
    position:        'relative',
    left:            -100,
    width:           96,
    backgroundColor: _get(theme, 'colors.primary'),
    color:           '#ffffff',
    height:          29,
    borderRadius:    8,
    outline:         'none',
    border:          '0 none',
    top:             -1,
    cursor:          'pointer',
}));

const Root = styled('div')({
    whiteSpace: 'nowrap',
});

class ActionInput extends React.Component {
    render = () => {
        const { onSubmit, submitLabel, disabled, ...props } = this.props;
        return (
            <Root>
                <TextInput
                    ref={ref => {
                        this.ref = ref;
                    }}
                    disabled={disabled}
                    {...props}
                />
                <Add onClick={() => onSubmit({ target: this.ref })} disabled={disabled}>{submitLabel}</Add>
            </Root>
        );
    };
}

ActionInput.propTypes = {
    onSubmit:    PropTypes.func.isRequired,
    submitLabel: PropTypes.node.isRequired,
    disabled:    PropTypes.bool,
    variant:     PropTypes.oneOf(['default', 'clean']),
};

ActionInput.defaultProps = {
    variant:  'default',
    disabled: false,
};

export default ActionInput;
