'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { trackLead } from '@/lib/analytics/lead';

interface LeadMagnetProps {
  title: string;
  description: string;
  downloadFile: string;
}

export default function LeadMagnet({
  title,
  description,
  downloadFile,
}: LeadMagnetProps) {
  const [email, setEmail] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isDownloading) return;

    // 1. Native CRM telemetry tracking
    trackLead('lead_magnet_download', {
      magnet: title,
      email: email
    });

    setIsDownloading(true);
    try {
      const res = await fetch(`/api/download/${downloadFile}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Download request failed');

      // Intercept the raw binary blob
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Inject ghost anchor node for secure browser execution
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = downloadFile;
      document.body.appendChild(link);
      link.click();
      
      // Standard cleanup
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      alert('Thank you! Your guide is downloading now.');
      setEmail('');
    } catch (err) {
      console.error(err);
      alert('Sorry, there was an issue processing your download securely.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Side: Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            {title}
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-auto flex-shrink-0">
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto md:mx-0"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all min-w-[250px] text-slate-900"
              aria-label="Email address for free guide download"
            />
            <Button
              type="submit"
              disabled={isDownloading}
              className={`py-4 px-8 whitespace-nowrap shadow-sm ${isDownloading ? 'opacity-75 cursor-wait' : ''}`}
            >
              {isDownloading ? 'Processing...' : 'Download Free Guide'}
            </Button>
          </form>
          <p className="text-sm text-slate-500 mt-3 text-center md:text-left flex items-center justify-center md:justify-start">
            <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            100% Free & Secure
          </p>
        </div>

      </div>
    </div>
  );
}
