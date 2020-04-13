import _paths from '../../constants/paths';

// eslint-disable-next-line import/prefer-default-export
export const Colors = {
    mainBackground:     '#f9f9f9',
    darkGrayText:       '#333333',
    lightGrayText:      '#989898',
    blackText:          '#000000',
    white:              '#ffffff',
    lightGray:          '#C8C8C8',
    disabledBorder:     '#dbdbdb',
    disabledButtonText: '#666666',
    grayBorder:         '#EAEAEA',
    darkGrayBg:         '#FBFBFB',
    darkGrayBorder:     '#BEBEBE',
    grayButton:         '#c0c0c0',
    redButton:          '#f91942',
    error:              '#F3047C',
    yellowButton:       '#ffae00',
    warning:            '#ffae00',
    facebook:           '#3B5998',
    twitter:            '#1DA1F2',
    google:             '#DB4437',
    veryLightGray:      '#F3F3F3',
    selectBorder:       '#DBDBDB',
    greenButton:        '#64BC36',
    midGrayText:        '#888888',
    darkGreen:          '#19B453',
    lightestGray:       '#F6F6F6',
    grayHr:             '#D7D7D7',
    mobileBorder:       '#2a2a2a',

    actionLinkPrimary:   '#f91942',
    actionLinkSecondary: '#ffffff',
    tip:                 '#f91942',
    tipText:             '#ffffff',

    primary:        '#F3047C',
    primaryHover:   '#FD76BA',
    textOnPrimary:  '#ffffff',
    skillPrimary:   '#C4C0D4',
    skillSecondary: '#F0EFF8',
    heading:        '#3E3564', // todo rename to text color?
    eventSecondary: '#A59FC0',
    tagDefaultText: '#484848',
    pageBackground: '#FDFDFD',


    stickyBorder: '#EDEDED',
    stickyText:   '#484848',
    stickyActive: '#F3047C',
    footerText:   '#767676',

    menuBottom:   '#E5E3ED',
    iconText:     '#121212',
    iconDarkText: '#FFFFFF',
    eventBg:      '#EEEEEE',

    modalBg:  '#FFFFFF',
    disabled: '#FAB3D6', // #dbdbdb

    inputBorder: '#EFEFEF',
    inputBg:     '#FCFCFC',

    form: {
        error:       '#d65757',
        inputBorder: '#EFEFEF',
        inputBg:     '#FCFCFC',
    },
};

export const breakpointWidths = {
    mobile:  540,
    tablet:  768,
    desktop: 960,
};

export const breakpoints = {
    mobile:     `@media (min-width: ${breakpointWidths.mobile}px)`,
    mobileMax:  `@media (max-width: ${breakpointWidths.mobile}px)`,
    tablet:     `@media (min-width: ${breakpointWidths.tablet}px)`,
    tabletMax:  `@media (max-width: ${breakpointWidths.tablet}px)`,
    desktop:    `@media (min-width: ${breakpointWidths.desktop}px)`,
    desktopMax: `@media (max-width: ${breakpointWidths.desktop}px)`
};

export const themeBreakpoints = Object
    .keys(breakpointWidths)
    .map((key) => breakpointWidths[key]);
// .slice(1);

export const defaultBreakpoints = {
    phone:   540,
    tablet:  768,
    desktop: 960,
};

export const paths = _paths;
