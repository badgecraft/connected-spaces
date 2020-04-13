export const defaultLanguage = 'en';
export const enabledLanguages = ['en', 'lt', 'pt_BR', 'sl', 'es', 'fi', 'nl', 'de', 'it', 'fr', 'et'];

// todo need to change it with locale manifest
export const languages = [
    { code: 'en', name: 'English' },
    { code: 'lt', name: 'Lietuvių' },
    { code: 'de', name: 'Deutsch' },
    { code: 'et', name: 'Eesti' },
    { code: 'es', name: 'Española' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'ru', name: 'Русский' },
    { code: 'sl', name: 'Slovenščina' },
    { code: 'uk', name: 'Українська' },
    { code: 'it', name: 'Italiano' },
    { code: 'gl_ES', name: 'Galego' },
    { code: 'el', name: 'Ελληνικά' },
    { code: 'lv', name: 'Latviešu' },
    { code: 'hy', name: 'Հայերեն' },
    { code: 'ro', name: 'Română' },
    { code: 'fr', name: 'Français' },
    { code: 'ka', name: 'ქართული' },
    { code: 'fi', name: 'Suomi' },
    { code: 'pt_BR', name: 'Portugues (Brasil)' },
].filter(l => enabledLanguages.indexOf(l.code) !== -1);
