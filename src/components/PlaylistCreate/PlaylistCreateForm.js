/* eslint no-script-url: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, renderComponent, branch } from 'recompose';
import { t } from 'ttag';
import Layout from '../Layout';
import Header from '../UI/DefaultFormHeader';
import Step1 from './PlaylistCreateStep1';
import Step2 from './PlaylistCreateStep2';
import Step3 from './PlaylistCreateStep3';
import Step4 from './PlaylistCreateStep4';
import Step from './Step';
import Footer from './PlaylistCreateFooter';
import { withPlaylistSteps, LoadingStep } from './playlistUtils';

// todo input with maxLength and counter
// todo richtext editor
// todo form-leave warning
// todo mobile back button not consistent

const TOTAL_STEPS = 4;

const PlaylistCreateForm = ({ viewer, route, step, ...props }) => (
    <Layout
        viewer={viewer}
        route={route}
        header={<Header
            title={t`Create learning playlist`}
            back={{ href: 'javascript:history.back()' }}
            right={<Step current={step} total={TOTAL_STEPS} />}
        />}
        footer={null}
        bottomMenu={null}
    >
        <FormStep mode="create" step={step} totalSteps={TOTAL_STEPS} {...props} />
        <Footer />
    </Layout>
);

PlaylistCreateForm.propTypes = {
    viewer: PropTypes.shape().isRequired,
    route:  PropTypes.shape().isRequired,
    step:   PropTypes.number.isRequired,
};

const FormStep = compose(
    branch(({ step }) => step === 1, renderComponent(Step1)),
    branch(({ step }) => step === 2, renderComponent(Step2)),
    branch(({ step }) => step === 3, renderComponent(Step3)),
    branch(({ step }) => step === 4, renderComponent(Step4)),
)(LoadingStep);

export default withPlaylistSteps({ totalSteps: TOTAL_STEPS })(PlaylistCreateForm);
