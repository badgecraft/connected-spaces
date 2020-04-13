import { compose, branch, renderComponent } from 'recompose';
import Field from './DateTimePickerField';
import { Add } from './Optional';

export default compose(
    branch(({ input: { value } }) => !value, renderComponent(Add)),
)(Field);
