import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { jt } from 'ttag';
import { getContext } from 'recompose';
import { themedMinWidth } from '../../uiUtils';
import { font14, font16A1 } from '../../uiFonts';
import Link from '../../Link';

const Root = styled(Link)({
    display:         'flex',
    alignItems:      'center',
    padding:         '8px 16px',
    borderBottom:    '1px solid #E5E3ED',
    backgroundColor: 'transparent',
    width:           '100%',
    '&:last-child':  {
        marginBottom: 0,
        borderBottom: '0 none',
    },
});

const Pic = styled('div')(({ picture, theme, marginRight, marginLeft }) => ({
    width:      32,
    height:     32,
    background: `transparent url("${picture}") center center/contain no-repeat`,
    flexShrink: 0,
    marginRight,
    marginLeft,

    [themedMinWidth('tablet', theme)]: {
        width:  48,
        height: 48,
    },
}));

const Data = styled('div')({
    flexGrow: 1,
    ...font16A1,
});

const Strong = styled('strong')({
    ...font14,
});

const EvidenceCheckItem = ({ item, paths }) => {
    const user = (<Strong key="u">{_get(item, 'user.name')}</Strong>);
    const badge = (<Strong key="b">{_get(item, 'badgeClass.name')}</Strong>);
    return (
        <Root to={paths.evidencesToCheck} query={{ id: item.id }}>
            <Pic marginLeft={0} marginRight={16} picture={_get(item, 'user.picture')} />
            <Data>
                {jt`${user} has requested that you verify the evidence to complete task for ${badge}`}
            </Data>
            <Pic marginLeft={16} marginRight={0} picture={_get(item, 'badgeClass.picture')} />
        </Root>
    );
};

EvidenceCheckItem.propTypes = {
    item:  PropTypes.shape({
        id:         PropTypes.string.isRequired,
        user:       PropTypes.shape({
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
        badgeClass: PropTypes.shape({
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
        criterion:  PropTypes.shape({}).isRequired,
    }).isRequired,
    paths: PropTypes.shape({
        evidencesToCheck: PropTypes.string.isRequired,
    }).isRequired,
};

export default getContext({
    paths: PropTypes.shape().isRequired,
})(EvidenceCheckItem);
