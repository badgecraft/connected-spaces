/* eslint-disable max-len */

if (process.env.BROWSER) {
    throw new Error(
        'Do not import `config.js` from inside the client-side code.',
    );
}

const badgecraftHost = 'https://www.badgecraft.eu';

module.exports = {
    // Node.js app
    port: process.env.PORT || 3000,

    // https://expressjs.com/en/guide/behind-proxies.html
    trustProxy: process.env.TRUST_PROXY || 'loopback',

    // API Gateway
    api: {
        // API URL to be used in the client-side code
        clientUrl: process.env.API_CLIENT_URL || '',
        // API URL to be used in the server-side code
        serverUrl:
                   process.env.API_SERVER_URL ||
                       `http://localhost:${process.env.PORT || 3000}`,
    },

    // Web analytics
    analytics: {
        // https://analytics.google.com/
        googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
    },

    webAddress: process.env.WEB_ADDRESS || 'http://localhost:3000',

    // Authentication
    auth: {
        jwt: { secret: process.env.JWT_SECRET || 'change-this-to-random-str' },

        badgecraft: {
            apiHost:      process.env.BADGECRAFT_API_HOST || badgecraftHost,
            host:         process.env.BADGECRAFT_HOST || badgecraftHost,
            externalHost: process.env.BADGECRAFT_EXTERNAL_HOST || badgecraftHost,
            id:           process.env.OAUTH_ID || 'b04fd095-a9cc-4ab2-804c-6f87656d0794',
            secret:       process.env.OAUTH_SECRET || 'todo-request-from-badgecraft',
        },

        // https://developers.facebook.com/
        facebook: {
            id:     process.env.FACEBOOK_APP_ID,
            secret: process.env.FACEBOOK_APP_SECRET,
        },
    },

    wpURL: process.env.WP_URL || 'http://localhost:8001',
};
