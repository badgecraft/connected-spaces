/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { Field } from 'redux-form';
import add from './add.svg';
import remove from './remove.svg';
import Input from './InputField';
import UrlOrFile from './UrlOrFileUpload';

const Root = styled('div')({});

const Add = styled('button')({
    outline:    'none',
    border:     '0 none',
    background: `transparent url("${add}") center center/contain no-repeat`,
    width:      34,
    height:     34,
    cursor:     'pointer',
    flexShrink: 0,
});

const Remove = styled('button')({
    marginTop:  24,
    marginLeft: 12,
    outline:    'none',
    border:     '0 none',
    background: `transparent url("${remove}") center center/contain no-repeat`,
    width:      18,
    height:     18,
    cursor:     'pointer',
    flexShrink: 0,
});

const Item = styled('div')({
    display:        'flex',
    alignItems:     'flex-start',
    borderBottom:   '1px solid #E5E3ED',
    marginBottom:   16,
    '&:last-child': {
        borderBottom: '0 none',
        marginBottom: 0,
    },
});

const ItemInput = styled('div')({
    flexGrow: 1,
});

const Material = ({ fields, meta, disabled, bucket }) => (
    <Root>
        {fields.map((field, index) => (
            <Item key={index}>
                <ItemInput>
                    <Field
                        placeholder={t`Material URL`}
                        name={`${field}.url`}
                        component={UrlOrFile}
                        disabled={disabled || meta.submitting}
                        bucket={bucket}
                    />
                    <Field
                        name={`${field}.label`}
                        component={Input}
                        placeholder={t`Material label`}
                        disabled={disabled || meta.submitting}
                    />
                </ItemInput>
                <Remove type="button" disabled={disabled} onClick={() => fields.remove(index)} title={t`Remove`} />
            </Item>
        ))}

        <Add type="button" disabled={disabled} onClick={() => fields.push({ label: '', url: '' })} title={t`Add`} />
    </Root>
);

Material.propTypes = {
    fields:   PropTypes.shape({
        push:   PropTypes.func.isRequired,
        map:    PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
    }).isRequired,
    meta:     PropTypes.shape().isRequired,
    disabled: PropTypes.bool,
    bucket:   PropTypes.string.isRequired,
};

Material.defaultProps = {
    disabled: false,
};

export default Material;
