import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Sparkles, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import { ContentApi } from '../services/api';
import InnerPageHero from '../components/common/InnerPageHero';
import { getSmartImage, handleImageError } from '../utils/imageUtils';

const lifecycleSteps = [
  { step: '01', title: 'AI Readiness & Audit', desc: 'Comprehensive data architecture evaluation, security vulnerability audit, and infrastructure cost modeling.' },
  { step: '02', title: 'Architecture Synthesis', desc: 'Custom neural pipeline engineering, model weight selection, and RAG retrieval graph design.' },
  { step: '03', title: 'Fine-Tuning & MLOps', desc: 'Hyper-parameter tuning, model quantization for microsecond inference, and CI/CD ingestion.' },
  { step: '04', title: 'Production Cloud Deployment', desc: 'Stateless Cloud Run scaling, automated failover, and continuous governance monitoring.' },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        const data = await ContentApi.getServices();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0c0e12] text-[#e2e2e8]">
      
      {/* Hero Section */}
      <InnerPageHero
        badge="Full-Lifecycle AI Services"
        title="Engineering Excellence & AI Advisory Services"
        subtitle="From initial discovery and AI readiness evaluation to custom model training, MLOps telemetry, and cloud-native scaling."
        ctaText="Book AI Advisory Session"
        ctaLink="/contact"
        stats={[
          { label: "Engineering Services", value: "9+" },
          { label: "Uptime SLA", value: "99.9%" },
          { label: "Deployment Speed", value: "3x Faster" },
          { label: "Client Satisfaction", value: "100%" }
        ]}
        previewTitle="Custom LLM & Neural Model Training"
        previewCategory="Engineering Service"
        previewDesc="End-to-end continuous training pipelines, model monitoring, and automated failover."
        previewTag="Lifecycle Managed"
        previewImage="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
      />

      {/* Main Content Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">

        {/* 4-Stage Lifecycle Stepper Header */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest block mb-2">
              Engineering Delivery Framework
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-extrabold text-white">
              Our 4-Stage Service Lifecycle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifecycleSteps.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-6 border border-[#3c475a]/50 hover:border-[#ff6b6b]/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="font-mono text-3xl font-extrabold text-[#ff6b6b] mb-4 group-hover:scale-110 transition-transform">
                    {s.step}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
          </div>
        )}

        {/* Alternating Zig-Zag Feature Showcases */}
        {!loading && services.length > 0 && (
          <div className="space-y-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono text-[#4cd6ff] uppercase tracking-widest block mb-1">
                Engineering Capabilities
              </span>
              <h2 className="font-headline text-3xl font-extrabold text-white">
                Detailed Service Offerings
              </h2>
            </div>

            {services.map((srv, idx) => {
              const img = getSmartImage(srv);
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center glass-card rounded-3xl p-8 sm:p-12 border border-[#3c475a]/60 bg-gradient-to-br from-[#0a1628] via-[#1a1c20] to-[#0c0e12] ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Visual Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                      <img
                        src={img}
                        alt={srv.name || srv.title}
                        onError={(e) => handleImageError(e, 'mlops')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#ff6b6b] text-white font-mono text-xs font-bold uppercase tracking-wider">
                        {srv.serviceType || 'Core Service'}
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 flex flex-col justify-between ${isEven ? '' : 'lg:order-1'}`}>
                    <div>
                      <span className="text-xs font-mono text-[#4cd6ff] uppercase tracking-widest block mb-2">
                        Service Offering #{idx + 1}
                      </span>
                      <h3 className="font-headline text-3xl font-extrabold text-white mb-4">
                        {srv.name || srv.title}
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        {srv.shortDescription || srv.summary || srv.description}
                      </p>

                      {Array.isArray(srv.deliverables) && srv.deliverables.length > 0 && (
                        <div className="space-y-2 mb-8">
                          <div className="text-xs font-mono text-[#ffb3b0] uppercase tracking-wider mb-2">
                            Key Deliverables:
                          </div>
                          {srv.deliverables.map((del, dIdx) => (
                            <div key={dIdx} className="flex items-center text-xs font-mono text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/services/${srv.slug}`}
                      className="inline-flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-bold text-sm hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all group"
                    >
                      <span>Explore Service Deliverables & SLA</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </section>
    </div>
  );
}
