import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import Field from './FormField';

const Root = styled('div')(({ theme }) => ({
    border:          `1px solid ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
    fontSize:        16,
    fontWeight:      'normal',
    borderRadius:    10,
    boxShadow:       'none',
    height:          66,
    padding:         8,
    display:         'flex',
    alignItems:      'center',
    color:           '#3E3564',
    overflow:        'hidden',
}));

const Icon = styled('div')(({ picture, meta }) => ({
    background:   `${_get(meta, 'dominantColor', '#666666')} url("${picture}") center center/contain no-repeat`,
    borderRadius: '50%',
    display:      'block',
    marginRight:  8,
    height:       40,
    width:        40,
    flexShrink:   0,
}));

const Name = styled('div')({
    whiteSpace:   'nowrap',
    textOverflow: 'ellipsis',
    width:        100,
});

const OrganisationReadOnly = ({ label, picture, pictureMeta, name }) => (
    <Field label={label}>
        <Root>
            <Icon picture={picture} meta={pictureMeta} />
            <Name title={name}>{name}</Name>
        </Root>
    </Field>

);

OrganisationReadOnly.propTypes = {
    label:       PropTypes.string.isRequired,
    picture:     PropTypes.string.isRequired,
    name:        PropTypes.string.isRequired,
    pictureMeta: PropTypes.shape({
        dominantColor: PropTypes.string.isRequired,
    }),
};

OrganisationReadOnly.defaultProps = {
    pictureMeta: null,
};

export default OrganisationReadOnly;
