import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Loader2, Award, TrendingUp, ShieldCheck } from 'lucide-react';
import { ContentApi } from '../services/api';
import InnerPageHero from '../components/common/InnerPageHero';
import Card3D from '../components/common/Card3D';
import { getSmartImage, handleImageError } from '../utils/imageUtils';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIdx, setFeaturedIdx] = useState(0);

  useEffect(() => {
    async function loadCaseStudies() {
      try {
        setLoading(true);
        const data = await ContentApi.getCaseStudies();
        setCaseStudies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading case studies:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCaseStudies();
  }, []);

  const featuredCase = caseStudies[featuredIdx] || caseStudies[0] || {};
  const featuredImage = getSmartImage(featuredCase);

  return (
    <div className="w-full min-h-screen bg-[#0c0e12] text-[#e2e2e8]">
      
      {/* Hero Section */}
      <InnerPageHero
        badge="Enterprise Field Reports"
        title="Proven Impact & Measurable AI Results"
        subtitle="Explore real-world case studies documenting 35%+ efficiency gains, multi-million dollar fraud prevention, and real-time diagnostic speedups."
        ctaText="Request Custom Benchmarks"
        ctaLink="/contact"
        stats={[
          { label: "Verified Studies", value: "100% Proven" },
          { label: "Cost Savings", value: "$120M+" },
          { label: "Efficiency Lift", value: "+38% Avg" },
          { label: "Audit Accuracy", value: "99.9%" }
        ]}
        previewTitle="Fintech Fraud Mitigation Report"
        previewCategory="Tier 1 Global Banking"
        previewDesc="Deployment of neural anomaly detection stopping high-frequency fraud attempts in under 12 milliseconds."
        previewTag="Verified Benchmark"
        previewImage="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800"
      />

      {/* Main Content Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
          </div>
        )}

        {!loading && caseStudies.length > 0 && (
          <div>
            
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 border-b border-[#3c475a]/40 pb-6">
              <div>
                <span className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest block mb-1">
                  Impact Assessment Journal
                </span>
                <h2 className="font-headline text-3xl font-extrabold text-white">
                  Verified Client Transformations
                </h2>
              </div>
              <span className="text-xs font-mono text-[#4cd6ff] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Peer-Audited Field Data
              </span>
            </div>

            {/* Asymmetric Case Wall Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
              
              {/* Left Featured Case Spotlight (7 Columns) */}
              <div className="lg:col-span-7">
                <motion.div
                  key={featuredCase.id || featuredIdx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-3xl p-8 border border-[#ff6b6b]/40 shadow-2xl bg-gradient-to-br from-[#0a1628] via-[#1a1c20] to-[#0c0e12] h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-white/10 group">
                      <img
                        src={featuredImage}
                        alt={featuredCase.title}
                        onError={(e) => handleImageError(e, 'fraud')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#ff6b6b] text-white font-mono text-xs font-bold uppercase tracking-wider">
                        {featuredCase.client || 'Enterprise Case Study'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-[#ff6b6b]" />
                      <span className="text-xs font-mono text-[#ffb3b0]">Featured Production Result</span>
                    </div>

                    <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-white mb-4">
                      {featuredCase.title}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {featuredCase.summary || featuredCase.description}
                    </p>

                    {featuredCase.impactMetric && (
                      <div className="p-4 rounded-2xl bg-[#0c0e12]/80 border border-[#3c475a]/50 text-center mb-6">
                        <div className="text-xs font-mono text-slate-400 mb-0.5">Primary Verified Impact</div>
                        <div className="font-headline text-3xl font-extrabold text-emerald-400">
                          {featuredCase.impactMetric}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/case-studies/${featuredCase.slug}`}
                    className="inline-flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-extrabold text-sm hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all group mt-4"
                  >
                    <span>Read Full Technical Case Report</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* Right Stacked Field Reports List (5 Columns) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest mb-2 px-1">
                  Select Field Report
                </h3>
                {caseStudies.map((cs, idx) => {
                  const cardImg = getSmartImage(cs);
                  const isSelected = featuredIdx === idx;
                  return (
                    <div
                      key={cs.id}
                      onClick={() => setFeaturedIdx(idx)}
                      className={`cursor-pointer transition-all ${isSelected ? 'scale-[1.02]' : ''}`}
                    >
                      <Card3D
                        glowColor={isSelected ? '#ff6b6b' : '#3c475a'}
                        className={`p-4 border transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#ff6b6b]/20 via-[#0a1628] to-transparent border-[#ff6b6b] text-white shadow-xl'
                            : 'bg-[#0a1628]/40 border-[#3c475a]/50 text-slate-300 hover:border-[#ff6b6b]/40 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={cardImg}
                            alt={cs.title}
                            onError={(e) => handleImageError(e, 'fraud')}
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 shadow-md"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-mono text-[#4cd6ff] truncate">{cs.client || 'Client Study'}</div>
                            <div className="font-bold text-sm text-white truncate">{cs.title}</div>
                            {cs.impactMetric && (
                              <div className="text-[11px] font-mono text-emerald-400 mt-0.5">{cs.impactMetric}</div>
                            )}
                          </div>
                          <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#ff6b6b] translate-x-1' : 'opacity-40'}`} />
                        </div>
                      </Card3D>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

      </section>
    </div>
  );
}
