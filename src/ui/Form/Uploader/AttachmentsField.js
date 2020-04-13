import React from 'react';
import { mapProps } from 'recompose';
import Field from '../FormField';
import UploadAttachments from '../../Attachments/UploadAttachments';

const AttachmentsField = mapProps((props) => {
    const {
        meta:  { error },
        input: { value = [], onChange, ...input },

        label, help, required, ...other
    } = props;
    return {
        children: (<UploadAttachments
            {...input} {...other}
            files={value}
            onUploaded={file => onChange([file, ...value])}
            onRemove={file => onChange(value.filter(item => item.id !== file.id))}
        />),
        error,
        help,
        label,
        required,
    };
})(Field);

AttachmentsField.displayName = 'AttachmentsField';

export default AttachmentsField;
