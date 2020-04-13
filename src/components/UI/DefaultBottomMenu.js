import { withProps } from 'recompose';
import _get from 'lodash/get';
import { t } from 'ttag';
import BottomMenu from './BottomMenu';
import paths from '../../constants/paths';

export default withProps(({ route = { path: '' }, mapType }) => {
    const isRoute = path => _get(route, 'path') === path;
    const isQuery = (paramName, value) => _get(route, ['query', paramName]) === value;

    const isHome = isRoute(paths.home) && !isQuery('view', 'map');
    const isMap = isRoute(paths.home) && isQuery('view', 'map');
    const isPlaylist = isRoute(paths.playlistSearch);

    return {
        items: [
            {
                title:   t`Home`,
                active:  isHome,
                icon:    'home',
                to:      paths.home,
                enabled: true,
            },
            {
                title:   t`Opportunities`,
                active:  isRoute(paths.opportunities),
                icon:    'list',
                to:      paths.opportunities,
                enabled: true,
            },
            {
                title:   t`Playlist`,
                active:  isPlaylist,
                icon:    'play',
                to:      paths.playlistSearch,
                enabled: true,
            },
            {
                title:   t`Map`,
                active:  isMap,
                icon:    'location',
                to:      paths.map,
                enabled: mapType === 'map',
            },
        ],
    };
})(BottomMenu);
