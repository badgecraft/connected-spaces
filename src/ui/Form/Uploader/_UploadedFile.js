import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { getContext } from 'recompose';
import { font12A6 } from '../../uiFonts';
import fileIcon from './file.svg';
import close from './close.svg';
import Link, { toLink } from '../../Link';

const Root = styled('div')({
    backgroundColor: '#F3F4F5',
    borderRadius:    5,
    width:           100,
    height:          87,
    marginRight:     8,
    marginBottom:    32,
    flexShrink:      0,
});

const Inner = styled(Link)({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    width:          '100%',
    height:         '100%',
    background:     `transparent url("${fileIcon}") center center/39px 51px no-repeat`,
});

const Text = styled('div')({
    ...font12A6,
    color:     '#ffffff',
    textAlign: 'center',
    padding:   8,
});

const Anchor = styled('div')({
    position: 'absolute',
});

const Remove = styled('button')({
    right:      0,
    position:   'relative',
    width:      16,
    height:     16,
    background: `transparent url("${close}") center center/8px 8px no-repeat`,
    marginTop:  8,
    marginLeft: 76,
    outline:    'none',
    border:     '0 none',
    cursor:     'pointer',
});

const Name = styled('div')({
    ...font12A6,
    marginTop:    8,
    width:        100,
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    paddingLeft:  8,
    paddingRight: 8,
    position:     'relative',
});

const UploadedFile = ({ onRemove, file }) => (
    <Root data-balloon={file.original} data-balloon-pos="down">
        <Anchor>
            <Remove type="button" onClick={onRemove} />
        </Anchor>
        <Inner href={toLink({ baseURL: '', to: `${file.publicPath}?download=1` })} target="_blank">
            <Text>{(_get(file, 'extension') || '').toUpperCase()}</Text>
        </Inner>
        <Anchor>
            <Name title={file.original}>{file.original}</Name>
        </Anchor>
    </Root>
);

UploadedFile.propTypes = {
    onRemove: PropTypes.func.isRequired,
    file:     PropTypes.shape({
        extension:  PropTypes.string.isRequired,
        publicPath: PropTypes.string.isRequired,
        original:   PropTypes.string.isRequired,
    }).isRequired,
};

export default getContext({ baseURL: PropTypes.string.isRequired })(UploadedFile);
