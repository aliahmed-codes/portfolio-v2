import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-[#6B7280] text-sm">
              © {new Date().getFullYear()} Ali Ahmed. All rights reserved.
            </p>
            <p className="text-[#4B5563] text-xs mt-1 flex items-center justify-center sm:justify-start gap-1">
              Designed & Built with <Heart className="w-3 h-3 text-[#2DD4BF]" /> using React & Tailwind
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[#6B7280] hover:text-[#2DD4BF] transition-colors"
          >
            <span className="font-mono text-sm">BACK TO TOP</span>
            <div className="w-8 h-8 bg-[#111827] border border-white/10 rounded-lg flex items-center justify-center group-hover:border-[#2DD4BF]/50 transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
