import { withProps } from 'recompose';
import Tag from './Tag';

export default withProps(({ children }) => ({ children: `#${children}` }))(Tag);
