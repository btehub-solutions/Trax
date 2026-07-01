'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { BASE_URL } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Store auth session
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* LEFT PANEL - TECH ECOSYSTEM VISUAL (Visible on md/lg screens, hidden on mobile) */}
      <div className="hidden md:flex md:w-[50%] lg:w-[52%] xl:w-[55%] relative overflow-hidden h-screen select-none">
        {/* Background Image */}
        <img
          src="/images/trax_login_visual.png"
          alt="Trax Tech Ecosystem Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle Brand Gradient Overlays for Readability and Depth (UX Best Practice) */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent z-10"
          style={{
            backgroundImage: 'linear-gradient(to right, transparent, var(--bg-alt))',
            opacity: 0.45
          }}
        />

        {/* Home Link Overlay */}
        <div className="absolute top-8 left-8 z-20">
          <Link href="/" className="inline-flex items-center gap-2 group px-4 py-2 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
            <span className="text-white text-sm font-semibold flex items-center gap-1.5">
              ← Back to home
            </span>
          </Link>
        </div>

        {/* Narrative text on the left panel overlay (UI/UX Best Practice for Premium Feel) */}
        <div className="absolute bottom-16 left-12 z-20 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-oxanium)' }}>
            Shaping Ogun State's <br />
            <span className="text-[var(--accent)]">Tech Future</span>
          </h1>
          <p className="text-sm font-medium text-white/70 max-w-sm">
            Tracking Ogun State's startup ecosystem, research hubs, and visual media platform in real-time.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - LOGIN FORM */}
      <div 
        className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 min-h-screen relative"
        style={{ backgroundColor: 'var(--bg-alt)' }}
      >
        {/* Mobile-only Home Button */}
        <div className="absolute top-6 left-6 md:hidden">
          <Link href="/" className="inline-flex items-center gap-2 group px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-white text-xs font-semibold">
              ← Back
            </span>
          </Link>
        </div>

        {/* Glow effects on the right panel */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-[var(--accent)]/5 blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md backdrop-blur-xl p-8 rounded-2xl relative z-10 border shadow-lg"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="text-2xl font-black tracking-tight" style={{ color: 'var(--fg)' }}>
                <span className="text-[var(--accent)] group-hover:text-red-400 transition-colors">Trax</span>
              </span>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Welcome Back</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>Sign in to manage articles, newsletter and ad units</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-sm flex items-start gap-3"
            >
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--fg-muted)' }} htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@trax.ng"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all border"
                  style={{
                    backgroundColor: 'var(--bg-alt)',
                    borderColor: 'var(--border)',
                    color: 'var(--fg)',
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }} htmlFor="password">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--fg-subtle)' }} />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all border"
                  style={{
                    backgroundColor: 'var(--bg-alt)',
                    borderColor: 'var(--border)',
                    color: 'var(--fg)',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--accent)] hover:bg-[#FF1A2E] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-[var(--accent)]/20"
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: 'var(--border)' }}>
            <div className="inline-flex items-center gap-2 text-xs" style={{ color: 'var(--fg-subtle)' }}>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Secured Session Encryption Enabled</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
