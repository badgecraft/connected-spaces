import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withStateHandlers } from 'recompose';
import Map from './Map';
import ActivityCardPickerG from '../../ui/Card/ActivityCardPickerG';

const CardWrapper = styled('div')({
    position:       'absolute',
    top:            0,
    bottom:         0,
    left:           0,
    right:          0,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    zIndex:         100,
});

const MapWithCard = ({ isOpen, openProjects, onToggleCards, defaultLocation, ...props }) => (
    <React.Fragment key="mwc">
        {isOpen && <CardWrapper onClick={() => onToggleCards()}>
            <ActivityCardPickerG projects={openProjects} />
        </CardWrapper>}
        {defaultLocation && <Map onToggleCards={onToggleCards} defaultLocation={defaultLocation} {...props} />}
    </React.Fragment>
);

MapWithCard.propTypes = {
    isOpen:          PropTypes.bool.isRequired,
    openProjects:    PropTypes.arrayOf(PropTypes.string).isRequired,
    onToggleCards:   PropTypes.func.isRequired,
    defaultLocation: PropTypes.shape(),
};

MapWithCard.defaultProps = {
    defaultLocation: null,
};

export default withStateHandlers(
    () => ({ isOpen: false, openProjects: [] }),
    { onToggleCards: ({ isOpen }) => (openProjects = []) => ({ isOpen: !isOpen, openProjects }) },
)(MapWithCard);

