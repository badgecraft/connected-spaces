import React from 'react';
import { t, ngettext, msgid } from 'ttag';
import { withStateHandlers } from 'recompose';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import Error from '../../ui/Form/Error';
import Back from './FormBack';
import { paths } from '../Constants';
import SimpleSpinner from '../../ui/Spinner/LineSpinner';

export const translations = {
    required:                       () => t`Required`,
    'playlistActivities.minLength': ({ min }) => {
        const count = parseInt(min, 10) || 0;
        return ngettext(
            msgid`At least ${min} activity is required for playlist`,
            `At least ${min} activities are required for playlist`,
            count,
        );
    },
    'videos.invalidArray':          () => t`Not all videos are valid`,
    'invalidVideoUrl':              () => t`Please check that you have copied a valid youtube or vimeo video link`,
    oneMandatoryRequired:           () => t`At least one activity is mandatory`,
};

export const toBack = (step, prevStep, error) => {
    if (error) {
        return (<Error>{error}</Error>);
    }

    if (step === 1) {
        return t`You can edit these details at any time`;
    }

    return (<Back type="button" onClick={prevStep}>{t`Back`}</Back>);
};

export const withPlaylistSteps = ({ totalSteps }) => withStateHandlers({ step: 1 }, {
    prevStep: ({ step }) => () => {
        setTimeout(() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }), 0);
        return { step: step > 1 ? step - 1 : step };
    },
    nextStep: ({ step }) => () => {
        setTimeout(() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }), 0);
        return { step: step < totalSteps ? step + 1 : step };
    },
    noStep:   () => () => ({ step: 0 }),
});

export const toCancel = ({ mode, organisation, playlist }) => {
    if (mode === 'create') {
        return organisation
            ? { to: paths.orgDashboardPlaylists, params: { id: organisation } }
            : { to: paths.dashboard };
    }

    return { to: paths.activityView, params: { id: _get(playlist, 'id') } };
};


const LoadingCont = styled('div')({
    minHeight:      300,
    display:        'flex',
    alignItems:     'center',
    textAlign:      'center',
    justifyContent: 'center',
});

export const LoadingStep = () => (
    <React.Fragment key="ls">
        <SimpleSpinner />
        <LoadingCont>
            {t`Please wait...`}
        </LoadingCont>
    </React.Fragment>
);
