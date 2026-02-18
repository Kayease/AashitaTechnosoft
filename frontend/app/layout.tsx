import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Aashita.ai | Global Technology Solutions",
  description:
    "Empowering Businesses with Global Technology Solutions. Delivering innovation across India, China, Vietnam, and Indonesia. Your trusted partner for digital transformation.",
  keywords: [
    "technology",
    "software",
    "digital transformation",
    "IT services",
    "global solutions",
  ],
  openGraph: {
    title: "Aashita.ai | Global Technology Solutions",
    description: "Empowering Businesses with Global Technology Solutions",
    type: "website",
  },
};

import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
