import { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { label: 'Projects', target: 'projects' },
  { label: 'Academic', target: 'academic' },
  { label: 'Skills', target: 'skills' },
  { label: 'About', target: 'about' },
  { label: 'Contact', target: 'contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link
          to="hero"
          smooth
          duration={600}
          className="cursor-pointer text-lg font-bold tracking-wide"
        >
          <span className="gradient-text">Kunal</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.target}
              to={item.target}
              smooth
              duration={650}
              offset={-72}
              className="cursor-pointer text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((current) => !current)}
          className="grid size-10 place-items-center rounded-md border border-white/10 text-slate-100 md:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.target}
                to={item.target}
                smooth
                duration={650}
                offset={-72}
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
