import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import SectionHeading from './SectionHeading.jsx';
import { projects } from '../data/projects.js';

const openInNewTab = (url) => (event) => {
  if (!url || url === '#') return;

  event.preventDefault();
  window.open(url, '_blank', 'noopener,noreferrer');
};

function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work and build concepts"
          description="Placeholder project cards are ready to replace with real demos, repositories, and screenshots as the portfolio grows."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] backdrop-blur-xl"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
            >
              {/* Replace these image URLs with real project screenshots. */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-3 min-h-24 leading-7 text-slate-300">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={openInNewTab(project.liveUrl)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-sky-200 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-pink-200"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={openInNewTab(project.repoUrl)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
