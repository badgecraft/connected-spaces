import PropTypes from 'prop-types';
import { branch, renderComponent } from 'recompose';
import Link from './Link';

const MaybeLink = branch(({ to }) => !to, renderComponent('div'))(Link);

MaybeLink.propTypes = {
    to: PropTypes.string,
};

MaybeLink.displayName = 'MaybeLink';

export default MaybeLink;
