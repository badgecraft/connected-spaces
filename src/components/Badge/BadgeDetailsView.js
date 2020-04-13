import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import _get from 'lodash/get';
import { getContext, compose, branch, renderNothing } from 'recompose';
import Details from '../../ui/Project/DetailBox';
import NameAndPic from '../../ui/BadgeClass/NameAndPic';
import Share from '../../ui/Share';
import { toLink } from '../Link';
import { paths } from '../Constants';
import UBControl from '../../ui/BadgeClass/UserBadgeQuickControl';
import BadgeEnableShare from '../../ui/BadgeClass/BadgeEnableShare';

const BadgeDetailsView = ({ badgeClass, userBadge, baseURL }) => {
    const issuer = _get(badgeClass, 'userBadge.issuer')
        || _get(badgeClass, 'organisation')
        || _get(userBadge, 'issuer');
    const project = _get(badgeClass, 'userBadge.project')
        || _get(badgeClass, 'project')
        || _get(userBadge, 'issuer');
    const ub = userBadge || _get(badgeClass, 'userBadge');

    return (
        <React.Fragment key="ub">
            {ub && <Details>
                <Share
                    url={toLink({ to: paths.badgeView, params: { id: ub.id }, baseURL })}
                    enabled={ub && ub.isPublic}
                    toEnable={<BadgeEnableShare userBadge={ub} />}
                />
            </Details>}

            {ub && <UBControl userBadge={ub} />}

            {false && <Details>
                Export as ob
                delete badge
                issue, edit, qr codes etc...
            </Details>}

            {false && <Details>
                Owner
            </Details>}

            {false && <Details>
                Todo sharing
            </Details>}

            {project && <Details title={t`Activity`}>
                <NameAndPic entity={project} />
            </Details>}

            {issuer && <Details title={t`Issuer`}>
                <NameAndPic entity={issuer} />
            </Details>}
        </React.Fragment>
    );
};

BadgeDetailsView.propTypes = {
    badgeClass: PropTypes.shape({
        userBadge:    PropTypes.shape({
            issuer:  PropTypes.shape({
                name:    PropTypes.string.isRequired,
                picture: PropTypes.string.isRequired,
            }),
            project: PropTypes.shape({
                name:    PropTypes.string.isRequired,
                picture: PropTypes.string.isRequired,
            }).isRequired,
        }),
        organisation: PropTypes.shape({
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
        project:      PropTypes.shape({
            name:    PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
    }),
    userBadge:  PropTypes.shape({
        name:        PropTypes.string.isRequired,
        picture:     PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        isPublic:    PropTypes.bool.isRequired,
    }),
    baseURL:    PropTypes.string.isRequired,
};

BadgeDetailsView.defaultProps = {
    badgeClass: null,
    userBadge:  null,
};

export default compose(
    branch(({ badgeClass, userBadge }) => !badgeClass && !userBadge, renderNothing),
    getContext({ baseURL: PropTypes.string.isRequired }),
)(BadgeDetailsView);
