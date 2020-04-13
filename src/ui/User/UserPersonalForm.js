import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose, getContext, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo'
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import { t, ngettext, msgid } from 'ttag';
import View from './UserPersonalFormView';
import mutation from './updateUserPersonalMutation.gql';
import uiFormValidateHandler, { withTranslationArguments } from '../uiFormValidateHandler';
import { toLink } from '../Link';

const UserPersonalForm = compose(
    getContext({
        lang:    PropTypes.string.isRequired,
        baseURL: PropTypes.string.isRequired,
        route:   PropTypes.shape({}),
    }),
    graphql(mutation, { name: 'runUpdate' }),
    withHandlers({
        onSubmit: ({ runUpdate, lang, baseURL, route }) => variables =>
            runUpdate({ variables })
                .then(uiFormValidateHandler({
                    mutation:     'updateMe',
                    generalError: t`Please fix errors above`,
                    translations: {
                        required:     () => t`Required`,
                        tooShort:     withTranslationArguments(
                            { min: 'number' },
                            ({ min }) => ngettext(
                                msgid`Name cannot be shorter then ${min} character`,
                                `Name cannot be shorter then ${min} characters`,
                                min,
                            ),
                        ),
                        tooLong:      ({ max }) => withTranslationArguments(
                            { max: 'number' },
                            ngettext(
                                msgid`Name cannot be longer then ${max} character`,
                                `Name cannot be longer then ${max} characters`,
                                max,
                            ),
                        ),
                        notConfirmed: () => t`Email is not confirmed`,
                    },
                }))
                .then((res) => {
                    const newLang = _get(res, 'me.lang');
                    if (newLang && newLang !== lang) {
                        window.location.href = toLink({
                            baseURL,
                            to:    route.path,
                            query: { ...route.query, lang: newLang },
                        });
                    }
                }),
    }),
    withProps(({ me }) => ({
        initialValues: _pick(me, ['picture', 'displayName', 'country', 'lang', 'tz']),
    })),
    reduxForm({
        form:               'UserPersonal',
        enableReinitialize: true,
    }),
)(View);

UserPersonalForm.propTypes = {
    me: PropTypes.shape({}),
};

UserPersonalForm.defaultProps = {
    me: null,
};

export default UserPersonalForm;
