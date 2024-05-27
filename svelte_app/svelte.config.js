import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: "src/lib",
      $shared: "src/lib/components/shared",
      $api: "src/lib/api",
      $store: "src/lib/stores",
      $image: "src/lib/images",
      $src: "src",
      // adicione outros atalhos conforme necessário
    },
  },
  preprocess: vitePreprocess(),
};
export default config;
