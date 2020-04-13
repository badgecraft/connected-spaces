import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import Input from '../Form/Input';
import FormField from '../Form/FormField';
import Button from '../Button';
import { Actions } from './inviteEmailsStyle';

class InviteEmailsManyView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    handleTextChange = evt => this.setState({ value: evt.target.value });

    render = () => {
        const { onCloseMany, onAddMultiple, disabled } = this.props;
        const { value } = this.state;
        return (
            <FormField label={t`Enter multiple email addresses`}>
                <Input
                    multiLine
                    placeholder="name1@domain.tld, name2@domain.tld"
                    value={value}
                    onChange={this.handleTextChange}
                    disabled={disabled}
                />

                <Actions>
                    <Button
                        variant="secondary"
                        label={t`Back`}
                        type="button"
                        onClick={onCloseMany}
                        disabled={disabled}
                    />
                    {' '}
                    <Button
                        variant="primary"
                        label={t`Add`}
                        type="button"
                        onClick={() => onAddMultiple(this.state.value)}
                        disabled={disabled}
                    />
                </Actions>
            </FormField>
        );
    };
}

InviteEmailsManyView.propTypes = {
    onCloseMany:   PropTypes.func.isRequired,
    onAddMultiple: PropTypes.func.isRequired,
    disabled:      PropTypes.bool,
};

InviteEmailsManyView.defaultProps = {
    disabled: false,
};

export default InviteEmailsManyView;
