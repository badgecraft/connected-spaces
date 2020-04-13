/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Flex } from '@rebass/emotion';
import _get from 'lodash/get';
import { t, jt } from 'ttag'
import { getContext } from 'recompose';
import Category from '../UI/EventCategory';
import { breakpoints, paths } from '../Constants';
import Tag from '../../ui/Tag/SkillTag';
import EventDetails from '../../ui/Project/DetailBox';
import Stats from '../../ui/Project/ActivityStats';
import Share from '../../ui/Share';
import Badge from '../UI/EventBadge';
// import Reviews from '../UI/ReviewList';
// import Photos from '../UI/PhotoList';
import Organizer from '../UI/Organizer';
import Location from '../Shared/GoogleMaps/SingleLocation';
import { toLink } from '../Link';
import Markdown from '../../ui/Markdown';
import { translateCategoryName } from '../../ui/Form/formUtils';
import Video from '../../ui/Video';
import BadgeClass from '../../ui/BadgeClass/BadgeClass';
import BadgeThumb from '../../ui/BadgeClass/BadgeClassThumbLink';
import { font14A3 } from '../../ui/uiFonts';
import ActivityItem from '../../ui/Form/ActivitySearch/ActivityItem';

const TabletCategory = styled(Category)({
    [breakpoints.tabletMax]: { display: 'none' },
});

const Badges = styled('div')({
    display:     'flex',
    alignItems:  'center',
    flexWrap:    'wrap',
    marginLeft:  -8,
    marginRight: -8,
});

const MaterialLink = styled('a')({
    ...font14A3,
    textDecoration: 'underline',
    display:        'block',
    marginTop:      8,
    marginBottom:   8,
});

const EventView = ({ project, baseURL, bcWebURL }) => {
    const { id, category, organisation, coHosts, location, address, perms } = project;
    const badgeCount = _get(project, 'badgeClasses.total', 0);
    const skills = project.skills || [];
    const videos = project.videos || [];
    const material = project.material || [];
    const badgeEnabled = (_get(project, 'badgeClasses.list') || []).length > 0;
    const badges = (<Badge key="badgeCount" dark count={badgeCount} />);

    return (
        <Flex flexWrap="wrap">
            <Box width={[1, 1, 2 / 3]} pr={[0, 0, 4]}>
                <EventDetails title={t`About`} mt={0}>
                    <Markdown source={project.description} />

                    {videos.map((video, index) => (<Video key={index} {...video} />))}
                </EventDetails>

                {material && material.length > 0 && (
                    <EventDetails title={t`Material`}>
                        <ul>
                            {material.map(({ label, url }, index) => (
                                <li key={index}>
                                    <MaterialLink target="_blank" href={url}>{label}</MaterialLink>
                                </li>
                            ))}
                        </ul>
                    </EventDetails>
                )}

                {project.completeBadgeClass && <EventDetails>
                    <BadgeClass
                        badgeClass={project.completeBadgeClass}
                        createBadgeClassEditHref={bc => toLink({
                            to:      paths.badgecraftProjectEdit,
                            params:  { id: bc.projectId },
                            baseURL: bcWebURL,
                        })}
                        badgeIssuePath={paths.activityBadgesIssue}
                    />
                </EventDetails>}

                {location && <EventDetails title={t`Location`}>
                    <Location location={location} address={address} />
                </EventDetails>}
                {/* <EventDetails title={t`Photos (${photoCount})`} all={{ to: "?all" }}><Photos /></EventDetails> */}
            </Box>
            <Box width={[1, 1, 1 / 3]}>
                {skills.length > 0 && (
                    <EventDetails title={t`Skills`} mt={[2, 2, 0]}>
                        {skills.map(skill => (<Tag key={skill.id} id={skill.id} />))}
                    </EventDetails>
                )}

                {badgeEnabled &&
                <EventDetails
                    title={jt`Badges ${badges}`}
                    mt={[2, 2, skills.length > 0 ? 2 : 0]}
                    actionTitle={t`Edit badges`}
                    action={_get(perms, 'createBadgeClass.value') === 1 ? {
                        href:   toLink({ to: paths.badgecraftProjectEdit, params: { id }, baseURL: bcWebURL }),
                        target: '_blank',
                    } : null}
                >
                    <Badges>
                        {_get(project, 'badgeClasses.list', [])
                            .filter(item => item)
                            .map(item => <BadgeThumb key={item.id} badgeClass={item} size="small" showBalloon />)}
                    </Badges>
                </EventDetails>}

                <EventDetails>
                    {category &&
                    <TabletCategory
                        to={paths.opportunitiesInCategory}
                        params={category}>{translateCategoryName(category.name)}</TabletCategory>}
                    <Stats project={project} />

                    <Stats
                        joined={_get(project, 'users.total', null)}
                        seconds={_get(project, 'duration.seconds', null)}
                        added={_get(project, 'stats.usedInPlaylists', 0)}
                    />
                    <Share url={`${toLink({
                        to:      paths.activityView,
                        params:  { id },
                        baseURL: _get(project, 'site.siteUrl') || baseURL,
                    })}`} />
                </EventDetails>

                <EventDetails title={t`Organisers`}>
                    {organisation && <Organizer {...organisation} type="primary" />}
                    {(coHosts || []).map(coHost => (
                        <Organizer key={coHost.name} {...coHost} type="co-host" />
                    ))}
                </EventDetails>

                {_get(project, 'usedInPlaylists.total', 0) > 0 && <EventDetails title={t`Used in playlists`}>
                    {(_get(project, 'usedInPlaylists.list') || []).filter(item => item).map(item => (
                        <ActivityItem
                            key={item.id}
                            id={item.id}
                            createLink={() => ({ to: paths.activityView, params: item })}
                        />
                    ))}
                </EventDetails>}
            </Box>
        </Flex>
    );
};

EventView.propTypes = {
    project:  PropTypes.shape({
        id:                 PropTypes.string.isRequired,
        name:               PropTypes.string.isRequired,
        description:        PropTypes.string.isRequired,
        category:           PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
        organisation:       PropTypes.shape({
            id:   PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
        coHosts:            PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
        })),
        location:           PropTypes.shape(),
        address:            PropTypes.string,
        perms:              PropTypes.shape({
            edit:             PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            createBadgeClass: PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
        }).isRequired,
        contexts:           PropTypes.arrayOf(PropTypes.string).isRequired,
        badgeClasses:       PropTypes.shape({
            total: PropTypes.number.isRequired,
            list:  PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
        }),
        skills:             PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
        })).isRequired,
        videos:             PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        material:           PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            url:   PropTypes.string.isRequired,
        })).isRequired,
        tz:                 PropTypes.string,
        completeBadgeClass: PropTypes.shape(),
        site:               PropTypes.shape({
            siteUrl: PropTypes.string.isRequired,
        }),
        usedInPlaylists:    PropTypes.shape({
            total: PropTypes.number.isRequired,
            list:  PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        }),
    }).isRequired,
    baseURL:  PropTypes.string.isRequired,
    bcWebURL: PropTypes.string.isRequired,
};

export default getContext({
    baseURL:  PropTypes.string.isRequired,
    bcWebURL: PropTypes.string.isRequired,
})(EventView);

