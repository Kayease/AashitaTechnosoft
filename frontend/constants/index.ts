// Brand Design System Constants
export const BRAND_COLORS = {
    navy: "#2474e4ff",
    blue: "#aabde4ff",
    cyan: "#2FB7C4",
    white: "#FFFFFF",
    light: "#EEF6FF",
} as const;

// Navigation Items
export const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blog" },
    { label: "Contact", href: "/contact" },
] as const;

// Global Locations
export const LOCATIONS = ["India", "China", "Vietnam", "Indonesia"] as const;

// Hero Content
export const HERO_CONTENT = {
    headline: {
        line1: "Empowering Businesses with Global",
        line2: "Technology Solutions",
    },
    subtext: "Delivering innovation across",
    locations: LOCATIONS,
    tagline: "Your trusted partner for digital transformation.",
    ctaText: "Get Started",
} as const;

// Animation Settings
export const ANIMATION_CONFIG = {
    particle: {
        count: 80,
        mobileCount: 40,
        connectionDistance: 120,
        speed: 0.2,
        baseRadius: 2,
        glowRadius: 4,
    },
    robot: {
        maxHeadRotation: 15,
        maxNeckRotation: 8,
        maxHandRotation: 5,
        smoothing: 0.08,
    },
    transition: {
        duration: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
} as const;

// Breakpoints
export const BREAKPOINTS = {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
} as const;

// Company Info
export const COMPANY_INFO = {
    name: "Aashita.ai",
    tagline: "Global Technology Solutions",
    email: "contact@aashita.ai",
    phone: "+91 XXX XXX XXXX",
} as const;
