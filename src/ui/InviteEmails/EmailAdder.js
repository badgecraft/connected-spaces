/* eslint react/no-array-index-key:0 */
import React from 'react';
import { compose, withStateHandlers, branch, renderComponent, withHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Single from './InviteEmailsSingleView';
import Many from './InviteEmailsManyView';
import InviteRow from './InviteRowField';
import OtherFormErrors from '../Form/OtherFormErrors';

const EmailAdder = compose(
    withHandlers({
        onAddNew:    ({ fields, defaultItem = {} }) => () => fields.push({
            type:  'email',
            value: '',
            ...defaultItem,
        }),
        renderItems: ({ fields, teams }) => () => (
            <React.Fragment key="f">
                {fields.map((field, idx) => <Field
                    key={idx}
                    name={field}
                    component={InviteRow}
                    onRemove={fields.length > 1 ? (() => fields.remove(idx)) : null}
                    teams={teams}
                />)}
            </React.Fragment>
        ),
        renderInfo:  () => () => (<OtherFormErrors />),
    }),
    withStateHandlers({
        manyOpen: false,
    }, {
        onOpenMany:    (_, { onViewChange }) => () => {
            if (onViewChange) {
                onViewChange({ manyOpen: true })
            }
            return { manyOpen: true };
        },
        onCloseMany:   (_, { onViewChange }) => () => {
            if (onViewChange) {
                onViewChange({ manyOpen: false })
            }
            return { manyOpen: false };
        },
        onAddMultiple: (_, { fields, defaultItem = {}, onViewChange }) => str => {
            const toAdd = (str || '').split(/[,\n\s;]/)
                .map(email => email.trim())
                .filter(email => email)
                .map(v => ({ ...defaultItem, type: 'email', value: v }));
            const current = fields.getAll().filter(item => toAdd.length === 0 || item.value);

            fields.removeAll();
            [...current, ...toAdd].forEach(field => fields.push(field));

            if (onViewChange) {
                onViewChange({ manyOpen: false })
            }
            return { manyOpen: false };
        },
    }),
    branch(({ manyOpen }) => manyOpen, renderComponent(Many)),
)(Single);

EmailAdder.displayName = 'EmailAdder';

EmailAdder.propTypes = {
    fields:      PropTypes.shape({
        push:      PropTypes.func.isRequired,
        getAll:    PropTypes.func.isRequired,
        removeAll: PropTypes.func.isRequired,
        map:       PropTypes.func.isRequired,
    }).isRequired,
    defaultItem: PropTypes.shape({}),
};

export default EmailAdder;
