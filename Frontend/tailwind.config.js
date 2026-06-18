module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        surface: "#f9f9ff", "error-container": "#ffdad6", error: "#ba1a1a", "on-error": "#ffffff", "secondary-fixed": "#ffddb8", "outline-variant": "#c6c6cd", "surface-tint": "#565e74", "on-background": "#001b3c", "primary-fixed-dim": "#bec6e0", "secondary-container": "#fea619", outline: "#76777d", "surface-container-low": "#f0f3ff", secondary: "#855300", "surface-dim": "#c8dbff", "on-secondary": "#ffffff", "surface-bright": "#f9f9ff", "on-primary-fixed-variant": "#3f465c", "on-secondary-container": "#684000", "surface-container-high": "#dee8ff", "on-error-container": "#93000a", "primary-fixed": "#dae2fd", "on-tertiary-fixed": "#0b1c30", "on-tertiary": "#ffffff", "on-secondary-fixed": "#2a1700", "surface-variant": "#d5e3ff", "on-surface-variant": "#45464d", tertiary: "#000000", "tertiary-fixed-dim": "#b7c8e1", "primary-container": "#131b2e", primary: "#000000", "surface-container": "#e7eeff", "on-surface": "#001b3c", "inverse-primary": "#bec6e0", "surface-container-highest": "#d5e3ff", "on-primary-fixed": "#131b2e", "surface-container-lowest": "#ffffff", "inverse-surface": "#003061", "on-tertiary-fixed-variant": "#38485d", "on-primary": "#ffffff", "inverse-on-surface": "#ecf1ff", "on-tertiary-container": "#75859d", background: "#f9f9ff", "tertiary-container": "#0b1c30", "on-secondary-fixed-variant": "#653e00", "on-primary-container": "#7c839b", "secondary-fixed-dim": "#ffb95f", "tertiary-fixed": "#d3e4fe"
      },
      borderRadius: {
        DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px"
      },
      spacing: {
        gutter: "24px", unit: "8px", "margin-desktop": "48px", "container-max": "1280px", "margin-mobile": "16px"
      },
      fontFamily: {
        "display-lg": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], headline: ["Plus Jakarta Sans"], display: ["Plus Jakarta Sans"], body: ["Plus Jakarta Sans"], label: ["Plus Jakarta Sans"]
      },
      fontSize: {
        "display-lg": ["48px", {lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800"}], "headline-lg": ["32px", {lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700"}], "headline-lg-mobile": ["28px", {lineHeight: "1.2", fontWeight: "700"}], "label-md": ["14px", {lineHeight: "1", letterSpacing: "0.02em", fontWeight: "600"}], "body-md": ["16px", {lineHeight: "1.5", fontWeight: "400"}], "body-lg": ["18px", {lineHeight: "1.6", fontWeight: "400"}], "label-sm": ["12px", {lineHeight: "1", fontWeight: "500"}], "headline-md": ["24px", {lineHeight: "1.3", fontWeight: "600"}]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}