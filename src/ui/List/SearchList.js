import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import Spinner from '../Spinner/SimpleSpinner';
import SearchBar from '../Search/QuickSearch';
import List from './List';
import { font14A1, font16, font24, font18A1 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const TitleBox = styled('div')(({ theme }) => ({
    display:       'flex',
    lineHeight:    '48px',
    marginBottom:  12,
    flexDirection: 'column',

    [themedMinWidth('tablet', theme)]: {
        flexDirection: 'row',
        marginBottom:  4,
    }
}));

const ActionBox = styled('div')(({ theme }) => ({
    justifyContent: 'flex-end',
    display:        'flex',
    flexGrow:       1,
    margin:         '0 16px',

    [themedMinWidth('tablet', theme)]: {
        margin: 0,
    },
}));


const Heading = styled('h1')(({ theme }) => ({
    ...font14A1,
    color:      '#3E3564',
    margin:     '0 16px',
    flexShrink: 0,
    lineHeight: '48px',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
        lineHeight: '48px',
        margin:     '0 16px 0px 16px',
    },
}));

const Count = styled('span')({
    marginRight: 4,
    minWidth:    18,
    textAlign:   'right',
    display:     'inline-block',
});

export const Empty = styled('div')(({ theme }) => ({
    textAlign: 'center',
    margin:    '0 16px',
    ...font16,

    [themedMinWidth('tablet', theme)]: {
        ...font18A1,
        margin: '0 16px 0 0',
    },
}));

const SearchList = ({ onSearchChange, children, renderHeader, q, ...props }) => {
    const { total, loading } = props;
    return (
        <React.Fragment key="pulv">
            <TitleBox>
                <Heading>
                    <Count>{loading ? <Spinner /> : total}</Count>
                    {children}
                </Heading>
                <ActionBox>
                    <SearchBar value={q} half onChange={onSearchChange} placeholder={t`Search people`} />
                </ActionBox>
            </TitleBox>
            {renderHeader()}
            <List {...props} />
        </React.Fragment>
    );
};

SearchList.propTypes = {
    q:              PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    children:       PropTypes.node.isRequired,
    loading:        PropTypes.bool.isRequired,
    total:          PropTypes.number.isRequired,
    renderHeader:   PropTypes.func.isRequired,
};

export default SearchList;
