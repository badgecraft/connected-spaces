import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import uploadIcon from './upload.svg';
import { font16A6 } from '../uiFonts';
import { Root, FuRoot } from './fileUtils';

const Label = styled('label')({
    backgroundColor: '#FAFAFA',
    border:          '1px dashed #9B9B9B',
    borderRadius:    15,
    padding:         16,
    textAlign:       'left',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    flexGrow:        1,
    cursor:          'pointer',
});

const Cont = styled('div')({
    display:       'flex',
    alignItems:    'center',
    flexDirection: 'column',
});

const Up = styled('div')({
    width:      51,
    height:     51,
    background: `transparent url("${uploadIcon}") center center/contain no-repeat`,
});

const Text = styled('div')({
    ...font16A6,
    marginTop: 18,
    color:     '#9B9B9B',
});

const Input = styled('input')({
    display: 'none',
});

const FileUploaderWait = ({ onUpload, accept }) => (
    <Root>
        <FuRoot>
            <Label htmlFor="file">
                <Cont>
                    <Up />
                    <Text>{t`Click here to select a file`}</Text>
                </Cont>
            </Label>
            <Input type="file" id="file" name="file" onChange={onUpload} accept={accept} />
        </FuRoot>
    </Root>
);

FileUploaderWait.propTypes = {
    onUpload: PropTypes.func.isRequired,
    accept:   PropTypes.string,
};

FileUploaderWait.defaultProps = {
    accept: '*/*',
};

export default FileUploaderWait;
