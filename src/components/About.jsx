import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaLayerGroup } from 'react-icons/fa';
import SectionHeading from './SectionHeading.jsx';

const aboutCards = [
  {
    icon: FaGraduationCap,
    title: 'MCA Graduate',
    text: 'A computer applications background with a strong interest in practical, project-based learning.',
  },
  {
    icon: FaCode,
    title: 'Frontend Focus',
    text: 'Passionate about responsive layouts, reusable components, and interactive UI details that feel smooth.',
  },
  {
    icon: FaLayerGroup,
    title: 'Full-Stack Growth',
    text: 'Exploring the MERN stack to connect polished interfaces with reliable backend foundations.',
  },
];

function About() {
  return (
    <section id="about" className="section-padding">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About"
          title="Design-minded developer with a builder's mindset"
          description="I enjoy turning ideas into interfaces that are clear, fast, responsive, and enjoyable to use."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {aboutCards.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              className="glass-panel rounded-lg p-6"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
            >
              <div className="mb-5 grid size-12 place-items-center rounded-md bg-gradient-to-br from-violet-300/20 to-sky-300/20 text-xl text-sky-100">
                <Icon />
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
