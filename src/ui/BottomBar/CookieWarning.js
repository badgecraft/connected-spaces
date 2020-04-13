import { compose, withHandlers } from 'recompose';
import CookieWarning from './CookieWarningView';

export default compose(
    withHandlers({
        onClick: ({ cookies, setCookie, cookieName }) => () => {
            cookies.set(cookieName, "1", { maxAge: 60 * 60 * 24 * 3650 });
            setCookie(true);
        },
    }),
)(CookieWarning);
