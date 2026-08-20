import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, MapPin, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { BusinessApi } from '../services/api';

export default function CareerDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await BusinessApi.getCareerById(id);
        setJob(data);
      } catch (err) {
        console.error('Error loading career detail:', err);
        setError(`Career opening "${id}" was not found.`);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#ff6b6b] animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 text-center max-w-xl mx-auto">
        <div className="glass-card p-8 rounded-2xl border border-red-500/40">
          <h2 className="text-2xl font-bold text-white mb-4 font-headline-lg">Role Not Found</h2>
          <p className="text-sm text-slate-300 mb-6">{error}</p>
          <Link to="/careers" className="px-6 py-2.5 bg-[#ff6b6b] text-white rounded-xl font-bold text-sm">
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <Link to="/careers" className="inline-flex items-center gap-2 text-xs font-mono text-[#bcc7dd] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#ff6b6b]" />
        <span>Back to Open Positions</span>
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-[#3c475a]/60">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#4cd6ff] font-bold">{job.department}</span>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#ff6b6b]/10 text-[#ffb3b0] border border-[#ff6b6b]/30">
            {job.employmentType || job.type}
          </span>
        </div>

        <h1 className="font-headline-lg text-3xl sm:text-5xl font-extrabold text-white mb-6">
          {job.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400 mb-8 pb-6 border-b border-[#3c475a]/40">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#ff6b6b]" />
            Location: {job.location}
          </span>
          {job.experience && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#4cd6ff]" />
              Required Experience: {job.experience}
            </span>
          )}
        </div>

        <p className="text-base text-[#bcc7dd] leading-relaxed mb-8">
          {job.description}
        </p>

        <div className="pt-4">
          <Link to="/contact" className="px-8 py-3.5 rounded-xl bg-[#ff6b6b] text-[#68000f] font-bold text-sm hover:bg-[#ffb3b0] transition-colors inline-block">
            Submit Application Resume
          </Link>
        </div>
      </div>

      {Array.isArray(job.requirements) && job.requirements.length > 0 && (
        <div className="glass-card p-8 rounded-2xl border border-[#3c475a]/50 mb-8">
          <h3 className="font-headline-md text-xl font-bold text-white mb-6">Role Requirements & Qualifications</h3>
          <div className="space-y-3">
            {job.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ff6b6b] shrink-0 mt-0.5" />
                <span className="text-sm text-[#bcc7dd] leading-relaxed">{req}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
        <div className="glass-card p-8 rounded-2xl border border-[#3c475a]/50">
          <h3 className="font-headline-md text-xl font-bold text-white mb-6">Key Responsibilities</h3>
          <div className="space-y-3">
            {job.responsibilities.map((resp, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4cd6ff] shrink-0 mt-0.5" />
                <span className="text-sm text-[#bcc7dd] leading-relaxed">{resp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
