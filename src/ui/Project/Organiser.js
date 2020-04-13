import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { branch, renderNothing } from 'recompose';
import _get from 'lodash/get';
import { font14, font16 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'flex-start',
    margin:         '8px 0',
});

const Pic = styled('div')(({ picture, meta, theme }) => ({
    width:        60,
    height:       60,
    flexShrink:   0,
    background:   `${_get(meta, 'dominantColor', '#666666')} url("${picture}") center center/contain no-repeat`,
    border:       '1px solid #E5E3ED',
    borderRadius: '50%',

    [themedMinWidth('tablet', theme)]: {
        width:  66,
        height: 66,
    },
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

// <Role>{role === 'main' ? t`Main organiser` : t`Co-organiser`}</Role>
// const Role = styled('div')(({ theme }) => ({
//     ...font12A4,
//     color: '#3E3564',
//
//     [themedMinWidth('tablet', theme)]: {
//         ...font16A5,
//     },
// }));

const ProjectOrganiser = ({ organiser: { name, picture, pictureMeta } }) => (
    <Root>
        <Pic picture={picture} meta={pictureMeta} />
        <NameRoot>
            <Name>{name}</Name>
        </NameRoot>
    </Root>
);

ProjectOrganiser.propTypes = {
    organiser: PropTypes.shape({
        name:        PropTypes.string.isRequired,
        picture:     PropTypes.string.isRequired,
        pictureMeta: PropTypes.shape({
            dominantColor: PropTypes.string.isRequired,
        }),
    }).isRequired,
    // role:      PropTypes.oneOf(['main', 'coOrganiser']).isRequired,
};

export default branch(({ organiser }) => !organiser, renderNothing)(ProjectOrganiser);
