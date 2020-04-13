import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import checked from './checked.svg';
import { font12A4 } from '../uiFonts';

const Label = styled('label')({
    ...font12A4,
    lineHeight:  '23px',
    color:       '#3E3564',
    cursor:      'pointer',
    flexGrow:    1,
    paddingLeft: 8, paddingRight: 8,
});

// todo better disabled state
const Check = styled('label')(({ disabled }) => ({
    width:        15,
    height:       15,
    borderRadius: 3,
    border:       '1px solid #3E3564',
    display:      'inline-block',
    textAlign:    'center',
    paddingTop:   2,
    cursor:       'pointer',
    transition:   'border 200ms',
    ...(disabled && {
        opacity: 0.2,
        cursor:  'not-allowed',
    }),
}));

const Input = styled('input')({ display: 'none' });

const Container = styled('div')(({ theme }) => ({
    display:                         'flex',
    alignItems:                      'center',
    [`${Input}:checked + ${Check}`]: {
        background:      `transparent url("${checked}") center center/7px 5px no-repeat`,
        // eslint-disable-next-line max-len
        backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2212px%22%20height%3D%228px%22%20viewBox%3D%220%200%2012%208%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cg%20id%3D%22Desktop%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20id%3D%22List-Page-Mobile-Add%22%20transform%3D%22translate(-75.000000%2C%20-62.000000)%22%20fill%3D%22${encodeURIComponent(_get(theme, 'colors.primary', '#000000'))}%22%3E%3Cg%20id%3D%22success%22%20transform%3D%22translate(75.000000%2C%2062.000000)%22%3E%3Cpath%20d%3D%22M10.9400486%2C0.16698428%20L3.91417408%2C6.62254466%20L1.0601066%2C4.00000892%20C0.817610226%2C3.7771968%200.424368661%2C3.7771968%200.181872283%2C4.00000892%20C-0.0606240944%2C4.22282104%20-0.0606240944%2C4.58414184%200.181872283%2C4.80695397%20L3.47513455%2C7.83289091%20C3.71763093%2C8.05570303%204.11087249%2C8.05570303%204.35336887%2C7.83289091%20L11.8181277%2C0.973929327%20C12.0606241%2C0.751117207%2012.0606241%2C0.389939045%2011.8181277%2C0.167126925%20C11.5756313%2C-0.0556851951%2011.1827003%2C-0.0556851951%2010.9400486%2C0.16698428%20Z%22%20id%3D%22Path%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')`,
        borderColor:     _get(theme, 'colors.primary'),
    },
}));

const CheckBox = ({ label, variant, name, disabled, onChange, defaultChecked, ...props }) => (
    <Container {...props} disabled={disabled}>
        {variant === 'left' && <Label htmlFor={name}>{label}</Label>}
        <Input
            id={`${name}${disabled ? '_disabled' : ''}`}
            name={name}
            type="checkbox"
            onChange={evt => onChange(evt.target.checked)}
            disabled={disabled}
            defaultChecked={defaultChecked}
            {..._pick(props, 'checked')}
        />
        <Check htmlFor={name} />
        {variant === 'right' && <Label htmlFor={name}>{label}</Label>}
    </Container>
);

CheckBox.propTypes = {
    name:           PropTypes.string.isRequired,
    label:          PropTypes.node,
    variant:        PropTypes.oneOf(['left', 'right']),
    onChange:       PropTypes.func,
    disabled:       PropTypes.bool,
    defaultChecked: PropTypes.bool,
};

CheckBox.defaultProps = {
    variant:        'right',
    onChange:       () => null,
    label:          null,
    disabled:       false,
    defaultChecked: false,
};

export default CheckBox;
