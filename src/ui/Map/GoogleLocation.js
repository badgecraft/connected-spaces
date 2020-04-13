import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { GoogleMap, Marker } from 'react-google-maps';
import GoogleMapsInit from './GoogleMapsInit';
// import { breakpoints, Colors } from '../../Constants';

const Container = styled('div')({
    width:          '100%',
    height:         '100%',
    display:        'flex',
    margin:         '20px 0px',
    alignItems:     'center',
    justifyContent: 'center',
    minHeight:      400,
});

const Title = styled('div')({
    // color:                Colors.heading,
    fontSize:      12,
    lineHeight:    '16px',
    letterSpacing: '0.12px',
    marginBottom:  10,
    // [breakpoints.mobile]: {
    //     fontSize:   16,
    //     lineHeight: '19px',
    // },
});

const GoogleLocation = ({ className, location, address }) => (
    <React.Fragment>
        {address && <Title>{address}</Title>}
        <Container className={className}>
            <GoogleMapsInit
                Map={() =>
                    <GoogleMap defaultZoom={16} defaultCenter={location}>
                        <Marker position={location} />
                    </GoogleMap>
                }
            />
        </Container>
    </React.Fragment>
);

GoogleLocation.propTypes = {
    className: PropTypes.string,
    location:  PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }),
    address:   PropTypes.string,
};

GoogleLocation.defaultProps = {
    className: "",
    location:  null,
    address:   null,
};

export default GoogleLocation;
