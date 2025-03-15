import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './themes/hugo-product-launch/layouts/**/*.html'
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [typographyPlugin],
};
