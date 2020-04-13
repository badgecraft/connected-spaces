import React from 'react';
import { Box } from '@rebass/emotion';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { jt, t } from 'ttag';
import styled from '@emotion/styled';
import FileList from '../../Files/PreviewableFileList';
import { themedMinWidth } from '../../uiUtils';
import { font12, font16A1 } from '../../uiFonts';
import { LinkOrBold } from '../NotifyItem/notifyItemUtils';
import Markdown from '../../Markdown';
import Ago from '../../Ago';

const Root = styled(Box)({
    backgroundColor: '#ffffff',
    boxShadow:       '0 14px 14px 0 rgba(0,0,0,0.07)',
    color:           '#3E3564',
    padding:         16,
    marginBottom:    16,
});

const CommentText = styled('div')({
    borderLeft:   '1px solid #E5E3ED',
    paddingLeft:  8,
    marginTop:    16,
    marginBottom: 16,
});

const InfoRoot = styled('div')({
    display:         'flex',
    alignItems:      'center',
    padding:         '8px 0px',
    backgroundColor: 'transparent',
    width:           '100%',
    '&:last-child':  {
        marginBottom: 0,
        borderBottom: '0 none',
    },
});

const Pic = styled('div')(({ picture, theme, marginRight, marginLeft }) => ({
    width:      32,
    height:     32,
    background: `transparent url("${picture}") center center/contain no-repeat`,
    flexShrink: 0,
    marginRight,
    marginLeft,

    [themedMinWidth('tablet', theme)]: {
        width:  48,
        height: 48,
    },
}));

const InfoText = styled('div')({
    ...font16A1,
    flexGrow: 1,
});

const Label = styled('div')({
    ...font12,
    marginTop:    16,
    marginBottom: 8,
});

const Status = styled('div')({
    ...font12,
});

const SubmittedAt = styled('span')({});

const toStatus = ({ status, user, badgeClass }) => {
    switch (status) {
        case 'approved':
            return jt`${user} evidences for ${badgeClass} were approved`;
        case 'rejected':
            return jt`${user} was asked to improve ${badgeClass} evidences`;
        case 'selfApproved':
            return jt`User ${user} finished task for ${badgeClass} with evidence`;
        case 'cancelCheck':
            return jt`User ${user} canceled the check for ${badgeClass}`;
        case 'userBadgeDelete':
            return jt`User ${user} deleted the badge ${badgeClass}`;
        default:
            return t`Unknown evidence chunk status`;
    }
};

const EvidenceChunkItem = ({ item, badgeClassViewPath }) => {
    const userName = _get(item, 'user.name');
    const badgeClassName = _get(item, 'badgeClass.name');
    const no = _get(item, 'criterion.no');

    const badgeLinkEnabled = _get(item, 'badgeClass.perms.view.value') === 1;
    const badgeLink = { to: badgeClassViewPath, params: _get(item, 'badgeClass') };

    const user = (<LinkOrBold key="u">{userName}</LinkOrBold>);
    const badgeClass = (
        <LinkOrBold key="b" link={badgeLinkEnabled} {...badgeLink} target="_blank">{badgeClassName}</LinkOrBold>
    );
    const ago = (<Ago key="a" ts={item.createdAt} />);

    return (
        <Root width={1}>
            <InfoRoot>
                <Pic
                    marginLeft={0}
                    marginRight={16}
                    picture={_get(item, 'user.picture')}
                    data-balloon={_get(item, 'user.name')}
                    data-balloon-pos="right"
                />
                <InfoText>
                    {toStatus({ status: item.status, user, badgeClass })}
                    <Status>
                        <SubmittedAt>{jt`Submitted: ${ago}`}</SubmittedAt>
                    </Status>
                </InfoText>
                <LinkOrBold link={badgeLinkEnabled} {...badgeLink} target="_blank">
                    <Pic
                        marginLeft={16}
                        marginRight={0}
                        picture={_get(item, 'badgeClass.picture')}
                        data-balloon={_get(item, 'badgeClass.name')}
                        data-balloon-pos="left"
                    />
                </LinkOrBold>
            </InfoRoot>

            <div>
                <Label>{t`For criterion ${no}`}</Label>
                <Markdown source={_get(item, 'criterion.description')} />
            </div>

            <CommentText>{item.comment}</CommentText>
            <FileList files={item.files || []} />
        </Root>
    );
};

EvidenceChunkItem.propTypes = {
    badgeClassViewPath: PropTypes.string.isRequired,
    item:               PropTypes.shape({
        user:       PropTypes.shape({
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
        badgeClass: PropTypes.shape({
            name:      PropTypes.string.isRequired,
            picture:   PropTypes.string.isRequired,
            perms:     PropTypes.shape({
                view: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            }).isRequired,
            projectId: PropTypes.string.isRequired,
        }).isRequired,
        criterion:  PropTypes.shape({
            no:             PropTypes.number.isRequired,
            description:    PropTypes.string.isRequired,
            checkType:      PropTypes.oneOf(['self', 'members', 'managers', 'circle', 'circleAdmins']).isRequired,
            checkTypeCount: PropTypes.number.isRequired,
        }).isRequired,
        status:     PropTypes.oneOf(['approved', 'selfApproved', 'rejected', 'cancelCheck', 'userBadgeDelete',
            'unknown', 'pending']).isRequired,
        comment:    PropTypes.string.isRequired,
        files:      PropTypes.arrayOf(PropTypes.shape({
            publicPath: PropTypes.string.isRequired,
            type:       PropTypes.string.isRequired,
        })).isRequired,
        createdAt:  PropTypes.number.isRequired,
    }).isRequired,
};

export default EvidenceChunkItem;
