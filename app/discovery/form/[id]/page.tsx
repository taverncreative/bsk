'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Lock, ChevronRight, ChevronLeft, Check, Send, CheckCircle2 } from 'lucide-react';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio';
  prefilled?: string;
  placeholder?: string;
  helpText?: string;
  options?: string[];
}

interface FormSection {
  id: string;
  title: string;
  subtitle?: string;
  fields: FormField[];
}

interface DiscoveryForm {
  id: string;
  client_slug: string;
  client_name: string;
  password: string;
  sections: FormSection[];
  status: string;
}

export default function DynamicDiscoveryPage({ params }: { params: Promise<{ id: string }> }) {
  const [formDef, setFormDef] = useState<DiscoveryForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formId, setFormId] = useState<string>('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  useEffect(() => {
    params.then(p => {
      setFormId(p.id);
      loadForm(p.id);
    });
  }, []);

  const loadForm = async (id: string) => {
    const { data, error } = await supabase
      .from('discovery_forms')
      .select('*')
      .eq('id', id)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      setFormDef(null);
    } else {
      setFormDef(data);
      // Pre-fill form data from field defaults
      const prefilled: Record<string, string> = {};
      (data.sections as FormSection[]).forEach(section => {
        section.fields.forEach(field => {
          if (field.prefilled) prefilled[field.id] = field.prefilled;
        });
      });
      setFormData(prefilled);

      // Track view
      await supabase.from('discovery_forms').update({
        view_count: (data.view_count || 0) + 1,
        last_viewed_at: new Date().toISOString(),
      }).eq('id', id);
    }
    setLoading(false);
  };

  const handlePasswordSubmit = () => {
    if (formDef && passwordInput === formDef.password) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const updateField = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async () => {
    if (!formDef) return;
    setSubmitting(true);
    try {
      await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientSlug: formDef.client_slug,
          formData,
          completedAt: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin" />
      </div>
    );
  }

  if (!formDef) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center p-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Form Not Found</h1>
          <p className="text-zinc-500">This discovery form may have been removed or is not yet published.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center p-8">
        <div>
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Thank You!</h1>
          <p className="text-zinc-400">Your discovery form has been submitted. We will review your responses and be in touch shortly.</p>
        </div>
      </div>
    );
  }

  // Password gate
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
        <Lock className="w-10 h-10 text-zinc-600 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-1">Client Discovery Form</h1>
        <p className="text-zinc-500 mb-8">{formDef.client_name} — Website Project</p>
        <div className="w-full max-w-sm space-y-4">
          <div>
            <p className="text-sm text-zinc-400 mb-2">Enter access password</p>
            <input
              type="password"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false); }}
              onKeyDown={e => e.key === 'Enter' && handlePasswordSubmit()}
              placeholder="Password"
              className={`w-full bg-zinc-900 border rounded-lg py-3 px-4 text-white ${passwordError ? 'border-red-500' : 'border-zinc-800'}`}
            />
            {passwordError && <p className="text-red-400 text-xs mt-1">Incorrect password</p>}
          </div>
          <button onClick={handlePasswordSubmit}
            className="w-full py-3 bg-brand-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
            Access Form
          </button>
        </div>
      </div>
    );
  }

  const sections = formDef.sections as FormSection[];
  const section = sections[currentSection];
  const isLast = currentSection === sections.length - 1;
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
        <div className="h-full bg-brand-gold transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Section {currentSection + 1} of {sections.length}
          </p>
          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
          {section.subtitle && <p className="text-zinc-400 mt-1">{section.subtitle}</p>}
        </div>

        {/* Fields */}
        <div className="space-y-6">
          {section.fields.map(field => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">{field.label}</label>
              {field.helpText && <p className="text-xs text-zinc-500 mb-2">{field.helpText}</p>}

              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.id] || ''}
                  onChange={e => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 px-4 text-white text-sm placeholder:text-zinc-600 focus:border-brand-gold focus:ring-0"
                />
              ) : field.type === 'select' ? (
                <select
                  value={formData[field.id] || ''}
                  onChange={e => updateField(field.id, e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 px-4 text-white text-sm focus:border-brand-gold focus:ring-0"
                >
                  <option value="">Select...</option>
                  {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : field.type === 'radio' ? (
                <div className="space-y-2">
                  {field.options?.map(opt => (
                    <label key={opt} className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700 transition-colors">
                      <input type="radio" name={field.id} value={opt} checked={formData[field.id] === opt}
                        onChange={() => updateField(field.id, opt)}
                        className="text-brand-gold focus:ring-brand-gold" />
                      <span className="text-sm text-zinc-300">{opt}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={formData[field.id] || ''}
                  onChange={e => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 px-4 text-white text-sm placeholder:text-zinc-600 focus:border-brand-gold focus:ring-0"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-zinc-800">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {isLast ? (
            <button onClick={handleSubmit} disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50">
              <Send className="w-4 h-4" /> {submitting ? 'Submitting...' : 'Submit Form'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
              className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 text-white font-medium rounded-lg hover:border-brand-gold transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
