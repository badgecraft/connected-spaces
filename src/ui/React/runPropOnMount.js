import { lifecycle } from 'recompose';

export default ({ run }) => lifecycle({
    componentDidMount() {
        this.props[run]()
    },
});
