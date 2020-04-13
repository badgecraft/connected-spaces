import { parse } from 'accept-language-parser';
import { addLocale, useLocale } from 'ttag';

export const languages = [
    { code: "en", name: "English" },
    { code: "lt", name: "Lietuvių" },
    { code: "de", name: "Deutsch" },
    { code: "et", name: "Eesti" },
    { code: "es", name: "Española" },
    { code: "nl", name: "Nederlands" },
    { code: "ru", name: "Русский" },
    { code: "sl", name: "Slovenščina" },
    { code: "uk", name: "Українська" },
    { code: "it", name: "Italiano" },
    { code: "gl_ES", name: "Galego" },
    { code: "el", name: "Ελληνικά" },
    { code: "lv", name: "Latviešu" },
    { code: "hy", name: "Հայերեն" },
    { code: "ro", name: "Română" },
    { code: "fr", name: "Français" },
    { code: "ka", name: "ქართული" },
    { code: "fi", name: "Suomi" },
    { code: "pt_BR", name: "Portugues (Brasil)" },
];

export const detectLanguage = ({ enabledLanguages, defaultLanguage }) => (opts = {}) => {
    const { langCookieValue = "", acceptHeader = "", requestedLanguage } = opts;
    if (enabledLanguages.indexOf(requestedLanguage) !== -1) {
        return requestedLanguage;
    }

    if (enabledLanguages.indexOf(langCookieValue) !== -1) {
        return langCookieValue;
    }

    const possible = parse(`${acceptHeader || ""}`)
        .map(item => Object.assign(item, { local: null }))
        .map((item) => {
            if (item.code === "gl") {
                return Object.assign(item, { local: "gl_ES" });
            }

            const lower = (item.code && item.code.toLowerCase()) || "";

            if (item.region) {
                const r = `${lower}_${item.region.toUpperCase()}`;
                if (enabledLanguages.indexOf(r) !== -1) {
                    return Object.assign(item, { local: r });
                }
            }

            if (enabledLanguages.indexOf(lower) !== -1) {
                return Object.assign(item, { local: lower });
            }

            return item;
        })
        .filter(item => item.local)
        .map(item => item.local);

    return (possible.length > 0 && possible[0]) || defaultLanguage;
};

export const i18nLoader = loadLocale => async (locale) => {
    const localeData = await loadLocale(locale);
    addLocale(locale, localeData);

    return () => useLocale(locale);
};
