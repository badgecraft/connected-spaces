import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import FontIcon from '../Icons/FontIcon';
import Bar from '../Goal/GoalProgressBar';
import { font16A6, font12A6 } from '../uiFonts';
import Button from '../Button';
import { Root, FuRoot } from './fileUtils';

const Icon = styled('div')({
    flexGrow:    0,
    flexShrink:  0,
    marginRight: 8,
    paddingTop:  8,
});

const Action = styled('div')({
    flexGrow:   0,
    flexShrink: 0,
    marginLeft: 8,
    fontSize:   12,
    paddingTop: 8,
    color:      '#3E3564',
});

const Details = styled('div')({
    display:       'flex',
    flexDirection: 'column',
    flexGrow:      1,
    overflow:      'hidden',
});

const ProgressBar = styled(Bar)({
    marginTop:    7,
    marginBottom: 6,
    width:        '100%',
});

const Name = styled('div')({
    ...font16A6,
    color:        '#4A4A4A',
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
});

const Status = styled('div')({
    ...font12A6,
    color: '#9B9B9B',
});

const FileUploaderStatus = ({ fileName, fileStatus, fileProgress, onCancelUpload }) => (
    <Root>
        <FuRoot>
            <Icon>
                <FontIcon content="attachment" />
            </Icon>
            <Details>
                <Name>{fileName}</Name>
                <ProgressBar value={fileProgress} autoWidth />
                <Status>{fileStatus}</Status>
            </Details>
            <Action>
                <Button
                    type="button"
                    variant="icon"
                    label={<FontIcon content="close" />}
                    onClick={onCancelUpload}
                />
            </Action>
        </FuRoot>
    </Root>
);

FileUploaderStatus.propTypes = {
    fileName:       PropTypes.string.isRequired,
    fileStatus:     PropTypes.string.isRequired,
    fileProgress:   PropTypes.number.isRequired,
    onCancelUpload: PropTypes.func.isRequired,
};

export default FileUploaderStatus;
