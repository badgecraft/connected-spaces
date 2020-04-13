import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { branch, renderNothing } from 'recompose';
import styled from '@emotion/styled';
import Dialog from '../Modal/ModalDialog';

const Root = styled('div')({
    textAlign: 'center',
});

const Pic = styled('div')(({ picture }) => ({
    width:      256,
    height:     256,
    background: `transparent url("${picture}") center center/contain no-repeat`,
    display:    'inline-block',
}));

const Name = styled('h1')({
    margin: '12px 0',
});

const GainedBadgeModal = ({ badge, onClose }) => (
    <Dialog onClose={onClose} onEscape={onClose} title={t`Congrats! You have gained a badge!`}>
        <Root>
            <Name>{badge.name}</Name>
            <Pic picture={badge.picture} />
        </Root>
    </Dialog>
);


GainedBadgeModal.propTypes = {
    badge:   PropTypes.shape({
        name:    PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default branch(({ badge }) => !badge, renderNothing)(GainedBadgeModal);
