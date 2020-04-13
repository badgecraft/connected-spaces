/* eslint no-underscore-dangle: 0 */

export const disableReRouteOnClient = run => {
    window.__disableUniversalRouter = true;
    run();
    window.__disableUniversalRouter = false;
};

export const isDisabledReRouteOnClient = () => !!window.__disableUniversalRouter;

export const disableNextScrollRestore = (run, disable = false) => {
    window.__disableScrollRestore = disable;
    run();
};

export const runScrollRestore = run => {
    if (!window.__disableScrollRestore) {
        run();
    }
    delete window.__disableScrollRestore;
};
