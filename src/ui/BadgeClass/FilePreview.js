import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import Link from '../Link';
import remove from './remove.svg';
import download from './download.svg';
import { font12, font18 } from '../uiFonts';

const isImage = ({ type }) => /^image\//.test(type);

const Anc = styled('div')({
    position: 'relative',
});

const Control = styled('div')({
    width:          128,
    height:         128,
    position:       'absolute',
    textAlign:      'right',
    visibility:     'hidden',
    display:        'flex',
    alignItems:     'flex-start',
    justifyContent: 'flex-end',
});

const Root = styled('div')({
    width:       128,
    height:      128,
    overflow:    'hidden',
    display:     'inline-block',
    marginRight: 8,

    '&:last-child': {
        marginRight: 0,
    },
    '&:hover':      {
        [`${Control}`]: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            visibility:      'visible',
        },
    },
});

const thumbBg = color => color || '#6e6e6d';

const Thumb = styled('div')(({ picture, color }) => ({
    width:           128,
    height:          128,
    display:         'inline-block',
    backgroundColor: thumbBg(color),
    background:      `${thumbBg(color)}20 url("${picture}?variant=thumb128") center center/contain no-repeat`,
}));

const NonThumb = styled('div')({
    width:           128,
    height:          128,
    display:         ['inline-block', 'flex'],
    alignItems:      'center',
    justifyContent:  'center',
    flexDirection:   'column',
    backgroundColor: ['#6e6e6d', '#6e6e6d20'],
});

const Ext = styled('div')({
    ...font18,
    textAlign:     'center',
    textTransform: 'uppercase',
    whiteSpace:    'nowrap',
});

const Name = styled('div')({
    ...font12,
    textAlign:    'center',
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    marginTop:    8,
});

const Remove = styled('button')({
    border:     '0 none',
    background: `transparent url("${remove}") center center/contain no-repeat`,
    width:      20,
    height:     20,
    margin:     10,
    cursor:     'pointer',
});

const Download = styled(Link)({
    border:     '0 none',
    background: `transparent url("${download}") center center/contain no-repeat`,
    width:      20,
    height:     20,
    margin:     10,
    cursor:     'pointer',
    display:    'inline-block',
});

const FilePreview = ({ file, onRemove }) => (
    <Root title={file.original}>
        <Anc>
            <Control>
                <Download href={`${file.publicPath}?download=1`} title={t`Download`} />
                {onRemove && <Remove type="button" onClick={() => onRemove(file)} title={t`Remove`} />}
            </Control>
        </Anc>
        {isImage(file)
            ? <Thumb picture={file.publicPath} color={file.dominantColor} />
            : <NonThumb>
                <Ext>{file.extension}</Ext>
                <Name>{file.original}</Name>
            </NonThumb>}
    </Root>
);

FilePreview.propTypes = {
    file:     PropTypes.shape({
        original:      PropTypes.string.isRequired,
        type:          PropTypes.string.isRequired,
        publicPath:    PropTypes.string.isRequired,
        extension:     PropTypes.string.isRequired,
        dominantColor: PropTypes.string,
    }).isRequired,
    onRemove: PropTypes.func,
};

FilePreview.defaultProps = {
    onRemove: null,
};

export default FilePreview;
