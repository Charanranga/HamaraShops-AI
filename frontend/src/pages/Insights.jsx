import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Loader2, Zap, BookOpen, FileText } from 'lucide-react';
import { ContentApi } from '../services/api';
import InnerPageHero from '../components/common/InnerPageHero';
import Card3D from '../components/common/Card3D';
import { getSmartImage, handleImageError } from '../utils/imageUtils';

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    async function loadInsights() {
      try {
        setLoading(true);
        const data = await ContentApi.getInsights();
        setInsights(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading insights:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInsights();
  }, []);

  const leadPaper = insights[0] || {};
  const leadImage = getSmartImage(leadPaper);

  const tags = ['All', 'AI Architecture', 'Ethics & Governance', 'LLM Tuning', 'Computer Vision'];

  const filteredInsights = selectedTag === 'All'
    ? insights
    : insights.filter((i) => i.category === selectedTag || i.title.toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <div className="w-full min-h-screen bg-[#0c0e12] text-[#e2e2e8]">
      
      {/* Hero Section */}
      <InnerPageHero
        badge="Research & Thought Leadership"
        title="AI Engineering Research & Intelligence Briefs"
        subtitle="Deep-dive analysis on ethical AI design, responsible neural networks, vision AI diagnostic accuracy, and connected microservice architectures."
        ctaText="Subscribe to AI Research"
        ctaLink="/contact"
        stats={[
          { label: "Research Papers", value: "25+ Papers" },
          { label: "Monthly Readers", value: "150K+" },
          { label: "Citation Index", value: "Top 5%" },
          { label: "Open Benchmark", value: "Public SDK" }
        ]}
        previewTitle="A2A Protocol for Multi-Agent Systems"
        previewCategory="AI Architecture"
        previewDesc="Autonomous agent-to-agent communication framework for zero-latency distributed decision making."
        previewTag="Published Research"
        previewImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
      />

      {/* Main Content Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
          </div>
        )}

        {!loading && insights.length > 0 && (
          <div>
            
            {/* Featured Lead Research Paper Banner */}
            <div className="mb-20">
              <span className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest block mb-3">
                Lead Research Spotlight
              </span>

              <Card3D glowColor="#ff6b6b" className="bg-gradient-to-br from-[#0a1628] via-[#1a1c20] to-[#0c0e12] border border-[#ff6b6b]/40 p-8 sm:p-12 rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6">
                    <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                      <img
                        src={leadImage}
                        alt={leadPaper.title}
                        onError={(e) => handleImageError(e, 'nlp')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#ff6b6b] text-white font-mono text-xs font-bold uppercase">
                        {leadPaper.category || 'Lead Journal'}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono text-[#4cd6ff] mb-3">
                        <BookOpen className="w-4 h-4 text-[#ff6b6b]" />
                        <span>Peer-Reviewed Journal Publication</span>
                      </div>

                      <h2 className="font-headline text-2xl sm:text-4xl font-extrabold text-white mb-4">
                        {leadPaper.title}
                      </h2>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        {leadPaper.description || leadPaper.summary}
                      </p>

                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-8">
                        {leadPaper.author && (
                          <span className="flex items-center gap-1 text-[#ffb3b0]">
                            <User className="w-3.5 h-3.5 text-[#ff6b6b]" /> {leadPaper.author}
                          </span>
                        )}
                        {leadPaper.date && (
                          <span className="flex items-center gap-1 text-[#4cd6ff]">
                            <Calendar className="w-3.5 h-3.5" /> {leadPaper.date}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/insights/${leadPaper.slug}`}
                      className="inline-flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-extrabold text-sm hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all group"
                    >
                      <span>Read Complete Peer-Reviewed Research</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Card3D>
            </div>

            {/* Category Filter Pills & Research Stream Grid */}
            <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3c475a]/40 pb-6">
              <h3 className="font-headline text-2xl font-bold text-white">
                All Engineering Briefs & Papers
              </h3>

              <div className="flex flex-wrap items-center gap-2 bg-[#1a1c20]/80 p-1 rounded-full border border-[#3c475a]/60">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTag(t)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      selectedTag === t
                        ? 'bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-extrabold shadow-md shadow-[#ff6b6b]/20'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInsights.map((item, idx) => {
                const cardImg = getSmartImage(item);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <Card3D glowColor="#4cd6ff" className="bg-[#0a1628]/60 border border-[#3c475a]/50 h-full flex flex-col justify-between">
                      <div>
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={cardImg}
                            alt={item.title}
                            onError={(e) => handleImageError(e, 'default')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent" />
                          <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0a1628]/80 text-[#4cd6ff] border border-[#4cd6ff]/40 backdrop-blur-md">
                            {item.category || 'Research'}
                          </span>
                        </div>

                        <div className="p-6">
                          <h3 className="font-headline text-lg font-bold text-white mb-2 group-hover:text-[#ffb3b0] transition-colors leading-snug">
                            {item.title}
                          </h3>

                          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                            {item.description || item.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-0">
                        <Link
                          to={`/insights/${item.slug}`}
                          className="pt-4 border-t border-[#3c475a]/40 flex items-center justify-between text-xs font-mono text-[#ff6b6b] group-hover:text-[#ffb3b0] transition-colors uppercase tracking-wider font-bold"
                        >
                          <span>Read Research Paper</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </Card3D>
                  </motion.div>
                );
              })}
            </div>

          </div>
        )}

      </section>
    </div>
  );
}
