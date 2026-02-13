import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Aashita Technosoft</title>
        <meta
          name="description"
          content="Privacy Policy for Aashita Technosoft"
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
                Privacy Policy
              </h1>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    1. Introduction
                  </h2>
                  <p>
                    Aashita Technosoft ("we," "our," or "us") is committed to
                    protecting your privacy. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when
                    you visit our website aashitatechnosoft.com.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    2. Information We Collect
                  </h2>
                  <p>
                    We may collect information about you in a variety of ways.
                    The information we may collect on the Site includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Personal Data:</strong> Personally identifiable
                      information, such as your name, shipping address, email
                      address, and telephone number.
                    </li>
                    <li>
                      <strong>Derivative Data:</strong> Information our servers
                      automatically collect when you access the Site, such as
                      your IP address, your browser type, your operating system,
                      your access times, and the pages you have viewed directly
                      before and after accessing the Site.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    3. Use of Your Information
                  </h2>
                  <p>
                    Having accurate information about you permits us to provide
                    you with a smooth, efficient, and customized experience.
                    Specifically, we may use information collected about you via
                    the Site to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create and manage your account.</li>
                    <li>Email you regarding your account or order.</li>
                    <li>
                      Fulfill and manage purchases, orders, payments, and other
                      transactions related to the Site.
                    </li>
                    <li>Improve our website and services.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    4. Disclosure of Your Information
                  </h2>
                  <p>
                    We may share information we have collected about you in
                    certain situations. Your information may be disclosed as
                    follows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>By Law or to Protect Rights:</strong> If we
                      believe the release of information about you is necessary
                      to respond to legal process, to investigate or remedy
                      potential violations of our policies, or to protect the
                      rights, property, and safety of others.
                    </li>
                    <li>
                      <strong>Third-Party Service Providers:</strong> We may
                      share your information with third parties that perform
                      services for us or on our behalf.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    5. Contact Us
                  </h2>
                  <p>
                    If you have questions or comments about this Privacy Policy,
                    please contact us at:
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

export default PrivacyPolicy;
