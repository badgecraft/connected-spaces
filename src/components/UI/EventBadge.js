import { withProps } from 'recompose';
import Icon, { icons } from '../Icon/_Icon';

// TODO rename to Badge
export default withProps(({ count, dark = false }) => ({
    image:    dark ? icons.badgeDark : icons.badge,
    size:     21,
    children: count || 0,
    dark,
}))(Icon);


