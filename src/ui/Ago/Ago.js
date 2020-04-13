import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, getContext } from 'recompose';
import moment from 'moment';
import _get from 'lodash/get';

const Ago = ({ ts, systemTs, lang }) => (<span>{moment(ts).locale(lang).from(systemTs)}</span>);

Ago.propTypes = {
    ts:       PropTypes.number.isRequired,
    systemTs: PropTypes.number.isRequired,
    lang:     PropTypes.string.isRequired,
};

export default compose(
    getContext({ lang: PropTypes.string.isRequired }),
    connect(state => {
        const now = _get(state, 'runtime.now');
        const initialNow = _get(state, 'runtime.initialNow');
        const offset = _get(state, 'runtime.timeOffset', 0);

        return {
            systemTs: now ? (now + offset) : initialNow,
        };
    }),
)(Ago);
