import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#121212',
        secondary: '#1e1e1e',
        'button-color': '#007bff',
        zinc: {
          850: '#1f2129',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
