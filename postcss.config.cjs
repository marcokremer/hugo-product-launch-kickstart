import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import purgecss from '@fullhuman/postcss-purgecss'

const removeNewlines = (text) => {
  return text.replace(/(\r\n|\n|\r)/gm, '')
}

export default {
  plugins: [
    postcssImport,
    tailwindcss,
    autoprefixer,
    ...(process.env.HUGO_ENVIRONMENT === 'production'
      ? [
          purgecss({
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
          }),
        ]
      : []),
  ].filter(Boolean),
} 