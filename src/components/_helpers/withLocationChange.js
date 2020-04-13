import PropTypes from 'prop-types';
import { withProps, getContext, compose } from 'recompose';

// deprecated, use pushRoute from context
export default compose(
    getContext({ pushRoute: PropTypes.func.isRequired }),
    withProps(({ pushRoute }) => ({
        locationChange: pushRoute,
    }))
)
