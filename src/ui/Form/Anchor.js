import React from 'react';
import PropTypes from 'prop-types';

const Anchor = ({ hash, children }) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a name={hash} id={hash}>{children}</a>
);

Anchor.propTypes = {
    hash:     PropTypes.string.isRequired,
    children: PropTypes.node,
};

Anchor.defaultProps = {
    children: null,
};

export default Anchor;
