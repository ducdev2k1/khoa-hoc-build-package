import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { marked } from 'marked';

// Extend MarkedOptions to include highlight
declare module 'marked' {
  interface MarkedOptions {
    highlight?: (code: string, lang: string) => string;
  }
}
// Configure marked
marked.setOptions({
  highlight: function (code: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error(err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
});

export function renderMarkdown(markdown: string): string {
  return marked(markdown) as string;
}
