import { mapProps } from 'recompose';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import { minWidthFromProps, themedMinWidth } from '../uiUtils';
import { font14A1, font18, font12A2 } from '../uiFonts';

const variantStyles = {
    default:       ({ theme }) => ({
        backgroundColor: _get(theme, 'colors.primary'),
        borderColor:     _get(theme, 'colors.primary'),
        color:           _get(theme, 'colors.textOnPrimary'),
    }),
    primary:       ({ theme }) => ({
        backgroundColor: _get(theme, 'colors.primary'),
        borderColor:     _get(theme, 'colors.primary'),
        color:           _get(theme, 'colors.textOnPrimary'),
    }),
    secondary:     ({ theme }) => ({
        backgroundColor: _get(theme, 'colors.textOnPrimary'),
        borderColor:     _get(theme, 'colors.primary'),
        color:           _get(theme, 'colors.primary'),
    }),
    transparent:   () => ({
        backgroundColor: 'transparent',
        borderColor:     'transparent',
        color:           '#3E3564', // todo look in theme?
    }),
    importantLink: () => ({
        backgroundColor: 'transparent',
        borderColor:     'transparent',
        color:           '#E85D53', // todo look in theme
    }),
    link:          () => ({
        textDecoration:  'underline',
        backgroundColor: 'transparent',
        borderColor:     'transparent',
        color:           '#3E3564',
    }),
    become:        ({ theme }) => ({
        backgroundColor: '#ffffff',
        color:           _get(theme, 'colors.primary'),
        borderColor:     _get(theme, 'colors.primary'),
    }),
    icon:          ({ color, theme }) => ({
        padding:         0,
        margin:          0,
        backgroundColor: 'transparent',
        borderColor:     'transparent',
        color:           color || 'inherit',

        [minWidthFromProps('tablet', theme)]: {
            padding: 8,
        }
    }),
};

const isFullWidth = (fullWidth, index) => {
    if (fullWidth instanceof Array) {
        return !!fullWidth[index];
    }

    return !!fullWidth;
};

export const buttonStyle = [
    ({ fullWidth, theme }) => ({
        ...font14A1,
        border:                                '1px solid silver',
        backgroundColor:                       'silver',
        borderWidth:                           1,
        borderRadius:                          30,
        width:                                 isFullWidth(fullWidth, 0) ? '100%' : 'auto',
        color:                                 '#ffffff',
        textAlign:                             'center',
        height:                                30,
        lineHeight:                            '14px',
        outline:                               'none',
        cursor:                                'pointer',
        padding:                               '8px 12px',
        transition:                            'all 200ms',
        flexShrink:                            0,
        whiteSpace:                            'nowrap',
        [minWidthFromProps('tablet', theme)]:  {
            ...font18,
            height:     42,
            lineHeight: '18px',
            padding:    '12px 36px',
            width:      isFullWidth(fullWidth, 1) ? '100%' : 'auto',
        },
        [minWidthFromProps('desktop', theme)]: {
            width: isFullWidth(fullWidth, 2) ? '100%' : 'auto',
        },
    }),
    ({ variant, ...props }) => variant && variantStyles[variant] && variantStyles[variant](props),
    ({ variant, color, textColor = '#ffffff' }) => variant === 'customColor' && {
        backgroundColor: color,
        borderColor:     color,
        color:           textColor,
    },
    ({ disabled, theme, variant }) => disabled && {
        ...(variant !== 'icon' && variant !== 'link' && {
            backgroundColor: _get(theme, 'colors.disabled'),
            color:           _get(theme, 'colors.white'),
            borderColor:     _get(theme, 'colors.disabled'),
        }),
        cursor: 'not-allowed',
    },
    ({ size, theme }) => size === 'small' && {
        ...font12A2,
        height:     24,
        lineHeight: '14px',
        padding:    '4px 12px',

        [minWidthFromProps('tablet', theme)]: {
            ...font12A2,
            height:     24,
            lineHeight: '14px',
            padding:    '4px 12px',
        },
    },
    ({ size, theme }) => size === 'smaller' && {
        [minWidthFromProps('tablet', theme)]: {
            ...font14A1,
            height:     30,
            lineHeight: '14px',
            padding:    '7px 12px',
        },
    },
    ({ size }) => size === 'larger' && {
        ...font18,
        height:     42,
        lineHeight: '18px',
        padding:    '12px 36px',
    },
    ({ rightIcon, theme }) => rightIcon && {
        [themedMinWidth('tablet', theme)]: {
            backgroundImage:    `url("${rightIcon}")`,
            backgroundSize:     'auto 18px',
            backgroundPosition: 'right 18px center',
            backgroundRepeat:   'no-repeat',
        },
    },
    ({ type, theme }) => type === 'menuLink' && {
        padding: '8px 12px',

        [themedMinWidth('tablet', theme)]: {
            padding: '12px 18px',
        },

        [themedMinWidth('desktop', theme)]: {
            padding: '12px 24px',
        },
    },
    ({ underlined }) => underlined && {
        textDecoration: 'underline',
    },
];

// skip non-required button props
export const withoutButtonProps = mapProps(props => _omit(props, 'fullWidth'));
