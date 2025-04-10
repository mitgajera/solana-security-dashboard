export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base dark mode colors
        dark: {
          900: "#090909",
          800: "#121212", 
          700: "#1A1A1A",
          600: "#222222",
          500: "#2A2A2A",
          400: "#333333",
          300: "#444444",
          200: "#666666",
          100: "#888888",
        },
        // Accent colors with opacity variants
        primary: {
          DEFAULT: "#3B82F6",
          50: "rgba(59, 130, 246, 0.05)",
          100: "rgba(59, 130, 246, 0.1)",
          200: "rgba(59, 130, 246, 0.2)",
          300: "rgba(59, 130, 246, 0.3)",
          400: "rgba(59, 130, 246, 0.4)",
          500: "rgba(59, 130, 246, 0.5)",
          600: "rgba(59, 130, 246, 0.6)",
          700: "rgba(59, 130, 246, 0.7)",
          800: "rgba(59, 130, 246, 0.8)",
          900: "rgba(59, 130, 246, 0.9)",
        },
        // Alert colors
        danger: "#FF5A5A",
        warning: "#FFB800",
        success: "#00C853",
        info: "#64B5F6",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        card: "0 4px 15px rgba(0, 0, 0, 0.2), 0 0 5px rgba(59, 130, 246, 0.05)",
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.9)',
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.9), 0 2px 4px -1px rgba(0, 0, 0, 0.9)',
        'dark-md': '0 8px 10px -3px rgba(0, 0, 0, 0.9), 0 4px 6px -2px rgba(0, 0, 0, 0.9)',
        'dark-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.9), 0 10px 10px -5px rgba(0, 0, 0, 0.9)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}