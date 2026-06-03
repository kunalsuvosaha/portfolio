"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { SiGithub, SiGmail } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { FiPhone, FiClipboard, FiCheckCircle } from 'react-icons/fi';

const EMAIL_ADDRESS = 'kunalsuvosaha@gmail.com';
const PHONE_NUMBER = '+91 8001111227';

export default function Contact() {
  const [toast, setToast] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!isToastVisible) return undefined;

    const timeout = window.setTimeout(() => {
      setIsToastVisible(false);
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [isToastVisible]);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setToast('Email copied to clipboard');
    } catch (error) {
      setToast('Could not copy email');
    }
    setIsToastVisible(true);
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading title="Get In Touch" subtitle="Let's build something together." />

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-950 mb-6">Let's Connect</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you.
            </p>

            <div className="space-y-4">
              <ContactAction
                icon={SiGmail}
                title="Email"
                value={EMAIL_ADDRESS}
                actionLabel="Copy email"
                onClick={copyEmailToClipboard}
              />
              <ContactAction
                icon={FiPhone}
                title="Call"
                value={PHONE_NUMBER}
                actionLabel="Call now"
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
              />
              <ContactLink href="https://www.linkedin.com/in/kunalsaha07/" icon={FaLinkedin} text="LinkedIn Profile" />
              <ContactLink href="https://github.com/kunalsuvosaha" icon={SiGithub} text="GitHub Profile" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 glass-card p-8 rounded-lg"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-linkedin focus:ring-2 focus:ring-linkedin/10 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-linkedin focus:ring-2 focus:ring-linkedin/10 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-linkedin focus:ring-2 focus:ring-linkedin/10 transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <button
                type="button"
                className="w-full glow-button bg-linkedin text-white font-bold py-4 rounded-md hover:bg-linkedin-dark transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isToastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 bottom-8 z-50 -translate-x-1/2 rounded-full bg-slate-950/95 px-5 py-3 text-sm text-white shadow-2xl shadow-slate-950/20 backdrop-blur-md"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-linkedin" />
              <span>{toast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ContactAction({ href, onClick, icon: Icon, title, value, actionLabel }) {
  const Component = href ? 'a' : 'button';
  const actionProps = href
    ? {
        href,
        className:
          'flex w-full items-center gap-4 p-4 glass-card rounded-lg transition-all duration-200 group hover:-translate-y-0.5 hover:border-linkedin hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-linkedin/20',
      }
    : {
        type: 'button',
        onClick,
        className:
          'flex w-full items-center gap-4 p-4 glass-card rounded-lg transition-all duration-200 group hover:-translate-y-0.5 hover:border-linkedin hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-linkedin/20',
      };

  return (
    <Component {...actionProps} aria-label={actionLabel}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-linkedin transition-colors group-hover:bg-linkedin/10">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-950 group-hover:text-linkedin transition-colors">{title}</p>
        <p className="text-sm text-slate-600 truncate">{value}</p>
      </div>
      <div className="ml-auto text-xs uppercase tracking-wide text-slate-500 group-hover:text-linkedin transition-colors">
        {href ? 'Tap to call' : 'Tap to copy'}
      </div>
    </Component>
  );
}

function ContactLink({ href, icon: Icon, text }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 glass-card rounded-lg transition-all duration-200 group hover:-translate-y-0.5 hover:border-linkedin hover:bg-slate-50"
    >
      <div className="p-3 bg-blue-50 rounded-full text-linkedin transition-colors group-hover:bg-linkedin/10">
        <Icon size={20} />
      </div>
      <span className="text-slate-700 font-medium group-hover:text-linkedin transition-colors">{text}</span>
    </a>
  );
}
