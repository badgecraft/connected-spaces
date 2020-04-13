import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import DetailBox from '../Project/DetailBox';
import { toTeamName } from './competenceUtils';
import QrImage from '../Qr/Qr';
import { font14A3 } from '../uiFonts';
import { toLink } from '../Link';

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

const QrBox = styled(Box)({
    textAlign:    'center',
    marginBottom: 12,
});

const ReviewRequestQuickInfoView = ({ reviewRequest, children, name, baseURL, paths, renderTitle, variant }) => {
    const child = (<React.Fragment key="rrqiv">
        {(reviewRequest.areas || []).map(area => (
            <Area key={area.id}>
                <AreaImage picture={area.image} />
                <AreaName>{area.name}</AreaName>
            </Area>
        ))}
        {reviewRequest && <QrBox>
            <QrImage
                name={t`request-review-${name}`}
                url={toLink({
                    baseURL,
                    to:     paths.competenceReviewRequestView,
                    params: reviewRequest
                })}
                downloadName={name}
            />
        </QrBox>}

        {children}
    </React.Fragment>);

    if (variant === 'clear') {
        return child;
    }

    return (
        <DetailBox title={renderTitle((reviewRequest.teams || []).map(toTeamName))}>
            {child}
        </DetailBox>
    );
};


ReviewRequestQuickInfoView.propTypes = {
    reviewRequest: PropTypes.shape({
        teams: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        areas: PropTypes.arrayOf(PropTypes.shape({
            id:    PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            name:  PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
    name:          PropTypes.string.isRequired,
    baseURL:       PropTypes.string.isRequired,
    children:      PropTypes.node,
    paths:         PropTypes.shape({
        competenceReviewRequestView: PropTypes.string.isRequired,
    }).isRequired,
    renderTitle:   PropTypes.func,
    variant:       PropTypes.oneOf(['default', 'clear']),
};

ReviewRequestQuickInfoView.defaultProps = {
    children:    null,
    renderTitle: reviewTeams => (reviewTeams ? t`Review request from ${reviewTeams}` : t`Review request`),
    variant:     'default',
};

export default ReviewRequestQuickInfoView;
