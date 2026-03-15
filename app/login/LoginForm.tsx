'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock Authentication Logic based on email pattern
    setTimeout(() => {
      setLoading(false);
      // Let's set a simple localStorage flag for our prototype
      // If email has 'admin', route to admin dashboard
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('nate')) {
        localStorage.setItem('userRole', 'admin');
        document.cookie = "userRole=admin; path=/";
        router.push('/admin-dashboard');
      } else {
        localStorage.setItem('userRole', 'client');
        document.cookie = "userRole=client; path=/";
        router.push('/client-dashboard');
      }
    }, 800);
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

      <div className="flex flex-col gap-1.5 mb-2">
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

      <button 
        disabled={loading} 
        type="submit" 
        className="w-full bg-brand-gold text-black font-extrabold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(214,173,103,0.2)] hover:shadow-[0_0_30px_rgba(214,173,103,0.4)] hover:bg-white disabled:opacity-50"
      >
        {loading ? 'Authenticating...' : 'Login'}
      </button>

      <div className="text-center mt-4">
        <button type="button" onClick={() => alert('Password reset functionally coming soon.')} className="text-sm text-neutral-500 hover:text-brand-gold transition-colors">
          Forgot Password?
        </button>
      </div>
    </form>
  );
}
