import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Zap, ShieldCheck, Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { ContentApi } from '../services/api';
import InnerPageHero from '../components/common/InnerPageHero';
import Card3D from '../components/common/Card3D';
import { getSmartImage, handleImageError } from '../utils/imageUtils';

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    async function loadSolutions() {
      try {
        setLoading(true);
        const data = await ContentApi.getSolutions();
        setSolutions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading solutions:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSolutions();
  }, []);

  const tabs = ['All', 'Interactive Solution', 'Technical Capability', 'Industry Vertical'];

  const filteredSolutions = activeTab === 'All'
    ? solutions
    : solutions.filter((s) => s.type === activeTab);

  return (
    <div className="w-full min-h-screen bg-[#0c0e12] text-[#e2e2e8]">
      
      {/* Hero Section */}
      <InnerPageHero
        badge="Enterprise Solutions & Capabilities"
        title="AI-Powered Solutions for an AI-First Era"
        subtitle="Through a cloud-first, experience-led approach, we enable high-impact enterprise AI transformations across banking, logistics, and healthcare."
        ctaText="Request Architecture Consultation"
        ctaLink="/contact"
        stats={[
          { label: "Verified Solutions", value: "19+" },
          { label: "Successful Projects", value: "2,500+" },
          { label: "Processing Latency", value: "< 15ms" },
          { label: "Cost Optimization", value: "35% Avg" }
        ]}
        previewTitle="Generative AI & Autonomous Engines"
        previewCategory="Enterprise Architecture"
        previewDesc="Custom domain-specific LLM deployment with retrieval-augmented generation and strict data isolation."
        previewTag="Production Validated"
        previewImage="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800"
      />

      {/* Main Content Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        
        {/* Category Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 border-b border-[#3c475a]/40 pb-8">
          <div>
            <span className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest block mb-1">
              Solution Matrix
            </span>
            <h2 className="font-headline text-3xl font-extrabold text-white">
              Enterprise Solution Architecture
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-[#1a1c20]/80 p-1.5 rounded-full border border-[#3c475a]/60">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-extrabold shadow-lg shadow-[#ff6b6b]/30'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
          </div>
        )}

        {/* 3-Column 3D Tilt Solution Matrix */}
        {!loading && filteredSolutions.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {filteredSolutions.map((sol, idx) => {
                const img = getSmartImage(sol);
                return (
                  <motion.div
                    key={sol.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <Card3D glowColor="#ff6b6b" className="bg-[#0a1628]/60 border border-[#3c475a]/50 h-full flex flex-col justify-between">
                      <div>
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={img}
                            alt={sol.title}
                            onError={(e) => handleImageError(e, 'generative')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent" />
                          <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0a1628]/80 text-[#4cd6ff] border border-[#4cd6ff]/40 backdrop-blur-md">
                            {sol.type || 'Solution'}
                          </span>
                        </div>

                        <div className="p-6">
                          <h3 className="font-headline text-xl font-bold text-white mb-2 group-hover:text-[#ffb3b0] transition-colors">
                            {sol.title}
                          </h3>
                          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                            {sol.summary || sol.description}
                          </p>

                          {Array.isArray(sol.keyBenefits) && sol.keyBenefits.length > 0 && (
                            <div className="space-y-1.5 mb-4">
                              {sol.keyBenefits.slice(0, 2).map((ben, bIdx) => (
                                <div key={bIdx} className="flex items-center text-[11px] font-mono text-slate-400">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0" />
                                  <span className="truncate">{ben}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-0">
                        <Link
                          to={`/solutions/${sol.slug}`}
                          className="pt-4 border-t border-[#3c475a]/40 flex items-center justify-between text-xs font-mono text-[#ff6b6b] group-hover:text-[#ffb3b0] transition-colors uppercase tracking-wider font-bold"
                        >
                          <span>View Technical Architecture</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </Card3D>
                  </motion.div>
                );
              })}
            </div>

            {/* Solution Architecture Comparison Table */}
            <div className="glass-card rounded-3xl p-8 border border-[#ff6b6b]/30 bg-gradient-to-br from-[#0a1628] via-[#1a1c20] to-[#0c0e12]">
              <div className="mb-8">
                <span className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest block mb-1">
                  Benchmarked Specifications
                </span>
                <h3 className="font-headline text-2xl font-bold text-white">
                  Solution Deployment Matrix & SLA Benchmarks
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#3c475a]/60 text-xs font-mono text-[#4cd6ff] uppercase">
                      <th className="py-4 px-4">Solution Capability</th>
                      <th className="py-4 px-4">Primary Engine</th>
                      <th className="py-4 px-4">Inference Latency</th>
                      <th className="py-4 px-4">Security SLA</th>
                      <th className="py-4 px-4">Deployment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3c475a]/30 text-xs font-mono text-slate-300">
                    <tr className="hover:bg-[#1a1c20]/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">Generative LLM Engines</td>
                      <td className="py-4 px-4 text-[#ffb3b0]">Transformer RAG v4</td>
                      <td className="py-4 px-4 text-emerald-400">&lt; 15ms</td>
                      <td className="py-4 px-4">SOC2 & AES-256</td>
                      <td className="py-4 px-4">Cloud Run / On-Prem</td>
                    </tr>
                    <tr className="hover:bg-[#1a1c20]/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">Predictive Anomaly Maintenance</td>
                      <td className="py-4 px-4 text-[#ffb3b0]">IoT Telemetry Net</td>
                      <td className="py-4 px-4 text-emerald-400">&lt; 5ms</td>
                      <td className="py-4 px-4">ISO 27001</td>
                      <td className="py-4 px-4">Edge / K8s Container</td>
                    </tr>
                    <tr className="hover:bg-[#1a1c20]/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">Fraud Detection Sentinel</td>
                      <td className="py-4 px-4 text-[#ffb3b0]">High-Freq Neural Scoring</td>
                      <td className="py-4 px-4 text-emerald-400">&lt; 8ms</td>
                      <td className="py-4 px-4">PCI-DSS Level 1</td>
                      <td className="py-4 px-4">Stateless Microservice</td>
                    </tr>
                    <tr className="hover:bg-[#1a1c20]/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">Optical Quality Control</td>
                      <td className="py-4 px-4 text-[#ffb3b0]">Computer Vision YOLOv9</td>
                      <td className="py-4 px-4 text-emerald-400">60 FPS Realtime</td>
                      <td className="py-4 px-4">GDPR Audit Verified</td>
                      <td className="py-4 px-4">Industrial Edge GPU</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </section>
    </div>
  );
}
