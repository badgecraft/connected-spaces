import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import { getContext } from 'recompose';
import Button from '../Button';
import Thumb from '../BadgeClass/BadgeThumb';

const Root = styled(Box)({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'flex-start',
    marginBottom:   16,
    flexDirection:  'column',
});

const BadgeClassListItem = ({ item, issuePath, paths }) => {
    const issueEnabled = _get(item, 'perms.issue.value') === 1;
    const canInviteToStart = _get(item, 'perms.codes.value') === 1 && !!item.evidenceRequired;
    const issueLabel = canInviteToStart ? t`Invite to start mission` : t`Issue badge`;

    return (
        <Root width={[1, 1 / 2, 1 / 3, 1 / 4]} title={item.name}>
            <Thumb
                badgeClass={item}
                link={_get(item, 'perms.view.value') === 1 && {
                    to:     paths.badgeClassView,
                    params: { id: item.id, projectId: item.projectId }
                }}
            />
            {(issueEnabled || canInviteToStart) && <Button
                label={issueLabel}
                variant="primary"
                size="smaller"
                type="link"
                to={issuePath}
                params={{ badgeClass: item.id, id: item.projectId }}
            />}
        </Root>
    );
};

BadgeClassListItem.propTypes = {
    item:      PropTypes.shape({
        id:               PropTypes.string.isRequired,
        name:             PropTypes.string.isRequired,
        picture:          PropTypes.string.isRequired,
        projectId:        PropTypes.string.isRequired,
        perms:            PropTypes.shape({
            view:  PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            issue: PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            codes: PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
        }).isRequired,
        evidenceRequired: PropTypes.bool,
    }).isRequired,
    issuePath: PropTypes.string.isRequired,
    paths:     PropTypes.shape({
        badgeClassView: PropTypes.string.isRequired,
    }).isRequired,
};

export default getContext({
    paths: PropTypes.shape().isRequired,
})(BadgeClassListItem);
