import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Uploader from './Uploader/Uploader';
import Input from './InputField';

const Root = styled('div')({
    display:    'flex',
    alignItems: 'flex-start',
});

const InputRoot = styled('div')({
    flexGrow: 1,
});

const UrlOrFileUpload = (props) => {
    const { onChange, name } = props.input;
    return (
        <Root>
            <InputRoot>
                <Input {...props} />
            </InputRoot>
            <Uploader
                name={`${name}_uploader`}
                variant="inline"
                bucket={props.bucket}
                onChange={(publicPath) => onChange(publicPath)}
                accept="*/*"
            />
        </Root>
    );
};

UrlOrFileUpload.propTypes = {
    input:  PropTypes.shape({
        name:     PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    }).isRequired,
    bucket: PropTypes.string.isRequired,
};

export default UrlOrFileUpload;
