/* eslint no-script-url: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, renderComponent, branch } from 'recompose';
import { t } from 'ttag';
import _get from 'lodash/get';
import Layout from '../Layout';
import Header from '../UI/DefaultFormHeader';
import Step1 from './PlaylistEditStep1';
import Step2 from './PlaylistEditStep2';
import Step3 from './PlaylistEditStep3';
import Step4 from './PlaylistEditStep4';
import Step from './Step';
import Footer from './PlaylistCreateFooter';
import { withPlaylistSteps, LoadingStep } from './playlistUtils';
import { paths } from '../Constants';

const TOTAL_STEPS = 4;

const PlaylistEditForm = ({ viewer, route, step, ...props }) => {
    const { playlist } = props;
    const name = _get(props, 'playlist.name', '');
    return (
        <Layout
            viewer={viewer}
            route={route}
            header={<Header
                title={t`Update ${name}`}
                back={{ to: paths.activityView, params: playlist }}
                right={<Step current={step} total={TOTAL_STEPS} />}
            />}
            footer={null}
            bottomMenu={null}
        >
            <FormStep mode="edit" step={step} totalSteps={TOTAL_STEPS} {...props} />
            <Footer />
        </Layout>
    );
};

PlaylistEditForm.propTypes = {
    viewer:   PropTypes.shape().isRequired,
    route:    PropTypes.shape().isRequired,
    step:     PropTypes.number.isRequired,
    playlist: PropTypes.shape().isRequired,
};

const FormStep = compose(
    branch(({ step }) => step === 1, renderComponent(Step1)),
    branch(({ step }) => step === 2, renderComponent(Step2)),
    branch(({ step }) => step === 3, renderComponent(Step3)),
    branch(({ step }) => step === 4, renderComponent(Step4)),
)(LoadingStep);

export default withPlaylistSteps({ totalSteps: TOTAL_STEPS })(PlaylistEditForm);
