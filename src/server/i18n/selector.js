import { parse } from 'accept-language-parser';

export default ({ enabledLanguages, defaultLanguage }) =>
    (langCookieValue = '', acceptHeader = '', requestedLanguage) => {
        if (enabledLanguages.indexOf(requestedLanguage) !== -1) {
            return requestedLanguage;
        }

        if (enabledLanguages.indexOf(langCookieValue) !== -1) {
            return langCookieValue;
        }

        const possible = parse(`${acceptHeader || ''}`)
            .map(item => Object.assign(item, { local: null }))
            .map((item) => {
                if (item.code === 'gl') {
                    return Object.assign(item, { local: 'gl_ES' });
                }

                const lower = (item.code && item.code.toLowerCase()) || '';

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
