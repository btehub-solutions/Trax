'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BASE_URL } from '@/lib/api';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
}

interface SponsoredArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  publishedAt: string;
  partner?: Partner;
}

export default function PressRoomSection() {
  const [articles, setArticles] = useState<SponsoredArticle[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchPressArticles = async () => {
      try {
        const res = await fetch(`${BASE_URL}/articles?isSponsored=true&limit=6`);
        if (!res.ok) return;
        const json = await res.json();
        setArticles(json.data || []);
      } catch {
        // silently fail — section just won't render
      } finally {
        setLoaded(true);
      }
    };
    fetchPressArticles();
  }, []);

  // Don't render the section at all if there's no sponsored content
  if (loaded && articles.length === 0) return null;
  if (!loaded) return null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="container py-12">
      <div className="rounded-md p-6 md:p-10" style={{ backgroundColor: '#F7D8CF' }}>
        {/* Header */}
        <div className="flex items-center justify-between pb-6">
          <h2
            className="text-lg font-extrabold tracking-tight uppercase"
            style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--accent)' }}
          >
            Press Room
          </h2>
          <Link
            href="/press"
            className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors hover:text-[var(--accent)]"
            style={{ color: '#4A2931' }}
          >
            View All
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 6).map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group flex flex-col transition-all"
            >
              {/* Image with rounded corners */}
              {article.image && (
                <div className="aspect-[16/10] overflow-hidden rounded-md mb-4 bg-zinc-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80'
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1">
                {/* Partner badge */}
                <span
                  className="inline-block text-xs font-extrabold uppercase tracking-wider mb-2 w-fit"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  Partner
                </span>

                <h3
                  className="text-base font-extrabold leading-snug mb-3 line-clamp-3 transition-colors group-hover:text-red-600"
                  style={{ color: '#1F2933', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {article.title}
                </h3>

                {/* Attribution line */}
                <div
                  className="mt-auto flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: '#4A2931', fontFamily: 'var(--font-dm-sans)' }}
                >
                  <span>{article.partner?.name || 'Partner'}</span>
                  <span>|</span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
