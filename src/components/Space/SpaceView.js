import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@rebass/emotion';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { t } from 'ttag';
import Verified from '../UI/Verified';
import { breakpoints, Colors, paths } from '../Constants';
import Address from '../UI/EventAddress';
import Phone from '../UI/Phone';
import Contacts from '../UI/Contacts';
import Button from '../../ui/Button';
import Details from '../../ui/Project/DetailBox';
// import Badge from '../UI/EventBadge';
// import Reviews from '../UI/ReviewList';
// import Photos from '../UI/PhotoList';
import Events from '../UI/EventList';
import EventCover from '../UI/EventCover';
import Viewport from '../../ui/Layout/Viewport';
import Location from '../../components/Shared/GoogleMaps/SingleLocation';
import Markdown from '../../ui/Markdown';
import DeleteButton from './SpaceDeleteButton';
import Tabs from '../../ui/Project/ProjectTabs';
import VerifyBox from '../../ui/Organisation/OrganisationRequestVerifyBox';

const Container = styled(Box)`
    background-color: ${Colors.white};
`;

const Info = styled(Box)`
    background-color: ${Colors.white};
    box-shadow: 0 14px 14px 0 rgba(0,0,0,0.07);
`;

const Name = styled('h1')({
    color:                Colors.heading,
    fontSize:             18,
    fontWeight:           'bold',
    lineHeight:           '24px',
    letterSpacing:        '0.14px',
    [breakpoints.mobile]: {
        fontSize:      24,
        lineHeight:    '32px',
        letterSpacing: '0.18px',
    },
});

const CoverInfo = styled(Viewport)({
    textAlign:               'center',
    display:                 'flex',
    alignItems:              'center',
    justifyContent:          'center',
    height:                  '100%',
    [breakpoints.tabletMax]: { display: 'none' },
});

const Cont = styled(Flex)({ flexWrap: 'wrap' });

// todo separate cover and picture
// eslint-disable-next-line max-len
const SpaceView = ({ organisation: { id, picture, name, projects, perms, contacts, website, ...organisation }, ...props }) => {
    const { address, location } = organisation;
    const list = (_get(projects, 'list', []) || []).filter(item => item);
    // const badgeCount = (<Badge key="badgeCount" dark count={0} />);
    // const photoCount = 0;
    return (
        <Container mb={4} {...props}>
            <EventCover picture={picture} meta={organisation.pictureMeta}>
                <CoverInfo>
                    {/* <img alt={name} src={picture} width={144} /> */}
                </CoverInfo>
            </EventCover>
            <Tabs
                color={_get(organisation, 'pictureMeta.dominantColor')}
                tabs={[
                    {
                        label:  t`Overview`,
                        active: true,
                        to:     paths.spaceView,
                        params: { id },
                    },
                ]}
            />

            <Viewport>
                <Cont>
                    <Box width={[1, 1, 1 / 3]} order={[1, 1, 2]}>
                        <Info mb={0} mx={0} p={3}>
                            <Name>{organisation.verified && <Verified />}{name}</Name>

                            <VerifyBox id={id} verifyPath={paths.requestOrganisationVerify} />

                            <Address address={address} />
                            <Phone contacts={contacts} />
                            <Contacts contacts={contacts} website={website} />

                            {_get(perms, 'edit.value') === 1 &&
                            <Button
                                type="link"
                                to={paths.orgDashboardSettings}
                                params={{ id }}
                                fullWidth
                                label={t`Edit`}
                                variant="primary"
                            />}

                            {_get(perms, 'createProject.value') === 1 &&
                            <Button
                                type="link"
                                to={paths.eventCreateOrganisation}
                                params={{ id }}
                                variant="secondary"
                                fullWidth
                                label={t`Create opportunity`}
                            />}

                            <br /><br />

                            <DeleteButton id={id} fullWidth />
                        </Info>
                    </Box>
                    <Box width={[1, 1, 2 / 3]} order={[2, 2, 1]} pr={[0, 0, 4]}>
                        <Details title={t`What we do`}>
                            <Markdown source={organisation.description} />
                        </Details>

                        {location && <Details title={t`Location`}>
                            <Location location={location} address={address} />
                        </Details>}

                        {/* <Details title={t`Skills`}>TODO</Details> */}

                        {/* <Details title={jt`Badges ${badgeCount}`}>TODO</Details> */}

                        {/* <Details title={t`Photos (${photoCount})`} all={{ to: "?all" }}><Photos /></Details> */}

                        {/* <Details title={t`Reviews`} all={{ to: "?all" }}><Reviews /></Details> */}
                    </Box>
                </Cont>
            </Viewport>
            <Viewport>
                <Box width={1}>
                    {list.length > 0 &&
                    <Details title={t`Opportunities`}>
                        <Events
                            horizontal
                            list={list}
                            ml={-3}
                            mr={-3}
                            total={_get(projects, 'total', 0)}
                            width={[1, 1 / 2, 1 / 2]}
                            hasNext={false} // todo how to do it better?
                            loadNext={() => null}
                            loading={false}
                        />
                    </Details>}
                </Box>
            </Viewport>
        </Container>
    );
};

SpaceView.propTypes = {
    organisation: PropTypes.shape({
        id:           PropTypes.string.isRequired,
        name:         PropTypes.string.isRequired,
        picture:      PropTypes.string.isRequired,
        verified:     PropTypes.bool.isRequired,
        verifyStatus: PropTypes.oneOf(['notVerified', 'pending', 'verified']).isRequired,
        address:      PropTypes.string,
        location:     PropTypes.shape(),
        projects:     PropTypes.shape({
            total: PropTypes.number.isRequired,
            list:  PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
            })).isRequired,
        }).isRequired,
        perms:        PropTypes.shape({
            edit:          PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            createProject: PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
        }).isRequired,
        isPublic:     PropTypes.bool.isRequired,
        pictureMeta:  PropTypes.shape({
            dominantColor: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default SpaceView;
