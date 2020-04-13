import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import Button from '../../ui/Button';

const Root = styled('div')({});

const PlaylistActions = ({ submitting, handleSubmit, back, next }) => (
    <Root>
        <Button
            label={t`Cancel`}
            variant="secondary"
            disabled={submitting}
            type="link"
            {...back}
        />{' '}
        {next || <Button
            label={t`Continue`}
            variant="primary"
            disabled={submitting}
            type="submit"
            onClick={handleSubmit}
        />}
    </Root>
);

PlaylistActions.propTypes = {
    submitting:   PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    back:         PropTypes.shape().isRequired,
    next:         PropTypes.node,
};

PlaylistActions.defaultProps = {
    next: null,
};

export default PlaylistActions;
