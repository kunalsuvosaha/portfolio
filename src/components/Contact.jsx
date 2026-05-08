import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import SectionHeading from './SectionHeading.jsx';

const contactLinks = [
  { label: 'Email', value: 'kunalsuvosaha@gmail.com', href: 'mailto: kunalsuvosaha@gmail.com', icon: FaEnvelope },
  { label: 'GitHub', value: 'github.com', href: 'https://github.com/kunalsuvosaha', icon: FaGithub },
  { label: 'LinkedIn', value: 'linkedin.com', href: '', icon: FaLinkedinIn },
];

function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together."
          description="Have an opportunity, collaboration, or project idea? Send a message and I will get back to you."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="glass-panel rounded-lg p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h3 className="text-2xl font-bold">Connect</h3>
            <p className="mt-3 leading-7 text-slate-300">
              I am open to frontend roles, internships, collaborative projects,
              and learning-focused full-stack work.
            </p>

            <div className="mt-8 space-y-4">
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-sky-200/40 hover:bg-white/[0.08]"
                >
                  <span className="grid size-11 place-items-center rounded-md bg-sky-200/10 text-sky-100">
                    <Icon />
                  </span>
                  <span>
                    <span className="block text-sm text-slate-400">{label}</span>
                    <span className="break-all font-semibold text-slate-100">{value}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="glass-panel rounded-lg p-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onSubmit={(event) => event.preventDefault()}
          >
            {/* Wire this form to Formspree, EmailJS, or a Vercel serverless function later. */}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-md border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-200/60"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-200/60"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Message</span>
              <textarea
                name="message"
                rows="6"
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-md border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-200/60"
              />
            </label>
            <motion.button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-violet-300 via-sky-300 to-pink-300 px-6 py-3 font-bold text-slate-950"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
