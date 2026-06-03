"use client";

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { skills } from '../data/skills';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="skills" className="py-20 px-6 relative bg-white border-y border-slate-200">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Skills" subtitle="Technologies and tools I use to build responsive, reliable web interfaces." />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="border border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-5 rounded-lg group cursor-pointer hover:border-linkedin/40 hover:bg-white hover:shadow-sm transition-all"
            >
              <div 
                className="text-4xl mb-3 opacity-90 group-hover:opacity-100 transition-all duration-300"
                style={{ color: skill.color || '#0530ad' }}
              >
                <skill.icon />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-linkedin transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
