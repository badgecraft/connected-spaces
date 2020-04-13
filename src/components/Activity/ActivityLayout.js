import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import { compose, withProps, getContext } from 'recompose';
import Layout from '../Layout';
import Cover from '../../ui/Project/Cover';
import Viewport from '../../ui/Layout/Viewport';
import { font18A1, font24A2 } from '../../ui/uiFonts';
import { paths } from '../Constants';
import { themedMinWidth } from '../../ui/uiUtils';
import ContextMenu from '../../ui/Menu/ContextMenu';
import Tabs from '../../ui/Project/ProjectTabs';
import Button from '../../ui/Button';
import contextIcon from '../Event/context.svg';
import completed from '../../ui/Project/completed.svg';
import Address from '../UI/EventAddress';
import DateTime from '../UI/EventDateTime';
import Category from '../UI/EventCategory';
import { translateCategoryName } from '../../ui/Form/formUtils';
import { action2Route } from '../../core/utils';
import { PlaylistLabel } from '../../ui/Project/projectStyles';
import MainAction from '../../ui/Card/ActivityCardAction';

const Root = styled(Box)({ backgroundColor: '#fff' });

const Name = styled('h1')(({ theme }) => ({
    ...font18A1,
    color:     '#3E3564',
    margin:    '12px 0',
    '& > div': {
        display: 'inline-block',
    },

    [themedMinWidth('tablet', theme)]: {
        ...font24A2,
        margin: 0,
        color:  '#ffffff',
    },
}));

const CoverInfo = styled('div')(({ theme }) => ({
    display: 'none',

    [themedMinWidth('tablet', theme)]: {
        height:         332,
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        zIndex:         100,
        position:       'relative',
        top:            -332,
        marginBottom:   -332,
        paddingBottom:  26,
        paddingTop:     13,
    },
}));

const CoverControl = styled('div')({
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'flex-end',
    padding:        '0 20px',
    color:          '#ffffff',
});

const CoverAction = styled('div')({
    display:    'flex',
    alignItems: 'center',
});

const ContextRoot = styled('div')({
    textAlign:    'right',
    paddingRight: 13,
});

const Completed = styled('div')({
    display:      'inline-block',
    width:        18,
    height:       18,
    background:   `transparent url("${completed}") center center/contain no-repeat`,
    top:          6,
    left:         6,
    marginBottom: 3,
    marginRight:  12,
    marginLeft:   -8,
});

const OnlyMobile = styled(Viewport)(({ theme }) => ({
    padding: '0 16px',
    color:   '#3E3564',

    [themedMinWidth('tablet', theme)]: {
        display: 'none',
    },
}));

const ControlMobile = styled('div')(({ theme }) => ({
    float: 'right',

    [themedMinWidth('tablet', theme)]: {
        display: 'none !important',
    },
}));

const getProjectType = ({ contexts }) => {
    if (contexts.indexOf('playlist') !== -1) {
        return 'playlist';
    }

    if (contexts.indexOf('event') !== -1) {
        return 'event';
    }

    return 'project';
};

const toManageEventLabel = (type) => {
    switch (type) {
        case 'playlist':
            return t`Manage playlist`;
        case 'event':
            return t`Manage event`;
        default:
            return t`Manage project`;
    }
};

const ActivityLayout = ({ project, baseURL, onActivityRemove, onEventLeave, pushRoute, children, tab, ...props }) => {
    // todo re-enable once we have how to start a playlist
    // const action = (<Button type="button" variant="primary" label={t`Start playlist`} disabled />);
    const type = getProjectType(project);
    const action = (<MainAction size="normal" noView project={project} fullWidth={[true, false, false]} />);

    const contextMenu = (<ContextMenu
        toggler={({ onClick }) => (
            <Button
                type="button"
                variant="secondary"
                onClick={onClick}
                label={toManageEventLabel(type)}
                rightIcon={contextIcon}
            />
        )}
        items={[
            {
                label:   t`Edit playlist`,
                enabled: type === 'playlist' && _get(project, 'perms.edit.value') === 1,
                onClick: () => pushRoute({ to: paths.playlistEdit, params: project }),
            },
            {
                label:   t`Edit event`,
                enabled: type === 'event' && _get(project, 'perms.edit.value') === 1,
                onClick: () => pushRoute({ to: paths.eventEdit, params: project }),
            },
            {
                label:   t`Invite users`,
                enabled: _get(project, 'perms.invite.value') === 1,
                onClick: () => pushRoute({
                    to:     paths.activityUsersInvite,
                    params: project
                }),
            },
            {
                label:   t`Publish playlist`,
                enabled: false,
                onClick: () => null, // todo need callback
            },
            {
                label:   t`Unpublish playlist`,
                enabled: false,
                onClick: () => null, // todo need callback
            },
            {
                label:   t`Issue badge`,
                enabled: _get(project, 'completeBadgeClass.perms.issue.value') === 1,
                onClick: () => pushRoute({
                    to:     paths.activityBadgesIssue,
                    params: {
                        id:         _get(project, 'id'),
                        badgeClass: _get(project, 'completeBadgeClass.id'),
                    },
                }),
            },
            {
                label:   t`Join`,
                enabled: _get(project, 'perms.join.value') === 1,
                onClick: () => pushRoute({ to: paths.playlistStart, params: project }),
            },
            {
                label:   t`I'm no longer interested in this playlist`,
                enabled: type === 'playlist' && _get(project, 'perms.leave.value') === 1,
                onClick: () => pushRoute({ to: paths.playlistLeave, params: project }),
            },
            {
                label:   t`Delete playlist`,
                enabled: type === 'playlist' && _get(project, 'perms.remove.value') === 1,
                onClick: onActivityRemove,
            },
            {
                label:   t`Delete event`,
                enabled: type === 'event' && _get(project, 'perms.remove.value') === 1,
                onClick: onActivityRemove,
            },
            {
                label:   t`Delete event`,
                enabled: type === 'event'
                             && _get(project, 'perms.remove.value') !== 1
                             && (_get(project, 'perms.remove.reason') || []).indexOf('usedInPlaylist') !== -1,
                // eslint-disable-next-line no-alert
                onClick: () => window.alert(t`Activity cannot be removed, because it's used in a playlist`),
            },
            {
                label:   t`Leave`,
                enabled: type !== 'playlist' && _get(project, 'perms.leave.value') === 1,
                onClick: onEventLeave,
            },
        ]}
    />);

    const info = (<div>
        {(project.contexts || []).indexOf('playlist') !== -1
        && <PlaylistLabel>{t`Playlist`}</PlaylistLabel>}
        <Name>
            {project.completed && <Completed
                data-balloon={t`You have completed this activity`}
                data-balloon-pos="right"
            />}{project.name}
            <ControlMobile>{contextMenu}</ControlMobile>
        </Name>
        {tab === 'overview' && <DateTime {..._pick(project, 'eventStart', 'eventEnd', 'tz')} />}
        {tab === 'overview' && <Address address={project.address} />}
    </div>);

    return (
        <Layout {...props}>
            <Root>
                <Cover picture={project.coverPicture || project.picture} meta={project.coverMeta} />
                <Viewport>
                    <CoverInfo>
                        <ContextRoot />
                        <CoverControl>
                            {info}
                            <CoverAction>
                                {action}
                                {contextMenu}
                            </CoverAction>
                        </CoverControl>
                    </CoverInfo>
                </Viewport>
                <Tabs
                    colorType={_get(project, 'coverMeta.dominantColorType') || 'dark'}
                    color={_get(project, 'coverMeta.dominantColor')}
                    tabs={[
                        {
                            active:            tab === 'overview',
                            label:             t`Overview`,
                            to:                paths.activityView,
                            params:            project,
                            enabled:           _get(project, 'perms.view.value') === 1,
                            disableNextScroll: true,
                        },
                        {
                            active:            tab === 'users',
                            label:             t`Users`,
                            to:                paths.activityUsers,
                            params:            project,
                            enabled:           _get(project, 'perms.viewUsers.value') === 1,
                            disableNextScroll: true,
                        },
                        {
                            active:            tab === 'badges',
                            label:             t`Badges`,
                            to:                paths.activityBadges,
                            params:            { id: project.id },
                            enabled:           _get(project, 'perms.view.value') === 1,
                            disableNextScroll: true,
                        },
                        {
                            active:            tab === 'evidences',
                            label:             t`Evidences`,
                            to:                paths.activityEvidences,
                            params:            { id: project.id },
                            enabled:           _get(project, 'perms.leave.value') === 1
                                                   || _get(project, 'perms.viewUsers.value') === 1,
                            disableNextScroll: true,
                        },
                    ]}
                />
                <OnlyMobile>
                    {info}
                    {action}
                    {project.category && tab === 'overview'
                    && <Category to={paths.opportunitiesInCategory} params={project.category}>
                        {translateCategoryName(project.category.name)}
                    </Category>}
                </OnlyMobile>
                {children}
            </Root>
        </Layout>
    );
};

ActivityLayout.propTypes = {
    children:         PropTypes.node.isRequired,
    project:          PropTypes.shape({
        id:                 PropTypes.string.isRequired,
        name:               PropTypes.string.isRequired,
        picture:            PropTypes.string.isRequired,
        coverPicture:       PropTypes.string.isRequired,
        coverMeta:          PropTypes.shape({
            dominantColor:     PropTypes.string.isRequired,
            dominantColorType: PropTypes.oneOf(['light', 'dark']).isRequired,
        }),
        category:           PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
        organisation:       PropTypes.shape({}).isRequired,
        perms:              PropTypes.shape({
            view:      PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            remove:    PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            edit:      PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            viewUsers: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            invite:    PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            join:      PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            leave:     PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
        }).isRequired,
        completed:          PropTypes.bool,
        address:            PropTypes.string,
        contexts:           PropTypes.arrayOf(
            PropTypes.oneOf(['badges', 'event', 'playlist', 'training']).isRequired,
        ).isRequired,
        completeBadgeClass: PropTypes.shape({
            id:        PropTypes.string.isRequired,
            projectId: PropTypes.string.isRequired,
            perms:     PropTypes.shape({
                issue: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            }).isRequired,
        }),
    }).isRequired,
    baseURL:          PropTypes.string.isRequired,
    onActivityRemove: PropTypes.func.isRequired,
    onEventLeave:     PropTypes.func.isRequired,
    pushRoute:        PropTypes.func.isRequired,
    tab:              PropTypes.oneOf(['overview', 'users', 'badges', 'evidences']).isRequired,
};

export default compose(
    getContext({ baseURL: PropTypes.string.isRequired }),
    withProps(({ context }) => ({
        route:  action2Route(context),
        viewer: context.viewer,
    })),
)(ActivityLayout);
