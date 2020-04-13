/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@rebass/emotion';
import styled from '@emotion/styled';
import { t, jt } from 'ttag';
import _get from 'lodash/get';
import { getContext } from 'recompose';
import Details from '../../ui/Project/DetailBox';
import Organiser from '../../ui/Project/Organiser';
import Markdown from '../../ui/Markdown';
import ActivityItem from '../../ui/Project/ActivityItem';
import Tag from '../../ui/Tag/SkillTag';
import Stats from '../../ui/Project/ActivityStats';
import { font18A1, font24A2 } from '../../ui/uiFonts';
import Button from '../../ui/Button';
import { toLink } from '../Link';
import { paths } from '../Constants';
import Share from '../../ui/Share';
import { themedMinWidth } from '../../ui/uiUtils';
import Badge from '../UI/EventBadge';
import Video from '../../ui/Video';
import BadgeThumb from '../../ui/BadgeClass/BadgeClassThumbLink';

// todo how to get all activities categories?
// todo earn this badge
// todo other organisers
// todo inconsistencies in skill tag view (e.g. create form and playlist view) - should all be the same!
// todo display actual stats

const Categories = styled('div')({
    display: 'none',
});

const Name = styled('h1')(({ theme }) => ({
    ...font18A1,
    color:  '#3E3564',
    margin: '12px 0',

    [themedMinWidth('tablet', theme)]: {
        ...font24A2,
        margin: 0,
        color:  '#ffffff',
    },
}));

const Actions = styled('div')({
    textAlign: 'center',
    margin:    '16px 0',
});

const Info = styled(Details)(({ theme }) => ({
    [themedMinWidth('tablet', theme)]: {
        boxShadow:       'none',
        backgroundColor: 'transparent',
        display:         'none',
    },
}));

const CatsAndShare = styled('div')(({ theme }) => ({
    [themedMinWidth('tablet', theme)]: {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
    }
}));

const Badges = styled('div')({
    display:     'flex',
    alignItems:  'center',
    flexWrap:    'wrap',
    marginLeft:  -8,
    marginRight: -8,
});

const PlaylistOverview = (props) => {
    const { project: playlist, baseURL, bcWebURL } = props;
    const skills = playlist.skills || [];
    const activities = playlist.playlistActivities || [];
    const badgeCount = _get(playlist, 'badgeClasses.total', 0);
    const badgeEnabled = (_get(playlist, 'badgeClasses.list') || []).length > 0;
    const videos = playlist.videos || [];
    const badges = (<Badge key="badgeCount" dark count={badgeCount} />);

    const joinAction = _get(playlist, 'perms.join.value') === 1 && (
        <Button
            type="link"
            variant="primary"
            label={t`Start playlist`}
            fullWidth
            to={paths.playlistStart}
            params={{ id: playlist.id }}
        />
    );

    return (
        <Flex flexWrap="wrap">
            <Box width={[1, 1, 2 / 3]} pr={[0, 0, 3]}>
                <Info mt={0}>
                    <CatsAndShare>
                        <Categories>todo categories?</Categories>
                    </CatsAndShare>
                    <Name>{playlist.name}</Name>
                    {joinAction && <Actions>{joinAction}</Actions>}
                </Info>

                <Details title={t`About`} mt={[2, 2, 0]}>
                    <Markdown source={playlist.description} />
                    {videos.map((video, index) => (<Video key={index} {...video} />))}
                </Details>

                <Details title={t`Activities to complete`}>
                    {activities.map(item => {
                        const siteUrl = _get(item, 'project.site.siteUrl', null);
                        const itemParams = {
                            to:     paths.playlistActivityView,
                            params: { id: item.id, playlist: playlist.id },
                        };
                        return (
                            <ActivityItem
                                key={item.id}
                                item={item}
                                link={siteUrl
                                    ? { href: toLink({ ...itemParams, baseURL: siteUrl }) }
                                    : itemParams}
                            />
                        );
                    })}
                </Details>
            </Box>

            <Box width={[1, 1, 1 / 3]}>
                {skills.length > 0 && <Details title={t`Skills`} mt={[2, 2, 0]}>
                    {skills.map(skill => (<Tag key={skill.id} id={skill.id} />))}
                </Details>}

                {badgeEnabled && <Details
                    title={jt`Badges ${badges}`}
                    mt={[2, 2, skills.length > 0 ? 2 : 0]}
                    actionTitle={t`Edit badges`}
                    action={_get(playlist, 'perms.createBadgeClass.value') === 1 ? {
                        href:   toLink({
                            to:      paths.badgecraftProjectEdit,
                            params:  { id: playlist.id },
                            baseURL: bcWebURL,
                        }),
                        target: '_blank',
                    } : null}
                >
                    <Badges>
                        {_get(playlist, 'badgeClasses.list', [])
                            .filter(item => item)
                            .map(item => <BadgeThumb key={item.id} badgeClass={item} size="small" showBalloon />)}
                    </Badges>
                </Details>}

                <Details>
                    <Stats
                        activities={activities.length}
                        completed={_get(playlist, 'stats.issuedCompleteBadges', 0)}
                        started={_get(playlist, 'stats.joinCount', 0)}
                        seconds={_get(playlist, 'duration.seconds', null)}
                    />
                    <Share url={toLink({
                        to:      paths.activityView,
                        params:  playlist,
                        baseURL: _get(playlist, 'site.siteUrl') || baseURL,
                    })} />
                </Details>

                <Details title={t`Organisers`}>
                    <Organiser organiser={playlist.organisation} role="main" />
                </Details>
            </Box>
        </Flex>
    );
};

PlaylistOverview.propTypes = {
    project:  PropTypes.shape({
        id:                 PropTypes.string.isRequired,
        name:               PropTypes.string.isRequired,
        contexts:           PropTypes.arrayOf(PropTypes.string).isRequired,
        description:        PropTypes.string.isRequired,
        skills:             PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
        })).isRequired,
        organisation:       PropTypes.shape({}).isRequired,
        playlistActivities: PropTypes.arrayOf(PropTypes.shape({
            id:      PropTypes.string.isRequired,
            project: PropTypes.shape({
                site: PropTypes.shape({
                    siteUrl: PropTypes.string.isRequired,
                }),
            }).isRequired,
        })).isRequired,
        perms:              PropTypes.shape({
            join:             PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
            createBadgeClass: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
        }),
        stats:              PropTypes.shape({
            joinCount:            PropTypes.number.isRequired,
            issuedCompleteBadges: PropTypes.number.isRequired,
        }).isRequired,
        badgeClasses:       PropTypes.shape({
            total: PropTypes.number.isRequired,
            list:  PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
        }),
        videos:             PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        site:               PropTypes.shape({
            siteUrl: PropTypes.string.isRequired,
        }),
    }).isRequired,
    baseURL:  PropTypes.string.isRequired,
    bcWebURL: PropTypes.string.isRequired,
};

export default getContext({
    baseURL:  PropTypes.string.isRequired,
    bcWebURL: PropTypes.string.isRequired,
})(PlaylistOverview);
