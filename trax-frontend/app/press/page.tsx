'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Globe, Building2, ExternalLink, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';
import { BASE_URL } from '@/lib/api';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  publishedAt: string;
  category: {
    name: string;
    slug: string;
  };
  partner?: Partner;
}

export default function PressRoomPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch active partners
      const partnersRes = await fetch(`${BASE_URL}/partners/active`);
      if (!partnersRes.ok) throw new Error('Failed to load partners');
      const partnersData = await partnersRes.json();
      console.log('[PressRoom] Partners fetched:', partnersData);
      setPartners(Array.isArray(partnersData) ? partnersData : []);

      // Fetch sponsored articles
      const articlesRes = await fetch(`${BASE_URL}/articles?isSponsored=true`);
      if (!articlesRes.ok) throw new Error('Failed to load press releases');
      const articlesData = await articlesRes.json();
      console.log('[PressRoom] Articles fetched:', articlesData);
      setArticles(articlesData.data || []);
    } catch (err: any) {
      console.error('[PressRoom] Fetch error:', err);
      setError(err.message || 'Something went wrong while loading the Press Room.');
    } finally {
      setLoading(false);
    }
  };

  // Filter articles based on selected partner logo
  const filteredArticles = selectedPartnerId
    ? articles.filter(art => art.partner?.id === selectedPartnerId)
    : articles;

  const getFormatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="relative pt-28 pb-20 min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div 
        className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full text-white mb-4 shadow-sm"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <Zap size={11} fill="white" />
            Ecosystem News
          </span>
          <h1
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-oxanium)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: 'var(--fg)',
              lineHeight: 1.1,
            }}
          >
            Trax Press Room
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Official statements, startup press releases, and product announcements directly from our corporate and ecosystem partners shaping technology in Ogun State.
          </p>
        </div>

        {/* Partners Logos Grid */}
        {partners.length > 0 && (
          <div className="mb-14">
            <h2 
              className="text-xs font-semibold uppercase tracking-wider mb-5 flex items-center gap-2"
              style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-oxanium)' }}
            >
              <Building2 size={14} />
              Ecosystem Partners
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedPartnerId(null)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedPartnerId === null
                    ? 'text-white border-transparent'
                    : 'text-zinc-400 hover:text-white border-zinc-800/80 bg-zinc-900/20'
                }`}
                style={{
                  backgroundColor: selectedPartnerId === null ? 'var(--accent)' : undefined,
                  borderColor: selectedPartnerId === null ? 'transparent' : 'var(--card-border)',
                }}
              >
                All Releases
              </button>
              {partners.map(partner => (
                <button
                  key={partner.id}
                  onClick={() => setSelectedPartnerId(partner.id === selectedPartnerId ? null : partner.id)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    selectedPartnerId === partner.id
                      ? 'border-transparent text-white ring-1 ring-offset-2 ring-offset-[#2A0718] ring-[#E8000F]'
                      : 'text-zinc-400 hover:text-white border-zinc-800 bg-zinc-900/30'
                  }`}
                  style={{
                    backgroundColor: selectedPartnerId === partner.id ? 'var(--card-bg)' : 'var(--card-bg)',
                    borderColor: selectedPartnerId === partner.id ? 'var(--accent)' : 'var(--card-border)',
                  }}
                >
                  <img
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    className="w-5 h-5 rounded-full object-cover shrink-0 filter grayscale brightness-90 contrast-125 hover:grayscale-0"
                  />
                  <span>{partner.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error / Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <RefreshCw className="h-7 w-7 text-red-500 animate-spin" />
            <p className="text-sm text-zinc-400">Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-100 text-sm max-w-lg mb-12">
            <p className="font-semibold mb-2">Error Loading Announcements</p>
            <p>{error}</p>
            <button
              onClick={fetchInitialData}
              className="mt-4 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-100 px-4 py-2 rounded-xl border border-red-500/30 font-semibold"
            >
              Retry Load
            </button>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div 
            className="p-12 rounded-2xl border text-center max-w-lg"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
          >
            <p className="text-lg font-bold mb-2 text-white">No Press Releases Found</p>
            <p className="text-sm text-zinc-400">
              {selectedPartnerId 
                ? "This partner hasn't published any announcements yet. Check back soon!" 
                : "Our partners haven't published any announcements yet. Check back soon!"}
            </p>
          </div>
        ) : (
          /* Press Releases Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-pointer overflow-hidden flex flex-col"
              >
                {/* Image */}
                <Link href={`/articles/${article.slug}`} className="block relative w-full aspect-[16/9] overflow-hidden shrink-0 rounded-md bg-zinc-900">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.07]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900/50">
                      <Building2 size={32} />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 text-[9px] font-extrabold uppercase px-2.5 py-1.5 rounded-full tracking-wider bg-[#E8000F] text-white shadow-md">
                    Press Release
                  </span>
                </Link>

                {/* Content */}
                <div className="pt-4 flex flex-col flex-1">
                  <Link href={`/articles/${article.slug}`} className="block mb-2">
                    <h3
                      className="text-lg font-extrabold leading-snug line-clamp-3 transition-colors group-hover:text-[#E8000F]"
                      style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--fg)' }}
                    >
                      {article.title}
                    </h3>
                  </Link>

                  <p
                    className="text-xs line-clamp-3 mb-4 leading-relaxed"
                    style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div 
                    className="flex items-center justify-between pt-3 mt-auto border-t border-zinc-800/40 text-xs" 
                    style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      {article.partner && (
                        <>
                          <img
                            src={article.partner.logoUrl}
                            alt={article.partner.name}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span className="font-semibold text-white">{article.partner.name}</span>
                          <span className="opacity-40">|</span>
                        </>
                      )}
                      <span>{getFormatDate(article.publishedAt)}</span>
                    </div>

                    <Link
                      href={`/articles/${article.slug}`}
                      className="flex items-center gap-1 text-[#E8000F] hover:text-white transition-all font-extrabold uppercase tracking-wider text-[9px]"
                    >
                      Read Release
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
