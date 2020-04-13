import { compose } from 'recompose';
import escapify from './escapify';
import modalOverflowify from './modalOverflowify';
import outsidify from './outsidify';

export default (opts = {}) => compose(
    modalOverflowify(opts),
    escapify(opts),
    outsidify(opts),
);
