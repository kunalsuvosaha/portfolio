import "./globals.css";

export const metadata = {
  title: "Kunal Suvo Saha - Portfolio",
  description: "Frontend Developer and MERN Stack Learner. Check out my projects and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-linkedin/20">
        {children}
      </body>
    </html>
  );
}
