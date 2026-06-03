"use client";

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const journey = [
  {
    id: 1,
    year: 'Now',
    title: 'Building MERN and Next.js Projects',
    description: 'Creating portfolio-ready applications while improving frontend structure, responsiveness, and deployment workflows.',
  },
  {
    id: 2,
    year: 'Recent',
    title: 'Focused on Modern Frontend Development',
    description: 'Practicing React, Next.js, Tailwind CSS, component design, and clean UI implementation for real-world web interfaces.',
  },
  {
    id: 3,
    year: 'Foundation',
    title: 'Started with Web Fundamentals',
    description: 'Learned HTML, CSS, JavaScript, programming logic, and database basics through academic work and personal practice.',
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-6 relative bg-white border-y border-slate-200">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading title="Journey" subtitle="How my development path is evolving from fundamentals to full-stack projects." />
        
        <div className="relative border-l border-slate-200 ml-4 md:ml-0 md:pl-0">
          {journey.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 relative pl-8 md:pl-0 md:w-1/2 md:odd:ml-auto md:odd:pl-8 md:even:pr-8 md:even:text-right"
            >
              <div className="absolute top-0 left-[-5px] md:left-auto md:right-auto md:odd:-left-[5px] md:even:-right-[5px] w-3 h-3 bg-linkedin rounded-full shadow-[0_0_0_4px_rgba(5,48,173,0.14)] z-10" />
              
              <div className="glass-card p-6 rounded-lg group hover:-translate-y-1 transition-transform">
                <span className="text-linkedin text-sm font-bold tracking-wider uppercase mb-2 block">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-slate-200" />
        </div>
      </div>
    </section>
  );
}
