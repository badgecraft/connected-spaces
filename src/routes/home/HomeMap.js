import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import Map from '../../components/UI/MapWithCard';

const HomeMap = ({ mapMarks, location, zoom, ...props }) => (
    <Layout fullScreen {...props}>
        <Map mapMarks={mapMarks} defaultLocation={location} defaultZoom={zoom} />
    </Layout>
);

HomeMap.propTypes = {
    mapMarks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    location: PropTypes.shape({}).isRequired,
    zoom:     PropTypes.number.isRequired,
};

export default HomeMap;
