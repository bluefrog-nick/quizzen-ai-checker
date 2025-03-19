
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-quiz-light flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full">
        <div className="w-full max-w-2xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="p-4 text-center text-quiz-gray text-sm">
        © {new Date().getFullYear()} AI Readiness Assessment
      </footer>
    </div>
  );
};

export default Layout;
