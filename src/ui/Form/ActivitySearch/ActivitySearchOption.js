import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { jt } from 'ttag';
import { font12A5, font10A1, font16A4, font12A6, font10A2 } from '../../uiFonts';
import plus from './plus.svg';
import { themedMinWidth } from '../../uiUtils';

const Add = styled('span')(({ theme }) => ({
    display:            'inline-block',
    verticalAlign:      'middle',
    width:              15,
    height:             15,
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
    backgroundRepeat:   'no-repeat',
    backgroundImage:    `url("${plus}")`,

    [themedMinWidth('tablet', theme)]: {
        width:  18,
        height: 18,
    },
}));

const Root = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'flex-start',
    margin:         '0 12px',
    padding:        '12px 0',
    borderBottom:   '1px solid #E5E3ED',
    color:          '#3E3564',
    cursor:         'pointer',
    '&:last-child': {
        borderBottom: '0 none',
    },
});

const Pic = styled('div')(({ picture, color, theme }) => ({
    backgroundColor:    color,
    width:              21,
    height:             21,
    borderRadius:       '50%',
    display:            'inline-block',
    verticalAlign:      'middle',
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
    backgroundRepeat:   'no-repeat',
    backgroundImage:    `url("${picture}")`,
    flexShrink:         0,
    marginRight:        8,

    [themedMinWidth('tablet', theme)]: {
        width:  31,
        height: 31,
    },
}));

const Naming = styled('div')({
    display:       'flex',
    flexDirection: 'column',
    flexGrow:      1,
});

const Name = styled('div')(({ theme }) => ({
    ...font12A5,

    [themedMinWidth('tablet', theme)]: {
        ...font16A4,
    },
}));

const Org = styled('span')(({ theme }) => ({
    ...font10A1,

    [themedMinWidth('tablet', theme)]: {
        ...font12A6,
    },
}));

const Site = styled('span')({
    ...font10A1,
    paddingLeft: 6,
});

const SiteTitle = styled('span')({
    ...font10A2,
});

const ActivitySearchOption = ({ innerProps, data }) => {
    const title = _get(data, 'site.title', null);
    const siteTitle = title && (<SiteTitle key="s">{title}</SiteTitle>);
    return (
        <Root {...innerProps}>
            <Pic picture={data.picture} color={_get(data, 'pictureMeta.dominantColor', '#666666')} />
            <Naming>
                <Name>{data.name}</Name>
                <div>
                    <Org>{_get(data, 'organisation.name', '')}</Org>
                    {siteTitle && <Site>{jt`Created on ${siteTitle}`}</Site>}
                </div>
            </Naming>
            <Add />
        </Root>
    );
};

ActivitySearchOption.propTypes = {
    innerProps: PropTypes.shape().isRequired,
    data:       PropTypes.shape({
        id:           PropTypes.string.isRequired,
        name:         PropTypes.string.isRequired,
        picture:      PropTypes.string.isRequired,
        pictureMeta:  PropTypes.shape({
            dominantColor: PropTypes.string.isRequired,
        }),
        organisation: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default ActivitySearchOption;
