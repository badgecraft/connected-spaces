import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';

export default ({ config, paths }) => {
    passport.use(
        new OAuth2Strategy(
            {
                authorizationURL: `${config.auth.badgecraft.externalHost}/auto/authorize`,
                tokenURL:         `${config.auth.badgecraft.host}/api/oauth/token`,
                clientID:         config.auth.badgecraft.id,
                clientSecret:     config.auth.badgecraft.secret,
                callbackURL:      `${config.webAddress}${paths.authorizeCallback}`,
                scope:            'default',
                state:            true,
            },
            (accessToken, refreshToken, profile, cb) => {
                cb(null, { accessToken });
            },
        ),
    );

    return passport;
};
