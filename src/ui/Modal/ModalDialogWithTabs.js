import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Modal from './Modal';
import { Root, Abs, Remove as RemoveUI, Right } from './modalUtils';
import TabsUi from '../Menu/StateTabs';
import { themedMinWidth } from '../uiUtils';

const Remove = styled(RemoveUI)(({ theme }) => ({
    top: -16,

    [themedMinWidth('tablet', theme)]: {
        top: -16,
    },
}));

const Tabs = styled(TabsUi)({
    marginTop: -16,
});

const ModalDialogWithTabs = ({ onClose, onEscape, onOutsideClose, variant, tabItems }) => (
    <Modal>
        <Root onEscape={onEscape} onClose={onOutsideClose} variant={variant}>
            <Right>
                <Abs>
                    <Remove type="button" onClick={onClose} />
                </Abs>
            </Right>
            <Tabs items={tabItems} fullWidth />
        </Root>
    </Modal>
);

ModalDialogWithTabs.propTypes = {
    onClose:        PropTypes.func.isRequired,
    onEscape:       PropTypes.func,
    onOutsideClose: PropTypes.func,
    variant:        PropTypes.oneOf(['default', 'big']),
    tabItems:       PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ModalDialogWithTabs.defaultProps = {
    onEscape:       () => null,
    onOutsideClose: () => null,
    variant:        'default',
};

export default ModalDialogWithTabs;
