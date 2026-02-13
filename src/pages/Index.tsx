import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import OverviewSection from "@/components/sections/OverviewSection";
import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import EnterprisesSection from "@/components/sections/EnterprisesSection";
import ContactSection from "@/components/sections/ContactSection";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>
          Aashita Technosoft - Global Technology Solutions | IT Consulting &
          Software Development
        </title>
        <meta
          name="description"
          content="Aashita Technosoft delivers cutting-edge technology solutions across India, China, Vietnam and Indonesia. IT consulting, software development, mobile apps, and cloud services."
        />
        <meta
          name="keywords"
          content="IT consulting, software development, mobile app development, cloud solutions, digital transformation, India, China, Vietnam, Indonesia"
        />
        <link rel="canonical" href="https://aashitatechnosoft.com" />

        <meta
          property="og:title"
          content="Aashita Technosoft - Global Technology Solutions"
        />
        <meta
          property="og:description"
          content="Empowering businesses with innovative technology solutions across Asia. 12+ years of excellence in IT services."
        />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Aashita Technosoft",
            description:
              "Global technology solutions provider specializing in IT consulting, software development, and digital transformation.",
            url: "https://aashitatechnosoft.com",
            logo: "https://aashitatechnosoft.com/logo.png",
            sameAs: [
              "https://linkedin.com/company/aashita-technosoft",
              "https://twitter.com/aashitatech",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Jaipur",
              addressRegion: "Rajasthan",
              addressCountry: "India",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <OverviewSection />
          <AboutSection />
          <TeamSection />
          <ServicesSection />
          <ProcessSection />
          <EnterprisesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
