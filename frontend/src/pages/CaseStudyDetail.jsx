import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, ArrowLeft, Loader2, Zap, CheckCircle2 } from 'lucide-react';
import { ContentApi } from '../services/api';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [cs, setCs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await ContentApi.getCaseStudyBySlug(slug);
        setCs(data);
      } catch (err) {
        console.error('Error loading case study detail:', err);
        setError(`Case Study report "${slug}" was not found.`);
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

  if (error || !cs) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 text-center max-w-xl mx-auto">
        <div className="glass-card p-8 rounded-2xl border border-red-500/40">
          <h2 className="text-2xl font-bold text-white mb-4">Report Not Found</h2>
          <p className="text-sm text-slate-300 mb-6">{error}</p>
          <Link to="/case-studies" className="px-6 py-2.5 bg-[#ff6b6b] text-white rounded-xl font-bold text-sm">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <Link to="/case-studies" className="inline-flex items-center gap-2 text-xs font-mono text-[#bcc7dd] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#ff6b6b]" />
        <span>Back to Case Studies</span>
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-[#3c475a]/60">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#4cd6ff]/10 border border-[#4cd6ff]/30 flex items-center justify-center text-[#4cd6ff]">
            <FileText className="w-7 h-7" />
          </div>
          {cs.client && (
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-slate-200 border border-white/10">
              Client: {cs.client}
            </span>
          )}
        </div>

        <h1 className="font-headline-lg text-3xl sm:text-5xl font-extrabold text-white mb-6">
          {cs.title}
        </h1>
        <p className="text-base text-[#bcc7dd] leading-relaxed max-w-3xl mb-8">
          {cs.summary}
        </p>

        {Array.isArray(cs.metrics) && cs.metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#3c475a]/50">
            {cs.metrics.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#4cd6ff] p-3 rounded-xl bg-[#4cd6ff]/10 border border-[#4cd6ff]/20">
                <Zap className="w-4 h-4 text-[#ff6b6b] shrink-0" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {cs.challenge && (
        <div className="glass-card p-8 rounded-2xl mb-8 border border-[#3c475a]/50">
          <h3 className="font-headline-md text-xl font-bold text-white mb-4 text-[#ff6b6b]">The Enterprise Challenge</h3>
          <p className="text-sm text-[#bcc7dd] leading-relaxed">{cs.challenge}</p>
        </div>
      )}

      {cs.solution && (
        <div className="glass-card p-8 rounded-2xl mb-8 border border-[#3c475a]/50">
          <h3 className="font-headline-md text-xl font-bold text-white mb-4 text-[#4cd6ff]">The Deployed Architecture</h3>
          <p className="text-sm text-[#bcc7dd] leading-relaxed">{cs.solution}</p>
        </div>
      )}

      {cs.impact && (
        <div className="glass-card p-8 rounded-2xl border border-[#3c475a]/50">
          <h3 className="font-headline-md text-xl font-bold text-white mb-4 text-emerald-400">Business Impact & Results</h3>
          <p className="text-sm text-[#bcc7dd] leading-relaxed">{cs.impact}</p>
        </div>
      )}
    </div>
  );
}
