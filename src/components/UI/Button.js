import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { compose, branch, renderComponent, mapProps } from 'recompose';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import { breakpoints, Colors } from '../Constants';
import Link from '../Link';
import { fullWidth } from './_utils';
import { font12, font14A1, font18 } from '../../ui/uiFonts';

const skip = (...fields) => props => _omit(props, ...fields);

const variants = {
    primary:   {
        paddingTop: '5px',
    },
    secondary: {
        paddingTop:      '5px',
        borderColor:     Colors.primary,
        backgroundColor: Colors.white,
        color:           Colors.primary,
    },
    more:      {
        backgroundColor: 'transparent',
        borderColor:     Colors.skillPrimary,
        color:           Colors.skillPrimary,
        borderRadius:    '15px',
        ...font12,
        lineHeight:      '14px',
    },
    become:    {
        backgroundColor: Colors.white,
        color:           Colors.primary,
        borderRadius:    '20px',
        paddingTop:      '5px',
        fontWeight:      'bold',
    },
    icon:      {
        backgroundColor: 'transparent',
        borderColor:     'transparent',
        padding:         '7px',
        margin:          0,
    },
    link:      {
        backgroundColor: 'transparent',
        borderColor:     'transparent',
        color:           Colors.heading,
    },
};

const variantsTablet = {
    icon: {
        padding: '10px',
    },
};

const buttonDefaultStyle = ({ variant, theme }) => ({
    // default (mostly primary)
    ...font14A1,
    borderRadius:         '21px',
    border:               `1px solid ${_get(theme, 'colors.primary')}`,
    backgroundColor:      _get(theme, 'colors.primary'),
    color:                '#FFFFFF',
    padding:              '4px 15px',
    margin:               '3px 0',
    outline:              'none',
    display:              'inline-block',
    textAlign:            'center',
    cursor:               'pointer',
    boxSizing:            'border-box',
    ...(variants[variant] || {}),
    [breakpoints.mobile]: {
        ...font18,
        padding: '10px 36px',
        ...(variantsTablet[variant] || {}),
    },
});

const buttonWidth = fullWidth({ width: '100%', display: 'block' });
const IntButton = styled('button')(buttonDefaultStyle, ...buttonWidth);
const IntLabel = styled('label')(buttonDefaultStyle, ...buttonWidth);
const IntLink = styled(mapProps(skip('fullWidth'))(Link))(buttonDefaultStyle, ...buttonWidth);

const Button = compose(
    branch(({ type }) => type === 'link', renderComponent(IntLink)),
    branch(({ type }) => type === 'label', renderComponent(IntLabel)),
)(IntButton);

Button.propTypes = {
    variant:   PropTypes.oneOf(['primary', 'secondary', 'more', 'become', 'icon', 'link']),
    size:      PropTypes.oneOf(['small', 'normal']),
    children:  PropTypes.node.isRequired,
    fullWidth: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.bool), PropTypes.bool]),
    type:      PropTypes.oneOf(['button', 'submit', 'link', 'label']).isRequired,
};

Button.defaultProps = {
    variant:   'primary',
    size:      'normal',
    fullWidth: false,
};

export default Button;
