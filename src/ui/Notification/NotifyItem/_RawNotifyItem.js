import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import { font16A1 } from '../../uiFonts';
import Ago from '../../Ago';
import { Timestamp } from './notifyItemUtils';
import { themedMinWidth } from '../../uiUtils';

const Root = styled('div')(({ marked }) => ({
    display:         'flex',
    alignItems:      'center',
    padding:         '8px 16px',
    borderBottom:    '1px solid #E5E3ED',
    backgroundColor: marked ? '#F6F6F6' : 'transparent',
    width:           '100%',
    '&:last-child':  {
        marginBottom: 0,
        borderBottom: '0 none',
    },
}));

const Pic = styled('div')(({ picture, theme }) => ({
    width:       32,
    height:      32,
    marginRight: 16,
    background:  `transparent url("${picture}") center center/contain no-repeat`,
    flexShrink:  0,

    [themedMinWidth('tablet', theme)]: {
        width:  48,
        height: 48,
    },
}));

const Data = styled('div')({
    display:       'flex',
    alignItems:    'flex-start',
    flexDirection: 'column',
    flexGrow:      1,
});

const Question = styled('div')({
    ...font16A1,
});

const Actions = styled('div')({
    display:     'inline-block',
    marginRight: 8,
});

const ActionBox = styled('div')({
    marginTop: 4,
});

const RawNotifyItem = ({ item, picture, text, actions }, { onVisibilityChange }) => (
    <VisibilitySensor
        onChange={isVisible => onVisibilityChange && onVisibilityChange({
            isVisible,
            id:     item.id,
            viewed: item.viewed,
        })}
    >
        <Root marked={!item.handled}>
            <Pic picture={picture} />
            <Data>
                <Question>{text}</Question>
                <ActionBox>
                    {actions && <Actions>{actions}</Actions>}
                    <Timestamp><Ago ts={item.created} /></Timestamp>
                </ActionBox>
            </Data>

        </Root>
    </VisibilitySensor>
);

RawNotifyItem.propTypes = {
    picture: PropTypes.string.isRequired,
    text:    PropTypes.node.isRequired,
    actions: PropTypes.node,
    item:    PropTypes.shape({
        id:      PropTypes.string.isRequired,
        viewed:  PropTypes.bool.isRequired,
        handled: PropTypes.bool.isRequired,
        status:  PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        perms:   PropTypes.shape({
            handle: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
        }).isRequired,
    }).isRequired,
};

RawNotifyItem.defaultProps = {
    actions: null,
};

RawNotifyItem.contextTypes = {
    onVisibilityChange: PropTypes.func.isRequired,
};

export default RawNotifyItem;
