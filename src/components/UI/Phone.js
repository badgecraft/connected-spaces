import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import _get from 'lodash/get';
import { icons } from '../Icon/_Icon';
import { Colors, breakpoints } from '../Constants';
import Link from '../Link';

const Container = styled(Box)({
    fontSize:             12,
    lineHeight:           '15px',
    letterSpacing:        '0.12px',
    fontWeight:           'normal',
    color:                Colors.heading,
    backgroundImage:      `url("${icons.phone}")`,
    backgroundRepeat:     'no-repeat',
    backgroundPosition:   'left center',
    paddingLeft:          22,
    [breakpoints.mobile]: {
        fontSize:   16,
        lineHeight: '18px',
    },
});

const getPhone = contacts => _get(
    _find(contacts, ({ name }) => name === 'phone'),
    'value',
    null,
);

const Phone = ({ contacts = [], ...props }) => {
    const phone = getPhone(contacts);
    if (!phone) {
        return null;
    }
    return (
        <Container my={2} {...props}><Link href={`tel:${phone}`}>{phone}</Link></Container>
    );
};

Phone.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
};

export default Phone;
