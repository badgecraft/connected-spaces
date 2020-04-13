import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { font16A5 } from '../uiFonts';
import search from './search.svg';

const Input = styled('input')({
    ...font16A5,
    height:                        48,
    width:                         '100%',
    padding:                       '0 48px 0 49px',
    border:                        '0 none',
    boxSizing:                     'border-box',
    outline:                       'none',
    background:                    `transparent url("${search}") 18px center/16px 16px no-repeat`,
    borderRadius:                  10,
    color:                         '#484848',
    '::-webkit-input-placeholder': {
        color: '#A59FC0',
    },
    '::-moz-placeholder':          {
        color: '#A59FC0',
    },
    ':-ms-input-placeholder':      {
        color: '#A59FC0',
    },
    ':-moz-placeholder':           {
        color: '#A59FC0',
    },
});

class DelayedSearchInput extends React.Component {
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    handleChange = (evt) => {
        const { onChange, delay = 300 } = this.props;
        const { value } = evt.target;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => onChange(value), delay);
    };

    render = () => {
        const { onChange, ...props } = this.props;
        return (<Input {...props} onChange={this.handleChange} />)
    };
}

DelayedSearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    delay:    PropTypes.number,
};

DelayedSearchInput.defaultProps = {
    delay: 300,
};

export default DelayedSearchInput;
