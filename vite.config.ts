import { defineConfig } from 'vite'

// Slidev 53.0.0 on rolldown-vite 8 crashes in the lightningcss CSS minify
// step (it mis-parses one of UnoCSS' generated rules; reproduces with the
// stock @slidev/theme-default, so it is not caused by this deck's theme).
// Skipping CSS minification keeps `slidev build` working; drop this file
// once a Slidev release fixes the minifier pipeline.
export default defineConfig({
  build: {
    cssMinify: false,
  },
})
