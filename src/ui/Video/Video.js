import { compose, branch, renderNothing, renderComponent } from 'recompose';
import Youtube from './YoutubeVideo';
import Vimeo from './VimeoVideo';
import YoutubePlaylist from './YoutubePlaylist';

const Nothing = renderNothing();

export default compose(
    branch(({ type }) => type === 'youtube', renderComponent(Youtube)),
    branch(({ type }) => type === 'vimeo', renderComponent(Vimeo)),
    branch(({ type }) => type === 'youtube-playlist', renderComponent(YoutubePlaylist)),
)(Nothing);
