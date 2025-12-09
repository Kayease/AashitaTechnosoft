import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Globe2, Handshake, TrendingUp, Award, Users2 } from 'lucide-react';

const strengths = [
  { icon: Globe2, label: 'Global Network', value: '4 Countries' },
  { icon: TrendingUp, label: 'Business Growth', value: '200% YoY' },
  { icon: Handshake, label: 'Client Retention', value: '95%' },
  { icon: Award, label: 'Industry Awards', value: '15+' },
];

const countries = [
  { name: 'India', city: 'Jaipur', flag: '🇮🇳' },
  { name: 'China', city: 'Shenzhen', flag: '🇨🇳' },
  { name: 'Vietnam', city: 'Ho Chi Minh', flag: '🇻🇳' },
  { name: 'Indonesia', city: 'Jakarta', flag: '🇮🇩' },
];

export default function EnterprisesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="enterprises" className="section-padding bg-hero-gradient text-primary-foreground" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-4">
            Our Heritage
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About Aashita Enterprises
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
            The foundation of Aashita Technosoft, with over 12 years of successful operations 
            across Asia-Pacific.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">12+ Years Legacy</h3>
                <p className="text-primary-foreground/70">Established Excellence</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              Aashita Enterprises has been a cornerstone of international trade and business 
              operations since 2011. With a robust presence across China, Vietnam, Indonesia, 
              and India, we've built lasting relationships and a reputation for reliability.
            </p>
            
            <p className="text-primary-foreground/80 leading-relaxed mb-8">
              Aashita Technosoft leverages this extensive network and experience to deliver 
              technology solutions that are not just technically excellent but also 
              business-savvy, understanding the nuances of operating across diverse markets.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {strengths.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
                >
                  <item.icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-display font-bold text-lg">{item.value}</div>
                  <div className="text-xs text-primary-foreground/70">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/20">
              <h4 className="font-display text-xl font-bold mb-6 flex items-center gap-3">
                <Users2 className="w-6 h-6" />
                Global Presence
              </h4>
              <div className="space-y-4">
                {countries.map((country, index) => (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
                  >
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <div className="font-semibold">{country.name}</div>
                      <div className="text-sm text-primary-foreground/70">{country.city}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
