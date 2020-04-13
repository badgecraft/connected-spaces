/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { Field } from 'redux-form';
import Input from './InputField';
import add from './add.svg';
import remove from './remove.svg';

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
    display:    'flex',
    alignItems: 'flex-start',
});

const ItemInput = styled('div')({
    flexGrow: 1,
});

const Videos = ({ fields, meta, disabled }) => (
    <Root>
        {fields.map((field, index) => (
            <Item key={index}>
                <ItemInput>
                    <Field
                        name={`${field}.input`}
                        component={Input}
                        placeholder="https://www.youtube.com/watch?v=...."
                        disabled={disabled || meta.submitting}
                    />
                </ItemInput>
                <Remove type="button" disabled={disabled} onClick={() => fields.remove(index)} title={t`Remove`} />
            </Item>
        ))}

        <Add type="button" disabled={disabled} onClick={() => fields.push({ input: '' })} title={t`Add video`} />
    </Root>
);

Videos.propTypes = {
    fields:   PropTypes.shape({
        push: PropTypes.func.isRequired,
        map:  PropTypes.func.isRequired,
    }).isRequired,
    meta:     PropTypes.shape().isRequired,
    disabled: PropTypes.bool,
};

Videos.defaultProps = {
    disabled: false,
};

export default Videos;
