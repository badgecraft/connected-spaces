import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { t } from 'ttag';
import { ItemRoot } from './attachmentUtils';
import { font14A4, font12A4 } from '../uiFonts';

const Controls = styled('div')({
    ...font14A4,
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    width:           '100%',
    height:          '100%',
    flexDirection:   'column',
    backgroundColor: ['#6e6e6d', '#6e6e6d20'],
});

const Svg = styled('svg')({
    position: 'absolute',
    width:    120,
    height:   120,
});

const CircleBack = styled('circle')({
    stroke:        'rgba(0, 0, 0, 0.1)',
    strokeLinecap: 'round',
    transition:    'all 0.3s linear 0ms',
});

const toStroke = (r, value) => 2 * Math.PI * r * value;

const CircleTop = styled('circle')(({ value, r, theme }) => ({
    stroke:          _get(theme, 'colors.primary'),
    strokeLinecap:   'round',
    transition:      'all 0.3s linear 0ms',
    strokeDasharray: `${toStroke(r, value)} ${toStroke(r, 1 - value)}`,
    visibility:      value === 0 ? 'hidden' : 'visible',
}));

const Title = styled('div')({
    ...font12A4,
    color: '#b1b1b1',
});

const toStatusMessage = ({ status, progress }) => {
    switch (status) {
        case 'failed':
            return t`Failed`;
        case 'uploading':
            return t`Uploading...${progress}`;
        case 'processing':
            return t`Processing...`;
        default:
            return null;
    }
};

// todo display errors?
const AttachmentUploadingItem = ({ progress, status }) => (
    <ItemRoot>
        <Controls>
            <Svg viewBox="0 0 42 42">
                <CircleBack cx={21} cy={21} r={20} fill="none" strokeWidth="1" strokeMiterlimit="20" />
                <CircleTop cx={21} cy={21} r={20} fill="none" strokeWidth="1" strokeMiterlimit="20" value={progress} />
            </Svg>
            <Title>{toStatusMessage({ status, progress: `${parseInt(progress * 100, 10)}%` })}</Title>
        </Controls>
    </ItemRoot>
);

AttachmentUploadingItem.propTypes = {
    progress: PropTypes.number.isRequired,
    status:   PropTypes.oneOf(['started', 'failed', 'processing', 'uploaded', 'uploading']).isRequired,
};

export default AttachmentUploadingItem;
