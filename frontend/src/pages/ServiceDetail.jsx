import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wrench, CheckCircle2, ArrowLeft, Loader2, Layers } from 'lucide-react';
import { ContentApi } from '../services/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await ContentApi.getServices();
        const found = Array.isArray(data) ? data.find((s) => s.slug === slug) : null;
        if (found) {
          setService(found);
        } else {
          setError(`Service offering "${slug}" was not found.`);
        }
      } catch (err) {
        console.error('Error loading service detail:', err);
        setError('Failed to fetch service detail from API Gateway.');
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

  if (error || !service) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 text-center max-w-xl mx-auto">
        <div className="glass-card p-8 rounded-2xl border border-red-500/40">
          <h2 className="text-2xl font-bold text-white mb-4">Service Not Found</h2>
          <p className="text-sm text-slate-300 mb-6">{error}</p>
          <Link to="/services" className="px-6 py-2.5 bg-[#ff6b6b] text-white rounded-xl font-bold text-sm">
            Back to Service Offerings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <Link to="/services" className="inline-flex items-center gap-2 text-xs font-mono text-[#bcc7dd] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#ff6b6b]" />
        <span>Back to Service Offerings</span>
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-[#3c475a]/60">
        <div className="w-14 h-14 rounded-2xl bg-[#4cd6ff]/10 border border-[#4cd6ff]/30 flex items-center justify-center text-[#4cd6ff] mb-6">
          <Wrench className="w-7 h-7" />
        </div>

        <h1 className="font-headline-lg text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {service.name || service.title}
        </h1>
        {(service.serviceType || service.subtitle) && (
          <p className="text-base font-mono text-[#ffb3b0] mb-6">{service.serviceType || service.subtitle}</p>
        )}
        <p className="text-base text-[#bcc7dd] leading-relaxed max-w-3xl mb-8">
          {service.fullDescription || service.shortDescription || service.summary}
        </p>

        <div className="pt-6 border-t border-[#3c475a]/50">
          <Link to="/contact" className="px-6 py-3 rounded-xl bg-[#ff6b6b] text-[#68000f] font-bold text-sm hover:bg-[#ffb3b0] transition-colors inline-block">
            Engage AI Engineering Team
          </Link>
        </div>
      </div>

      {Array.isArray(service.deliverables) && service.deliverables.length > 0 && (
        <div className="mb-12">
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#ff6b6b]" />
            <span>Service Deliverables</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl flex items-start gap-3 border border-[#3c475a]/40">
                <CheckCircle2 className="w-5 h-5 text-[#4cd6ff] shrink-0 mt-0.5" />
                <span className="text-sm text-[#bcc7dd]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(service.components) && service.components.length > 0 && (
        <div>
          <h3 className="font-headline-md text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#ff6b6b]" />
            <span>Technical Methodology</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.components.map((comp, idx) => (
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
