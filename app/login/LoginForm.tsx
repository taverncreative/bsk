'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem('bsk_remember_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Save or clear remembered email
      if (rememberMe) {
        localStorage.setItem('bsk_remember_email', email);
      } else {
        localStorage.removeItem('bsk_remember_email');
      }

      const role = data.user?.app_metadata?.role || 'client';

      if (role === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/client-dashboard');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-400">Email Address</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-400">Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-brand-gold focus:ring-brand-gold focus:ring-offset-0"
        />
        <span className="text-sm text-neutral-400">Remember me</span>
      </label>

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-brand-gold text-black font-extrabold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(214,173,103,0.2)] hover:shadow-[0_0_30px_rgba(214,173,103,0.4)] hover:bg-white disabled:opacity-50"
      >
        {loading ? 'Authenticating...' : 'Login'}
      </button>

      {error && (
        <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
          {error}
        </div>
      )}

      <div className="text-center mt-4">
        <button type="button" onClick={() => alert('Password reset functionally coming soon.')} className="text-sm text-neutral-500 hover:text-brand-gold transition-colors">
          Forgot Password?
        </button>
      </div>
    </form>
  );
}
