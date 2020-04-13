import PropTypes from 'prop-types';
import { compose, withProps, withHandlers, getContext, withStateHandlers } from 'recompose';
import _get from 'lodash/get';
import { graphql } from 'react-apollo';
import { t } from 'ttag';
import View from './UserEmailsFormView';
import makePrimary from './updateUserPrimaryEmailMutation.gql';
import addEmail from './addUserEmailMutation.gql';
import removeEmail from './removeUserEmailMutation.gql';

const withBusy = ({ email, setBusyEmail, setStatus, func }) =>
    Promise.resolve(setStatus(null))
        .then(() => setBusyEmail(email))
        .then(func)
        .catch(() => null)
        .then(() => setBusyEmail(null));

const UserEmailsForm = compose(
    withStateHandlers({
        busyEmail:    null,
        addEmailOpen: false,
        status:       null,
    }, {
        setBusyEmail:    () => busyEmail => ({ busyEmail }),
        setAddEmailOpen: () => addEmailOpen => ({ addEmailOpen }),
        onAdded:         () => email => ({ status: t`${email} added. Check inbox and fallow link to verify` }),
        setStatus:       () => status => ({ status }),
    }),
    graphql(makePrimary, { name: 'runMakePrimary' }),
    graphql(addEmail, { name: 'runAddEmail' }),
    graphql(removeEmail, { name: 'runRemoveEmail' }),
    getContext({ platforms: PropTypes.arrayOf(PropTypes.string).isRequired }),
    withProps(({ me, platforms, busyEmail }) => ({
        emails:   (_get(me, 'emails') || []).map(em => ({ ...em, busy: em.email === busyEmail })),
        platform: platforms[0],
    })),
    withHandlers({
        onRemove:       ({ runRemoveEmail, setBusyEmail, setStatus }) => email => withBusy({
            setBusyEmail,
            setStatus,
            email,
            func: () => runRemoveEmail({ variables: { email } })
                .then(() => setStatus(t`Email ${email} removed`)),
        }),
        onMakePrimary:  ({ runMakePrimary, setBusyEmail, setStatus }) => email => withBusy({
            setBusyEmail,
            setStatus,
            email,
            func: () => runMakePrimary({ variables: { email } })
                .then(() => setStatus(t`Email ${email} now is primary`)),
        }),
        onReSendVerify: ({ runAddEmail, platform, setBusyEmail, setStatus }) => email => withBusy({
            setBusyEmail,
            setStatus,
            email,
            func: () => runAddEmail({ variables: { email, platform } })
                .then(() => setStatus(t`Check your ${email} inbox and fallow the link to verify`)),
        }),
    }),
)(View);

UserEmailsForm.displayName = 'UserEmailsForm';

export default UserEmailsForm;
