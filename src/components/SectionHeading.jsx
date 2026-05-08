import { motion } from 'framer-motion';

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-2xl text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
