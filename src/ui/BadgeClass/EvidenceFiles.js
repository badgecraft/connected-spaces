import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderNothing } from 'recompose';
import styled from '@emotion/styled';
import { t } from 'ttag';
import Preview from './FilePreview';
import Markdown from '../Markdown';
import { font12 } from '../uiFonts';
import Feedback from './FeedbackList';

const Previews = styled('div')({
    height:     150,
    whiteSpace: 'nowrap',
    overflowX:  'scroll',
    margin:     '0  -16px',
    padding:    '0 16px',
});

const Comment = styled('div')(({ hasFiles }) => ({
    marginTop:   hasFiles ? -16 : 0,
    borderLeft:  '1px solid #E5E3ED',
    paddingLeft: 8,
}));

const Root = styled('div')({});

const Title = styled('h3')({
    ...font12,
    color: '#A59FC0',
});

const EvidenceFiles = ({ files, onRemove, comment, task }) => (
    <Root>
        <Title>{t`Evidence`}</Title>
        {files.length > 0 && <Previews>
            {files.map(file => (<Preview file={file} key={file.id} onRemove={onRemove} />))}
        </Previews>}
        {comment && <Comment hasFiles={files.length > 0}>
            <Markdown source={comment} />
        </Comment>}

        {task && <Feedback task={task} />}
    </Root>
);

EvidenceFiles.propTypes = {
    files:    PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,
    onRemove: PropTypes.func,
    comment:  PropTypes.string,
    task:     PropTypes.shape(),
};

EvidenceFiles.defaultProps = {
    onRemove: null,
    comment:  null,
    task:     null,
};

export default branch(
    ({ files, comment }) => !(files && files.length > 0) && !comment,
    renderNothing,
)(EvidenceFiles);
