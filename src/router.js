import UniversalRouter from 'universal-router';
import routes from './routes';
import errorAction from './routes/error/index';

export default new UniversalRouter(routes, {
    resolveRoute(context, params) {
        if (typeof context.route.load === 'function') {
            return context.route
                .load()
                .then(action => action.default(context, params));
        }
        if (typeof context.route.action === 'function') {
            return context.route.action(context, params);
        }
        return undefined;
    },
    errorHandler: errorAction,
});
