import React from 'react';
import PropTypes from 'prop-types';
import { mapProps } from 'recompose';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import Tag from './Tag';
import { font8 } from '../uiFonts';

const TagType = styled('span')(({ theme }) => ({
    ...font8,
    display:         'inline-block',
    verticalAlign:   'middle',
    backgroundColor: _get(theme, 'colors.primary'),
    marginLeft:      4,
    marginRight:     4,
    padding:         '4px 4px 3px 4px',
    color:           '#ffffff',
    borderRadius:    3,
    marginTop:       -7,
    marginBottom:    -3,
}));

const SkillTagView = mapProps(({ name, type, ...props }) => ({
    ...props,
    label:    name,
    withHash: true,
    prefix:   type === 'esco' ? (<TagType>ESCO</TagType>) : null,
}))(Tag);

SkillTagView.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

SkillTagView.displayName = 'SkillTagView';

export default SkillTagView;
