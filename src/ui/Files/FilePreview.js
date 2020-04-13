import PropTypes from 'prop-types';
import { compose, getContext, withProps, branch, renderComponent, mapProps } from 'recompose';
import Generic from './GenericFilePreview';
import { toLink } from '../Link';
import Image from './ImageFilePreview';

export default compose(
    getContext({ baseURL: PropTypes.string.isRequired }),
    withProps(({ file, baseURL }) => ({
        href: toLink({ baseURL, to: file.publicPath, query: { download: 1 } }),
    })),
    mapProps(({ baseURL, ...props }) => props),
    branch(({ file }) => file && file.type && file.type.indexOf('image/') === 0, renderComponent(Image)),
)(Generic);
