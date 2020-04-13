import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { font14A5 } from '../uiFonts';
import Card from '../Card/Card';

const Labels = styled('div')({
    marginTop: 12,
});

const Label = styled('div')(({ icon }) => ({
    ...font14A5,
    lineHeight:   '16px',
    color:        '#4A4A4A',
    background:   `transparent url("${icon}") top left/16px 16px no-repeat`,
    paddingLeft:  24,
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 8,
}));

const ProjectCard = ({ link, picture, pictureMeta, name, action, labels }) => (
    <Card
        cover={{ picture, color: _get(pictureMeta, 'dominantColor') }}
        link={link}
        action={action}
        details={<Labels>
            {labels.filter(item => item.text)
                .map(({ text, icon }) => (<Label key={text} icon={icon}>{text}</Label>))}
        </Labels>}
        name={name}
    />
);

ProjectCard.propTypes = {
    link:        PropTypes.shape().isRequired,
    picture:     PropTypes.string.isRequired,
    pictureMeta: PropTypes.shape({
        dominantColor: PropTypes.string.isRequired,
    }),
    name:        PropTypes.string.isRequired,
    action:      PropTypes.node.isRequired,
    labels:      PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
};

ProjectCard.defaultProps = {
    pictureMeta: null,
};

export default ProjectCard;
