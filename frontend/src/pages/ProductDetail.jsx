import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Cpu, CheckCircle2, ArrowLeft, Zap, ShieldCheck, Layers, Loader2 } from 'lucide-react';
import { ContentApi } from '../services/api';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await ContentApi.getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        console.error('Error loading product detail:', err);
        setError(`Product "${slug}" was not found or failed to load from API Gateway.`);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 text-center max-w-xl mx-auto">
        <div className="glass-card p-8 rounded-2xl border border-red-500/40">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-sm text-slate-300 mb-6">{error}</p>
          <Link to="/products" className="px-6 py-2.5 bg-[#ff6b6b] text-white rounded-xl font-bold text-sm">
            Back to Products Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      {/* Back Link */}
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-mono text-[#bcc7dd] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#ff6b6b]" />
        <span>Back to Products</span>
      </Link>

      {/* Hero Header */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-[#3c475a]/60">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 flex items-center justify-center text-[#ff6b6b]">
            <Cpu className="w-7 h-7" />
          </div>
          {product.category && (
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#4cd6ff]/10 text-[#4cd6ff] border border-[#4cd6ff]/30">
              {product.category}
            </span>
          )}
        </div>

        <h1 className="font-headline-lg text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {product.title || product.name}
        </h1>
        {(product.tagline || product.subtitle) && (
          <p className="text-base font-mono text-[#ffb3b0] mb-6">{product.tagline || product.subtitle}</p>
        )}
        <p className="text-base text-[#bcc7dd] leading-relaxed max-w-3xl mb-8">
          {product.description || product.summary}
        </p>

        <div className="flex flex-wrap gap-4 pt-6 border-t border-[#3c475a]/50">
          <Link to="/contact" className="px-6 py-3 rounded-xl bg-[#ff6b6b] text-[#68000f] font-bold text-sm hover:bg-[#ffb3b0] transition-colors">
            Request Demo & Specs
          </Link>
        </div>
      </div>

      {/* Verified Metrics Grid */}
      {Array.isArray(product.metrics) && product.metrics.length > 0 && (
        <div className="mb-12">
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#ff6b6b]" />
            <span>Verified Performance Metrics</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.metrics.map((metric, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-[#4cd6ff]/20">
                <p className="text-sm font-mono text-[#4cd6ff] leading-relaxed">{metric}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Features List */}
      {((Array.isArray(product.features) && product.features.length > 0) || (Array.isArray(product.keyFeatures) && product.keyFeatures.length > 0)) && (
        <div className="mb-12">
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#ff6b6b]" />
            <span>Key Engine Capabilities</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(product.features || product.keyFeatures).map((feat, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl flex items-start gap-3 border border-[#3c475a]/40">
                <CheckCircle2 className="w-5 h-5 text-[#ff6b6b] shrink-0 mt-0.5" />
                <span className="text-sm text-[#bcc7dd]">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits / System Components */}
      {((Array.isArray(product.benefits) && product.benefits.length > 0) || (Array.isArray(product.components) && product.components.length > 0)) && (
        <div>
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#ff6b6b]" />
            <span>Key Benefits & Capabilities</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(product.benefits || product.components).map((comp, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl border border-[#3c475a]/40 text-center">
                <span className="text-xs font-mono text-white">{comp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
