import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { jt } from 'ttag';
import { font14, font12A4, font8, font16, font16A5, font10A1, font10A2 } from '../../uiFonts';
import organisation from './organisation.svg';
import { themedMinWidth } from '../../uiUtils';
import LinkIfAvailable from '../../Link/LinkIfAvailable';

// todo maybe activity should also be included in results?
// todo actual state
// todo organisation name
// todo extract actions, so that the same element would be used in setup-order

const Root = styled('div')({
    display:        'flex',
    alignItems:     'center',
    flexDirection:  'row',
    borderBottom:   '1px solid #E5E3ED',
    padding:        '12px 0',
    '&:last-child': {
        borderBottom: '0 none',
    },
});

const Pic = styled('div')(({ color, picture }) => ({
    width:       75,
    height:      40,
    flexShrink:  0,
    marginRight: 14,
    background:  `${color} url("${picture}?variant=cover300") center center/contain`,
}));

const Naming = styled('div')({
    flexGrow: 1,
});

const Name = styled('div')(({ theme }) => ({
    ...font14,

    [themedMinWidth('tablet', theme)]: {
        ...font16,
    },
}));

const Organisation = styled('span')(({ theme }) => ({
    background: `transparent url("${organisation}") left center/16px 13px no-repeat`,
    padding:    '6px 0 5px 21px',
    ...font12A4,

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

const State = styled('span')({
    ...font8,
    backgroundColor: '#3E3564',
    borderRadius:    3,
    display:         'inline-block',
    verticalAlign:   'middle',
    color:           '#ffffff',
    padding:         '4px 5px 3px 6px',
    textTransform:   'uppercase',
});

const Site = styled('span')({
    ...font10A1,
    color:   '#3E3564',
    padding: '4px 5px 3px 6px',
    display: 'inline-block',
});

const SiteTitle = styled('span')({
    ...font10A2,
    color: '#3E3564',
});

const ActivityItemView = ({ item, actions, createLink }) => {
    const title = _get(item, 'site.title', null);
    const siteTitle = title && (<SiteTitle key="s">{title}</SiteTitle>);
    const linkEnabled = typeof createLink === 'function';
    const link = linkEnabled ? createLink(item) : {};
    return (
        <LinkIfAvailable enabled={linkEnabled} {...link}>
            <Root>
                <Pic picture={item.coverPicture} color={_get(item, 'coverMeta.dominantColor', '#666666')} />
                <Naming>
                    <Name>{item.name}</Name>
                    <Organisation>{_get(item, 'organisation.name')}</Organisation>
                    <div>
                        <State>{item.status}</State>
                        {siteTitle && <Site>{jt`Created on ${siteTitle}`}</Site>}
                    </div>
                </Naming>
                {actions}
            </Root>
        </LinkIfAvailable>
    );
};

ActivityItemView.propTypes = {
    item:       PropTypes.shape({
        name:         PropTypes.string.isRequired,
        coverPicture: PropTypes.string.isRequired,
        coverMeta:    PropTypes.shape({
            dominantColor: PropTypes.string.isRequired,
        }),
        status:       PropTypes.oneOf(['draft', 'published']).isRequired,
        site:         PropTypes.shape({
            id:    PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
        organisation: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    actions:    PropTypes.node,
    createLink: PropTypes.func,
};

ActivityItemView.defaultProps = {
    actions:    null,
    createLink: null,
};

export default ActivityItemView;
