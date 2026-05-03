import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Dgeth Gráfica Brand Colors
        ns: {
          blue: "hsl(var(--ns-blue))",
          cyan: "hsl(var(--ns-cyan))",
          yellow: "hsl(var(--ns-yellow))",
          pink: "hsl(var(--ns-pink))",
          magenta: "hsl(var(--ns-magenta))",
          dark: "hsl(var(--ns-dark))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "float-slow": {
          "0%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(5deg)" },
          "100%": { transform: "translateY(0px) rotate(0deg)" },
        },
        "float-delayed": {
          "0%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-12px) scale(1.05)" },
          "100%": { transform: "translateY(0px) scale(1)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-random": {
          "0%": { transform: "translate(0,0)" },
          "33%": { transform: "translate(10px, -15px)" },
          "66%": { transform: "translate(-5px, 10px)" },
          "100%": { transform: "translate(0,0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "spin-very-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        vibrate: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(-1px, -1px)" },
          "60%": { transform: "translate(1px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
        },
        "draw-line": {
          "0%": { strokeDasharray: "0, 300", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { strokeDasharray: "300, 0", opacity: "0.3" },
        },
        "draw-line-delayed": {
          "0%": { strokeDasharray: "0, 300", opacity: "0" },
          "30%": { opacity: "0" },
          "60%": { opacity: "1" },
          "100%": { strokeDasharray: "300, 0", opacity: "0.2" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 25s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-delayed": "float-delayed 7s ease-in-out infinite 1s",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "float-random": "float-random 10s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-very-slow": "spin-very-slow 30s linear infinite",
        "spin-reverse-slow": "spin-reverse 25s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        vibrate: "vibrate 0.3s linear infinite",
        "slide-up": "slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "slide-up-delay-1": "slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) 0.2s forwards",
        "slide-up-delay-2": "slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) 0.4s forwards",
        "slide-up-delay-3": "slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards",
        "slide-up-delay-4": "slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) 0.8s forwards",
        "draw-line": "draw-line 4s ease-in-out infinite",
        "draw-line-delayed": "draw-line-delayed 5s ease-in-out infinite 1s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
