import { compose, branch, renderComponent } from 'recompose';
import EventOverview from '../Event/EventOverview';
import PlaylistOverview from '../Playlist/PlaylistOverview';

const is = type => ({ project }) => project && project.contexts && project.contexts.indexOf(type) !== -1;

export default compose(
    branch(is('event'), renderComponent(EventOverview)),
    branch(is('playlist'), renderComponent(PlaylistOverview)),
)(() => null);
