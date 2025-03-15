const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
    autoprefixer(),
    process.env.HUGO_ENVIRONMENT === 'production'
      ? purgecss({
          content: [
            './hugo_stats.json',
            './themes/hugo-product-launch/hugo_stats.json',
            './exampleSite/hugo_stats.json'
          ],
          defaultExtractor: content => {
            const els = JSON.parse(content).htmlElements
            return [...(els.classes || []), ...(els.ids || []), ...(els.tags || [])]
          },
          safelist: [
            /^dark/,
            /^light/,
            /^bg-/,
            /^text-/,
            /dark$/,
            /light$/,
            /^button-/,
            'prose',
            'html',
            'body',
            'button-secondary'
          ]
        })
      : null
  ].filter(Boolean)
} 