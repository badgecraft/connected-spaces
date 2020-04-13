import d from 'duration';
import { msgid, ngettext } from 'ttag';

const stringifyUnit = (value, unit) => {
    switch (unit) {
        case 'second':
            return ngettext(msgid`${value} second`, `${value} seconds`, value);
        case 'minute':
            return ngettext(msgid`${value} minute`, `${value} minutes`, value);
        case 'hour':
            return ngettext(msgid`${value} hour`, `${value} hours`, value);
        case 'day':
            return ngettext(msgid`${value} day`, `${value} days`, value);
        case 'month':
            return ngettext(msgid`${value} month`, `${value} months`, value);
        case 'year':
            return ngettext(msgid`${value} year`, `${value} years`, value);
        default:
            return '';
    }
};

export default seconds => d.stringifyDuration(seconds, { unit: 'second', stringifyUnit });
