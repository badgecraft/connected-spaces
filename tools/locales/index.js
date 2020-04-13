/* eslint no-param-reassign:0 */
import path from 'path';
import gParser from 'gettext-parser';
import fs from 'fs';

export const getPoFilePath = ({ name, basePath }) => ({
    name,
    poFilePath: path.resolve(basePath, `${name}.po`)
});

const parseLocalesConfig = ({ locales = [], basePath }) => (locales.map(name => getPoFilePath({ name, basePath })));

export default class LocalesPlugin {
    constructor({ basePath, locales = [], buildDir, type }) {
        this.type = type;
        this.buildDir = buildDir;
        this.locales = parseLocalesConfig({ locales, basePath });
    }

    apply() {
        this.writeMeta();
    }

    writeMeta() {
        const generated = this.locales.map(({ name, poFilePath }) => {
            const contents = fs.readFileSync(poFilePath);
            const data = gParser.po.parse(contents.toString());
            return { name, data }
        });
        fs.writeFileSync(path.join(this.buildDir, 'locale-manifest.json'), JSON.stringify(generated));
    }
}

