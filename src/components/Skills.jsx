import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { skills } from '../data/skills.js';

function Skills() {
  return (
    <section id="skills" className="section-padding bg-white/[0.025]">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I use to craft modern web experiences"
          description="A growing toolkit across frontend foundations, React development, version control, deployment, and backend learning."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map(({ name, icon: Icon }, index) => (
            <motion.div
              key={name}
              className="group rounded-lg border border-white/10 bg-slate-900/70 p-5 text-center transition hover:border-sky-200/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-sky-500/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.04, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="mx-auto mb-4 grid size-14 place-items-center rounded-md bg-gradient-to-br from-violet-300/15 via-sky-300/15 to-pink-300/15 text-3xl text-sky-100 transition group-hover:text-pink-100">
                <Icon />
              </div>
              <h3 className="font-semibold text-slate-100">{name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
