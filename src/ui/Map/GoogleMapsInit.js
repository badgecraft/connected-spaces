import React from 'react';
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap } from 'react-google-maps';

export default compose(
    withProps({
        googleMapURL:     'https://maps.googleapis.com/maps/api/js?key=AIzaSyD9EfYm4Fx6q2h2pYiFHhuTLi0pUsJTTI4&v=3.exp&libraries=geometry,drawing,places',
        loadingElement:   <div style={{ height: '100%', width: '100%' }} />,
        containerElement: <div style={{ height: '400px', width: '100%' }} />,
        mapElement:       <div style={{ height: '100%', width: '100%' }} />,
    }),
    withScriptjs,
    withGoogleMap,
)(({ Map, ...props }) => <Map {...props} />);
