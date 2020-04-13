import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withProps } from 'recompose';
import Link from '../Link';
import fileIcon from './file.svg';
import { font12A6 } from '../uiFonts';

const Text = styled('div')({
    ...font12A6,
    color:     '#ffffff',
    textAlign: 'center',
    padding:   8,
});

const FileLink = styled(Link)({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    width:          '100%',
    height:         '100%',
    background:     `transparent url("${fileIcon}") center center/39px 51px no-repeat`,
});

const GenericFilePreview = withProps(({ file }) => ({
    children: (<Text>{(file && file.extension || '').toUpperCase()}</Text>)
}))(FileLink);

GenericFilePreview.propTypes = {
    file: PropTypes.shape({ extension: PropTypes.string }).isRequired,
};

export default GenericFilePreview;
