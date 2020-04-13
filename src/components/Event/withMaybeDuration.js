import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import moment from 'moment';
import uiStringifyDuration from '../../ui/uiStringifyDuration';

export default connect(
    (state, { form }) => {
        let maybeDuration = null;
        const valueSelector = formValueSelector(form);
        const eventStart = valueSelector(state, 'eventStart');
        const eventEnd = valueSelector(state, 'eventEnd');
        const duration = valueSelector(state, 'duration');

        if (eventStart && eventEnd) {
            const es = moment(eventStart).startOf('minute');
            const ee = moment(eventEnd).startOf('minute');
            if (es.isValid() && ee.isValid() && ee.isAfter(es)) {
                maybeDuration = uiStringifyDuration(ee.diff(es, 's'));
            }
        }

        if (duration === maybeDuration) {
            return { maybeDuration: null };
        }

        return { maybeDuration };
    },
    (dispatch, { form }) => ({
        setMaybeDuration: (maybeDuration) => dispatch(change(form, 'duration', maybeDuration)),
    }),
);
