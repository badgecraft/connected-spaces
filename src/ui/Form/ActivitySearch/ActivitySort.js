import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import Item from './ActivityItem';
import up from './up.svg';
import down from './down.svg';

const button = {
    width:   16,
    height:  16,
    outline: 'none',
    border:  '0 none',
    cursor:  'pointer',
};

const withHidden = ({ hide, disabled }) => ({
    visibility: hide ? 'hidden' : 'visible',
    opacity:    disabled ? 0.2 : 1,
    cursor:     disabled ? 'not-allowed' : 'pointer',
});

const Up = styled('button')({
    ...button,
    background: `transparent url("${up}") center center/8px 5px no-repeat`,
}, withHidden);

const Down = styled('button')({
    ...button,
    background: `transparent url("${down}") center center/8px 5px no-repeat`,
}, withHidden);

const Actions = styled('div')({
    flexShrink:     0,
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'space-between',
    alignSelf:      'stretch',
});

const moveUp = (list, index) => [...list.slice(0, index - 1), list[index], list[index - 1], ...list.slice(index + 1)];
const moveDown = (list, index) => [...list.slice(0, index), list[index + 1], list[index], ...list.slice(index + 2)];

const ActivitySort = ({ value, onChange, disabled }) => {
    const list = value || [];
    return (
        <div>
            {list.map(({ id }, index) => (<Item
                key={id}
                id={id}
                actions={<Actions>
                    <Up
                        type="button"
                        title={t`Move up`}
                        hide={index === 0}
                        onClick={() => onChange(moveUp(list, index))}
                        disabled={disabled}
                    />
                    <Down
                        type="button"
                        title={t`Move down`}
                        hide={index === list.length - 1}
                        onClick={() => onChange(moveDown(list, index))}
                        disabled={disabled}
                    />
                </Actions>}
            />))}
        </div>
    )
};


ActivitySort.propTypes = {
    value:    PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

ActivitySort.defaultProps = {
    disabled: false,
};

export default ActivitySort;
