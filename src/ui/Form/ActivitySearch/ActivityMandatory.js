import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Item from './ActivityItem';
import Checkbox from '../Checkbox';

const Actions = styled('div')({
    flexShrink: 0,
});

const toggle = (list, value, id) => list.map((item) => {
    if (item.id === id) {
        return { ...item, mandatory: !!value };
    }
    return item;
});

const ActivityMandatory = ({ value, onChange, disabled }) => {
    const list = value || [];
    return (<div>
        {list.map(({ id, mandatory }) => (
            <Item
                key={id}
                id={id}
                actions={<Actions>
                    <Checkbox
                        name={id}
                        onChange={checked => onChange(toggle(list, checked, id))}
                        disabled={disabled}
                        defaultChecked={mandatory}
                    />
                </Actions>}
            />
        ))}
    </div>);
};

ActivityMandatory.propTypes = {
    value:    PropTypes.arrayOf(PropTypes.shape({
        id:        PropTypes.string.isRequired,
        mandatory: PropTypes.bool.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

ActivityMandatory.defaultProps = {
    disabled: false,
};

export default ActivityMandatory;
