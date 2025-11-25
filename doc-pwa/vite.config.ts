import vue from "@vitejs/plugin-vue";
import Prism from "markdown-it-prism";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import Markdown from "vite-plugin-vue-markdown";
import { pwaConfig } from "./pwa.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItUses: [Prism],
      markdownItSetup(md) {
        const defaultFence =
          md.renderer.rules.fence ||
          function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
          };
        md.renderer.rules.fence = function (tokens, idx, options, env, self) {
          const token = tokens[idx];
          const code = defaultFence(tokens, idx, options, env, self);
          return `<CodeBlock>${code}</CodeBlock>`;
        };
      },
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
    }),
    VitePWA({ ...pwaConfig }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
