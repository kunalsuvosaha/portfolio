"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RemoteImage from './RemoteImage';
import SectionHeading from './SectionHeading';

const academics = [
  {
    degree: 'Master of Computer Applications (MCA)',
    period: '2022 - 2024',
    institution: 'Manipal University Jaipur',
    detail: 'Advanced study in software engineering, application development, databases, and modern web technologies.',
    imageKey: 'mcaImage',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    period: '2017 - 2020',
    institution: 'GitaRam Institute of Management',
    detail: 'Built a strong foundation in programming, database management, computer fundamentals, and web development.',
    imageKey: 'bcaImage',
  },
  {
    degree: 'Higher Secondary',
    period: '2017',
    institution: 'Jiaganj Raja Bijoy Singh VidyaMandir',
    detail: 'Completed higher secondary education with a focus on science, mathematics, and analytical thinking.',
    imageKey: 'schoolImage',
  },
];

export default function Academic() {
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
      if (response.ok) setSettings(data.settings || {});
    } catch {
      setSettings({});
    }
  }

  return (
    <section id="academic" className="py-20 px-6 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Academic Background" subtitle="My formal education and the foundation behind my development journey." />

        <div className="flex flex-col gap-5">
          {academics.map((item, index) => (
            <motion.article
              key={item.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card overflow-hidden rounded-lg"
            >
              <div className="grid md:grid-cols-[220px_1fr]">
                <div className="relative min-h-44 bg-blue-50">
                  {settings?.[item.imageKey]?.url ? (
                    <RemoteImage
                      src={settings[item.imageKey].url}
                      alt={settings[item.imageKey].alt || item.degree}
                      sizes="(max-width: 768px) 100vw, 220px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-44 items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-sm font-semibold text-linkedin">
                      {item.degree.split(' ')[0]}
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-linkedin mb-2">{item.period}</p>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-950">{item.degree}</h3>
                      <p className="text-slate-600 font-medium mt-1">{item.institution}</p>
                    </div>
                    <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-linkedin">
                      Education
                    </span>
                  </div>
                  <p className="mt-4 text-slate-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
