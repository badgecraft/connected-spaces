import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _DateTime from 'react-datetime';
import TimeField from 'react-simple-timefield';
import moment from 'moment';
import { mapProps } from 'recompose';
import _get from 'lodash/get';
import Field from './FormField';
import calendar from './calendar.svg';
import { font16A6 } from '../uiFonts';
import Style from './DateTimePickerStyle';

const Root = styled('div')(({ theme }) => ({
    boxSizing:       'border-box',
    borderRadius:    10,
    border:          `1px solid ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    height:          40,
    backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),

    '.rdtPicker td.rdtActive, .rdtPicker td.rdtActive:hover': {
        backgroundColor: _get(theme, 'colors.primary', '#f91942'),
    },
    '.rdtPicker td.rdtToday:before':                          {
        borderBottomColor: _get(theme, 'colors.primary', '#f91942'),
    },
}));

const Picker = styled('div')(({ theme }) => ({
    borderLeft:  `1px solid ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    display:     'inline-block',
    lineHeight:  '40px',
    paddingLeft: 12,
    whiteSpace:  'nowrap',
}));

const DateTime = styled(_DateTime)`
    display: inline-block;
    width: auto;
`;

const Input = styled('input')(({ size, theme }) => ({
    ...font16A6,
    border:          '0 none',
    outline:         'none',
    color:           '#3E3564',
    ...(size && { width: size }),
    backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
}));

const Label = styled('label')({
    cursor:  'pointer',
    padding: '10px 14px',
});

const setDate = (value, date) => moment(value || new Date())
    .set('year', date.get('year'))
    .set('month', date.get('month'))
    .set('date', date.get('date'))
    .format();

const setTime = (value, time) => {
    const [hour, minute] = `${time}`.split(':');
    return moment(value || new Date())
        .set({ hour, minute })
        .format();
};

const Calendar = styled('span')({
    display:       'inline-block',
    width:         13,
    height:        13,
    background:    `transparent url("${calendar}") center center/contain no-repeat`,
    verticalAlign: 'middle',
});

export class RawDateTimePicker extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name:     PropTypes.string.isRequired,
        error:    PropTypes.string,
    };

    static contextTypes = {
        lang: PropTypes.string.isRequired,
    };

    static defaultProps = {
        value: null,
        error: null,
    };

    render() {
        const { onChange, value, name, error } = this.props;

        const current = moment(value);
        const id = `${name}_date`;

        return (<React.Fragment>
            <Style />
            <Root error={error}>
                <Label htmlFor={id}><Calendar /></Label>
                <Picker error={error}>
                    <DateTime
                        dateFormat="MMMM D, YYYY"
                        timeFormat={false}
                        closeOnSelect
                        locale={this.context.lang}
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
                        value={current.format('HH:mm')}
                        onChange={newValue => onChange(setTime((current.isValid() && current) || null, newValue))}
                    />}
                </Picker>
            </Root>
        </React.Fragment>);
    }
}

export default mapProps(({ input, meta: { error }, label, help, required, ...props }) => ({
    label,
    help,
    error,
    required,
    children: (<RawDateTimePicker {...props} {...input} error={error} />),
}))(Field);
