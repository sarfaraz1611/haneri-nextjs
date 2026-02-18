import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        // xxl:"1536px",
      },
    },
    extend: {
      screens: {
        "3xl": "1920px",
      },
      // Custom Colors
      colors: {
        brand: {
          DEFAULT: "#CA5D27",
          light: "#E07339",
          dark: "#B24F1F",
        },
        primary: {
          DEFAULT: "#00473E",
          green: "#315859",
          dark: "#244a46",
          darker: "#1a3634",
        },
        neutral: {
          50: "#F8F8F8",
          100: "#F5F5F5",
          200: "#E0E0E0",
          300: "#D4D4D4",
          400: "#B8B8B8",
          500: "#6F6F6F",
          600: "#666666",
          700: "#21201E",
        },
      },

      // Custom Font Families
      fontFamily: {
        sans: [
          "Open Sans",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "Barlow Condensed",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        ailerons: ["Ailerons", "sans-serif"],
      },

      // Custom Border Radius
      borderRadius: {
        DEFAULT: "10px",
        card: "8px",
        button: "10px",
      },

      // Custom Box Shadows
      boxShadow: {
        DEFAULT: "0 6px 14px rgba(0, 0, 0, 0.12)",
        header: "0 2px 10px rgba(0, 0, 0, 0.05)",
        megamenu: "0 10px 40px rgba(0, 0, 0, 0.15)",
        hover: "0 8px 20px rgba(0, 0, 0, 0.15)",
      },

      // Custom Backdrop Blur
      backdropBlur: {
        header: "10px",
      },

      // Custom Transitions
      transitionDuration: {
        DEFAULT: "300ms",
      },

      // Custom Animation
      animation: {
        slideIn: "slideIn 0.3s ease",
        shimmer: "shimmer 1.3s infinite",
        marquee: "marquee 20s linear infinite",
      },

      keyframes: {
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "100% 0",
          },
          "100%": {
            backgroundPosition: "0 0",
          },
        },
        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },

      // Custom Spacing
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },

      // Custom Z-Index
      zIndex: {
        header: "1000",
        megamenu: "100",
        mobileMenu: "999",
      },

      // Custom Max Width
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    // Custom plugin for container utility
    function ({ addComponents }: any) {
      addComponents({
        ".container-custom": {
          width: "100%",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "15px",
          paddingRight: "15px",
        },
      });
    },
  ],
};

export default config;
