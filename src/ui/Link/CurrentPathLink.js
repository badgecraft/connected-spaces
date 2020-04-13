import { getContext, mapProps, compose } from 'recompose';
import PropTypes from 'prop-types';
import Link, { toLink } from './Link';

export default compose(
    getContext({
        pathname: PropTypes.string.isRequired,
        query:    PropTypes.shape({}).isRequired,
    }),
    mapProps(({ pathname, query, appendQuery, ...props }) => {
        const { to } = props;
        const appendedQuery = { ...query, ...appendQuery };
        if (to) {
            return { ...props, query: appendedQuery };
        }
        return { ...props, href: toLink({ to: pathname, query: appendedQuery }) };
    }),
)(Link);
