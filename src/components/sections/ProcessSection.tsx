import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ClipboardList, 
  Compass, 
  Palette, 
  Code, 
  Rocket, 
  HeadphonesIcon 
} from 'lucide-react';

const processSteps = [
  {
    icon: ClipboardList,
    title: 'Requirement Gathering',
    description: 'Deep dive into your business needs, goals, and challenges to create a comprehensive project brief.',
  },
  {
    icon: Compass,
    title: 'Planning & Strategy',
    description: 'Develop a detailed roadmap with timelines, milestones, and resource allocation.',
  },
  {
    icon: Palette,
    title: 'Design & Prototyping',
    description: 'Create intuitive UI/UX designs and interactive prototypes for validation.',
  },
  {
    icon: Code,
    title: 'Development & QA',
    description: 'Agile development with continuous testing to ensure quality and performance.',
  },
  {
    icon: Rocket,
    title: 'Delivery & Deployment',
    description: 'Seamless deployment with comprehensive documentation and training.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Ongoing Support',
    description: 'Continuous monitoring, maintenance, and support to ensure smooth operations.',
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How We
            <span className="text-gradient"> Deliver Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A proven methodology refined over 12+ years of delivering successful 
            technology projects across industries.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block" />
          
          <div className="space-y-8 lg:space-y-0">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card-hover p-6"
                  >
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                </div>

                {/* Step Number */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow"
                  >
                    <span className="text-2xl font-display font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                  </motion.div>
                </div>

                {/* Empty Space for alignment */}
                <div className="hidden lg:block lg:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
