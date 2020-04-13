import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, branch, renderComponent, getContext } from 'recompose';
import _get from 'lodash/get';
import { graphql } from 'react-apollo'
import styled from '@emotion/styled';
import { t } from 'ttag';
import { Content } from '../../components/UI/Content';
import query from './home.gql';
import Categories from '../../components/UI/Categories';
import Events from '../../components/Dashboard/DashboardEventList';
import Tag from '../../components/UI/SkillTag';
import Button from '../../ui/Button';
import Layout from '../../components/Layout';
import HomeMap from './HomeMap';
import HomeSearch from '../../components/UI/HomeSearch';
import { breakpoints } from '../../components/Constants';
import paths from '../../constants/paths';
import withViewOrganisers from '../../components/Space/withViewOrganisers';
import { font12, font14A2, font16, font16A1, font24, font24A1 } from '../../ui/uiFonts';

const Break = styled('div')({ height: 32 });

const BecomeContent = styled(Content)({
    [breakpoints.mobile]: {
        textAlign: 'center',
    },
});

const FeaturedSkillsH1 = styled('h2')({
    ...font14A2,
    color:                '#ffffff',
    // todo borer bottom when tabs are done.
    [breakpoints.mobile]: {
        ...font24A1,
    },
});

// todo feature skill tag

const OrganisersHeading = styled('h2')({
    ...font16,
    [breakpoints.mobile]: {
        ...font24A1,
    },
});

const OrganisersParagraph = styled('p')({
    ...font12,
    color:                '#3E3564',
    marginBottom:         16,
    [breakpoints.mobile]: {
        ...font16A1,
    },
});

const OpHeading = styled('h1')({
    ...font16,
    color:                '#3E3564',
    [breakpoints.mobile]: {
        ...font24,
        textAlign: 'center',
    }
});

const OpParagraph = styled('p')({
    ...font12,
    color:                '#3E3564',
    [breakpoints.mobile]: {
        ...font16A1,
        textAlign: 'center',
    },
});

const ViewPartnersButton = withViewOrganisers(Button);

// todo need data form server: category event count
const HomeDashboard = (allProps) => {
    const {
        projects, location, zoom, categories, title, skills, loading, pushRoute, coverUrl, mapType,
        newOrganisers, block1Config, block2Config, mapMarks, ...props
    } = allProps;
    const block1Heading = _get(block1Config, 'heading');
    const block1SubHeading = _get(block1Config, 'subHeading');
    const block2Heading = _get(block2Config, 'heading');
    const block2SubHeading = _get(block2Config, 'subHeading');
    return (
        <Layout {...props}>
            <HomeSearch
                mapMarks={mapMarks}
                defaultZoom={zoom}
                defaultLocation={location}
                coverUrl={coverUrl}
                mapType={mapType}
            />

            <Content mt={[3, 5, 5]} mb={[3, 4, 4]}>
                <OpHeading>{t`Featured Opportunities`}</OpHeading>
                <OpParagraph>{t`Choose your interest to find specific opportunities nearby`}</OpParagraph>
            </Content>
            <Content my={[2]} align="center">
                <Categories list={categories} active={null} />
            </Content>

            {(block1Heading || block1SubHeading) && <Content mt={[3, 4, 4]} mb={[3, 4, 4]}>
                <OpHeading>{block1Heading}</OpHeading>
                <OpParagraph>{block1SubHeading}</OpParagraph>
            </Content>}
            <Events
                config={_get(block1Config, 'type', 'none')}
                sort={_get(block1Config, 'projectSort', 'updatedAt')}
                order={_get(block1Config, 'projectOrder', 'desc')}
                horizontal
            />

            <Content mx={0} px={3} py={3} bg="#3E3564" align="center" color="#ffffff">
                <FeaturedSkillsH1>{t`Featured Skills`}</FeaturedSkillsH1>
                <div>
                    {skills
                        .filter(({ type }) => type === 'id')
                        .map(({ id, name }) => (<Tag key={id} id={id} dark>{name}</Tag>))}
                </div>
            </Content>

            {(block2Heading || block2SubHeading) && <Content mt={[3, 4, 4]} mb={[3, 4, 4]}>
                <OpHeading>{block2Heading}</OpHeading>
                <OpParagraph>{block2SubHeading}</OpParagraph>
            </Content>}
            <Events
                config={_get(block2Config, 'type', 'none')}
                sort={_get(block1Config, 'projectSort', 'updatedAt')}
                order={_get(block1Config, 'projectOrder', 'desc')}
                horizontal
            />

            {newOrganisers !== 'closed' && (<BecomeContent py={4}>
                <OrganisersHeading>{t`Featured Organisers`}</OrganisersHeading>
                {title &&
                <OrganisersParagraph>
                    {t`Diverse opportunities made available by many partners of ${title}`}
                </OrganisersParagraph>}

                <ViewPartnersButton
                    variant="become"
                    fullWidth={[true, false, false]}
                    type="link"
                    to={paths.verifiedSpaces}
                    label={t`View all partners`}
                />
                <Button
                    variant="become"
                    fullWidth={[true, false, false]}
                    type="link"
                    to={paths.spaceCreate}
                    label={t`Become a partner`} />
            </BecomeContent>)}

            <Break />
        </Layout>
    );
};

HomeDashboard.propTypes = {
    title:         PropTypes.string,
    projects:      PropTypes.arrayOf(PropTypes.shape()).isRequired,
    location:      PropTypes.shape({}),
    zoom:          PropTypes.number.isRequired,
    categories:    PropTypes.arrayOf(PropTypes.shape()).isRequired,
    skills:        PropTypes.arrayOf(PropTypes.shape({
        id:   PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    loading:       PropTypes.bool.isRequired,
    pushRoute:     PropTypes.func.isRequired,
    coverUrl:      PropTypes.string,
    mapType:       PropTypes.oneOf(['map', 'cover']).isRequired,
    newOrganisers: PropTypes.oneOf(['open', 'openApprove', 'closed']).isRequired,
    block1Config:  PropTypes.shape({
        type:         PropTypes.oneOf(['none', 'all', 'playlists', 'activities']).isRequired,
        heading:      PropTypes.string,
        subHeading:   PropTypes.string,
        projectSort:  PropTypes.oneOf(['createdAt', 'updatedAt', 'name', 'joined', 'visit']).isRequired,
        projectOrder: PropTypes.oneOf(['desc', 'asc']).isRequired,
    }).isRequired,
    block2Config:  PropTypes.shape({
        type:         PropTypes.oneOf(['none', 'all', 'playlists', 'activities']).isRequired,
        heading:      PropTypes.string,
        subHeading:   PropTypes.string,
        projectSort:  PropTypes.oneOf(['createdAt', 'updatedAt', 'name', 'joined', 'visit']).isRequired,
        projectOrder: PropTypes.oneOf(['desc', 'asc']).isRequired,
    }).isRequired,
};

HomeDashboard.defaultProps = {
    title:    null,
    location: null,
    coverUrl: null,
};

export default compose(
    getContext({
        lang:      PropTypes.string.isRequired,
        pushRoute: PropTypes.func.isRequired,
    }),
    withState('q', 'setQuery', ''),
    withState('category', 'setCategory', ''),
    graphql(query, {
        options: () => ({
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        }),
        props:   ({ data: { loading, ...data } }) => ({
            title:         _get(data, 'site.title', null),
            location:      _get(data, 'site.location', null),
            zoom:          _get(data, 'site.zoom', 12),
            projects:      _get(data, 'projects.list', []).filter(event => event),
            categories:    _get(data, 'site.categories', []),
            skills:        _get(data, 'projects.skillFacet', []),
            loading,
            coverUrl:      _get(data, 'site.coverUrl', null),
            mapType:       _get(data, 'site.mapType', 'map'),
            newOrganisers: _get(data, 'site.newOrganisers', 'closed'),
            block1Config:  _get(data, 'site.block1Config', {
                type:         'none',
                projectSort:  'updatedAt',
                projectOrder: 'desc',
            }),
            block2Config:  _get(data, 'site.block2Config', {
                type:         'none',
                projectSort:  'updatedAt',
                projectOrder: 'desc',
            }),
            mapMarks:      _get(data, 'site.mapMarks') || [],
        }),
    }),
    branch(({ route }) => _get(route, 'query.view') === 'map', renderComponent(HomeMap)),
)(HomeDashboard);
