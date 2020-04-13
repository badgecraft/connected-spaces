/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { font10, font14A4, font14A1, font16A3 } from '../uiFonts';
import Link from '../Link';
import { themedMinWidth } from '../uiUtils';
import add from './add.svg';
import expander from './expander.svg';

const MOVE = 9;
const MOVE_FROM_TABLET = 16;

const Title = styled('div')(({ theme }) => ({
    display:    'flex',
    alignItems: 'center',
    marginLeft: 13,
    overflow:   'hidden',

    [themedMinWidth('tablet', theme)]: {
        marginLeft: 0,
    },
}));

const box = ({ theme }) => ({
    display:                           'inline-block',
    width:                             28,
    height:                            28,
    textAlign:                         'center',
    borderRadius:                      '50%',
    border:                            '1px solid #E5E3ED',
    position:                          'relative',
    flexShrink:                        0,
    [themedMinWidth('tablet', theme)]: {
        width:  50,
        height: 50,
    },
});

const Logo = styled('span')(box, ({ idx, theme, color, picture }) => ({
    ...(typeof idx !== 'undefined' && {
        left:                              -MOVE * idx,
        zIndex:                            100 - idx,
        [themedMinWidth('tablet', theme)]: {
            left: -MOVE_FROM_TABLET * idx,
        },
    }),
    backgroundColor:    color,
    backgroundImage:    `url("${picture}")`,
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
}));

const Plus = styled('span')(
    ({ theme }) => ({
        ...font10,
        lineHeight:                        '28px',
        [themedMinWidth('tablet', theme)]: {
            ...font14A1,
            lineHeight: '50px',
        },
    }),
    box,
    ({ theme, idx }) => ({
        fontSize:                          7,
        backgroundColor:                   _get(theme, 'colors.primary'),
        color:                             '#ffffff',
        left:                              -MOVE * idx,
        zIndex:                            100 - idx,
        [themedMinWidth('tablet', theme)]: {
            left: -MOVE_FROM_TABLET * idx,
        },
    }),
);

const Name = styled('span')(({ idx, theme }) => ({
    marginLeft:                        16 - (idx * MOVE),
    whiteSpace:                        'nowrap',
    overflow:                          'hidden',
    textOverflow:                      'ellipsis',
    [themedMinWidth('tablet', theme)]: {
        ...font16A3,
        marginLeft: 24 - (idx * MOVE_FROM_TABLET),
    },
}));

const Expander = styled('button')(({ expanded }) => ({
    width:              36,
    height:             41,
    lineHeight:         '41px',
    textAlign:          'center',
    cursor:             'pointer',
    flexShrink:         0,
    backgroundColor:    'transparent',
    backgroundImage:    `url("${expander}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize:     '10px 6px',
    display:            'inline-block',
    border:             '0 none',
    outline:            'none',
    borderRadius:       15,
    transition:         'all 400ms',

    ...(expanded && {
        transform: 'rotate(180deg)',
    }),
}));

const Legend = styled('div')(({ theme }) => ({
    display:                           'flex',
    justifyContent:                    'space-between',
    alignItems:                        'center',
    height:                            41,
    [themedMinWidth('tablet', theme)]: {
        height: 74,
    },
}));

const Expanded = styled('div')(({ expanded, theme }) => ({
    height:                  0,
    padding:                 '0 13px',
    overflow:                'hidden',
    transition:              'all 400ms',
    borderTop:               '1px solid transparent',
    backgroundColor:         '#ffffff',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius:  15,

    ...(expanded && {
        height:      'auto',
        padding:     '6px 13px',
        borderColor: '#E5E3ED',

        [themedMinWidth('tablet', theme)]: {
            borderRadius: 15,
            boxShadow:    '0 2px 4px 0 rgba(0,0,0,0.2)',
        },
    }),
}));

const Root = styled('div')(({ theme }) => ({
    ...font14A4,
    boxShadow:       '0 3px 12px 0 rgba(48,6,114,0.11)',
    borderRadius:    15,
    color:           '#3E3564',
    position:        'relative',
    backgroundColor: '#ffffff',

    [themedMinWidth('tablet', theme)]: {
        boxShadow:       'none',
        backgroundColor: 'transparent',
    },
}));

const Container = styled('div')(({ theme }) => ({
    position:                          'absolute',
    width:                             '90%',
    marginLeft:                        '5%',
    zIndex:                            100,
    [themedMinWidth('tablet', theme)]: {
        width:      400,
        marginLeft: 'initial',
        display:    'inline-block',
    },
}));

const Dummy = styled('div')(({ theme }) => ({
    height:                            41,
    [themedMinWidth('tablet', theme)]: {
        height:  74,
        display: 'inline-block',
        width:   '100%',
    },
}));

const ItemLogo = styled('span')(({ theme, color, picture }) => ({
    display:                           'inline-block',
    width:                             28,
    height:                            28,
    borderRadius:                      '50%',
    border:                            '1px solid #E5E3ED',
    flexShrink:                        0,
    marginRight:                       10,
    backgroundColor:                   color,
    backgroundImage:                   `url("${picture}")`,
    backgroundPosition:                'center center',
    backgroundSize:                    'contain',
    [themedMinWidth('tablet', theme)]: {
        width:  30,
        height: 30,
    },
}));

const OrgName = styled('span')({
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
});

const Item = styled(Link)(({ noBorder }) => ({
    ...font14A4,
    height:     41,
    lineHeight: '41px',
    display:    'flex',
    alignItems: 'center',
    ...(!noBorder && {
        borderBottom: '1px solid #E5E3ED',
    }),
}));

const Add = styled('span')(({ theme }) => ({
    width:                             28,
    height:                            28,
    backgroundImage:                   `url("${add}")`,
    backgroundSize:                    'contain',
    backgroundPosition:                'center center',
    marginRight:                       10,
    [themedMinWidth('tablet', theme)]: {
        width:  30,
        height: 30,
    },
}));

const Load = styled('div')({
    textAlign:  'right',
    height:     41,
    lineHeight: '41px',
});

const OrganisationSwitcher = (props) => {
    const {
        snapList,
        totalAfterSnap,
        organisations,
        organisationPath,
        personalPath,
        openOrganisation,
        openPersonal,
        createOrganisationPath,
        hasNext,
        loadNext,
        loading,
        expanded,
        setExpanded,
        total,
        createOrganisationAllowed,
    } = props;
    return (
        <Dummy>
            <Container>
                <Root>
                    <Legend>
                        <Title>
                            {snapList.map((org, idx) => (
                                <Logo
                                    key={`${org.type}/${org.id}`}
                                    idx={idx}
                                    color={_get(org, 'pictureMeta.dominantColor')}
                                    picture={org.picture}
                                    title={org.name}
                                />
                            ))}
                            {totalAfterSnap > 0 && <Plus idx={snapList.length}>+{totalAfterSnap}</Plus>}
                            <Name idx={totalAfterSnap > 0 ? snapList.length + 1 : snapList.length}>
                                {_get(snapList, [0, 'name'])}
                            </Name>
                        </Title>
                        <Expander expanded={expanded} type="button" onClick={() => setExpanded(!expanded)} />
                    </Legend>
                    <Expanded expanded={expanded}>
                        {organisations.map(item => (
                            <Item
                                key={`${item.type}/${item.id}`}
                                to={item.type === 'user' ? personalPath : organisationPath}
                                params={item}
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (item.type === 'user') {
                                        openPersonal();
                                    } else {
                                        openOrganisation({ to: organisationPath, params: item });
                                    }
                                    setExpanded(false);
                                }}
                            >
                                <ItemLogo
                                    color={_get(item, 'pictureMeta.dominantColor')}
                                    picture={item.picture}
                                /> <OrgName title={item.name}>{item.name}</OrgName>
                            </Item>
                        ))}
                        {hasNext && !loading && (
                            <Load>
                                <a
                                    href="#"
                                    onClick={evt => {
                                        evt.preventDefault();
                                        loadNext();
                                    }}
                                >{t`Load more...`}</a>
                            </Load>
                        )}
                        {createOrganisationAllowed && <Item to={createOrganisationPath} noBorder><Add />
                            {total > 0 ? t`Add organisation` : t`Become an organiser`}
                        </Item>}
                    </Expanded>
                </Root>
            </Container>
        </Dummy>
    );
};

OrganisationSwitcher.propTypes = {
    snapList:                  PropTypes.arrayOf(PropTypes.shape({
        id:          PropTypes.string.isRequired,
        name:        PropTypes.string.isRequired,
        picture:     PropTypes.string.isRequired,
        pictureMeta: PropTypes.shape({
            dominantColor: PropTypes.string.isRequired,
        }),
    })).isRequired,
    organisations:             PropTypes.arrayOf(PropTypes.shape({
        id:          PropTypes.string.isRequired,
        name:        PropTypes.string.isRequired,
        picture:     PropTypes.string.isRequired,
        pictureMeta: PropTypes.shape({
            dominantColor: PropTypes.string.isRequired,
        }),
        type:        PropTypes.string,
    })).isRequired,
    createOrganisationPath:    PropTypes.string.isRequired,
    totalAfterSnap:            PropTypes.number.isRequired,
    total:                     PropTypes.number.isRequired,
    openOrganisation:          PropTypes.func.isRequired,
    openPersonal:              PropTypes.func.isRequired,
    organisationPath:          PropTypes.string.isRequired,
    personalPath:              PropTypes.string.isRequired,
    hasNext:                   PropTypes.bool.isRequired,
    loadNext:                  PropTypes.func.isRequired,
    loading:                   PropTypes.bool.isRequired,
    expanded:                  PropTypes.bool.isRequired,
    setExpanded:               PropTypes.func.isRequired,
    createOrganisationAllowed: PropTypes.bool.isRequired,
};

export default OrganisationSwitcher;
