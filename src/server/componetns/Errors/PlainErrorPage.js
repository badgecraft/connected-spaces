import React from 'react';
import PropTypes from 'prop-types';

const PlainErrorPage = ({ error }) => {
    if (__DEV__ && error) {
        return (
            <div>
                <h1>{error.name}</h1>
                <pre>{error.stack}</pre>
            </div>
        );
    }

    return (
        <div>
            <h1>Error</h1>
            <p>Sorry, a critical error occurred on this page.</p>
        </div>
    );
};

PlainErrorPage.propTypes = {
    error: PropTypes.shape({
        name:    PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        stack:   PropTypes.string.isRequired,
    }),
};

PlainErrorPage.defaultProps = {
    error: null,
};

export default PlainErrorPage;
