import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { compose, withState } from 'recompose';
import { t } from 'ttag';
import arrow from './arrow.svg';
import Button from '../../ui/Button';
import { font14A4, font16A3 } from '../../ui/uiFonts';
import Link from '../../ui/Link';
import paths from '../../constants/paths';
import logout from './logout.svg';
import outsidify from '../../ui/Modal/outsidify';

const Root = styled('div')({
    display: 'inline-block',
});

const Arrow = styled('span')(({ open }) => ({
    width:              10,
    height:             10,
    backgroundImage:    `url("${arrow}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
    display:            'inline-block',
    marginLeft:         4,
    marginRight:        4,
    transition:         'transform 0.2s',
    transform:          'rotate(180deg)',
    ...(open && {
        transform: 'rotate(0deg)',
    }),
}));

const Pic = styled('div')(({ picture, theme }) => ({
    width:              50,
    height:             50,
    borderRadius:       '50%',
    backgroundColor:    _get(theme, 'colors.primary'),
    backgroundImage:    `url("${picture}")`,
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
}));

const BigPic = styled('div')(({ picture, theme }) => ({
    width:              65,
    height:             65,
    borderRadius:       '50%',
    backgroundColor:    _get(theme, 'colors.primary'),
    backgroundImage:    `url("${picture}")`,
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
    flexShrink:         0,
    marginRight:        15,
}));

const Open = styled('button')({
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    cursor:          'pointer',
    border:          '0 none',
    backgroundColor: 'transparent',
    outline:         'none',
});

const MenuRoot = styled('div')({
    position: 'absolute',
    right:    16,
    // marginTop: -52,
});

const Menu = styled('div')(({ open }) => ({
    position:        'relative',
    width:           353,
    zIndex:          2000,
    transition:      'height 0.2s',
    overflow:        'hidden',
    backgroundColor: '#fff',
    boxShadow:       '0 2px 4px 0 rgba(0,0,0,0.2)',
    borderRadius:    15,
    height:          0,
    ...(open && { height: 'auto' }),
}));

const MenuContentInner = styled('div')({
    margin: '16px 16px 0 16px',
});

const MenuContent = outsidify()(MenuContentInner);

const User = styled('div')({
    display:       'flex',
    flexDirection: 'row',
    marginBottom:  16,
});

const NameAndDash = styled('div')({
    overflow: 'hidden',
});

const Name = styled('div')({
    ...font16A3,
    color:        '#3E3564',
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    lineHeight:   '39px',
    marginTop:    -4,
});

const Action = styled('div')({
    borderTop: '1px solid #F0EFF8',
    padding:   '14px 0',
    color:     '#3E3564',
    ...font14A4,
});

const LogoutIcon = styled('span')({
    backgroundImage:    `url("${logout}")`,
    backgroundSize:     '12px 12px',
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    width:              30,
    height:             30,
    display:            'inline-block',
    border:             '1px solid #E5E3ED',
    borderRadius:       15,
    verticalAlign:      'middle',
    marginTop:          -4,
    marginRight:        10,
});

const UserProfileDropDown = ({ viewer, open, setOpen }) => (
    <Root>
        <Open className="ignore-react-onclickoutside" type="button" onClick={() => setOpen(!open)}>
            <Pic picture={viewer.picture} />
            <Arrow open={open} />
        </Open>

        <MenuRoot>
            <Menu open={open}>
                <MenuContent onClose={() => setOpen(false)}>
                    <User>
                        <BigPic picture={viewer.picture} />
                        <NameAndDash>
                            <Name title={viewer.displayName}>{viewer.displayName}</Name>
                            <Button
                                type="link"
                                variant="secondary"
                                label={t`Dashboard`}
                                size="smaller"
                                to={paths.dashboard}
                            />
                        </NameAndDash>
                    </User>
                    <Action>
                        <Link to={paths.personalDashboardSettingsNoLog}>{t`Personal settings`}</Link>
                    </Action>
                    <Action>
                        <Link to={paths.logout}><LogoutIcon /> {t`Logout`}</Link>
                    </Action>
                </MenuContent>
            </Menu>
        </MenuRoot>
    </Root>
);

UserProfileDropDown.propTypes = {
    viewer:  PropTypes.shape().isRequired,
    open:    PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default compose(
    withState('open', 'setOpen', false),
)(UserProfileDropDown);

