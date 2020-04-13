import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { font12, font14 } from '../uiFonts';
import fileIcon from './fileIcon.svg';
import FontIcon from '../Icons/FontIcon';
import Button from '../Button';
import { isImage, ItemRoot, ItemControl } from './attachmentUtils';
import { themedMinWidth, isParentNodeOfAnyChildren } from '../uiUtils';

const Anc = styled('div')({
    position: 'relative',
});

const Buttons = styled('div')(({ theme }) => ({
    paddingTop: 6,

    [themedMinWidth('tablet', theme)]: {
        paddingTop: 0,
        'a,button': {
            padding: 0,
        },
    },
}));

const NonThumb = styled('div')(({ marked }) => ({
    width:           128,
    height:          128,
    display:         ['inline-block', 'flex'],
    alignItems:      'center',
    justifyContent:  'center',
    flexDirection:   'column',
    backgroundColor: ['#6e6e6d', `#6e6e6d${marked ? 88 : 20}`],
}));

const Ext = styled('div')({
    ...font14,
    textAlign:     'center',
    textTransform: 'uppercase',
    whiteSpace:    'nowrap',
    overflow:      'hidden',
    textOverflow:  'ellipsis',
    background:    `transparent url("${fileIcon}") center center/auto 64px no-repeat`,
    height:        64,
    lineHeight:    '64px',
    width:         52,
    color:         '#ffffff',
    padding:       '0 4px',
});

const Name = styled('div')({
    ...font12,
    textAlign:    'center',
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    width:        '100%',
    padding:      '0 8px',
    minHeight:    16,
});

const thumbBg = color => color || '#6e6e6d';
const thumbBgC = (color, marked) => `${thumbBg(color)}${marked ? 88 : 20}`;

const Thumb = styled('div')(({ picture, color, marked }) => ({
    width:           128,
    height:          128,
    display:         'inline-block',
    backgroundColor: thumbBg(color),
    background:      `${thumbBgC(color, marked)} url("${picture}?variant=thumb128") center center/contain no-repeat`,
}));

class AttachmentItem extends React.Component {
    handleOnClick = (evt) => {
        const { onClick, file, index } = this.props;
        if (onClick && !isParentNodeOfAnyChildren(evt.target, this.controlRef, 2)) {
            onClick(file, index);
        }
    };

    render = () => {
        const { file, onRemove, marked } = this.props;
        return (<ItemRoot title={file.original} onClick={this.handleOnClick}>
            <Anc>
                <ItemControl ref={(ref) => {
                    this.controlRef = ref;
                }}>
                    <Buttons>
                        <Button
                            type="link"
                            variant="icon"
                            label={<FontIcon content="download" />}
                            to={file.publicPath}
                            query={{ download: 1 }}
                            target="_blank"
                            title={t`Download`}
                        />
                        {onRemove && <Button
                            type="button"
                            variant="icon"
                            label={<FontIcon content="remove" />}
                            onClick={() => onRemove(file)}
                            title={t`Remove`}
                        />}
                    </Buttons>
                </ItemControl>
            </Anc>
            {isImage(file)
                ? (<Thumb picture={file.publicPath} color={file.dominantColor} marked={marked} />)
                : <NonThumb marked={marked}>
                    <Ext>{file.extension}</Ext>
                    <Name>{file.original}</Name>
                </NonThumb>}
        </ItemRoot>)
    };
}

AttachmentItem.propTypes = {
    file:     PropTypes.shape({
        original:      PropTypes.string.isRequired,
        extension:     PropTypes.string.isRequired,
        publicPath:    PropTypes.string.isRequired,
        dominantColor: PropTypes.string,
    }).isRequired,
    onRemove: PropTypes.func,
    onClick:  PropTypes.func,
    index:    PropTypes.number,
    marked:   PropTypes.bool,
};

AttachmentItem.defaultProps = {
    onRemove: null,
    onClick:  null,
    index:    null,
    marked:   false,
};

export default AttachmentItem;
