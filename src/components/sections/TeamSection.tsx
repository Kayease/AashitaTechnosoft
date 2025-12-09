import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Pankaj Gupta',
    role: 'Chief Executive Officer',
    description: 'Visionary leader with 15+ years of experience in global technology and business development. Leading Aashita Group operations across Asia.',
    image: '/team-pankaj.png',
    featured: true,
  },
  {
    name: 'Anurag Sharma',
    role: 'UI/UX Designer',
    description: 'UI/UX Designer with expertise in creating engaging and user-friendly interfaces.',
    image: '/team-rajesh.png',
  },
  {
    name: 'Chanda Kumawat',
    role: 'Business Analyst',
    description: 'Business Analyst with expertise in analyzing business requirements and optimizing digital solutions.',
    image: '/team-priya.png',
  },
  {
    name: 'Rustam',
    role: 'Full Stack Web Developer',
    description: 'Full Stack Web Developer with expertise in building scalable web applications and seamless user experiences.',
    image: '/rustam.png',
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const ceo = team.find(member => member.featured);
  const otherMembers = team.filter(member => !member.featured);

  return (
    <section id="team" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Leadership
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet Our
            <span className="text-gradient"> Expert Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Led by industry veterans with decades of combined experience in technology and
            business development across Asia.
          </p>
        </motion.div>

        {/* CEO Featured Card */}
        {ceo && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="glass-card-hover p-8 md:p-12 flex flex-col lg:flex-row gap-8 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl" />
                <img
                  src={ceo.image}
                  alt={ceo.name}
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl object-cover ring-4 ring-primary/20"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Founder & CEO
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {ceo.name}
                </h3>
                <p className="text-muted-foreground mb-4">{ceo.role}</p>
                <p className="text-foreground leading-relaxed mb-6 max-w-xl">
                  {ceo.description}
                </p>
                <div className="flex gap-3 justify-center lg:justify-start">
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="glass-card-hover p-6 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4 ring-2 ring-border"
              />
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
