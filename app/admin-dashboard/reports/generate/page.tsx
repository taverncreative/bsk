'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Upload, Sparkles, Download, X, FileText, Image, ArrowLeft, TrendingUp, Target, Lightbulb, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ReportData {
  summary: string;
  whatWorked: string[];
  currentPosition: string[];
  nextMonthPlan: string[];
  suggestions: string[];
  keyMetrics: { label: string; value: string; change: string }[];
}

export default function GenerateReportPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [clientId, setClientId] = useState('');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [notes, setNotes] = useState('');
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [clientName, setClientName] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    supabase.from('clients').select('id, company_name').eq('status', 'active').order('company_name')
      .then(({ data }) => setClients(data || []));
  }, []);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const handleFiles = useCallback((files: FileList | File[]) => {
    const newFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    setScreenshots(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => setPreviews(prev => [...prev, e.target?.result as string]);
      reader.readAsDataURL(file);
    });
  }, []);

  const removeScreenshot = (idx: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== idx));
    setPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const generateReport = async () => {
    if (!clientId) { setToast({ message: 'Select a client', type: 'error' }); return; }
    if (screenshots.length === 0) { setToast({ message: 'Upload at least one screenshot', type: 'error' }); return; }

    setGenerating(true);
    try {
      const formData = new FormData();
      formData.append('clientId', clientId);
      formData.append('month', `${month}-01`);
      formData.append('notes', notes);
      screenshots.forEach(f => formData.append('screenshots', f));

      const res = await fetch('/api/generate-report', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to generate report');
      }

      const data = await res.json();
      setReport(data.report);
      setClientName(data.clientName);
      setToast({ message: 'Report generated!', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message, type: 'error' });
    }
    setGenerating(false);
  };

  const downloadPDF = () => {
    // Simple print-to-PDF approach — opens a styled print window
    const printWindow = window.open('', '_blank');
    if (!printWindow || !report) return;

    const monthLabel = new Date(month + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${clientName} — Monthly Report — ${monthLabel}</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #fff; background: #000; margin: 0; padding: 40px; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #D6AD67; padding-bottom: 24px; }
          .header h1 { color: #D6AD67; font-size: 28px; margin: 0 0 8px; }
          .header p { color: #888; font-size: 14px; margin: 0; }
          .section { margin-bottom: 32px; }
          .section h2 { color: #D6AD67; font-size: 18px; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid #333; }
          .summary { font-size: 16px; color: #ccc; line-height: 1.6; }
          ul { padding-left: 20px; color: #bbb; line-height: 1.8; }
          .metrics { display: flex; gap: 16px; flex-wrap: wrap; }
          .metric { background: #111; border: 1px solid #333; border-radius: 8px; padding: 16px; flex: 1; min-width: 140px; text-align: center; }
          .metric .value { font-size: 24px; font-weight: bold; color: #D6AD67; }
          .metric .label { font-size: 12px; color: #888; margin-top: 4px; }
          .metric .change { font-size: 11px; color: #4ade80; margin-top: 2px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Business Sorted Kent</h1>
          <p>Monthly Performance Report — ${monthLabel}</p>
          <p style="font-size:20px;color:#fff;margin-top:12px;font-weight:bold;">${clientName}</p>
        </div>

        <div class="section">
          <h2>Executive Summary</h2>
          <p class="summary">${report.summary}</p>
        </div>

        ${report.keyMetrics && report.keyMetrics.length > 0 ? `
        <div class="section">
          <h2>Key Metrics</h2>
          <div class="metrics">
            ${report.keyMetrics.map(m => `
              <div class="metric">
                <div class="value">${m.value}</div>
                <div class="label">${m.label}</div>
                ${m.change ? `<div class="change">${m.change}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <div class="section">
          <h2>What Worked This Month</h2>
          <ul>${report.whatWorked.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>

        <div class="section">
          <h2>Current Position</h2>
          <ul>${report.currentPosition.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>

        <div class="section">
          <h2>Plan for Next Month</h2>
          <ul>${report.nextMonthPlan.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>

        ${report.suggestions && report.suggestions.length > 0 ? `
        <div class="section">
          <h2>Recommendations</h2>
          <ul>${report.suggestions.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
        ` : ''}

        <div class="footer">
          <p>Business Sorted Kent — hello@businesssortedkent.co.uk — 07522 388055</p>
          <p>Report generated ${new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div>
      {toast && (
        <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
          toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
        }`}>{toast.message}</div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin-dashboard/reports" className="flex items-center text-zinc-400 hover:text-white transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Reports
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Generate Monthly Report</h1>
          <p className="text-zinc-400 mt-1">Upload screenshots, let AI analyse, download branded PDF.</p>
        </div>
      </div>

      {!report ? (
        <div className="max-w-3xl space-y-6">
          {/* Client & Month */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Client *</label>
              <select value={clientId} onChange={e => setClientId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm">
                <option value="">Select client...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Report Month</label>
              <input type="month" value={month} onChange={e => setMonth(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" />
            </div>
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Screenshots *</label>
            <div
              onDragOver={e => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <Upload className="w-10 h-10 mx-auto mb-3 text-zinc-500" />
              <p className="text-zinc-400 text-sm mb-2">Drag and drop screenshots here</p>
              <label className="inline-block px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-lg text-sm cursor-pointer hover:border-brand-gold hover:text-white transition-colors">
                Browse Files
                <input type="file" accept="image/*" multiple className="hidden"
                  onChange={e => e.target.files && handleFiles(e.target.files)} />
              </label>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img src={src} alt={`Screenshot ${idx + 1}`} className="w-full h-32 object-cover rounded-lg border border-zinc-800" />
                    <button onClick={() => removeScreenshot(idx)}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Additional Notes (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm"
              placeholder="Any context, focus areas, or things to highlight..." />
          </div>

          <button onClick={generateReport} disabled={generating}
            className="flex items-center px-6 py-3 bg-brand-gold text-black rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-50 transition-colors">
            <Sparkles className="h-5 w-5 mr-2" />
            {generating ? 'Analysing screenshots...' : 'Generate Report'}
          </button>
        </div>
      ) : (
        /* Report Preview */
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Report Preview — {clientName}</h2>
            <div className="flex gap-3">
              <button onClick={() => setReport(null)}
                className="px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg text-sm hover:text-white transition-colors">
                Start Over
              </button>
              <button onClick={downloadPDF}
                className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium text-sm hover:bg-yellow-500 transition-colors">
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-3">Executive Summary</h3>
              <p className="text-zinc-300 leading-relaxed">{report.summary}</p>
            </div>

            {/* Key Metrics */}
            {report.keyMetrics && report.keyMetrics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {report.keyMetrics.map((m, idx) => (
                  <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-brand-gold">{m.value}</p>
                    <p className="text-xs text-zinc-500 mt-1">{m.label}</p>
                    {m.change && <p className={`text-xs mt-1 ${m.change.startsWith('+') || m.change.startsWith('↑') ? 'text-green-400' : 'text-red-400'}`}>{m.change}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Sections */}
            {[
              { title: 'What Worked This Month', items: report.whatWorked, icon: TrendingUp },
              { title: 'Current Position', items: report.currentPosition, icon: Target },
              { title: 'Plan for Next Month', items: report.nextMonthPlan, icon: Calendar },
              { title: 'Recommendations', items: report.suggestions, icon: Lightbulb },
            ].map((section, idx) => section.items && section.items.length > 0 && (
              <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <section.icon className="h-4 w-4 text-brand-gold" />
                  <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="text-brand-gold mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
