import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withProps } from 'recompose';
import List from './List';
import { font14A1, font24 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import Button from '../Button';

const Heading = styled('h1')(({ theme }) => ({
    ...font14A1,
    color:      '#3E3564',
    margin:     '0 16px 16px 16px',
    display:    'flex',
    alignItems: 'center',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
    },
}));

export const DefaultActionButton = withProps({
    variant:    'transparent',
    size:       'smaller',
    underlined: true,
})(Button);

const ListWithHeadingAndAction = ({ renderTitle, renderAction, ...props }) => {
    const { list, loading, total } = props;
    const empty = (loading && list.length === 0) || total === 0;
    const heading = renderTitle({ list, loading, total, empty });

    return (
        <div>
            <Heading hide={!heading}>
                {heading}
                {renderAction({ loading, total, empty })}
            </Heading>
            <List {...props} />
        </div>
    );
};

ListWithHeadingAndAction.propTypes = {
    renderTitle:  PropTypes.func.isRequired,
    renderAction: PropTypes.func.isRequired,
    list:         PropTypes.arrayOf(PropTypes.shape()).isRequired,
    total:        PropTypes.number.isRequired,
    loading:      PropTypes.bool.isRequired,
};

export default ListWithHeadingAndAction;
