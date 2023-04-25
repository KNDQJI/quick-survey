import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import { author, name } from './package.json';


export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'matyifkbt/szte-kerdoiv',
        match: [
          `https://neptun.szte.hu/unipoll/Survey.aspx?FillOutId*`
        ],
        grant: ['GM_setValue', 'GM_getValue'],
        downloadURL: `https://github.com/${author.name}/${name}/releases/download/latest/index.user.js`,
        updateURL: `https://github.com/${author.name}/${name}/releases/download/latest/index.meta.js`,
      },
      build: {
        metaFileName: true
      }
    }),
  ],
});
