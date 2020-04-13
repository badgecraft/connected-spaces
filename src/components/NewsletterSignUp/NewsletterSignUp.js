import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { reduxForm, Field } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withState, branch, renderComponent } from 'recompose';
import prop from 'lodash/fp/prop';
import InputWithButton from '../Form/_InputWithButton';
import { breakpoints, Colors } from '../Constants';
import Form from '../Form/Form';
import validationHandler from "../../core/formValidationResult";

const mutation = gql`mutation signUpForNewsletter($email:String) {
    newsLetter(email: $email) {
        ok
        errors {
            field
            code
            parent
            type
            args {
                name
                value
            }
        }
    }
}`;

const Title = styled('h6')({
    fontSize:             12,
    fontWeight:           500,
    lineHeight:           '23px',
    color:                Colors.tagDefaultText,
    margin:               '10px 0 5px',
    [breakpoints.mobile]: {
        fontSize:   18,
        lineHeight: '23px',
    },
});

const NewsletterSignUp = ({ handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
        <Title>{t`Signup for updates`}</Title>
        <Field
            component={InputWithButton}
            name="email"
            placeholder={t`Your email`}
            fullWidth
        />
    </Form>
);

NewsletterSignUp.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

const Signed = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height; 19px;
    color: ${Colors.heading};
`;

const NewsLetterDone = () => (
    <Signed>{t`Thank you, wait for your news letter`}</Signed>
);

export default compose(
    withState('done', 'setDone', false),
    graphql(mutation, {
        props: ({ mutate, ownProps: { setDone } }) => ({
            onSubmit: variables => mutate({ variables })
                .then(validationHandler({
                    mutation:     "newsLetter",
                    translations: {
                        required:      () => t`Please enter your email`,
                        invalidEmail:  () => t`Check that you'v entered a valid email`,
                        alreadySigned: () => t`You are already signed up`,
                    },
                }))
                .then(() => setDone(true))
        }),
    }),
    reduxForm({
        form: "NewsLetter",
    }),
    branch(prop('done'), renderComponent(NewsLetterDone)),
)(NewsletterSignUp);
