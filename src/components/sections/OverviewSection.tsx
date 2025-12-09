import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Rocket, Shield, Users } from 'lucide-react';

const highlights = [
  {
    icon: Globe,
    title: 'Global Presence',
    description: 'Operations across 4 countries with seamless delivery',
    stat: '4+',
    statLabel: 'Countries',
  },
  {
    icon: Rocket,
    title: 'Innovation First',
    description: 'Cutting-edge solutions powered by latest technologies',
    stat: '100+',
    statLabel: 'Projects',
  },
  {
    icon: Shield,
    title: 'Trusted Partner',
    description: 'Backed by 12+ years of industry experience',
    stat: '12+',
    statLabel: 'Years',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Skilled professionals dedicated to your success',
    stat: '50+',
    statLabel: 'Experts',
  },
];

export default function OverviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="overview" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Who We Are
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Technology Partner for
            <span className="text-gradient"> Global Growth</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Aashita Technosoft is a sister concern of Aashita Enterprises, leveraging over 12 years of 
            experience to deliver world-class technology solutions. Our global network spans across 
            India, China, Vietnam, and Indonesia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold text-primary mb-1">
                {item.stat}
              </div>
              <div className="text-sm text-muted-foreground mb-3">{item.statLabel}</div>
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
