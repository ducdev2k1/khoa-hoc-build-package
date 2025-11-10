<template>
  <div ref="root" class="markdown-viewer prose prose-sm max-w-full">
    <!-- Render HTML markdown here -->
    <div class="markdown-content" v-html="html" />
    <!-- Toast -->
    <div v-if="toast" class="fixed right-4 top-[5%] z-50">
      <div class="px-3 bg-[#42b983] py-2 text-white text-sm rounded-md shadow">
        {{ toast }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

  interface Options {
    collapsedHeight?: number; // px
    observe?: boolean;
  }

  const props = defineProps<{
    html: string;
    options?: Options;
  }>();

  const root = ref<HTMLElement | null>(null);
  const toast = ref('');
  let toastTimer: number | undefined;
  const observerRef = ref<MutationObserver | null>(null);

  // defaults
  const COLLAPSED_HEIGHT = props.options?.collapsedHeight ?? 160; // px

  function showToast(msg: string) {
    console.log('🚀 MarkdownViewer.vue ~ msg :>>', msg);
    toast.value = msg;
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => (toast.value = ''), 1800);
  }

  // enhance all code blocks under root
  function enhanceAll() {
    if (!root.value) return;
    // safer selectors: include <pre>, <pre><code>, and <code class="language-...">
    const codeBlocks = Array.from(
      root.value.querySelectorAll('pre, pre > code, pre code, code[class^="language-"]'),
    ) as HTMLElement[];

    // normalize: if we got a code element, pass that; if we got pre, find inner code
    const toEnhance: HTMLElement[] = [];
    codeBlocks.forEach((el) => {
      if (el.tagName.toLowerCase() === 'pre') {
        // prefer the inner <code> if present
        const inner = el.querySelector('code');
        toEnhance.push(inner ? (inner as HTMLElement) : el);
      } else {
        toEnhance.push(el);
      }
    });

    toEnhance.forEach((codeEl) => enhanceCodeBlock(codeEl));
  }

  const enhanced = new WeakSet<HTMLElement>();

  function enhanceCodeBlock(codeEl: HTMLElement) {
    // find parent pre (if available) or wrap the code itself
    const pre =
      codeEl.tagName.toLowerCase() === 'code' &&
      codeEl.parentElement &&
      codeEl.parentElement.tagName.toLowerCase() === 'pre'
        ? (codeEl.parentElement as HTMLElement)
        : codeEl;

    if (!pre || enhanced.has(pre)) return;
    enhanced.add(pre);

    // create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'c-markdown-viewer';

    // create toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'c-markdown-viewer-toolbar';
    // ensure toolbar receives clicks
    toolbar.style.pointerEvents = 'auto';

    // copy button
    const btnCopy = document.createElement('button');
    btnCopy.type = 'button';
    btnCopy.title = 'Copy code';
    btnCopy.setAttribute('aria-label', 'Copy code');
    btnCopy.className =
      'px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-xs rounded-md flex items-center gap-1';
    btnCopy.innerHTML = copyIconSvg() + '<span>Copy</span>';
    btnCopy.addEventListener('click', async (ev) => {
      ev.stopPropagation();
      const text = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // fallback
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showToast('Copied to clipboard');
      } catch (err) {
        showToast('Copy failed');
        // eslint-disable-next-line no-console
        console.warn('copy failed', err);
      }
    });

    // expand button
    const btnExpand = document.createElement('button');
    btnExpand.type = 'button';
    btnExpand.title = 'Expand / Collapse';
    btnExpand.setAttribute('aria-label', 'Expand or collapse code block');
    btnExpand.className =
      'px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-xs rounded-md flex items-center gap-1 none';
    btnExpand.innerHTML = expandIconSvg() + '<span>Expand</span>';

    // state: collapsed by default if pre scrollHeight > threshold
    // use getBoundingClientRect if scrollHeight is unreliable
    const contentHeight = pre.scrollHeight || pre.getBoundingClientRect().height || 0;
    const shouldCollapse = contentHeight > COLLAPSED_HEIGHT + 20;
    if (shouldCollapse) {
      pre.style.maxHeight = `${COLLAPSED_HEIGHT}px`;
      pre.style.overflow = 'hidden';
      pre.style.transition = 'max-height 240ms ease';
      // overlay gradient
      const gradient = document.createElement('div');
      gradient.className = 'mdv-gradient';
      wrapper.appendChild(gradient);
      pre.dataset.collapsed = 'true';
      btnExpand.style.display = 'flex';
    } else {
      pre.dataset.collapsed = 'false';
      btnExpand.style.display = 'none';
    }

    btnExpand.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const isCollapsed = pre.dataset.collapsed === 'true';
      if (isCollapsed) {
        // expand
        // set to a large value then remove after transition
        const target = pre.scrollHeight || pre.getBoundingClientRect().height || 9999;
        pre.style.maxHeight = `${target}px`;
        pre.dataset.collapsed = 'false';
        // remove gradient if present
        const grad = wrapper.querySelector('.mdv-gradient');
        if (grad) grad.remove();
        btnExpand.innerHTML = collapseIconSvg() + '<span>Collapse</span>';
      } else {
        // collapse
        pre.style.maxHeight = `${COLLAPSED_HEIGHT}px`;
        pre.dataset.collapsed = 'true';
        // restore gradient
        const gradient = document.createElement('div');
        gradient.className = 'mdv-gradient';
        wrapper.appendChild(gradient);
        btnExpand.innerHTML = expandIconSvg() + '<span>Expand</span>';
      }
    });

    // assemble toolbar
    toolbar.appendChild(btnCopy);
    toolbar.appendChild(btnExpand);

    // insert wrapper in DOM: replace pre with wrapper containing toolbar + pre
    pre.parentElement?.replaceChild(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(toolbar);

    // small visual adjustments
    pre.classList.add('p-4', 'overflow-auto', 'text-sm');
    // ensure code element uses whitespace & monospace
    const innerCode = pre.querySelector('code');
    if (innerCode) {
      (innerCode as HTMLElement).style.whiteSpace = 'pre';
      (innerCode as HTMLElement).style.fontFamily =
        'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace';
    }
  }

  // icons
  function copyIconSvg() {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="inline-block"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3"/><rect x="9" y="3" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>`;
  }
  function expandIconSvg() {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="inline-block"><path d="M4 11v-6h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 13v6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 4l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 20l-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function collapseIconSvg() {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="inline-block"><path d="M9 14H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 10h4a2 2 0 0 1 2 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10V6H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 14v4h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  onMounted(() => {
    // initial enhance after HTML rendered
    nextTick()
      .then(() => {
        // small delay to ensure v-html finished parsing
        setTimeout(() => enhanceAll(), 50);
      })
      .catch(() => {
        setTimeout(() => enhanceAll(), 50);
      });

    if (props.options?.observe ?? true) {
      const mo = new MutationObserver((mutations) => {
        let added = false;
        for (const m of mutations) {
          if (m.addedNodes && m.addedNodes.length) {
            added = true;
            break;
          }
        }
        if (added) {
          // small delay to let markdown render inner HTML
          setTimeout(() => enhanceAll(), 50);
        }
      });
      if (root.value) {
        mo.observe(root.value, { childList: true, subtree: true });
        observerRef.value = mo;
      }
    }
  });

  onBeforeUnmount(() => {
    if (observerRef.value) observerRef.value.disconnect();
    if (toastTimer) window.clearTimeout(toastTimer);
  });
</script>

<style scoped></style>
