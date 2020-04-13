import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { font14A5, font16 } from '../uiFonts';
import MaybeLink from '../Link/MaybeLink';

const Root = styled('div')({
    display:         ['inline-block', 'flex'],
    width:           300,
    boxShadow:       '0 14px 14px 0 rgba(0,0,0,0.07)',
    backgroundColor: '#ffffff',
    color:           '#3E3564',
    textAlign:       'left',
    flexDirection:   'column',
});

const Pic = styled(MaybeLink)(({ picture, color, css }) => ({
    display:         'inline-block',
    height:          157,
    width:           '100%',
    background:      `${color || 'transparent'} none top center/100% auto no-repeat`,
    backgroundImage: `url("${picture}?variant=cover300")`,
    backgroundSize:  ['100% auto', 'cover'],
    ...css,
}));

const Cover = styled('div')(({ cover }) => {
    const c = cover.color || '#000000';
    return {
        display:        ['inline-block', 'flex'],
        flexDirection:  'column',
        alignItems:     'stretch',
        justifyContent: 'space-between',
        height:         '100%',
        width:          '100%',
        ...(cover.fade && {
            background: `linear-gradient(0deg, ${c}00 0%,${c}FF 95%)`,
        }),
    };
});

const Details = styled('div')({
    ...font14A5,
    padding:        '8px 12px 12px 12px',
    minHeight:      175,
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'space-between',
    overflow:       'hidden',
});

const Top = styled('div')({
    flexGrow:      1,
    display:       'flex',
    flexDirection: 'column',
});

const Name = styled(MaybeLink)({
    ...font16,
    display:    'inline-block',
    color:      '#3E3564',
    flexShrink: 0,
    lineHeight: '23px',
    margin:     '8px 0',
});

const Additional = styled('div')({
    flexGrow: 1,
    display:  'flex',
});

const Bottom = styled('div')({
    textAlign: 'center',
});

const Card = ({ link, action, name, details, cover = {}, coverTop, coverBottom, beforeName, detailsTop, ...props }) => (
    <Root {...props}>
        <Pic {...link} {...cover}>
            <Cover cover={cover}>
                <div>{coverTop}</div>
                <div>{coverBottom}</div>
            </Cover>
        </Pic>
        <Details>
            {detailsTop}
            <Top>
                <div>
                    {beforeName}{beforeName ? ' ' : null}<Name {...link}>{name}</Name>
                </div>
                <Additional>{details}</Additional>
            </Top>
            <Bottom>{action}</Bottom>
        </Details>
    </Root>
);

Card.propTypes = {
    action:      PropTypes.node.isRequired,
    name:        PropTypes.node.isRequired,
    beforeName:  PropTypes.node,
    details:     PropTypes.node.isRequired,
    cover:       PropTypes.shape({
        picture: PropTypes.string,
        color:   PropTypes.string.isRequired,
        fade:    PropTypes.bool,
    }).isRequired,
    link:        PropTypes.shape({
        to:      PropTypes.string,
        params:  PropTypes.shape(),
        onClick: PropTypes.func,
    }),
    coverTop:    PropTypes.node,
    coverBottom: PropTypes.node,
    detailsTop:  PropTypes.node,
};

Card.defaultProps = {
    beforeName:  null,
    link:        null,
    coverTop:    null,
    coverBottom: null,
    detailsTop:  null,
};

export default Card;
