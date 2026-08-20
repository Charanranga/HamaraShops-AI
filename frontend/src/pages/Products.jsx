import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { ContentApi } from '../services/api';
import InnerPageHero from '../components/common/InnerPageHero';
import { handleImageError, getSmartImage } from '../utils/imageUtils';

const getProductImage = (p) => {
  if (p.image) return p.image;
  const slug = (p.slug || p.title || p.name || '').toLowerCase();
  if (slug.includes('cognitive') || slug.includes('automation')) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
  if (slug.includes('data') || slug.includes('analytics')) return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
  if (slug.includes('vision') || slug.includes('computer')) return 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80';
  if (slug.includes('nlp') || slug.includes('language')) return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80';
  if (slug.includes('defensive') || slug.includes('security') || slug.includes('threat')) return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80';
  if (slug.includes('mlops') || slug.includes('pipeline') || slug.includes('hub')) return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80';
  return 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80';
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await ContentApi.getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err.message || 'Failed to fetch products from API Gateway.');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = filterCategory === 'All' 
    ? products 
    : products.filter((p) => p.category === filterCategory);

  const selectedProduct = filteredProducts[activeHighlight] || filteredProducts[0] || {};
  const selectedImage = getProductImage(selectedProduct);

  return (
    <div className="w-full min-h-screen bg-[#0c0e12] text-[#e2e2e8]">
      
      {/* Cinematic Hero */}
      <InnerPageHero
        badge="AI Engine Marketplace"
        title="Enterprise AI Products Built for Scale"
        subtitle="Production-ready algorithms, self-learning cognitive engines, and automated MLOps platforms engineered for immediate ROI."
        ctaText="Explore AI Engines"
        ctaLink="/contact"
        stats={[
          { label: "Core AI Engines", value: "6+" },
          { label: "Daily Inferences", value: "50M+" },
          { label: "Model Accuracy", value: "99.4%" },
          { label: "Deployment Time", value: "< 2 Wks" }
        ]}
        previewTitle={selectedProduct.title || selectedProduct.name || "Cognitive Automation Engine"}
        previewCategory={selectedProduct.category || "AI Core Engine"}
        previewDesc={selectedProduct.description || selectedProduct.summary || "Autonomous workflow engine for complex document understanding and telemetry parsing."}
        previewTag="Live Production Ready"
        previewImage={selectedImage}
      />

      {/* Main Content Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        
        {/* Category Selector Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilterCategory(cat);
                  setActiveHighlight(0);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-extrabold shadow-lg shadow-[#ff6b6b]/30'
                    : 'bg-[#1a1c20] text-[#bcc7dd] border border-[#3c475a] hover:border-[#ff6b6b]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="glass-card p-6 rounded-2xl border border-red-500/40 text-center max-w-md mx-auto my-12">
            <p className="text-red-400 text-sm mb-2">{error}</p>
            <span className="text-xs text-slate-400 font-mono">Gateway target: http://localhost:8080/api/v1/products</span>
          </div>
        )}

        {/* QBurst-Style Split Featured Showcase + Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div>
            
            {/* Interactive Showcase Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
              
              {/* Left Column: Interactive Product Selection List with Option Images */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-xs font-mono text-[#ffb3b0] uppercase tracking-widest mb-4 px-2">
                  Featured AI Platform Selection
                </h3>
                {filteredProducts.map((p, idx) => {
                  const img = getProductImage(p);
                  return (
                    <div
                      key={p.id}
                      onClick={() => setActiveHighlight(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                        activeHighlight === idx
                          ? 'bg-gradient-to-r from-[#ff6b6b]/20 to-transparent border-[#ff6b6b] text-white shadow-xl translate-x-1'
                          : 'bg-[#0a1628]/40 border-[#3c475a]/50 text-slate-400 hover:border-[#ff6b6b]/40 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={img}
                          alt={p.title || p.name}
                          onError={(e) => handleImageError(e, 'cognitive')}
                          className="w-11 h-11 rounded-xl object-cover border border-white/10 shrink-0 shadow-md group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <div className="font-bold text-base text-white">{p.title || p.name}</div>
                          <div className="text-xs font-mono text-[#4cd6ff]">{p.category}</div>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${activeHighlight === idx ? 'text-[#ff6b6b] translate-x-1' : 'opacity-40'}`} />
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Dynamic Showcase Card with Related Feature Image */}
              <div className="lg:col-span-7">
                <motion.div
                  key={selectedProduct.id || activeHighlight}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-3xl p-6 sm:p-8 border border-[#ff6b6b]/40 shadow-2xl h-full flex flex-col justify-between bg-gradient-to-br from-[#0a1628] via-[#1a1c20] to-[#0c0e12] overflow-hidden"
                >
                  <div>
                    {/* Visual Option Image Card */}
                    <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-white/10 group">
                      <img
                        src={selectedImage}
                        alt={selectedProduct.title || selectedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#ff6b6b] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
                        {selectedProduct.category || "Core Engine"}
                      </span>
                      <span className="absolute bottom-3 right-3 text-xs font-mono text-emerald-400 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#ff6b6b]" /> Enterprise Grade
                      </span>
                    </div>

                    <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white mb-3">
                      {selectedProduct.title || selectedProduct.name}
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {selectedProduct.description || selectedProduct.summary}
                    </p>

                    {Array.isArray(selectedProduct.features) && selectedProduct.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {selectedProduct.features.map((feat, fIdx) => (
                          <div key={fIdx} className="p-2.5 rounded-xl bg-[#0c0e12]/80 border border-[#3c475a]/50 text-xs font-mono text-slate-300 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#ff6b6b] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/products/${selectedProduct.slug}`}
                    className="inline-flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8533] text-[#68000f] font-bold text-sm hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all group"
                  >
                    <span>View Technical Specifications & Architecture</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

            </div>

            {/* All Products Grid with Card Option Images */}
            <div className="mt-16">
              <h3 className="font-headline text-2xl font-bold text-white mb-8 border-b border-[#3c475a]/40 pb-4">
                All Production Models
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, idx) => {
                  const cardImg = getProductImage(product);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-[#3c475a]/50 hover:border-[#ff6b6b]/60 transition-all duration-300 group"
                    >
                      <div>
                        {/* Option Image Header */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={cardImg}
                            alt={product.title || product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent" />
                          {product.category && (
                            <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0a1628]/80 text-[#4cd6ff] border border-[#4cd6ff]/40 backdrop-blur-md">
                              {product.category}
                            </span>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="font-headline text-xl font-bold text-white mb-2 group-hover:text-[#ffb3b0] transition-colors">
                            {product.title || product.name}
                          </h3>

                          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                            {product.description || product.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-0">
                        <Link
                          to={`/products/${product.slug}`}
                          className="pt-4 border-t border-[#3c475a]/40 flex items-center justify-between text-xs font-mono text-[#ff6b6b] group-hover:text-[#ffb3b0] transition-colors uppercase tracking-wider font-bold"
                        >
                          <span>Explore Engine</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
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
