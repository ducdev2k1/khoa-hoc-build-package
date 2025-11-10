// src/utils/markdown.ts
import hljs from 'highlight.js';
import js from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import ts from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/atom-one-dark.min.css';
import { marked } from 'marked';

// register languages you need
hljs.registerLanguage('javascript', js);
hljs.registerLanguage('js', js);
hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('ts', ts);
hljs.registerLanguage('json', json);

// Use a custom renderer to be deterministic
const renderer = {
  code(code: string, infostring: string | undefined, escaped: boolean) {
    const lang = (infostring || '').trim().split(/\s+/)[0] || '';
    try {
      if (lang && hljs.getLanguage(lang)) {
        const res = hljs.highlight(code, { language: lang });
        return `<pre><code class="language-${lang}">${res.value}</code></pre>`;
      } else {
        const auto = hljs.highlightAuto(code);
        console.log('[markdown.ts] used highlightAuto, detected=', auto.language);
        return `<pre><code class="language-${auto.language || 'text'}">${auto.value}</code></pre>`;
      }
    } catch (err) {
      console.warn('[markdown.ts] highlight failed', err);
      // escape to be safe
      return `<pre><code>${escaped ? code : escapeHtml(code)}</code></pre>`;
    }
  },
};

function escapeHtml(html: string) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

marked.use({ renderer });

export async function renderMarkdown(markdown: string): Promise<string> {
  if (!markdown || typeof markdown !== 'string') return '';
  return await marked.parse(markdown);
}
