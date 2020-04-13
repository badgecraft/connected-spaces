import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Field } from 'redux-form';
import { t } from 'ttag';
import Input from './InputField';
import add from './add.svg';
import remove from './remove.svg';

// @deprecated - think about proper coOrganisers

const CoHostContainer = styled.div`
    margin-bottom: 10px;
`;

const Add = styled('button')({
    width:      34,
    height:     34,
    background: `transparent url("${add}") center center/contain no-repeat`,
    outline:    'none',
    border:     '0 none',
    cursor:     'pointer',
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

const CoHosts = ({ fields, meta: { submitting }, newValue, disabled }) => (
    <React.Fragment>
        {fields.map((field, idx) => ( // eslint-disable-next-line react/no-array-index-key
            <CoHostContainer key={idx}>
                <Item>
                    <ItemInput>
                        <Field
                            name={`${field}.name`}
                            component={Input}
                            disabled={submitting || disabled}
                            placeholder={t`Enter name of co-organiser here...`}
                        />
                    </ItemInput>
                    <Remove title={t`Remove`} type="button" onClick={() => fields.remove(idx)} />
                </Item>
            </CoHostContainer>
        ))}
        <Add type="button" onClick={() => fields.push({ ...newValue })} title={t`Add`} />
    </React.Fragment>
);

CoHosts.propTypes = {
    fields:   PropTypes.shape({
        push: PropTypes.func.isRequired,
        map:  PropTypes.func.isRequired,
    }).isRequired,
    meta:     PropTypes.shape({ submitting: PropTypes.bool }).isRequired,
    newValue: PropTypes.shape(),
    disabled: PropTypes.bool,
};

CoHosts.defaultProps = {
    newValue: { name: "" },
    disabled: false,
};

export default CoHosts;
