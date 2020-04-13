import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { Root, Abs, Heading, Remove, Right } from './modalUtils';

const ModalDialog = ({ children, onClose, onEscape, onOutsideClose, title, variant }) => (
    <Modal>
        <Root onEscape={onEscape} onClose={onOutsideClose} variant={variant}>
            <Right>
                <Abs>
                    <Remove type="button" onClick={onClose} />
                </Abs>
            </Right>
            {title && <Heading>{title}</Heading>}
            {children}
        </Root>
    </Modal>
);

ModalDialog.propTypes = {
    title:          PropTypes.node,
    children:       PropTypes.node.isRequired,
    onClose:        PropTypes.func.isRequired,
    onEscape:       PropTypes.func,
    onOutsideClose: PropTypes.func,
    variant:        PropTypes.oneOf(['default', 'big']),
};

ModalDialog.defaultProps = {
    title:          null,
    onEscape:       () => null,
    onOutsideClose: () => null,
    variant:        'default',
};

export default ModalDialog;
