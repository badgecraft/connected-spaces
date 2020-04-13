import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderNothing } from 'recompose';
import momentTz from 'moment-timezone';
import moment from 'moment';

const toMoment = (time, zone) => {
    if (zone) {
        return momentTz(time).tz(zone);
    }

    return moment(time);
};

const DateTime = ({ ts, tz }) => (
    <span>{toMoment(ts, tz).format('D MMMM, HH:mm')}</span>
);

DateTime.propTypes = {
    ts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    tz: PropTypes.string,
};

DateTime.defaultProps = {
    tz: null,
};

export default branch(({ ts }) => !ts, renderNothing)(DateTime);
