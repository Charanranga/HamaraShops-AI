import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Globe2, Compass, Layers, ExternalLink, Loader2, Award, Zap, Building2, Rocket } from 'lucide-react';
import { ContentApi } from '../services/api';
import InnerPageHero from '../components/common/InnerPageHero';
import Card3D from '../components/common/Card3D';

const milestones = [
  { year: '2020', title: 'Foundation & AI Research Lab', desc: 'Established HamaraShops.ai to pioneer cognitive neural automation engines.' },
  { year: '2022', title: 'Microservices & Banking AI', desc: 'Launched Spring Cloud Gateway & $450M risk prevention algorithms for fintech.' },
  { year: '2024', title: '2,500+ Enterprise Deployments', desc: 'Expanded global footprint across retail, logistics, and medical diagnostic networks.' },
  { year: '2026', title: 'Cloud Run & A2A Multi-Agent Mesh', desc: 'Zero-latency distributed decision protocol for next-gen autonomous systems.' },
];

export default function Company() {
  const [company, setCompany] = useState(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompanyData() {
      try {
        setLoading(true);
        const [compData, partnerData] = await Promise.all([
          ContentApi.getCompany(),
          ContentApi.getPartners(),
        ]);
        setCompany(compData);
        setPartners(Array.isArray(partnerData) ? partnerData : []);
      } catch (err) {
        console.error('Error loading company data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCompanyData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0c0e12] text-[#e2e2e8]">
      
      {/* Hero Section */}
      <InnerPageHero
        badge="Corporate Profile & Strategic Alliances"
        title="Destination Digital — Empowering Modern Enterprise"
        subtitle="At HamaraShops.ai, we build high-performance cognitive computing architectures that solve complex business challenges at scale."
        ctaText="Explore Partnership Model"
        ctaLink="/contact"
        stats={[
          { label: "Global Alliances", value: "10 Alliances" },
          { label: "Engineering Hubs", value: "Global Mesh" },
          { label: "Security Certification", value: "SOC2 Type II" },
          { label: "Uptime Commitment", value: "99.9%" }
        ]}
        previewTitle={company?.name || "HamaraShops.ai Enterprise"}
        previewCategory="Corporate Profile"
        previewDesc={company?.headline || "Pioneering state-of-the-art neural solutions for global retail, banking, and diagnostic networks."}
        previewTag="ISO 27001 Certified"
        previewImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
      />

      {/* Main Content Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
          </div>
        )}

        {!loading && company && (
          <div className="space-y-24">
            
            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card3D glowColor="#ff6b6b" className="p-8 sm:p-10 bg-[#0a1628]/80 border border-[#ff6b6b]/40">
                <div className="w-12 h-12 rounded-2xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 flex items-center justify-center text-[#ff6b6b] mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-3xl font-extrabold text-white mb-4">Our Corporate Mission</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{company.mission}</p>
              </Card3D>

              <Card3D glowColor="#4cd6ff" className="p-8 sm:p-10 bg-[#0a1628]/80 border border-[#4cd6ff]/40">
                <div className="w-12 h-12 rounded-2xl bg-[#4cd6ff]/10 border border-[#4cd6ff]/30 flex items-center justify-center text-[#4cd6ff] mb-6">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-3xl font-extrabold text-white mb-4">Our Vision for AI</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{company.vision}</p>
              </Card3D>
            </div>

            {/* Corporate Journey Timeline */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest block mb-2">
                  History & Evolution
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-white">
                  Milestones of Innovation
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestones.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="glass-card rounded-3xl p-6 border border-[#3c475a]/50 hover:border-[#ff6b6b]/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="px-3 py-1 rounded-full bg-[#ff6b6b]/15 text-[#ffb3b0] font-mono text-xs font-bold inline-block mb-4 border border-[#ff6b6b]/30">
                        {m.year}
                      </span>
                      <h3 className="font-headline text-lg font-bold text-white mb-2">{m.title}</h3>
                      <p className="text-xs font-mono text-slate-300 leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strategic Alliance Partners Grid */}
            {partners.length > 0 && (
              <div>
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs font-mono text-[#4cd6ff] uppercase tracking-widest block mb-2">
                    Ecosystem Co-Innovation
                  </span>
                  <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-white">
                    Strategic Alliances & Cloud Partners
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {partners.map((p, pIdx) => (
                    <motion.div
                      key={p.id || pIdx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: pIdx * 0.1 }}
                    >
                      <Card3D glowColor="#4cd6ff" className="p-6 bg-[#0a1628]/60 border border-[#3c475a]/50 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <Building2 className="w-6 h-6 text-[#ff6b6b]" />
                            <span className="px-3 py-1 rounded-full bg-[#4cd6ff]/10 text-[#4cd6ff] text-xs font-mono font-bold border border-[#4cd6ff]/30">
                              {p.tier || 'Alliance Partner'}
                            </span>
                          </div>
                          <h3 className="font-headline text-xl font-bold text-white mb-2">{p.name}</h3>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.description}</p>
                        </div>
                      </Card3D>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </section>
    </div>
  );
}
