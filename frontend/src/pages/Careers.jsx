import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, MapPin, Clock, Loader2, Sparkles, CheckCircle2, Zap, Heart, Award, Cpu, ShieldCheck } from 'lucide-react';
import { BusinessApi } from '../services/api';
import InnerPageHero from '../components/common/InnerPageHero';
import Card3D from '../components/common/Card3D';

const perks = [
  { icon: Cpu, title: 'Cutting-Edge GPU Clusters', desc: 'Access state-of-the-art compute clusters for model training and quantization.' },
  { icon: Sparkles, title: 'Dedicated R&D Fund', desc: 'Sponsorship for conference research papers, open-source SDK contributions, and patents.' },
  { icon: Globe, title: 'Remote & Flexible Mesh', desc: 'Work from anywhere with distributed global engineering nodes and flexible hours.' },
  { icon: ShieldCheck, title: 'Health & Wellness', desc: 'Comprehensive medical coverage, mental health days, and continuous wellness stipends.' },
];

import { Globe } from 'lucide-react';

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    async function loadCareers() {
      try {
        setLoading(true);
        const data = await BusinessApi.getCareers();
        setCareers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading careers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCareers();
  }, []);

  const departments = ['All', ...new Set(careers.map((c) => c.department).filter(Boolean))];

  const filteredCareers = selectedDept === 'All'
    ? careers
    : careers.filter((c) => c.department === selectedDept);

  return (
    <div className="w-full min-h-screen bg-[#0c0e12] text-[#e2e2e8]">
      
      {/* Hero Section */}
      <InnerPageHero
        badge="Join High AI-Q Team"
        title="Build Next-Generation Cognitive Systems"
        subtitle="Shape the future of enterprise intelligence, continuous MLOps telemetry, and cloud-native microservice architectures with world-class engineers."
        ctaText="View Open Positions"
        ctaLink="#roles"
        stats={[
          { label: "High AI-Q Team", value: "3,000+ Eng" },
          { label: "Retention Rate", value: "96%" },
          { label: "Global Offices", value: "Remote / Hybrid" },
          { label: "Growth Fund", value: "Dedicated R&D" }
        ]}
        previewTitle="Principal AI Research Engineer"
        previewCategory="Core Engineering"
        previewDesc="Architect state-of-the-art neural networks, multi-agent protocols, and high-throughput vector indexing systems."
        previewTag="Actively Hiring"
        previewImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
      />

      {/* Main Content Section */}
      <section id="roles" className="py-20 px-6 max-w-7xl mx-auto">

        {/* Engineering Culture Perks Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest block mb-2">
              Why Join HamaraShops.ai
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-white">
              Engineering Culture & Perks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card rounded-3xl p-6 border border-[#3c475a]/50 hover:border-[#ff6b6b]/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 flex items-center justify-center text-[#ff6b6b] mb-6 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
          </div>
        )}

        {!loading && careers.length > 0 && (
          <div className="space-y-8 max-w-5xl mx-auto">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3c475a]/40 pb-6 mb-8">
              <h3 className="font-headline text-3xl font-extrabold text-white">
                Open Engineering Roles
              </h3>

              {departments.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 bg-[#1a1c20]/80 p-1 rounded-full border border-[#3c475a]/60">
                  {departments.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        selectedDept === d
                          ? 'bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-bold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {filteredCareers.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Card3D glowColor="#ff6b6b" className="p-8 bg-[#0a1628]/60 border border-[#3c475a]/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-mono text-xs text-[#4cd6ff] font-bold">{job.department}</span>
                        <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#ff6b6b]/10 text-[#ffb3b0] border border-[#ff6b6b]/30">
                          {job.employmentType || job.type || "Full Time"}
                        </span>
                      </div>

                      <h3 className="font-headline text-2xl font-bold text-white mb-3 group-hover:text-[#ffb3b0] transition-colors">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#ff6b6b]" />
                          {job.location}
                        </span>
                        {job.experience && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#4cd6ff]" />
                            Exp: {job.experience}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/contact?role=${encodeURIComponent(job.title)}`}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-extrabold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all flex items-center gap-2 shrink-0 justify-center"
                    >
                      <span>Apply For Role</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        )}

      </section>
    </div>
  );
}
