import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Add paths for admin sections specifically to ensure they are scanned
    './app/admin/dashboard/**/*.{js,ts,jsx,tsx,mdx}',
    './app/admin/prompts/**/*.{js,ts,jsx,tsx,mdx}',
    './app/admin/workflows/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // You can extend other theme properties here if needed
      // Example:
      // colors: {
      //   'brand-primary': '#0070f3',
      // },
    },
  },
  plugins: [],
}
export default config
