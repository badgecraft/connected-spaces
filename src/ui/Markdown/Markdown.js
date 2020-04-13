import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import stripIndent from 'strip-indent';
import styled from '@emotion/styled'
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')(({ theme }) => ({
    fontSize:   15,
    fontWeight: 'normal',
    lineHeight: '24px',
    h1:         {
        fontSize:                          28,
        lineHeight:                        '36px',
        [themedMinWidth('tablet', theme)]: {
            fontSize:   35,
            lineHeight: '48px',
            fontWeight: 'bold',
        },
    },
    h2:         {
        fontSize:   29,
        lineHeight: '48px',
        fontWeight: 'bold',
    },
    h3:         {
        fontSize:                          16,
        lineHeight:                        '20px',
        [themedMinWidth('tablet', theme)]: {
            fontSize:   20,
            lineHeight: '24px',
            fontWeight: 'bold',
        },
    },
    h4:         {
        fontSize:                          13,
        [themedMinWidth('tablet', theme)]: {
            fontSize:   16,
            lineHeight: '21px',
            fontWeight: 500,
        },
    },
    h5:         {
        fontSize:                          13,
        [themedMinWidth('tablet', theme)]: {
            fontSize:   14,
            lineHeight: '21px',
            fontWeight: 500,
        },
    },
    h6:         {
        fontSize:                          10,
        letterSpacing:                     '-0.45px',
        [themedMinWidth('tablet', theme)]: {
            fontSize:      11,
            lineHeight:    '15px',
            fontWeight:    'bold',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
        },
    },
    p:          { margin: '4px 0' },
    ol:         {
        listStyleType: 'decimal',
        paddingLeft:   '1.5rem',
    },
    ul:         {
        listStyleType: 'disc',
        paddingLeft:   '1.5rem',
    },
    blockquote: {
        margin:      '4px 0',
        borderLeft:  '5px solid #f1f1f1',
        paddingLeft: 5,
    },
    img:        { maxWidth: '35%' },
    table:      {
        width:        '100%',
        maxWidth:     '100%',
        marginTop:    '0.5rem',
        marginBottom: '1rem',
        td:           {
            padding: '0.5rem',
        },
        tbody:        {
            tr:                { borderTop: '1px solid silver' },
            'tr:nth-child(2)': { backgroundColor: '#f9f9f9' },
        },
    },
    pre:        {
        background:   '#F0F0F0',
        borderRadius: 3,
        padding:      '1px 10px',
    },
    code:       {
        background: '#F0F0F0',
    },
    a:          {
        textDecoration: 'underline',
    },
}));

const md = new MarkdownIt({
    linkify:     true,
    typographer: true,
    breaks:      true,
});

const defaultRender = md.renderer.rules.link_open
    || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = function linkOpen(tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below
    const aIndex = tokens[idx].attrIndex('target');
    const hIndex = tokens[idx].attrIndex('href');

    const local = hIndex >= 0 && tokens[idx].attrs[hIndex][1] && /^\//.test(tokens[idx].attrs[hIndex][1]);

    if (!local) {
        if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']); // add new attribute
        } else {
            // eslint-disable-next-line no-param-reassign
            tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
        }
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
};

const Markdown = ({ source }) => {
    if (!source) {
        return null;
    }

    let __html = source; // eslint-disable-line no-underscore-dangle
    try {
        __html = md.render(stripIndent(source));
    } catch (err) {
        console.error('Failed to generate markdown', err);
    }

    return (<Root dangerouslySetInnerHTML={{ __html }} />);
};

Markdown.propTypes = {
    source: PropTypes.node.isRequired,
};

export default Markdown;
