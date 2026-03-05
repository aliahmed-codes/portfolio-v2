import { Link } from 'react-router-dom';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-[#1F2937]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
              className="font-heading text-2xl font-bold text-white hover:text-[#2DD4BF] transition-colors"
            >
              AA.
            </Link>
            <span className="text-[#6B7280] text-sm">
              © {new Date().getFullYear()} Ali Ahmed. All rights reserved.
            </span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-[#2DD4BF] fill-[#2DD4BF]" />
            <span>and lots of coffee</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#2DD4BF] transition-colors group"
          >
            <span className="font-mono text-sm">BACK TO TOP</span>
            <div className="w-8 h-8 bg-[#111827] border border-[#1F2937] rounded-lg flex items-center justify-center group-hover:border-[#2DD4BF]/50 group-hover:bg-[#2DD4BF]/10 transition-all">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
