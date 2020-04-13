import moment from 'moment';
import momentTz from 'moment-timezone';

const toMoment = (time, zone) => {
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
    } else if (ms.format('MM') !== me.format('MM')
        || ms.format('DD') !== me.format('DD')) {
        return me.format(' - MMM D, HH:mm');
    }
    return me.format(' - HH:mm');
};


// eslint-disable-next-line import/prefer-default-export
export const toStartEndTime = ({ eventStart, eventEnd, tz }) => {
    const start = toMoment(eventStart, tz).format('dddd, MMMM D, YYYY HH:mm');
    const end = toEndTime({ eventStart, eventEnd, tz });

    if (end) {
        return `${start} ${end}`;
    }
    return start;
};
