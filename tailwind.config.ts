import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'futura-pt': ['futura-pt', 'sans-serif'],
      },
      fontWeight: {
        'book': '400',
        'heavy': '700',
      }
    },
  },
  plugins: [],
}
export default config 