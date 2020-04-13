import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { font14, font16 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'flex-start',
    margin:         '8px 0',
});


const toWidth = ({ variant }) => {
    if (variant === 'small') {
        return { width: 40, height: 40 };
    }
    return {
        width:  81,
        height: 81,
    };
};

const Pic = styled('div')(({ picture, meta, theme, variant }) => ({
    ...toWidth({ theme, variant }),
    flexShrink:   0,
    background:   `${_get(meta, 'dominantColor', '#666666')} url("${picture}") center center/contain no-repeat`,
    border:       '1px solid #E5E3ED',
    borderRadius: '50%',
}));

const NameRoot = styled('div')({
    paddingLeft: 16,
});

const Name = styled('div')(({ theme }) => ({
    ...font14,
    color:        '#3E3564',
    marginBottom: 2,

    [themedMinWidth('tablet', theme)]: {
        ...font16,
    },
}));

const NameAndPic = ({ entity, variant }) => (
    <Root>
        <Pic variant={variant} picture={entity.picture} meta={entity.pictureMeta} />
        <NameRoot>
            <Name>{entity.name}</Name>
        </NameRoot>
    </Root>
);

NameAndPic.propTypes = {
    entity:  PropTypes.shape({
        name:        PropTypes.string.isRequired,
        picture:     PropTypes.string.isRequired,
        pictureMeta: PropTypes.shape({
            dominantColor: PropTypes.string,
        }),
    }).isRequired,
    variant: PropTypes.oneOf(['default', 'large', 'small']),
};

NameAndPic.defaultProps = {
    variant: 'default',
};

export default NameAndPic
