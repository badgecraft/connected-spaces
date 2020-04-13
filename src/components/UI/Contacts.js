import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import PropTypes from 'prop-types';
import Icon, { icons } from '../Icon/_Icon';
import { breakpoints, Colors } from '../Constants';
import _Link from '../Link';

const Container = styled(Box)({
    fontSize:             12,
    lineHeight:           '15px',
    letterSpacing:        '0.12px',
    fontWeight:           'normal',
    color:                Colors.heading,
    [breakpoints.mobile]: {
        fontSize:   16,
        lineHeight: '18px',
    },
});

const Link = styled(_Link)`
    margin: 0 8px;
    &:first-child {
        margin-left: 0;
    }
    
    &:last-child {
        margin-right: 0;
    }
`;

const toLink = ({ name, value }) => {
    switch (name) {
        case 'phone':
            return (<Link key={name} href={`tel:${value}`}><Icon image={icons.phone} size={16} /></Link>);
        case 'facebook':
            return (
                <Link key={name} href={value} target="_blank"><Icon image={icons.contactFacebook} size={16} /></Link>);
        case 'twitter':
            return (<Link key={name} href={value} target="_blank">
                <Icon image={icons.contactTwitter} size={17} />
            </Link>);
        case 'google':
            return null; // todo what is a google contact?
        case 'email': // todo email logo
        case 'instagram': // todo once done on api
        default:
            return null;
    }
}

// todo website
// todo instagram on api
const Contacts = ({ contacts = [], website, ...props }) => (
    <Container mt={3} mb={3} {...props}>
        {website && <Link href={website} target="_blank">
            <Icon image={icons.website} size={16} />
        </Link>}
        {contacts.map(toLink)}
    </Container>
);

Contacts.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    website:  PropTypes.string,
};

Contacts.defaultProps = {
    website: null,
};

export default Contacts;
