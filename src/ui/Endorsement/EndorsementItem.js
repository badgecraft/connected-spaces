import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import { font14A4, font16, font18A1 } from '../uiFonts';
import Markdown from '../Markdown';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')({
    borderBottom:  '1px solid #E5E3ED',
    marginTop:     8,
    marginBottom:  8,
    paddingBottom: 8,
    width:         '100%',

    '&:last-of-type': {
        borderBottom: '0 none',
    },
});

const Status = styled('div')(({ variant }) => ({
    ...font14A4,
    color:     '#A59FC0',
    textAlign: variant === 'full' ? 'right' : 'left',
}));

const Name = styled('div')({});

const Info = styled('div')(({ theme }) => ({
    ...font16,
    alignItems: 'center',
    display:    'flex',

    [themedMinWidth('tablet', theme)]: {
        ...font18A1,
    },
}));

const Picture = styled('div')(({ picture, marginRight }) => ({
    width:        50,
    height:       50,
    background:   `transparent url("${picture}") center center/contain no-repeat`,
    borderRadius: '50%',
    marginTop:    8,
    marginBottom: 8,
    ...(marginRight ? { marginRight: 16 } : { marginLeft: 16 })
}));

const Details = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
});

const toStatusMessage = ({ status }) => {
    switch (status) {
        case 'endorserRequest':
            return t`Waiting for endorsement to be accepted`;
        case 'endorserRejected':
            return t`Endorsement request rejected`;
        case 'pendingVerify':
            return t`Waiting for endorser organisation verification`;
        case 'signed':
            return t`Signed endorsement`;
        case 'revoked':
            return t`Revoked endorsement`;
        default:
            return null;
    }
};

const toNameOrEmail = ({ requestRecipient }) => {
    if (!requestRecipient) {
        return null;
    }

    const name = _get(requestRecipient, 'user.name') || _get(requestRecipient, 'name');
    const email = _get(requestRecipient, 'user.primaryEmail') || _get(requestRecipient, 'email');

    if (name && !email) {
        return name;
    }

    if (!name && email) {
        return email;
    }

    return email ? `${name} (${email})` : name;
};

const toTypeInfo = (item) => {
    switch (_get(item, 'object.__typename')) {
        case 'BadgeClass':
            return `${t`Badge class endorsement`}: `;
        default:
            return null;
    }
};

const toTypeDetails = (item) => {
    switch (_get(item, 'object.__typename')) {
        case 'BadgeClass':
            return (<Info>
                {_get(item, 'object.name')}
                <Picture
                    picture={_get(item, 'object.picture')}
                    data-balloon={t`Endorsed badge-class`}
                    data-balloon-pos="left"
                />
            </Info>);
        default:
            return null;
    }
};

// todo actions on context menu! e.g. revoke!
const EndorsementItem = ({ item, variant }) => (
    <Root>
        <Status variant={variant}>{toTypeInfo(item)} {toStatusMessage(item)}</Status>
        <Details>
            <div>
                {item.endorser
                    ? (<Info>
                        <Picture
                            picture={_get(item, 'endorser.picture')}
                            data-balloon={t`Endorser`}
                            data-balloon-pos="right"
                            marginRight
                        />
                        {_get(item, 'endorser.name')}
                    </Info>)
                    : <Name>{toNameOrEmail(item)}</Name>}
            </div>
            {variant === 'full' && <div>{toTypeDetails(item)}</div>}
        </Details>
        {item.endorserComment && (<Markdown source={item.endorserComment} />)}
    </Root>
);

EndorsementItem.propTypes = {
    variant: PropTypes.oneOf(['default', 'full']),
    item:    PropTypes.shape({
        status:           PropTypes.oneOf(['endorserRequest', 'endorserRejected', 'pendingVerify', 'signed',
            'revoked']).isRequired,
        requestMessage:   PropTypes.string.isRequired,
        requestRecipient: PropTypes.shape({
            name:  PropTypes.string,
            email: PropTypes.string,
            user:  PropTypes.shape({
                id:           PropTypes.string.isRequired,
                name:         PropTypes.string.isRequired,
                primaryEmail: PropTypes.string,
            }),
        }).isRequired,
        endorser:         PropTypes.shape({
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }),
        endorserComment:  PropTypes.string,
        object:           PropTypes.shape({
            __typename: PropTypes.oneOf(['BadgeClass', 'Organisation', 'Project']).isRequired,
            name:       PropTypes.string.isRequired,
            picture:    PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

EndorsementItem.defaultProps = {
    variant: 'default',
};

export default EndorsementItem;
