"use client";

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-5xl relative z-10">
        <SectionHeading title="About Me" subtitle="A brief introduction to who I am and what I do." />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-lg relative overflow-hidden group"
          >
            <h3 className="text-2xl font-bold mb-4 text-slate-950">Who am I?</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              I am an MCA graduate with a deep passion for frontend development and creating interactive web experiences. 
              My journey started with a curiosity about how things work on the internet, which quickly evolved into a 
              career pursuit in full-stack development.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I specialize in building modern, responsive, and visually appealing web applications. I am constantly learning 
              and exploring new technologies in the MERN stack to improve my craft and build scalable solutions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <StatCard number="3+" label="Years Coding" />
            <StatCard number="20+" label="Projects Built" />
            <StatCard number="MCA" label="Graduate" />
            <StatCard number="MERN" label="Stack Learner" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="glass-card p-6 rounded-lg text-center hover:-translate-y-1 transition-transform duration-300">
      <h4 className="text-3xl font-bold text-linkedin mb-2">{number}</h4>
      <p className="text-sm text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}
