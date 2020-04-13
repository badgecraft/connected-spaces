import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _DateTime from 'react-datetime';
import TimeField from 'react-simple-timefield';
import moment from 'moment';
import { mapProps } from 'recompose';
import { Colors } from '../Constants';
import Icon, { icons } from '../Icon/_Icon';
import Field from './FormField';

const borderColor = ({ error }) => error ? Colors.error : Colors.inputBorder;

const Root = styled('div')`
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid ${borderColor};
    height: 40px;
    font-size: 16px;
`;

const Picker = styled('div')`
    border-left: 1px solid ${borderColor};
    display: inline-block;
    line-height: 40px;
    padding-left: 12px;
`;

const DateTime = styled(_DateTime)`
    display: inline-block;
    width: auto;
`;

const Input = styled("input")`
    border: 0 none;
    outline: none;
    font-size: 16px;
    color: ${Colors.heading};
    ${({ size }) => size && `width: ${size}px;`}
`;

const Label = styled('label')`
    cursor: pointer;
    padding: 10px 14px;
`;

const setDate = (value, date) => moment(value || new Date())
    .set('year', date.get('year'))
    .set('month', date.get('month'))
    .set('date', date.get('date'))
    .format();

const setTime = (value, time) => {
    const [hour, minute] = `${time}`.split(":");
    return moment(value || new Date())
        .set({ hour, minute })
        .format();
};

export class RawDateTimePicker extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name:     PropTypes.string.isRequired,
        error:    PropTypes.string,
    };

    static defaultProps = {
        value: null,
        error: null,
    };

    render() {
        const { onChange, value, name, error } = this.props;
        const current = moment(value);
        const id = `${name}_date`;

        return (<Root error={error}>
            <Label htmlFor={id}>
                <Icon image={icons.dateDark} size={13} />
            </Label>
            <Picker error={error}>
                <DateTime
                    dateFormat="MMMM D, YYYY"
                    timeFormat={false}
                    closeOnSelect
                    renderInput={(inputProps, onFocus) => (
                        <Input readOnly onFocus={onFocus} {...inputProps} id={id} />
                    )}
                    onChange={(date) => {
                        onChange(setDate((current.isValid() && current) || null, date));
                        if (this.timeInput) {
                            if (this.timeInput.setSelectionRange) {
                                this.timeInput.setSelectionRange(0, 0);
                            }
                            this.timeInput.focus();
                        }
                    }}
                    value={(current.isValid() && current) || null}
                />
                {current.isValid() && <TimeField
                    input={<Input innerRef={(ref) => {
                        this.timeInput = ref;
                    }} size={50} />}
                    value={current.format("HH:mm")}
                    onChange={newValue => onChange(setTime((current.isValid() && current) || null, newValue))}
                />}
            </Picker>
        </Root>);
    }
}

export default mapProps(({ input, meta: { error }, label, help, required, ...props }) => ({
    label,
    help,
    error,
    required,
    children: (<RawDateTimePicker {...props} {...input} error={error} />),
}))(Field);
