import { compose, mapProps, withHandlers, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Input from '../Form/Input';
import mutation from './updateGoalTitleMutation.gql';

const EditableGoalTitle = compose(
    withStateHandlers(({ value = '' }) => ({
        disabled: false,
        value,
    }), {
        setBusy:  () => disabled => ({ disabled }),
        onChange: () => evt => ({ value: evt.target.value }),
    }),
    graphql(mutation, { name: 'runUpdate' }),
    withHandlers({
        onSave: ({ setBusy, runUpdate, onComplete }) => () => {
            setBusy(true);
            runUpdate()
                .catch(() => null)
                .then(() => setBusy(false))
                .then(onComplete);
        },
    }),
    withHandlers({
        onBlur:    ({ onSave }) => onSave,
        onKeyDown: ({ onSave, onComplete }) => evt => {
            if (evt.keyCode === 13) {
                onSave();
            } else if (evt.keyCode === 27) {
                onComplete();
            }
        },
    }),
    mapProps(({ onSave, onComplete, ...props }) => props),
)(Input);

EditableGoalTitle.propTypes = {
    id:         PropTypes.string.isRequired,
    value:      PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
};

export default EditableGoalTitle;
