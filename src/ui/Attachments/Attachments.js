import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _pick from 'lodash/pick';
import Item from './AttachmentItem';

// todo change all attachments / evidences to use this engine

const Root = styled('div')({});

const Items = styled('div')(({ variant }) => (variant === 'line' ? {
    whiteSpace: 'nowrap',
    overflow:   'scroll',
    maxWidth:   '100%',
} : {
    display:        'flex',
    flexWrap:       'wrap',
    alignItems:     'center',
    justifyContent: 'flex-start',
}));

const Attachments = (props) => {
    const { files, onRemove, renderHeader, renderFooter, renderPreItems, onClick, marked, variant, ...other } = props;
    return (
        <Root {..._pick(other, 'className')}>
            {renderHeader && renderHeader()}
            <Items variant={variant}>
                {renderPreItems && renderPreItems()}
                {(files || []).filter(f => f).map((file, index) => (<Item
                    key={file.id}
                    file={file}
                    onRemove={onRemove}
                    onClick={onClick}
                    index={index}
                    marked={marked !== null && index === marked}
                />))}
            </Items>
            {renderFooter && renderFooter()}
        </Root>
    );
};

Attachments.propTypes = {
    files:          PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,
    renderHeader:   PropTypes.func,
    renderFooter:   PropTypes.func,
    renderPreItems: PropTypes.func,
    onRemove:       PropTypes.func,
    onClick:        PropTypes.func,
    marked:         PropTypes.number,
    variant:        PropTypes.oneOf(['default', 'line']),
};

Attachments.defaultProps = {
    onRemove:       null,
    onClick:        null,
    renderHeader:   null,
    renderFooter:   null,
    renderPreItems: null,
    marked:         null,
    variant:        'default',
};

export default Attachments;
