import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { timelineItems } from '../data/timeline.js';

function Timeline() {
  return (
    <section id="academic" className="section-padding bg-white/[0.025]">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Academic"
          title="Academic and learning timeline"
          description="A concise view of the path from academic foundations to full-stack development."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-violet-200 via-sky-200 to-pink-200 sm:left-1/2" />
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.label}
              className={`relative mb-8 flex gap-6 sm:w-1/2 ${
                index % 2 === 0 ? 'sm:pr-10' : 'sm:ml-auto sm:pl-10'
              }`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span
                className={`absolute left-1 top-7 z-10 size-7 rounded-full border-4 border-slate-950 bg-sky-200 sm:left-auto ${
                  index % 2 === 0 ? 'sm:right-[-0.85rem]' : 'sm:left-[-0.85rem]'
                }`}
              />
              <article className="glass-panel ml-12 rounded-lg p-5 sm:ml-0">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-200">
                  {item.label}
                </p>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.description}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
