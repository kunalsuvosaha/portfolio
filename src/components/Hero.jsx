"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RemoteImage from './RemoteImage';
import { SiGithub, SiGmail } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { FiMapPin, FiBriefcase } from 'react-icons/fi';

export default function Hero() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    loadSettings();
    window.addEventListener('portfolio-settings-updated', loadSettings);

    return () => window.removeEventListener('portfolio-settings-updated', loadSettings);
  }, []);

  async function loadSettings() {
    try {
      const response = await fetch('/api/site-settings');
      const data = await response.json();
      if (response.ok) {
        setSettings(data.settings || {});
      }
    } catch {
      setSettings({});
    }
  }

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card overflow-hidden rounded-lg"
        >
          <div className="relative h-40 overflow-hidden bg-gradient-to-r from-linkedin via-[#315fda] to-slate-500">
            {settings.heroBackgroundImage?.url && (
              <RemoteImage
                src={settings.heroBackgroundImage.url}
                alt={settings.heroBackgroundImage.alt || 'Portfolio hero background'}
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#0530ad]/25" />
          </div>

          <div className="px-6 md:px-10 pb-8">
            <div className="-mt-20 mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="relative h-40 w-40 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                {settings.profileImage?.url ? (
                  <RemoteImage
                    src={settings.profileImage.url}
                    alt={settings.profileImage.alt || 'Kunal Suvo Saha profile photo'}
                    priority
                    sizes="160px"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,#ffffff_0_13%,transparent_14%),linear-gradient(145deg,#eef4ff_0%,#dce8ff_48%,#b8caf8_100%)]" />
                    <div className="absolute top-9 h-14 w-14 rounded-full bg-[#0530ad]" />
                    <div className="absolute bottom-6 h-24 w-28 rounded-t-full bg-[#0530ad]" />
                    <div className="absolute bottom-0 h-12 w-full bg-white/45" />
                    <div className="relative z-10 mt-14 text-3xl font-bold text-white tracking-wide">
                      KS
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                <SocialIcon href="https://github.com/kunalsuvosaha" icon={SiGithub} label="GitHub" />
                <SocialIcon href="https://www.linkedin.com/in/kunalsaha07/" icon={FaLinkedin} label="LinkedIn" />
                <SocialIcon href="mailto:kunalsuvosaha@gmail.com" icon={SiGmail} label="Email" />
              </div>
            </div>

            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-linkedin mb-2">Full Stack Developer | MERN Stack | MCA</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-4">
                Kunal Suvo Saha
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed mb-5">
                I enjoy building responsive and interactive web applications with React, Next.js, and modern JavaScript. I’m passionate about creating user experiences that not only look good but also feel smooth, practical, and engaging.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-8">
                <span className="inline-flex items-center gap-2">
                  <FiBriefcase className="text-linkedin" /> Open to Opportunities
                </span>
                <span className="inline-flex items-center gap-2">
                  <FiMapPin className="text-linkedin" /> India
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
            <a 
              href="#projects" 
              onClick={(e) => handleScrollTo(e, '#projects')}
                className="glow-button bg-linkedin text-white px-6 py-3 rounded-md font-semibold hover:bg-linkedin-dark transition-colors"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScrollTo(e, '#contact')}
                className="border border-linkedin text-linkedin px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact
            </a>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-linkedin hover:border-linkedin transition-colors"
    >
      <Icon size={24} />
    </motion.a>
  );
}
