"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RemoteImage from './RemoteImage';
import SectionHeading from './SectionHeading';
import { SiGithub } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProjects();
    window.addEventListener('portfolio-projects-updated', loadProjects);

    return () => window.removeEventListener('portfolio-projects-updated', loadProjects);
  }, []);

  async function loadProjects() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/projects');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to load projects.');
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Projects" subtitle="A focused look at the applications I have built and the technologies behind them." />
        
        {loading && (
          <div className="glass-card rounded-lg p-8 text-center text-slate-600">
            Loading projects...
          </div>
        )}

        {!loading && error && (
          <div className="glass-card rounded-lg p-8 text-center">
            <p className="font-semibold text-slate-950">Projects are not connected yet.</p>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
          </div>
        )}

        {!loading && !error && !projects.length && (
          <div className="glass-card rounded-lg p-8 text-center text-slate-600">
            No enabled projects yet.
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-lg overflow-hidden grid md:grid-cols-[280px_1fr] group"
            >
              <div className="relative min-h-56 overflow-hidden bg-slate-100">
                <RemoteImage
                  src={project.image}
                  alt={project.title}
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-linkedin mb-1">Project {index + 1}</p>
                    <h3 className="text-2xl font-bold text-slate-950">{project.title}</h3>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-5">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-linkedin">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-linkedin hover:bg-linkedin-dark text-white px-5 py-2.5 rounded-md transition-colors text-sm font-semibold"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-slate-300 hover:border-linkedin hover:text-linkedin text-slate-700 px-4 py-2.5 rounded-md transition-colors text-sm font-semibold"
                  >
                    <SiGithub size={18} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
