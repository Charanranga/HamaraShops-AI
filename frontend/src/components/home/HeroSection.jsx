import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowDown } from 'lucide-react';
import HeroShaderCanvas from './HeroShaderCanvas';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
      <HeroShaderCanvas />

      <div className="relative z-10 text-center max-w-4xl mt-[-4vh]">
        <span className="inline-block py-1 px-4 rounded-full border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 text-[#ffb3b0] font-mono text-xs mb-6 uppercase tracking-widest">
          Next-Gen Intelligence
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] font-headline-xl drop-shadow-2xl">
          Transform Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#4cd6ff]">
            Experiences
          </span>{' '}
          with AI
        </h1>
        <p className="text-base sm:text-lg text-[#bcc7dd] mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed font-body-lg">
          Empowering modern enterprises with sophisticated, high-performance artificial intelligence solutions designed for scale.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/solutions"
            className="pulse-btn bg-[#ff6b6b] text-[#68000f] font-bold text-base px-10 py-4 rounded-xl hover:bg-[#ffb3b0] transition-all duration-300 w-full sm:w-auto shadow-lg shadow-[#ff6b6b]/30 text-center"
          >
            Explore Solutions
          </Link>
          <Link
            to="/insights"
            className="bg-[#282a2e]/50 backdrop-blur-md border border-[#584140]/50 text-white font-semibold text-base px-10 py-4 rounded-xl hover:bg-[#333539] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 text-center"
          >
            <PlayCircle className="w-5 h-5 text-[#ff6b6b]" />
            <span>Watch Video</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-60 z-10">
        <span className="font-mono text-[10px] text-[#bcc7dd] mb-2 uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4 text-[#bcc7dd]" />
      </div>
    </section>
  );
}
