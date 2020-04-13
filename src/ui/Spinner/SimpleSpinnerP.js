import { branch, renderNothing } from 'recompose';
import View from './SimpleSpinner';

export default branch(({ loading }) => !loading, renderNothing)(View);
