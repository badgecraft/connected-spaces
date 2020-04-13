import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import { t } from 'ttag';
import styled from '@emotion/styled';
import Icon, { icons } from '../Icon/_Icon';

const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 300px;
`;

const Details = styled('p')`
    color: #3E3564;
    font-size: 12px;
    font-weight: 300;
    line-height: 16px;
`;

const NoResults = ({ noItems }) => (
    <Box mx={4} mb={4}>
        <Root>
            <div>
                <Icon image={icons.results} size={70} />
            </div>
            <h3>{t`No results found`}</h3>
            <Details>{noItems
            || t`Unfortunately, we can’t match results to your criteria. Try changing some filters to get more results.`}
            </Details>
        </Root>
    </Box>
);

NoResults.propTypes = {
    noItems: PropTypes.node,
};

NoResults.defaultProps = {
    noItems: null,
};

export default NoResults;
