import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _omit from 'lodash/omit';
import _pick from 'lodash/pick';
import { Colors } from '../Constants';
import _Icon, { icons } from '../Icon/_Icon';

const TextInput = styled('input')`
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    border: 1px solid ${({ error }) => error ? Colors.error : Colors.inputBorder};
    background-color: transparent;
    line-height: 36px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #A59FC0;
    padding: 1px 10px;
    outline: none;
    font-size: 16px;
    flex-grow: 1;
    
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #A59FC0;
    }
    ::-moz-placeholder { /* Firefox 19+ */
        color: #A59FC0;
    }
    :-ms-input-placeholder { /* IE 10+ */
        color: #A59FC0;
    }
    :-moz-placeholder { /* Firefox 18- */
        color: #A59FC0;
    }
`;

const Button = styled('button')`
    display: inline-block;
    box-sizing: border-box;
    height: 40px;
    background-color: transparent;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid ${({ error }) => error ? Colors.error : Colors.inputBorder};
    border-left: 0 none;
    line-height: 40px;
    width: 40px;
    text-align: center;
    color: #A59FC0;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
`;

const Root = styled('div')`
    display: flex;
    align-items: center;
`;

const Icon = styled(_Icon)`
    margin-top: 2px;
`;

const Error = styled.div`
    font-size: 12px;
    line-height: 14px;
    color: ${Colors.error};
    min-height: 14px;
    margin-top: 6px;
    text-align: center;
`;

const InputWithButton = ({ meta: { error }, input, ...props }) => (
    <React.Fragment>
        <Root {..._pick(props, 'className')}>
            <TextInput {..._omit(props, 'className')} {...input} />
            <Button type="submit">
                <Icon image={icons.send} size={15} />
            </Button>
        </Root>
        <Error>{error}</Error>
    </React.Fragment>
);

InputWithButton.propTypes = {
    meta:  PropTypes.shape({
        error: PropTypes.string,
    }).isRequired,
    input: PropTypes.shape().isRequired,
};

export default InputWithButton;
