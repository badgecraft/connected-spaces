import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import m1 from 'marker-clusterer-plus/images/m1.png';
import m2 from 'marker-clusterer-plus/images/m2.png';
import m3 from 'marker-clusterer-plus/images/m3.png';
import m4 from 'marker-clusterer-plus/images/m4.png';
import m5 from 'marker-clusterer-plus/images/m5.png';

const styles = [
    // { featureType: "all", stylers: [{ "color": "#FFFFFF" }] },
    // { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    // { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    // { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    // { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    // { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#E1DFED' }] },
    // { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#FFFFFF' }] },
    // { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
    // { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#F1F0F6' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#D8D8D8' }] },
    // { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
    // { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
    // { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#D5D2E6' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#877CB6' }] },
    { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#877CB6' }] }
];

// bootstrapURLKeys

const GOOGLE_KEY = 'TODO-ADD-YOUR-KEY';

const MapWithAMarkerClusterer = compose(
    withProps({
        // eslint-disable-next-line max-len
        googleMapURL:     `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement:   <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, flexGrow: 1 }} />,
        mapElement:       <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(({ mapMarks = [], defaultLocation, defaultZoom = 16, onToggleCards }) =>
    <React.Fragment key="gm">
        <GoogleMap
            defaultZoom={defaultZoom}
            defaultCenter={defaultLocation}
            defaultOptions={{
                styles,
                mapTypeControl:    false,
                streetViewControl: false,
            }}
        >
            <MarkerClusterer
                onClick={(markerClusterer) => onToggleCards(markerClusterer.getMarkers().map(m => m.id))}
                averageCenter
                enableRetinaIcons
                gridSize={60}
                defaultZoomOnClick={false}
                imagePath="/img/map-cluster/"
                defaultImagePath="/img/map-cluster/"
                styles={[
                    {
                        url:        m1,
                        width:      53,
                        height:     52,
                        fontFamily: 'Roboto',
                        textColor:  '#ffffff',
                    },
                    {
                        url:        m2,
                        width:      56,
                        height:     55,
                        fontFamily: 'Roboto',
                        textColor:  '#ffffff',
                    },
                    {
                        url:        m3,
                        width:      66,
                        height:     65,
                        fontFamily: 'Roboto',
                        textColor:  '#ffffff',
                    },
                    {
                        url:        m4,
                        width:      78,
                        height:     77,
                        fontFamily: 'Roboto',
                        textColor:  '#ffffff',
                    },
                    {
                        url:        m5,
                        width:      90,
                        height:     89,
                        fontFamily: 'Roboto',
                        textColor:  '#ffffff',
                    }
                ]}
            >
                {mapMarks.filter(p => p && p.location).map(p => (
                    <Marker
                        key={p.id}
                        position={p.location}
                        options={{ id: p.id }}
                        onClick={() => onToggleCards([p.id])}
                    />
                ))}
            </MarkerClusterer>
        </GoogleMap>
    </React.Fragment>
);

export default MapWithAMarkerClusterer;
