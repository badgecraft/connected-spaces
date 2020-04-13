import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderComponent } from 'recompose';
import Link from './Link';

const OnlyChildren = ({ children }) => (<React.Fragment key="c">{children}</React.Fragment>);

OnlyChildren.propTypes = {
    children: PropTypes.element.isRequired,
};

const LinkIfAvailable = branch(({ enabled }) => enabled, renderComponent(Link))(OnlyChildren);

LinkIfAvailable.propTypes = {
    enabled: PropTypes.bool.isRequired,
    to:      PropTypes.string.isRequired,
};

export default LinkIfAvailable;
