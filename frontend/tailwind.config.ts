import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: "#0B2D5C",
                    blue: "#2563EB",
                    cyan: "#2FB7C4",
                    light: "#EEF6FF",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-gradient": "linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 50%, #FFFFFF 100%)",
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "spin-slow": "spin 20s linear infinite",
                "gradient": "gradient 8s ease infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { opacity: "0.5" },
                    "100%": { opacity: "1" },
                },
                gradient: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
