const postcssImport = require('postcss-import')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const postcssPurgecss = require('@fullhuman/postcss-purgecss')

const removeNewlines = (text) => {
  return text.replace(/(\r\n|\n|\r)/gm, '')
}

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
    autoprefixer(),
    process.env.HUGO_ENVIRONMENT === 'production'
      ? postcssPurgecss({
          content: ['./hugo_stats.json'],
          defaultExtractor: (content) => {
            const els = JSON.parse(content).htmlElements
            const classes = els.classes || []
            const ids = els.ids || []
            const tags = els.tags || []
            return [...classes, ...ids, ...tags]
          },
          safelist: {
            standard: [/^dark/, /^light/, /^bg-/, /^text-/],
            deep: [/dark$/, /light$/, /^bg-/, /^text-/],
          },
        })
      : null,
  ].filter(Boolean),
} 