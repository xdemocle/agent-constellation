import mdx from '@mdx-js/rollup';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [[remarkFrontmatter, { type: 'yaml', marker: '-' }], remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeSlug],
      providerImportSource: '@mdx-js/react',
    }),
    tailwindcss(),
    reactRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  define: {
    'process.env': '{}',
  },
  build: {
    chunkSizeWarningLimit: 900,
  },
});
