import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { branch, compose, renderNothing, withHandlers, withState } from 'recompose';
import styled from '@emotion/styled';
import { t } from 'ttag';
import mutation from './updateBadge.gql';
import Button from '../Button';
import { font14A3, font16A1 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')({
    marginTop:    8,
    marginBottom: 8,
});

const Message = styled('div')(({ theme }) => ({
    ...font14A3,
    marginBottom: 8,

    [themedMinWidth('tablet', theme)]: {
        ...font16A1,
    },
}));

const BadgeEnableShareView = ({ onClick, busy }) => (
    <Root>
        <Message>{t`Badge must be visible to everyone to share it`}</Message>
        <Button
            type="button"
            disabled={busy}
            onClick={onClick}
            size="smaller"
            variant="primary"
            label={t`Change policy to enable sharing`}
        />
    </Root>
);

BadgeEnableShareView.propTypes = {
    onClick: PropTypes.func.isRequired,
    busy:    PropTypes.bool.isRequired,
};

const BadgeEnableShare = compose(
    branch(({ userBadge }) => !(userBadge && userBadge.mine && userBadge.viewPolicy !== 'anyone'), renderNothing),
    withState('busy', 'setBusy', false),
    graphql(mutation, { name: 'runUpdateBadge' }),
    withHandlers({
        onClick: ({ setBusy, runUpdateBadge, userBadge }) => () => {
            setBusy(true);
            runUpdateBadge({ variables: { id: userBadge.id, viewPolicy: 'anyone' } })
                .catch(() => null)
                .then(() => setBusy(false));
        },
    })
)(BadgeEnableShareView);

BadgeEnableShare.propTypes = {
    userBadge: PropTypes.shape({
        id:         PropTypes.string.isRequired,
        viewPolicy: PropTypes.string,
        mine:       PropTypes.bool.isRequired,
    }).isRequired,
};

export default BadgeEnableShare;
