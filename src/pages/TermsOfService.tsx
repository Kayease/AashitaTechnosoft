import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Aashita Technosoft</title>
        <meta
          name="description"
          content="Terms of Service for Aashita Technosoft"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">
                Terms of Service
              </h1>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p>
                    By accessing or using the website at aashitatechnosoft.com,
                    you agree to be bound by these Terms of Service and all
                    applicable laws and regulations. If you do not agree with
                    any of these terms, you are prohibited from using or
                    accessing this site.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    2. Use License
                  </h2>
                  <p>
                    Permission is granted to temporarily download one copy of
                    the materials (information or software) on Aashita
                    Technosoft's website for personal, non-commercial transitory
                    viewing only.
                  </p>
                  <p className="mt-2">
                    This license shall automatically terminate if you violate
                    any of these restrictions and may be terminated by Aashita
                    Technosoft at any time.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    3. Disclaimer
                  </h2>
                  <p>
                    The materials on Aashita Technosoft's website are provided
                    on an 'as is' basis. Aashita Technosoft makes no warranties,
                    expressed or implied, and hereby disclaims and negates all
                    other warranties including, without limitation, implied
                    warranties or conditions of merchantability, fitness for a
                    particular purpose, or non-infringement of intellectual
                    property or other violation of rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    4. Limitations
                  </h2>
                  <p>
                    In no event shall Aashita Technosoft or its suppliers be
                    liable for any damages (including, without limitation,
                    damages for loss of data or profit, or due to business
                    interruption) arising out of the use or inability to use the
                    materials on Aashita Technosoft's website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    5. Governing Law
                  </h2>
                  <p>
                    These terms and conditions are governed by and construed in
                    accordance with the laws of India and you irrevocably submit
                    to the exclusive jurisdiction of the courts in that State or
                    location.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    6. Contact Us
                  </h2>
                  <p>
                    If you have any questions about these Terms, please contact
                    us at:
                  </p>
                  <p className="mt-2">
                    <strong>Aashita Technosoft Pvt Ltd</strong>
                    <br />
                    Email: hr@aashita.ai
                    <br />
                    Phone: +91 9216063146
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;
