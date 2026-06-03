"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminPanel from './AdminPanel';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ownerTapCount, setOwnerTapCount] = useState(0);
  const [lastOwnerTap, setLastOwnerTap] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Profile', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Academic', href: '#academic' },
    { name: 'Journey', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOwnerClick = (event) => {
    handleScrollTo(event, '#home');

    const now = Date.now();
    const nextCount = now - lastOwnerTap > 2000 ? 1 : ownerTapCount + 1;

    setLastOwnerTap(now);
    setOwnerTapCount(nextCount);

    if (nextCount >= 10) {
      setOwnerTapCount(0);
      setIsAdminOpen(true);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 border-b border-slate-200 shadow-sm py-3' : 'bg-white/90 border-b border-slate-200 py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={handleOwnerClick} className="text-xl font-bold text-linkedin">
          Kunal Suvo Saha
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-slate-600 hover:text-linkedin transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-slate-700 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border border-slate-200 shadow-lg mt-2 mx-4 rounded-lg overflow-hidden flex flex-col"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="px-6 py-4 border-b border-slate-100 text-slate-700 hover:text-linkedin hover:bg-slate-50"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
      <AdminPanel open={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </header>
  );
}
