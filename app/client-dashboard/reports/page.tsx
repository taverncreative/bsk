'use client';

import { useState, useEffect } from 'react';
import { BarChart, TrendingUp, Users, CheckSquare, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ReportsPage() {
  const [report, setReport] = useState<any>(null);
  const [improvements, setImprovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: reportData } = await supabase.from('reports').select('*').order('report_month', { ascending: false }).limit(1);
    const { data: improvementsData } = await supabase.from('client_improvements').select('*').order('date_implemented', { ascending: false }).limit(10);
    
    if (reportData && reportData.length > 0) setReport(reportData[0]);
    if (improvementsData) setImprovements(improvementsData);
    setLoading(false);
  };

  if (loading) return <div className="text-white p-8">Loading reports...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Monthly Reports</h1>
        <select className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg focus:ring-brand-gold focus:border-brand-gold block p-2.5">
          <option>March 2026</option>
          <option>February 2026</option>
          <option>January 2026</option>
        </select>
      </div>

      {report ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8 mb-8">
          <div className="border-b border-zinc-800 pb-5 mb-5 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {new Date(report.report_month).toLocaleString('default', { month: 'long', year: 'numeric' })} Performance Summary
            </h2>
            <span className="text-sm px-3 py-1 bg-green-500/10 text-green-400 rounded-full font-medium">Excellent Period</span>
          </div>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            This month we focused heavily on technical infrastructure upgrades and expanding market reach. We identified key indexing drops and fully rectified them, leading to a steady climb in core search visibility.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg">
              <div className="flex items-center text-brand-gold mb-2">
                <Users className="h-5 w-5 mr-2" />
                <h3 className="font-semibold text-sm">Organic Traffic</h3>
              </div>
              <p className="text-3xl font-bold text-white">{report.organic_traffic}</p>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg">
              <div className="flex items-center text-brand-gold mb-2">
                <TrendingUp className="h-5 w-5 mr-2" />
                <h3 className="font-semibold text-sm">SEO Growth</h3>
              </div>
              <p className="text-3xl font-bold text-white">+{report.seo_growth}%</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg">
              <div className="flex items-center text-brand-gold mb-2">
                <Search className="h-5 w-5 mr-2" />
                <h3 className="font-semibold text-sm">Leads Generated</h3>
              </div>
              <p className="text-3xl font-bold text-white">{report.leads_generated}</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg">
              <div className="flex items-center text-brand-gold mb-2">
                <CheckSquare className="h-5 w-5 mr-2" />
                <h3 className="font-semibold text-sm">Tasks Completed</h3>
              </div>
              <p className="text-3xl font-bold text-white">{report.tasks_completed}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8 mb-8 text-center text-zinc-500">
          No reports available for this period.
        </div>
      )}

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8">
        <h2 className="text-xl font-bold text-white mb-6">Improvements Implemented</h2>
        <div className="space-y-6">
          {improvements.length > 0 ? improvements.map((item, idx) => (
            <div key={idx} className="relative pl-8 before:absolute before:left-3 before:top-2 before:w-2 before:h-2 before:bg-brand-gold before:rounded-full after:absolute after:left-3.5 after:top-4 after:w-px after:h-full after:bg-zinc-800 last:after:hidden">
              <div className="flex items-center space-x-3 mb-1">
                <h4 className="text-white font-medium">{item.title}</h4>
                <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
                  {new Date(item.date_implemented).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-zinc-400">{item.description}</p>
            </div>
          )) : (
            <p className="text-sm text-zinc-500">No improvements logged for this period yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}