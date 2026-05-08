import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/kunalsuvosaha', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kunalsaha07/', icon: FaLinkedinIn },
  { label: 'Email', href: 'mailto: kunalsuvosaha@gmail.com', icon: FaEnvelope },
];

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-violet-400/25 blur-3xl"
          animate={{ x: [0, 45, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-7rem] top-40 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl"
          animate={{ x: [0, -38, 0], y: [0, 26, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-12 left-1/2 h-64 w-64 rounded-full bg-pink-300/15 blur-3xl"
          animate={{ x: ['-50%', '-42%', '-50%'], y: [0, -24, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <motion.p
            className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-sky-100 backdrop-blur"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            Available for Full-Stack opportunities
          </motion.p>
          <motion.h1
            className="text-4xl font-black leading-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            Kunal Suvo Saha
          </motion.h1>
          <motion.p
            className="gradient-text mt-5 text-xl font-semibold sm:text-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Full Stack Developer
          </motion.p>
          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            I build responsive, user-friendly web interfaces with React and
            Tailwind CSS while growing into full-stack development through the
            MERN ecosystem.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            <Link
              to="projects"
              smooth
              duration={700}
              offset={-72}
              className="cursor-pointer rounded-md bg-gradient-to-r from-violet-300 via-sky-300 to-pink-300 px-6 py-3 text-center font-bold text-slate-950 transition hover:shadow-lg hover:shadow-sky-300/20"
            >
              View Projects
            </Link>
            <Link
              to="contact"
              smooth
              duration={700}
              offset={-72}
              className="cursor-pointer rounded-md border border-white/15 bg-white/10 px-6 py-3 text-center font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              Contact Me
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.65 }}
          >
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="grid size-11 place-items-center rounded-md border border-white/10 bg-white/10 text-lg text-slate-100 transition hover:-translate-y-1 hover:border-sky-200/50 hover:text-sky-100"
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="glass-panel soft-ring relative mx-auto aspect-square w-full max-w-sm rounded-[2rem] p-5"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
        >
          <div className="h-full rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
            <div className="mb-8 flex gap-2">
              <span className="size-3 rounded-full bg-pink-300" />
              <span className="size-3 rounded-full bg-sky-300" />
              <span className="size-3 rounded-full bg-violet-300" />
            </div>
            <div className="space-y-4 font-mono text-sm text-slate-300">
              <p><span className="text-pink-200">const</span> developer = &#123;</p>
              <p className="pl-4">name: <span className="text-sky-200">'Kunal'</span>,</p>
              <p className="pl-4">focus: <span className="text-sky-200">'Full Stack'</span>,</p>
              <p className="pl-4">bestAt: <span className="text-sky-200">'Problem solving'</span>,</p>
              <p className="pl-4">stack: <span className="text-sky-200">'MERN'</span>,</p>
              <p className="pl-4">mindset: <span className="text-sky-200">'Build and improve'</span></p>
              <p>&#125;;</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
