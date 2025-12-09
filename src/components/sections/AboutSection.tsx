import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Heart, CheckCircle2 } from 'lucide-react';

const values = [
  { icon: Target, title: 'Mission', description: 'To empower businesses globally with innovative technology solutions that drive growth, efficiency, and digital transformation.' },
  { icon: Eye, title: 'Vision', description: 'To be the most trusted technology partner for enterprises across Asia, known for excellence, innovation, and reliability.' },
  { icon: Heart, title: 'Values', description: 'Integrity, Innovation, Excellence, and Customer-First approach guide everything we do at Aashita Technosoft.' },
];

const commitments = [
  'On-time delivery with quality assurance',
  'Transparent communication throughout projects',
  'Scalable solutions for future growth',
  'Dedicated support and maintenance',
  'Cost-effective technology implementations',
  'Data security and compliance adherence',
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Building Tomorrow's
            <span className="text-gradient"> Digital Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Aashita Technosoft, we combine technological expertise with business acumen 
            to deliver solutions that transform enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card-hover p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Our Commitments
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We are committed to delivering excellence in every project. Our team adheres to 
                the highest standards of quality and professionalism, ensuring that every solution 
                we provide adds value to your business.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commitments.map((commitment, index) => (
                  <motion.div
                    key={commitment}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{commitment}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-primary-foreground">
                <div className="text-6xl font-display font-bold mb-4">12+</div>
                <div className="text-xl font-semibold mb-2">Years of Excellence</div>
                <p className="text-primary-foreground/80">
                  Trusted by businesses across Asia for innovative technology solutions 
                  and reliable service delivery.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
