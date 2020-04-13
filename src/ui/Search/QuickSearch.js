import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import close from './close.svg';
import { font16A5 } from '../uiFonts';
import search from './search.svg';
import { themedMinWidth } from '../uiUtils';

const Input = styled('input')(({ half, theme }) => ({
    ...font16A5,
    width:        '100%',
    padding:      '0 48px 0 49px',
    border:       '0 none',
    boxSizing:    'border-box',
    outline:      'none',
    background:   `transparent url("${search}") 18px center/16px 16px no-repeat`,
    boxShadow:    '0 3px 9px 0 rgba(48,6,114,0.06)',
    borderRadius: 10,
    flexGrow:     1,
    maxWidth:     '100%',
    transition:   'all 300ms',
    height:       40,
    color:        '#484848',
    marginRight:  -10,

    '&:focus':                     {
        boxShadow: '0 3px 9px 0 rgba(48,6,114,0.11)',
    },
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


    [themedMinWidth('tablet', theme)]: {
        maxWidth:  240,
        '&:focus': {
            maxWidth: half ? '50%' : '100%',
        },
    },
}));

const Close = styled('button')(({ visible }) => ({
    width:      10,
    height:     10,
    background: `transparent url("${close}") center center/10px 10px no-repeat`,
    outline:    'none',
    border:     '0 none',
    position:   'relative',
    top:        15,
    left:       -20,
    cursor:     'pointer',
    zIndex:     500,
    opacity:    visible ? '1' : '0',
    transition: 'all 300ms',
}));

class QuickSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    handleChange = (evt) => {
        const { value } = evt.target;
        this.setState({ value });
        const { delay, onChange } = this.props;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => onChange(value), delay);
    };

    handleClean = () => {
        this.setState({ value: '' });
        this.props.onChange('');
    };

    render = () => {
        const { value } = this.state;
        return (
            <React.Fragment key="qs">
                <Input id="q" name="q" autoComplete="off" {...this.props} value={value} onChange={this.handleChange} />
                <Close onClick={this.handleClean} visible={!!value} />
            </React.Fragment>
        )
    };
}

QuickSearch.propTypes = {
    value:    PropTypes.string,
    half:     PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    delay:    PropTypes.number,
};

QuickSearch.defaultProps = {
    half:  false,
    delay: 300,
    value: '',
};

export default QuickSearch;
