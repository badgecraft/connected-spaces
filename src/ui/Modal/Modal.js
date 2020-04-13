import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Modal = styled('div')({
    position:        'fixed',
    top:             0,
    left:            0,
    bottom:          0,
    right:           0,
    backgroundColor: 'rgba(128,128,128,0.5)',
    zIndex:          5000,
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
});

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Modal;
