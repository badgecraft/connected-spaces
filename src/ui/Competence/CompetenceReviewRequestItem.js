import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import moment from 'moment';
import { t } from 'ttag';
import ContextMenu from '../Menu/ContextMenu';
import { font14A3, font16 } from '../uiFonts';
import context from '../Goal/context.svg';
import { themedMinWidth } from '../uiUtils';
import Link, { toLink } from '../Link';
import { toTeamName } from './competenceUtils';
import ActionInputCopy from '../Form/ActionInputCopy';

const Root = styled('div')({
    width:         '100%',
    margin:        '0px 16px 16px 16px',
    paddingBottom: 8,
    borderBottom:  '1px solid silver',

    '&:last-of-type': {
        borderBottom: '0 none',
    },
});

const Area = styled('div')({
    display:      'flex',
    alignItems:   'center',
    marginBottom: 8,
});

const AreaImage = styled('div')(({ picture }) => ({
    width:       24,
    height:      24,
    flexShrink:  0,
    background:  `transparent url("${picture}") center center/contain no-repeat`,
    marginRight: 8,
}));

const AreaName = styled('div')({
    ...font14A3,
});

const Details = styled('div')(({ theme }) => ({
    ...font14A3,
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'space-between',

    [themedMinWidth('tablet', theme)]: {
        flexDirection: 'row',
    },
}));

const Areas = styled('div')(({ theme }) => ({
    lineHeight: '24px',
    flexGrow:   1,
    flexShrink: 0,

    [themedMinWidth('tablet', theme)]: {
        width: '50%',
    },
}));

const Teams = styled('div')(({ theme }) => ({
    lineHeight: '24px',
    flexGrow:   1,
    flexShrink: 0,

    [themedMinWidth('tablet', theme)]: {
        marginLeft: 8,
        width:      '50%',
    },
}));

const Title = styled(Link)({
    ...font16,
    marginBottom:   8,
    textDecoration: 'underline',
});

const Heading = styled('h3')({});

const Top = styled('div')({
    display:        'flex',
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
});

const CompetenceReviewRequestItem = (props) => {
    const { item, onRemove, onDownloadQr, requestViewPath, reviewStartPath, baseURL, pushRoute } = props;
    const createdAt = moment(item.created).format('LLL');
    return (
        <Root>
            <Top>
                <Title to={requestViewPath} params={item} disableNextScroll>{t`Request created on ${createdAt}`}</Title>
                <ContextMenu zIndex={100} icon={context} items={[
                    {
                        label:   t`Invite to review`,
                        enabled: true,
                        onClick: () => pushRoute({
                            to:     requestViewPath,
                            params: item,
                            query:  { invite: 1 },
                        }, { disableNextScroll: true }),
                    },
                    {
                        label:   t`View details`,
                        onClick: () => pushRoute({ to: requestViewPath, params: item }, { disableNextScroll: true }),
                        enabled: true,
                    },
                    { label: t`Download QR code`, onClick: onDownloadQr, enabled: true },
                    { label: t`Remove`, onClick: onRemove, enabled: true },
                ]} />
            </Top>

            <Details>
                <Areas>
                    <Heading>{t`Areas`}</Heading>
                    {item.areas.map(area => (
                        <Area key={area.id}>
                            <AreaImage picture={area.image} />
                            <AreaName>{area.name}</AreaName>
                        </Area>
                    ))}
                </Areas>
                <Teams>
                    <Heading>{t`Teams`}</Heading>
                    {item.teams.map(team => (
                        <div key={team}>{toTeamName(team)}</div>
                    ))}
                </Teams>
            </Details>

            <ActionInputCopy
                id={`url${item.id}`}
                name={`url${item.id}`}
                value={toLink({ to: reviewStartPath, params: item, baseURL })}
                readOnly
                onFocus={evt => evt.target.select()}
                onClick={evt => evt.target.select()}
                variant="clean"
            />
        </Root>
    );
};

CompetenceReviewRequestItem.propTypes = {
    item:            PropTypes.shape({
        id:      PropTypes.string.isRequired,
        teams:   PropTypes.arrayOf(PropTypes.string).isRequired,
        areas:   PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
        })).isRequired,
        created: PropTypes.number.isRequired,
    }).isRequired,
    onRemove:        PropTypes.func.isRequired,
    onDownloadQr:    PropTypes.func.isRequired,
    requestViewPath: PropTypes.string.isRequired,
    reviewStartPath: PropTypes.string.isRequired,
    baseURL:         PropTypes.string.isRequired,
    pushRoute:       PropTypes.func.isRequired,
};

export default CompetenceReviewRequestItem;
