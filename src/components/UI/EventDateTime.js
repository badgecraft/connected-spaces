import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import moment from 'moment';
import momentTz from 'moment-timezone';
import _get from 'lodash/get';
import { t } from 'ttag';
import Link from '../Link';
import { font16A5 } from '../../ui/uiFonts';
import FontIcon from '../../ui/Icons/FontIcon';

if (typeof window !== 'undefined') {
    window.momentTz = momentTz;
}

const Container = styled(Box)({
    ...font16A5,
    lineHeight: '15px',
});

// todo enable and implement 'add to calendar'
const AddContainer = styled('div')({
    marginTop: 5,
    display:   'none',
});

const Add = styled(Link)(({ theme }) => ({
    color: _get(theme, 'colors.primary')
}));

export const toMoment = (time, zone) => {
    if (zone) {
        return momentTz(time).tz(zone);
    }

    return moment(time);
};

const toEndTime = ({ eventStart, eventEnd, tz }) => {
    if (!eventStart || !eventEnd) {
        return null
    }
    const ms = toMoment(eventStart, tz);
    const me = toMoment(eventEnd, tz);

    if (ms.format('YYYY') !== me.format('YYYY')) {
        return me.format(' - dddd, MMMM D, YYYY HH:mm');
    }

    if (ms.format('MM') !== me.format('MM')
        || ms.format('DD') !== me.format('DD')) {
        return me.format(' - MMM D, HH:mm');
    }
    return me.format(' - HH:mm');
};

const EventDateTime = ({ eventStart, eventEnd, tz, ...props }) => {
    if (!eventStart && !eventEnd) {
        return null;
    }

    const eventEndsAt = toMoment(eventEnd, tz).format('dddd, MMMM D, YYYY HH:mm');
    return (
        <Container my={2} {...props}>
            <FontIcon content="calendar" style={{ marginRight: 4 }} />
            {eventStart && toMoment(eventStart, tz).format('dddd, MMMM D, YYYY HH:mm')}
            {eventStart && toEndTime({ eventStart, eventEnd, tz })}
            {!eventStart && t`Ends: ${eventEndsAt}`}
            <AddContainer>
                <Add to="?add-to-calendar">Add to calendar</Add>
            </AddContainer>
        </Container>
    );
};

EventDateTime.propTypes = {
    eventStart: PropTypes.string,
    eventEnd:   PropTypes.string,
    tz:         PropTypes.string,
};

EventDateTime.defaultProps = {
    eventStart: null,
    eventEnd:   null,
    tz:         null,
};

export default EventDateTime;
