import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Loader2, Calendar, User } from 'lucide-react';
import { ContentApi } from '../services/api';

export default function InsightDetail() {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await ContentApi.getInsights();
        const found = Array.isArray(data) ? data.find((i) => i.slug === slug) : null;
        if (found) {
          setInsight(found);
        } else {
          setError(`Research brief "${slug}" was not found.`);
        }
      } catch (err) {
        console.error('Error loading insight detail:', err);
        setError('Failed to fetch research brief detail from API Gateway.');
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

  if (error || !insight) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 text-center max-w-xl mx-auto">
        <div className="glass-card p-8 rounded-2xl border border-red-500/40">
          <h2 className="text-2xl font-bold text-white mb-4">Research Brief Not Found</h2>
          <p className="text-sm text-slate-300 mb-6">{error}</p>
          <Link to="/insights" className="px-6 py-2.5 bg-[#ff6b6b] text-white rounded-xl font-bold text-sm">
            Back to Research Briefs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <Link to="/insights" className="inline-flex items-center gap-2 text-xs font-mono text-[#bcc7dd] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#ff6b6b]" />
        <span>Back to Research Briefs</span>
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-[#3c475a]/60">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-[#4cd6ff]" />
          <span className="font-mono text-xs text-[#4cd6ff] uppercase tracking-widest">
            {insight.category || 'Research Brief'}
          </span>
        </div>

        <h1 className="font-headline-lg text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          {insight.title}
        </h1>

        <div className="flex items-center gap-6 text-xs font-mono text-slate-400 mb-8 pb-6 border-b border-[#3c475a]/40">
          {insight.author && (
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#ff6b6b]" />
              {insight.author}
            </span>
          )}
          {insight.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#4cd6ff]" />
              {insight.date}
            </span>
          )}
        </div>

        <p className="text-lg text-[#ffb3b0] font-mono leading-relaxed mb-8 italic">
          "{insight.description || insight.summary}"
        </p>

        {Array.isArray(insight.tags) && insight.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {insight.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-mono px-3 py-1 rounded-full bg-[#1a1c20] text-[#4cd6ff] border border-[#3c475a]">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-invert max-w-none text-[#bcc7dd] text-base leading-relaxed space-y-4">
          <p>{insight.content || insight.description || insight.summary}</p>
        </div>
      </div>
    </div>
  );
}
