import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, CheckCircle2, ArrowLeft, Loader2, Zap } from 'lucide-react';
import { BusinessApi } from '../services/api';

export default function IndustryDetail() {
  const { slug } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await BusinessApi.getIndustryBySlug(slug);
        setIndustry(data);
      } catch (err) {
        console.error('Error loading industry detail:', err);
        setError(`Industry vertical "${slug}" was not found.`);
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

  if (error || !industry) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 text-center max-w-xl mx-auto">
        <div className="glass-card p-8 rounded-2xl border border-red-500/40">
          <h2 className="text-2xl font-bold text-white mb-4">Industry Vertical Not Found</h2>
          <p className="text-sm text-slate-300 mb-6">{error}</p>
          <Link to="/industries" className="px-6 py-2.5 bg-[#ff6b6b] text-white rounded-xl font-bold text-sm">
            Back to Industry Domain Verticals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <Link to="/industries" className="inline-flex items-center gap-2 text-xs font-mono text-[#bcc7dd] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#ff6b6b]" />
        <span>Back to Industry Verticals</span>
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-[#3c475a]/60">
        <div className="w-14 h-14 rounded-2xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 flex items-center justify-center text-[#ff6b6b] mb-6">
          <Building2 className="w-7 h-7" />
        </div>

        <h1 className="font-headline-lg text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {industry.name}
        </h1>
        {industry.subtitle && (
          <p className="text-base font-mono text-[#4cd6ff] mb-6">{industry.subtitle}</p>
        )}
        <p className="text-base text-[#bcc7dd] leading-relaxed max-w-3xl mb-8">
          {industry.description}
        </p>

        {((Array.isArray(industry.impactMetrics) && industry.impactMetrics.length > 0) || industry.keyImpact) && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 max-w-xl mb-8">
            <Zap className="w-5 h-5 text-[#ff6b6b] shrink-0" />
            <span className="text-sm font-mono text-white">
              {Array.isArray(industry.impactMetrics) ? industry.impactMetrics.join(' • ') : industry.keyImpact}
            </span>
          </div>
        )}

        <div className="pt-6 border-t border-[#3c475a]/50">
          <Link to="/contact" className="px-6 py-3 rounded-xl bg-[#ff6b6b] text-[#68000f] font-bold text-sm hover:bg-[#ffb3b0] transition-colors inline-block">
            Consult Industry Domain Specialist
          </Link>
        </div>
      </div>

      {Array.isArray(industry.keyCapabilities) && industry.keyCapabilities.length > 0 && (
        <div className="mb-12">
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#4cd6ff]" />
            <span>Core Domain Capabilities</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industry.keyCapabilities.map((cap, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl border border-[#4cd6ff]/30 text-center">
                <span className="text-xs font-mono text-[#4cd6ff]">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(industry.useCases) && industry.useCases.length > 0 && (
        <div>
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#ff6b6b]" />
            <span>Deployed Domain Use Cases</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industry.useCases.map((uc, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl flex items-start gap-3 border border-[#3c475a]/40">
                <CheckCircle2 className="w-5 h-5 text-[#ff6b6b] shrink-0 mt-0.5" />
                <span className="text-sm text-[#bcc7dd]">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
