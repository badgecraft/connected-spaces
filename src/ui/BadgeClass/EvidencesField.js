import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { uploadBlob } from '../Form/Uploader/blobUtils';
import Files from './EvidenceFiles';

const ProgressBox = styled('div')({ width: '100%', marginBottom: 4 });

const ProgressBar = styled('div')({
    width:           '80%',
    margin:          '0 auto',
    backgroundColor: '#A59FC0',
    height:          3,
});

const ProgressValue = styled('div')(({ value, theme }) => ({
    width:           `${Math.max(1, value)}%`,
    backgroundColor: _get(theme, 'colors.primary'),
    height:          '100%',
}));

class EvidencesField extends React.Component {

    constructor(props) {
        super(props);

        this.state = { progress: 0 };
    }

    componentWillUnmount() {
        if (this.uploadXhr) {
            this.uploadXhr.abort();
            this.uploadXhr = null;
        }
    }

    addFile = (file) => {
        const { value = [], onChange } = this.props.input;
        onChange([...value, file]);
    };

    handleChange = ({ target }) => {
        if (target && target.files && target.files.length > 0) {
            const [file] = target.files;
            this.uploadXhr = uploadBlob({
                blob:       file,
                fileName:   file.name,
                bucket:     'evidence',
                onUpload:   (err, uploadedFile) => {
                    if (uploadedFile) {
                        this.addFile({
                            id:         uploadedFile.id,
                            publicPath: uploadedFile.publicPath,
                            extension:  uploadedFile.ext,
                            original:   uploadedFile.original,
                            type:       uploadedFile.type,
                        });
                        this.setState({ progress: 0 })
                    }
                },
                onProgress: progress => this.setState({ progress }),
            });

            if (this.file) {
                this.file.value = '';
            }
        }
    };

    render() {
        const { id, input: { value, onChange } } = this.props;
        const { progress } = this.state;
        const list = (value || []).filter(f => f);
        return (
            <div>
                <Files files={list} onRemove={file => onChange(list.filter(f => f.id !== file.id))} />
                {progress > 0 &&
                <ProgressBox><ProgressBar><ProgressValue value={progress} /></ProgressBar></ProgressBox>}
                <input
                    style={{ display: 'none' }}
                    ref={ref => {
                        this.file = ref
                    }}
                    type="file"
                    id={`evidencesFile_${id}`}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

EvidencesField.propTypes = {
    id:    PropTypes.string.isRequired,
    input: PropTypes.shape({
        value:    PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
        })).isRequired,
        onChange: PropTypes.func.isRequired,
    }).isRequired,
};

export default EvidencesField;
