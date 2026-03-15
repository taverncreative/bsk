import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 relative">
      <div className="absolute top-8 left-8">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to site
        </Link>
      </div>
      
      <div className="w-full max-w-md bg-[#0a0a0a] border border-neutral-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-8 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
          <p className="text-neutral-400 text-sm">Sign in to access your dashboard</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
