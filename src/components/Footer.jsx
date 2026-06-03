export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-slate-200 bg-white">
      <div className="container mx-auto px-6 text-center">
        <p className="text-slate-500 text-sm">
          &copy; {currentYear} Kunal Suvo Saha. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
