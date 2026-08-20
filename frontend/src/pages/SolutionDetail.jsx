import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, CheckCircle2, ArrowLeft, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { ContentApi } from '../services/api';

export default function SolutionDetail() {
  const { slug } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await ContentApi.getSolutions();
        const found = Array.isArray(data) ? data.find((s) => s.slug === slug) : null;
        if (found) {
          setSolution(found);
        } else {
          setError(`Solution record "${slug}" was not found.`);
        }
      } catch (err) {
        console.error('Error loading solution detail:', err);
        setError('Failed to fetch solution detail from API Gateway.');
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

  if (error || !solution) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 text-center max-w-xl mx-auto">
        <div className="glass-card p-8 rounded-2xl border border-red-500/40">
          <h2 className="text-2xl font-bold text-white mb-4">Solution Not Found</h2>
          <p className="text-sm text-slate-300 mb-6">{error}</p>
          <Link to="/solutions" className="px-6 py-2.5 bg-[#ff6b6b] text-white rounded-xl font-bold text-sm">
            Back to Solutions Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <Link to="/solutions" className="inline-flex items-center gap-2 text-xs font-mono text-[#bcc7dd] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#ff6b6b]" />
        <span>Back to Solutions Portfolio</span>
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-[#3c475a]/60">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#ff6b6b]/10 text-[#ffb3b0] border border-[#ff6b6b]/30">
            {solution.type}
          </span>
          {solution.industry && (
            <span className="text-xs font-mono text-[#4cd6ff]">{solution.industry}</span>
          )}
        </div>

        <h1 className="font-headline-lg text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {solution.title}
        </h1>
        {solution.subtitle && (
          <p className="text-base font-mono text-[#4cd6ff] mb-6">{solution.subtitle}</p>
        )}
        <p className="text-base text-[#bcc7dd] leading-relaxed max-w-3xl mb-8">
          {solution.summary}
        </p>

        <div className="pt-6 border-t border-[#3c475a]/50">
          <Link to="/contact" className="px-6 py-3 rounded-xl bg-[#ff6b6b] text-[#68000f] font-bold text-sm hover:bg-[#ffb3b0] transition-colors inline-block">
            Consult Solution Architect
          </Link>
        </div>
      </div>

      {Array.isArray(solution.keyBenefits) && solution.keyBenefits.length > 0 && (
        <div className="mb-12">
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ff6b6b]" />
            <span>Key Enterprise Benefits</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solution.keyBenefits.map((benefit, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl flex items-start gap-3 border border-[#3c475a]/40">
                <CheckCircle2 className="w-5 h-5 text-[#4cd6ff] shrink-0 mt-0.5" />
                <span className="text-sm text-[#bcc7dd]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(solution.components) && solution.components.length > 0 && (
        <div>
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#ff6b6b]" />
            <span>Core Technical Components</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {solution.components.map((comp, idx) => (
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
