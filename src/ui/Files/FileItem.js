import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { getContext } from 'recompose';
import { font12A6 } from '../uiFonts';
import remove from './remove.svg';
import FilePreview from './FilePreview';
import Link from '../Link';
import download from '../BadgeClass/download.svg';
import { themedMinWidth } from '../uiUtils';

const Actions = styled('div')(({ theme }) => ({
    position:   'absolute',
    width:      28,
    textAlign:  'right',
    right:      0,
    transition: 'all 0.2s',

    [themedMinWidth('desktop', theme)]: {
        visibility: 'hidden',
        opacity:    0,
    },
}));

const Root = styled('div')({
    backgroundColor:  '#F3F4F5',
    borderRadius:     5,
    width:            100,
    height:           87,
    marginRight:      8,
    marginBottom:     24,
    flexShrink:       0,
    '&:last-of-type': {
        marginRight: 0,
    },

    '&:hover': {
        [`${Actions}`]: {
            visibility: 'visible',
            opacity:    1,
        }
    },
});

const Anchor = styled('div')({
    position: 'relative',
});

const Name = styled('div')(({ marked }) => ({
    ...font12A6,
    marginTop:    8,
    width:        100,
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    paddingLeft:  8,
    paddingRight: 8,
    position:     'relative',
    textAlign:    'center',
    ...(marked && { fontWeight: 'bold' }),
}));

const Remove = styled('button')({
    width:         20,
    height:        20,
    background:    `transparent url("${remove}") center center/12px 12px no-repeat`,
    margin:        4,
    outline:       'none',
    border:        '0 none',
    cursor:        'pointer',
    display:       'inline-block',
    verticalAlign: 'middle',
});

const Download = getContext({ baseURL: PropTypes.string.isRequired })(styled(Link)({
    border:        '0 none',
    background:    `transparent url("${download}") center center/contain no-repeat`,
    width:         20,
    height:        20,
    margin:        4,
    cursor:        'pointer',
    display:       'inline-block',
    verticalAlign: 'middle',
}));

const FileItem = ({ item, onRemove, onClick, marked }) => (
    <Root data-balloon={item.original} data-balloon-pos="down">
        <Anchor>
            <Actions>
                {onRemove && <Remove type="button" onClick={onRemove} title={t`Remove file`} />}
                <Download to={item.publicPath} query={{ download: 1 }} variant="href" title={t`Download file`} />
            </Actions>
        </Anchor>
        <FilePreview file={item} {...(onClick && { onClick })} />
        <Anchor><Name marked={marked} title={item.original}>{item.original}</Name></Anchor>
    </Root>
);

FileItem.propTypes = {
    item:     PropTypes.shape({
        original:   PropTypes.string.isRequired,
        publicPath: PropTypes.string.isRequired,
        extension:  PropTypes.string.isRequired,
        type:       PropTypes.string.isRequired,
    }).isRequired,
    onRemove: PropTypes.func,
    onClick:  PropTypes.func,
    marked:   PropTypes.bool,
};

FileItem.defaultProps = {
    onRemove: null,
    onClick:  null,
    marked:   false,
};

export default FileItem;
