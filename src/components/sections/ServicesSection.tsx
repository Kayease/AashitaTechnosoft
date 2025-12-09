import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Lightbulb, 
  Code2, 
  Smartphone, 
  ShoppingCart, 
  Bot, 
  Cloud,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'IT Consulting',
    description: 'Strategic technology consulting to align your IT infrastructure with business goals. We help you make informed decisions about digital investments.',
    features: ['Technology Assessment', 'Digital Strategy', 'IT Roadmap Planning', 'Vendor Selection'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Custom software solutions built with modern architectures. From enterprise applications to specialized business tools.',
    features: ['Custom Applications', 'Enterprise Software', 'API Development', 'System Integration'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
    features: ['iOS Development', 'Android Apps', 'Cross-Platform', 'App Maintenance'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms with seamless payment integration, inventory management, and customer analytics.',
    features: ['Online Stores', 'Payment Gateway', 'Inventory Systems', 'Analytics Dashboard'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Bot,
    title: 'Automation & AI Solutions',
    description: 'Intelligent automation powered by AI and machine learning to streamline operations and enhance decision-making.',
    features: ['Process Automation', 'AI Integration', 'Chatbots', 'Predictive Analytics'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Cloud,
    title: 'IT Infra & Cloud',
    description: 'Cloud infrastructure setup, migration, and management. Secure, scalable, and cost-effective solutions.',
    features: ['Cloud Migration', 'AWS/Azure/GCP', 'DevOps', 'Security & Compliance'],
    color: 'from-sky-500 to-blue-500',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive
            <span className="text-gradient"> Technology Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            End-to-end technology services designed to transform your business 
            and drive sustainable growth in the digital age.
          </p>
        </motion.div>

        {/* Stacked Cards Layout */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
              style={{
                zIndex: hoveredIndex === index ? 10 : services.length - index,
              }}
            >
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 1.02 : 1,
                  y: hoveredIndex === index ? -10 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Icon Side */}
                  <div className={`lg:w-1/4 p-8 bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                    <motion.div
                      animate={{ rotate: hoveredIndex === index ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="w-16 h-16 text-primary-foreground" />
                    </motion.div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="lg:w-3/4 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ x: hoveredIndex === index ? 10 : 0 }}
                        className="flex-shrink-0"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <ArrowRight className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
