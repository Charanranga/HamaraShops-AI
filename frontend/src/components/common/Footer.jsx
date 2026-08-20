import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#08090c] border-t border-[#3c475a]/50 text-slate-300 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#3c475a]/40">
          
          {/* Brand Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#ffb3b0] flex items-center justify-center text-[#68000f] font-bold shadow-lg shadow-[#ff6b6b]/20">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-headline-md font-extrabold text-2xl text-white">
                HamaraShops<span className="text-[#ff6b6b]">.ai</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Destination Digital — Empowering modern enterprises with sophisticated, high-performance artificial intelligence solutions designed for scale.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#4cd6ff] bg-[#1a1c20] px-3 py-1.5 rounded-full border border-[#3c475a] w-fit">
              <ShieldCheck className="w-4 h-4 text-[#ff6b6b]" />
              <span>Stateless Architecture • Spring Cloud Gateway Secured</span>
            </div>
          </div>

          {/* Solutions & Marketplace */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide font-headline-md">Marketplace</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products" className="hover:text-[#ff6b6b] transition-colors">AI Products</Link></li>
              <li><Link to="/solutions" className="hover:text-[#ff6b6b] transition-colors">Solutions</Link></li>
              <li><Link to="/services" className="hover:text-[#ff6b6b] transition-colors">Services</Link></li>
              <li><Link to="/industries" className="hover:text-[#ff6b6b] transition-colors">Industries</Link></li>
            </ul>
          </div>

          {/* Company Hub */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide font-headline">Enterprise Hub</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/case-studies" className="hover:text-[#ff6b6b] transition-colors">Case Studies</Link></li>
              <li><Link to="/insights" className="hover:text-[#ff6b6b] transition-colors">Insights</Link></li>
              <li><Link to="/company" className="hover:text-[#ff6b6b] transition-colors">Company</Link></li>
              <li><Link to="/careers" className="hover:text-[#ff6b6b] transition-colors">Careers</Link></li>
              <li><Link to="/integrations" className="hover:text-[#ff6b6b] transition-colors">Integrations</Link></li>
              <li><Link to="/api-docs" className="hover:text-[#ff6b6b] transition-colors">API Docs</Link></li>
              <li><Link to="/ethics" className="hover:text-[#ff6b6b] transition-colors">Ethics Policy</Link></li>
            </ul>
          </div>

          {/* Contact Action */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide font-headline">Get Started</h4>
            <p className="text-xs text-slate-400 mb-4">Transform your enterprise workflows with tailored cognitive solutions.</p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] text-sm font-bold hover:shadow-lg hover:shadow-[#ff6b6b]/25 transition-all"
            >
              <span>Contact Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} HamaraShops.ai. All rights reserved. Enterprise AI Platform.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/sales-terms" className="hover:text-white transition-colors">Sales Terms</Link>
            <Link to="/ethics" className="hover:text-white transition-colors">AI Ethics</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
