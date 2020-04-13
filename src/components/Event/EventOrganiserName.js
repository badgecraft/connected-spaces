import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { branch, renderNothing } from 'recompose';
import compose from 'lodash/fp/compose';
import prop from 'lodash/fp/prop';
import _get from 'lodash/get';
import { breakpoints, Colors, paths } from '../Constants';
import Icon, { icons } from '../Icon/_Icon';
import { viewProps, not } from '../UI/_utils';
import Link from '../Link';
import { font12A4, font16A5 } from '../../ui/uiFonts';

const organizerStyle = {
    marginBottom: 14,
    color:        Colors.heading,
    ...font12A4,
    whiteSpace:   'nowrap',
    textOverflow: 'ellipsis',
    overflow:     'hidden',

    [`${Icon}`]: {
        marginTop:   -4,
        marginRight: 7,
    },

    [breakpoints.mobile]: {
        ...font16A5,
        marginBottom: 5,
    },
};

const Organizer = styled('div')(organizerStyle);

const OrganizerLink = styled(Link)(organizerStyle);

const EventOrganiserName = ({ id, name, perms, ...props }) => {
    if (_get(perms, 'view.value') === 1) {
        return (
            <OrganizerLink {...viewProps(props)} to={paths.spaceView} params={{ id }}>
                <Icon size={16} image={icons.organizer} /> {name}
            </OrganizerLink>
        )
    }
    return (
        <Organizer {...viewProps(props)}>
            <Icon size={16} image={icons.organizer} /> {name}
        </Organizer>
    );
};

EventOrganiserName.propTypes = {
    id:    PropTypes.string.isRequired,
    name:  PropTypes.string.isRequired,
    perms: PropTypes.shape({
        view: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
    }).isRequired,
};

export default branch(compose(not, prop('id')), renderNothing)(EventOrganiserName);
