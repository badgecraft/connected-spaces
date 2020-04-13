import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import ContextMenu from '../Menu/ContextMenu';
import { font12A6, font16A5 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import orderIcon from './order.svg';

const Button = styled('button')(({ theme }) => ({
    border:          '0 none',
    cursor:          'pointer',
    backgroundColor: 'transparent',
    outline:         'none',
    ...font12A6,
    color:           '#4A4A4A',

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

const Order = styled('span')({
    width:         11,
    height:        5,
    background:    `transparent url("${orderIcon}") center center/contain no-repeat`,
    display:       'inline-block',
    marginLeft:    4,
    verticalAlign: 'middle',
});

const OrderBy = ({ sort, order, options, onChange }) => {
    const selected = options.find((item) => item.sort === sort && item.order === order);
    return (
        <ContextMenu
            toggler={({ onClick }) => (
                <Button type="button" onClick={onClick}>
                    {selected ? selected.label : t`Change order`}
                    <Order />
                </Button>
            )}
            items={options.map(item => ({
                onClick: () => onChange(item),
                enabled: true,
                label:   item.label,
            }))}
        />
    );
};

OrderBy.propTypes = {
    options:  PropTypes.arrayOf(PropTypes.shape({
        sort:  PropTypes.string.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    sort:     PropTypes.string.isRequired,
    order:    PropTypes.oneOf(['asc', 'desc']).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default OrderBy;
