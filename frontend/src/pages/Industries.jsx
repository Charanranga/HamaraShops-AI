import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Zap, Building2 } from 'lucide-react';
import { BusinessApi } from '../services/api';
import InnerPageHero from '../components/common/InnerPageHero';
import { getSmartImage, handleImageError } from '../utils/imageUtils';

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    async function loadIndustries() {
      try {
        setLoading(true);
        const data = await BusinessApi.getIndustries();
        setIndustries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading industries:', err);
      } finally {
        setLoading(false);
      }
    }
    loadIndustries();
  }, []);

  const activeIndustry = industries[selectedIdx] || industries[0] || {};
  const activeImage = getSmartImage(activeIndustry);

  return (
    <div className="w-full min-h-screen bg-[#0c0e12] text-[#e2e2e8]">
      
      {/* Hero Section */}
      <InnerPageHero
        badge="Sector Domain Solutions"
        title="Domain-Specific AI Transformation Across Industries"
        subtitle="Custom neural architectures tailored for Fintech & Banking, Retail, Healthcare Diagnostics, Industrial Manufacturing, and Global Supply Chains."
        ctaText="Discuss Industry Use Case"
        ctaLink="/contact"
        stats={[
          { label: "Domain Verticals", value: "6 Verticals" },
          { label: "Fraud Savings", value: "$450M+" },
          { label: "Diagnostic Accuracy", value: "99.8%" },
          { label: "Compliance Guarantee", value: "100% Audit" }
        ]}
        previewTitle="Fintech & Banking Security AI"
        previewCategory="Domain Vertical"
        previewDesc="Real-time fraud prevention, automated credit scoring, and algorithmic trading intelligence."
        previewTag="Regulatory Compliant"
        previewImage="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
      />

      {/* Main Content Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
          </div>
        )}

        {!loading && industries.length > 0 && (
          <div>
            
            {/* Sector Pillar Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              {industries.map((ind, idx) => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2.5 ${
                    selectedIdx === idx
                      ? 'bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] shadow-xl shadow-[#ff6b6b]/30 scale-105'
                      : 'bg-[#1a1c20] text-slate-300 border border-[#3c475a] hover:border-[#ff6b6b]/50 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>{ind.name}</span>
                </button>
              ))}
            </div>

            {/* Active Industry Sector Dashboard */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id || selectedIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-8 sm:p-12 border border-[#ff6b6b]/40 shadow-2xl bg-gradient-to-br from-[#0a1628] via-[#1a1c20] to-[#0c0e12] grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20"
              >
                {/* Left Info Column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3.5 py-1 rounded-full bg-[#ff6b6b]/15 text-[#ffb3b0] font-mono text-xs font-bold uppercase border border-[#ff6b6b]/30">
                        Sector Deep Dive
                      </span>
                      <span className="text-xs font-mono text-[#4cd6ff] flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> Audit Compliance Guarantee
                      </span>
                    </div>

                    <h2 className="font-headline text-3xl sm:text-5xl font-extrabold text-white mb-4">
                      {activeIndustry.name}
                    </h2>

                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                      {activeIndustry.description}
                    </p>

                    {Array.isArray(activeIndustry.useCases) && activeIndustry.useCases.length > 0 && (
                      <div className="space-y-3 mb-8">
                        <div className="text-xs font-mono text-[#ffb3b0] uppercase tracking-wider mb-3">
                          Verified Sector Use Cases & Implementations:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activeIndustry.useCases.map((uc, uIdx) => (
                            <div key={uIdx} className="p-3.5 rounded-xl bg-[#0c0e12]/80 border border-[#3c475a]/50 text-xs font-mono text-slate-200 flex items-center gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#4cd6ff] shrink-0" />
                              <span>{uc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/industries/${activeIndustry.slug}`}
                    className="inline-flex items-center justify-between p-4.5 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-extrabold text-sm hover:shadow-xl hover:shadow-[#ff6b6b]/30 transition-all group mt-6"
                  >
                    <span>Request Full {activeIndustry.name} Architecture Spec Sheet</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Right Image & Metrics Column */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                    <img
                      src={activeImage}
                      alt={activeIndustry.name}
                      onError={(e) => handleImageError(e, 'fintech')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#4cd6ff] font-mono text-xs border border-[#4cd6ff]/40">
                      Live Sector Telemetry
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0c0e12]/90 border border-[#3c475a]/60">
                    <div className="text-xs font-mono text-slate-400 mb-1">Sector Benchmark Result</div>
                    <div className="font-headline text-2xl font-bold text-white mb-1">99.8% Reliability SLA</div>
                    <div className="text-xs text-slate-300 font-mono">Engineered for high-volume enterprise production.</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        )}

      </section>
    </div>
  );
}
