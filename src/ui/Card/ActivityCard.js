import React from 'react';
import PropTypes from 'prop-types';
import { mapProps, compose, branch, renderNothing, getContext, withHandlers, renderComponent } from 'recompose';
import _get from 'lodash/get';
import { t } from 'ttag';
import Card from './Card';
import {
    CoverActions,
    Badge,
    ActivityType,
    ActivityDate,
    PlaylistLabel,
    Completed,
    DetailLine,
    Details,
} from './ActivityCardStyles';
import { toLink } from '../Link';
import ShareButton from '../Share/ShareButton';
import DateTime from '../DateTime/DateTime';
import CategoryTag from '../Tag/CategoryTag';
import FontIcon from '../Icons/FontIcon';
import Action from './ActivityCardAction';
import Loading from './ActivityCardLoading';

/*
    Organisation link: <Link to={paths.spaceView} params={{ id: organisationId }}></Link>, Link from ActivityCardStyles
 */
const ActivityCard = compose(
    getContext({
        baseURL:          PropTypes.string.isRequired,
        paths:            PropTypes.shape({
            activityView: PropTypes.string.isRequired,
            spaceView:    PropTypes.string,
        }).isRequired,
        setExternalEvent: PropTypes.func.isRequired,
    }),
    branch(({ project, loading }) => loading && !project, renderComponent(Loading)),
    branch(({ project }) => !project, renderNothing),
    withHandlers({
        onOpenClick: ({ setExternalEvent, project }) => evt => {
            const isExternal = _get(project, 'site.id');
            if (isExternal && setExternalEvent) {
                evt.preventDefault();
                setExternalEvent(project);
            }
        },
    }),
    mapProps(({ baseURL, paths, project, onOpenClick, renderAction, variant, ...props }) => {
        const colorType = _get(project, 'coverMeta.dominantColorType', 'dark');
        const badges = _get(project, 'badgeClasses.total', 0);
        const isPlaylist = (project.contexts || []).indexOf('playlist') !== -1;
        const skills = (project.skills || [])
            .filter(s => s && s.name)
            .map(s => `#${s.name}`)
            .join(', ');
        const link = {
            baseURL: _get(project, 'site.siteUrl', baseURL),
            to:      paths.activityView,
            params:  { id: project.id },
            onClick: onOpenClick,
        };

        const organisationId = _get(project, 'organisation.id');

        return {
            link:        {
                ...link,
                css: { textDecoration: 'none' },
            },
            action:      typeof renderAction === 'function' ? renderAction(project) : (<Action project={project} />),
            beforeName:  project.completed && (<Completed><FontIcon content="completed" /></Completed>),
            name:        project.name,
            detailsTop:  (<CategoryTag category={project.category} fullWidth />),
            details:     (<Details>
                {organisationId && <DetailLine>
                    <FontIcon content="organiser" /> {_get(project, 'organisation.name')}
                </DetailLine>}
                {skills && <DetailLine><FontIcon content="skill" /> {skills}</DetailLine>}
            </Details>),
            cover:       {
                picture: `${baseURL}${project.coverPicture}`,
                color:   _get(project, 'coverMeta.dominantColor'),
                fade:    true,
            },
            coverTop:    (<CoverActions variant={colorType}>
                <div>
                    {badges > 0 && <Badge>{badges}</Badge>}
                    {!isPlaylist && <ActivityType type={project.type} />}
                    {isPlaylist && <PlaylistLabel>{t`Playlist`}</PlaylistLabel>}
                </div>
                {project.eventStart && (<ActivityDate>
                    <DateTime ts={project.eventStart} tz={project.tz} />
                </ActivityDate>)}
            </CoverActions>),
            coverBottom: (variant === 'clean'
                ? null
                : (<CoverActions padding={0} variant={colorType}>
                    <div />
                    <ShareButton url={toLink(link)} />
                </CoverActions>)),
            ...props,
        };
    }),
)(Card);

ActivityCard.propTypes = {
    project:        PropTypes.shape({
        id:           PropTypes.string.isRequired,
        name:         PropTypes.string.isRequired,
        coverPicture: PropTypes.string.isRequired,
        coverMeta:    PropTypes.shape({
            dominantColor:     PropTypes.string.isRequired,
            dominantColorType: PropTypes.oneOf(['dark', 'light']),
        }).isRequired,
        badgeClasses: PropTypes.shape({ total: PropTypes.number.isRequired }).isRequired,
        type:         PropTypes.string.isRequired,
        site:         PropTypes.shape({
            id:      PropTypes.string.isRequired,
            siteUrl: PropTypes.string.isRequired,
        }),
        contexts:     PropTypes.arrayOf(
            PropTypes.oneOf(['badges', 'playlist', 'event', 'training']).isRequired,
        ).isRequired,
        eventStart:   PropTypes.string,
        tz:           PropTypes.string.isRequired,
        category:     PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
        completed:    PropTypes.bool,
        organisation: PropTypes.shape({
            id:   PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
        skills:       PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
        })).isRequired,
    }),
    onExternalOpen: PropTypes.func,
    renderAction:   PropTypes.func,
    variant:        PropTypes.oneOf(['default', 'clean']),
    loading:        PropTypes.bool,
};

ActivityCard.defaultProps = {
    project:        null,
    onExternalOpen: null,
    renderAction:   null,
    variant:        'default',
    loading:        false,
};

ActivityCard.displayName = 'ActivityCard';

export default ActivityCard;
