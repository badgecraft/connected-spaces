import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Form/Input';
import Error from '../Form/Error';
import Select from '../Form/Select';
import Button from '../Button';
import FontIcon from '../Icons/FontIcon';
import { RootB, ActionsB, EmailB, TeamB } from './inviteEmailsStyle';

const InviteRowView = ({ value = {}, onRemove, onChange, disabled, error, teams = [] }) => {
    return (
        <RootB>
            <EmailB>
                <Input
                    value={value.value}
                    placeholder="name@example.com"
                    onChange={evt => onChange({ ...value, value: evt.target.value })}
                    disabled={disabled}
                />
                <Error>{Object.values(error || {}).join(', ')}</Error>
            </EmailB>
            {teams.length > 0 && (<TeamB>
                <Select
                    options={teams}
                    value={teams.find(tm => tm.value === value.team)}
                    onChange={to => onChange({ ...value, team: to.value })}
                    disabled={disabled}
                />
            </TeamB>)}
            <ActionsB>
                {onRemove && <Button
                    type="button"
                    variant="icon"
                    label={<FontIcon content="close" />}
                    size="small"
                    onClick={onRemove}
                    disabled={disabled}
                />}
            </ActionsB>
        </RootB>
    )
};

InviteRowView.propTypes = {
    value:    PropTypes.shape({
        type:  PropTypes.oneOf(['email']).isRequired,
        value: PropTypes.string.isRequired,
        team:  PropTypes.oneOf(['users', 'admins', 'owners']).isRequired,
    }).isRequired,
    onRemove: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    error:    PropTypes.string,
    teams:    PropTypes.shape({
        find: PropTypes.func.isRequired,
    }),
};

InviteRowView.defaultProps = {
    disabled: false,
    error:    null,
    onRemove: null,
    teams:    [],
};

export default InviteRowView;
