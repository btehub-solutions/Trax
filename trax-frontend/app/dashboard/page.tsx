'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Users,
  Layout,
  PlusCircle,
  LogOut,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  Settings,
  Mail,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Flame,
  Star,
  Search,
  BookOpen,
  FileText,
  User
} from 'lucide-react';
import { api, fetchApi, BASE_URL } from '@/lib/api';
import { compressImage } from '@/lib/image-compressor';

type Tab = 'overview' | 'articles' | 'editor' | 'subscribers' | 'ads' | 'profile';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Stats
  const [stats, setStats] = useState({
    articlesCount: 0,
    draftsCount: 0,
    subscribersCount: 0,
    activeAdsCount: 0,
  });

  // Data lists
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [adSlots, setAdSlots] = useState<any[]>([]);

  // Search/Filters
  const [articleSearch, setArticleSearch] = useState('');
  const [articleFilter, setArticleFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  // Editor Form State
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    image: '',
    categoryId: '',
    featured: false,
    breaking: false,
    trending: false,
    status: 'DRAFT',
    readTime: '5 min read',
    publishedAt: '',
    officialLink: '',
  });
  const [editorError, setEditorError] = useState<string | null>(null);
  const [editorSuccess, setEditorSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Ad slot form state
  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [adFormData, setAdFormData] = useState({
    name: '',
    size: 'LEADERBOARD',
    code: '',
    active: true,
  });
  const [adError, setAdError] = useState<string | null>(null);
  const [adSuccess, setAdSuccess] = useState<string | null>(null);
  const [adUploading, setAdUploading] = useState(false);
  const [adUploadError, setAdUploadError] = useState<string | null>(null);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    avatar: '',
    twitter: '',
    linkedin: '',
  });
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Validate Authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setProfileData({
      name: parsedUser.name || '',
      bio: parsedUser.bio || '',
      avatar: parsedUser.avatar || '',
      twitter: parsedUser.twitter || '',
      linkedin: parsedUser.linkedin || '',
    });

    const refreshProfile = async () => {
      try {
        const freshUser = await fetchApi('/users/me');
        if (freshUser) {
          const updatedFullUser = { ...parsedUser, ...freshUser };
          setUser(updatedFullUser);
          localStorage.setItem('user', JSON.stringify(updatedFullUser));
          setProfileData({
            name: freshUser.name || '',
            bio: freshUser.bio || '',
            avatar: freshUser.avatar || '',
            twitter: freshUser.twitter || '',
            linkedin: freshUser.linkedin || '',
          });
        }
      } catch (err: any) {
        console.warn('Failed to refresh user profile from backend:', err.message || err);
        if (err.message?.includes('Unauthorized') || err.message?.includes('JWT') || err.message?.includes('session') || err.message?.includes('token')) {
          handleLogout();
        }
      }
    };

    refreshProfile();
    fetchDashboardData();
  }, []);

  // Sync slug generation in editor
  useEffect(() => {
    if (!editingArticleId && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, editingArticleId]);

  // Reset scroll to top on tab changes (mobile window & desktop container)
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [activeTab]);

  const handleExportCSV = () => {
    console.log('handleExportCSV clicked. Subscribers:', subscribers);
    try {
      if (!subscribers || subscribers.length === 0) {
        console.warn('No subscribers to export.');
        return;
      }
      
      const headers = ['Email Address', 'Joined Date', 'Confirmed'];
      const rows = subscribers.map(sub => [
        sub.email || '',
        sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : '',
        sub.confirmed ? 'Confirmed' : 'Pending'
      ]);
      
      const csvContent = [
        headers.map(h => `"${h}"`).join(','),
        ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      ].join('\n');
      
      console.log('Generated CSV content successfully');
      
      // Prepend UTF-8 BOM (\uFEFF) to make sure Excel on Windows parses it correctly
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `trax_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Download triggered successfully');
    } catch (err: any) {
      console.error('CSV export failed:', err);
      alert('Failed to export CSV: ' + err.message);
    }
  };

  const handleConfirmSubscriber = async (email: string) => {
    console.log('handleConfirmSubscriber clicked for email:', email);
    try {
      const res = await api.post('/newsletter/subscribers/confirm', { email });
      console.log('Confirmation response:', res);
      fetchDashboardData();
    } catch (err: any) {
      console.error('Confirmation failed:', err);
      alert(err.message || 'Failed to confirm subscriber');
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setConnectionError(null);
    try {
      // 1. Fetch categories
      const cats = await api.get('/categories');
      setCategories(cats);

      // 2. Fetch subscribers
      const subs = await api.get('/newsletter/subscribers');
      setSubscribers(subs);

      // 3. Fetch ad slots
      const ads = await api.get('/ads/all');
      setAdSlots(ads);

      // 4. Fetch all articles (drafts and published)
      const publishedRes = await api.get('/articles?status=PUBLISHED&limit=100');
      const draftsRes = await api.get('/articles?status=DRAFT&limit=100');

      const allArticles = [
        ...(publishedRes.data || []),
        ...(draftsRes.data || []),
      ];
      setArticles(allArticles);

      // 5. Update stats
      setStats({
        articlesCount: publishedRes.meta?.total || 0,
        draftsCount: draftsRes.meta?.total || 0,
        subscribersCount: subs.length,
        activeAdsCount: ads.filter((a: any) => a.active).length,
      });
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
      setConnectionError(err.message || 'Failed to connect to the backend server. Please verify the API is online.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Article Actions
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setEditorError(null);
    setEditorSuccess(null);

    // Validate categoryId
    if (!formData.categoryId) {
      setEditorError('Please select a category');
      setSaving(false);
      return;
    }

    const payload = {
      ...formData,
      publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : undefined,
    };

    try {
      if (editingArticleId) {
        await api.patch(`/articles/${editingArticleId}`, payload);
        setEditorSuccess('Article updated successfully!');
      } else {
        await api.post('/articles', payload);
        setEditorSuccess('Article created successfully!');
      }
      fetchDashboardData();
      setTimeout(() => {
        setActiveTab('articles');
        resetEditorForm();
      }, 1500);
    } catch (err: any) {
      setEditorError(err.message || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleEditArticleClick = (article: any) => {
    setEditingArticleId(article.id);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      body: article.body,
      image: article.image || '',
      categoryId: article.categoryId,
      featured: article.featured,
      breaking: article.breaking,
      trending: article.trending,
      status: article.status,
      readTime: article.readTime || '5 min read',
      publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : '',
      officialLink: article.officialLink || '',
    });
    setEditorError(null);
    setEditorSuccess(null);
    setActiveTab('editor');
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.delete(`/articles/${id}`);
      fetchDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete article');
    }
  };

  const handlePublishArticle = async (id: string) => {
    try {
      await api.patch(`/articles/${id}/publish`, {});
      fetchDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to publish article');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const compressedFile = await compressImage(file);
      const fData = new FormData();
      fData.append('file', compressedFile);
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/uploads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fData
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Upload failed');
      }
      const data = await res.json();
      if (data && data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    setAvatarUploadError(null);
    try {
      const compressedFile = await compressImage(file);
      const fData = new FormData();
      fData.append('file', compressedFile);
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/uploads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fData
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Upload failed');
      }
      const data = await res.json();
      if (data && data.url) {
        setProfileData(prev => ({ ...prev, avatar: data.url }));
      }
    } catch (err: any) {
      setAvatarUploadError(err.message || 'Failed to upload avatar');
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleAdImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAdUploading(true);
    setAdUploadError(null);
    try {
      const compressedFile = await compressImage(file);
      const fData = new FormData();
      fData.append('file', compressedFile);
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/uploads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fData
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Upload failed');
      }
      const data = await res.json();
      if (data && data.url) {
        const adHtml = `<a href="#" target="_blank" rel="noopener noreferrer"><img src="${data.url}" alt="Advertisement" style="max-width: 100%; height: auto; display: block;" /></a>`;
        const updatedCode = adHtml;
        setAdFormData(prev => ({ ...prev, code: updatedCode }));

        // Auto-save to the backend immediately so switching slots doesn't lose this upload
        if (editingAdId) {
          await api.patch(`/ads/${editingAdId}`, { code: updatedCode });
          setAdSuccess('Image uploaded and saved!');
          fetchDashboardData();
          setTimeout(() => setAdSuccess(null), 3000);
        }
      }
    } catch (err: any) {
      setAdUploadError(err.message || 'Failed to upload ad image');
    } finally {
      setAdUploading(false);
    }
  };

  const resetEditorForm = () => {
    setEditingArticleId(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      body: '',
      image: '',
      categoryId: categories[0]?.id || '',
      featured: false,
      breaking: false,
      trending: false,
      status: 'DRAFT',
      readTime: '5 min read',
      publishedAt: '',
      officialLink: '',
    });
    setEditorError(null);
    setEditorSuccess(null);
  };

  // Ad actions
  const handleSaveAd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdError(null);
    setAdSuccess(null);

    try {
      if (editingAdId) {
        await api.patch(`/ads/${editingAdId}`, adFormData);
        setAdSuccess('Ad slot updated successfully!');
      } else {
        await api.post('/ads', adFormData);
        setAdSuccess('Ad slot created successfully!');
      }
      fetchDashboardData();
      setEditingAdId(null);
      setAdFormData({ name: '', size: 'LEADERBOARD', code: '', active: true });
    } catch (err: any) {
      setAdError(err.message || 'Failed to save ad slot');
    }
  };

  const handleToggleAd = async (id: string) => {
    try {
      await api.patch(`/ads/${id}/toggle`, {});
      fetchDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle ad status');
    }
  };

  const handleEditAdClick = (ad: any) => {
    setEditingAdId(ad.id);
    setAdFormData({
      name: ad.name,
      size: ad.size,
      code: ad.code || '',
      active: ad.active,
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const updatedUser = await fetchApi('/users/me', {
        method: 'PATCH',
        body: profileData,
      });

      const updatedFullUser = { ...user, ...updatedUser };
      setUser(updatedFullUser);
      localStorage.setItem('user', JSON.stringify(updatedFullUser));
      setProfileSuccess('Profile updated successfully!');
      fetchDashboardData();
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(articleSearch.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(articleSearch.toLowerCase());
    const matchesFilter = articleFilter === 'ALL' || article.status === articleFilter;
    return matchesSearch && matchesFilter;
  });

  console.log('Dashboard rendering - raw articles:', articles.length, 'filtered articles:', filteredArticles.length);


  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--dash-bg)' }}>
        <div className="h-10 w-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  /* ── Reusable inline-style shortcuts ── */
  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--dash-input)',
    borderColor: 'var(--dash-input-border)',
    color: 'var(--dash-fg)',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--dash-card)',
    borderColor: 'var(--dash-card-border)',
  };

  const labelStyle: React.CSSProperties = {
    color: 'var(--dash-fg-secondary)',
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col md:flex-row" style={{ backgroundColor: 'var(--dash-bg)', color: 'var(--dash-fg)' }}>
      {/* Sidebar Navigation */}
      <aside
        className="w-full md:w-64 border-b md:border-b-0 md:border-r backdrop-blur-md flex flex-col justify-between shrink-0"
        style={{ backgroundColor: 'var(--dash-sidebar)', borderColor: 'var(--dash-sidebar-border)' }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl font-black tracking-tight" style={{ color: 'var(--dash-fg)' }}>
              <span style={{ color: '#C84B31' }}>Trax</span>
            </span>
            <span className="bg-orange-500/10 text-orange-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-orange-500/20">
              Admin
            </span>
          </div>

          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-6 border"
            style={{ backgroundColor: 'var(--dash-user-card)', borderColor: 'var(--dash-user-card-border)' }}
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&fit=crop'}
              alt={user?.name}
              className="h-9 w-9 rounded-full object-cover border"
              style={{ borderColor: 'var(--dash-avatar-border)' }}
            />
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--dash-fg)' }}>{user?.name}</h4>
              <p className="text-[10px] truncate" style={{ color: 'var(--dash-fg-muted)' }}>{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: Layout },
              { id: 'articles', label: 'All Articles', icon: Newspaper },
              { id: 'editor', label: 'Article Editor', icon: PlusCircle, onClick: resetEditorForm },
              { id: 'subscribers', label: 'Subscribers', icon: Users },
              { id: 'ads', label: 'Ad Zones', icon: Settings },
              { id: 'profile', label: 'Profile Settings', icon: User },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    if (item.onClick) item.onClick();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={
                    activeTab === item.id
                      ? { backgroundColor: '#C84B31', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(200,75,49,0.25)' }
                      : { color: 'var(--dash-fg-muted)' }
                  }
                  onMouseEnter={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.backgroundColor = 'var(--dash-hover)';
                      e.currentTarget.style.color = 'var(--dash-fg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--dash-fg-muted)';
                    }
                  }}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t" style={{ borderColor: 'var(--dash-divider)' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-transparent hover:border-red-200 dark:hover:border-red-900/30"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl mx-auto w-full">
        {connectionError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-200 text-sm flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold">
              <PlusCircle className="h-5 w-5 text-red-500 rotate-45" />
              <span>Backend API Server Offline</span>
            </div>
            <p className="text-xs">{connectionError}</p>
            <button
              type="button"
              onClick={() => fetchDashboardData()}
              className="mt-2 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-red-800 dark:text-red-200 px-3.5 py-1.5 rounded-lg border border-red-200 dark:border-red-800/40 font-semibold self-start transition-all"
            >
              Retry Connection
            </button>
          </div>
        )}

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="h-8 w-8 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--dash-fg)' }}>Overview</h1>
                    <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Status overview of the Trax platform</p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Published Articles', value: stats.articlesCount, icon: BookOpen, color: 'text-emerald-500' },
                      { label: 'Draft Articles', value: stats.draftsCount, icon: FileText, color: 'text-yellow-500' },
                      { label: 'Subscribers', value: stats.subscribersCount, icon: Mail, color: 'text-blue-500' },
                      { label: 'Active Ads', value: stats.activeAdsCount, icon: Layout, color: 'text-orange-500' },
                    ].map((card, i) => (
                      <div key={i} className="p-5 rounded-2xl relative overflow-hidden border" style={cardStyle}>
                        <card.icon className={`h-8 w-8 ${card.color} opacity-20 absolute right-4 bottom-4`} />
                        <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: 'var(--dash-fg-muted)' }}>{card.label}</span>
                        <span className="text-3xl font-black mt-2 block" style={{ color: 'var(--dash-fg)' }}>{card.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick stats and recent events */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Subscriber summary list */}
                    <div className="rounded-2xl p-6 border" style={cardStyle}>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--dash-fg)' }}>
                        <Users className="h-5 w-5 text-orange-500" />
                        Recent Subscribers
                      </h3>
                      <div className="max-h-60 overflow-y-auto" style={{ borderColor: 'var(--dash-divider)' }}>
                        {subscribers.slice(0, 5).map((sub) => (
                          <div key={sub.id} className="py-3 flex justify-between items-center border-b" style={{ borderColor: 'var(--dash-divider)' }}>
                            <span className="text-sm font-medium" style={{ color: 'var(--dash-fg-secondary)' }}>{sub.email}</span>
                            <span className="text-xs" style={{ color: 'var(--dash-fg-subtle)' }}>
                              {new Date(sub.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                        {subscribers.length === 0 && (
                          <p className="text-sm py-4" style={{ color: 'var(--dash-fg-subtle)' }}>No subscribers found yet</p>
                        )}
                      </div>
                    </div>

                    {/* Active Ad Slots info */}
                    <div className="rounded-2xl p-6 border" style={cardStyle}>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--dash-fg)' }}>
                        <Settings className="h-5 w-5 text-orange-500" />
                        Ad Zones Status
                      </h3>
                      <div className="space-y-3">
                        {adSlots.map((slot) => (
                          <div key={slot.id} className="p-3 border rounded-xl flex justify-between items-center" style={cardStyle}>
                            <div>
                              <span className="text-sm font-semibold block" style={{ color: 'var(--dash-fg)' }}>{slot.name}</span>
                              <span className="text-[10px] font-bold text-orange-500">{slot.size}</span>
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                              slot.active 
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                                : 'border'
                            }`}
                            style={!slot.active ? { backgroundColor: 'var(--dash-badge-bg)', color: 'var(--dash-badge-text)', borderColor: 'var(--dash-badge-border)' } : undefined}
                            >
                              {slot.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ARTICLES LIST */}
              {activeTab === 'articles' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--dash-fg)' }}>Articles</h1>
                      <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Manage, edit and publish your articles</p>
                    </div>
                    <button
                      onClick={() => { resetEditorForm(); setActiveTab('editor'); }}
                      className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-orange-600/10"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Write Article
                    </button>
                  </div>

                  {/* Search + Filter Strip */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5" style={{ color: 'var(--dash-fg-subtle)' }} />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={articleSearch}
                        onChange={(e) => setArticleSearch(e.target.value)}
                        className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all border"
                        style={inputStyle}
                      />
                    </div>
                    <div className="flex gap-2">
                      {['ALL', 'PUBLISHED', 'DRAFT'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setArticleFilter(filter as any)}
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border"
                          style={
                            articleFilter === filter
                              ? { backgroundColor: 'rgba(200,75,49,0.1)', borderColor: '#C84B31', color: '#C84B31' }
                              : { backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-muted)' }
                          }
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Table Card */}
                  <div className="rounded-2xl overflow-hidden border" style={cardStyle}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr
                            className="border-b text-xs font-semibold uppercase tracking-wider"
                            style={{ borderColor: 'var(--dash-divider)', backgroundColor: 'var(--dash-thead)', color: 'var(--dash-fg-muted)' }}
                          >
                            <th className="py-4 px-6">Article</th>
                            <th className="py-4 px-6">Category</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm" style={{ color: 'var(--dash-fg-secondary)' }}>
                          {filteredArticles.map((article) => (
                            <tr
                              key={article.id}
                              className="group border-b transition-colors"
                              style={{ borderColor: 'var(--dash-divider)' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dash-hover)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <td className="py-4 px-6 max-w-md">
                                <div className="flex items-center gap-4">
                                  {article.image && (
                                    <img
                                      src={article.image}
                                      alt={article.title}
                                      className="h-10 w-16 object-cover rounded-lg shrink-0 border"
                                      style={{ borderColor: 'var(--dash-card-border)' }}
                                    />
                                  )}
                                  <div className="overflow-hidden">
                                    <span className="font-semibold block truncate" style={{ color: 'var(--dash-fg)' }}>{article.title}</span>
                                    <span className="text-xs block truncate" style={{ color: 'var(--dash-fg-subtle)' }}>{article.excerpt}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className="px-2.5 py-1 rounded-md text-xs font-medium border"
                                  style={{ backgroundColor: 'var(--dash-badge-bg)', borderColor: 'var(--dash-badge-border)', color: 'var(--dash-fg-secondary)' }}
                                >
                                  {article.category?.name || 'Uncategorized'}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold ${
                                  article.status === 'PUBLISHED'
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                    : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/20'
                                }`}>
                                  {article.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right whitespace-nowrap">
                                <div className="inline-flex gap-2">
                                  {article.status === 'DRAFT' && (
                                    <button
                                      onClick={() => handlePublishArticle(article.id)}
                                      title="Publish Now"
                                      className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-900/30 rounded-lg transition-all"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleEditArticleClick(article)}
                                    title="Edit Article"
                                    className="p-2 rounded-lg transition-all border"
                                    style={{ backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-secondary)' }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  {user?.role === 'ADMIN' && (
                                    <button
                                      onClick={() => handleDeleteArticle(article.id)}
                                      title="Delete Article"
                                      className="p-2 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-900/30 rounded-lg transition-all"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                          {filteredArticles.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-8 text-center" style={{ color: 'var(--dash-fg-subtle)' }}>
                                No articles matching criteria found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ARTICLE EDITOR */}
              {activeTab === 'editor' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--dash-fg)' }}>
                      {editingArticleId ? 'Edit Article' : 'New Article'}
                    </h1>
                    <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Compose or edit your stories for the tech movement</p>
                  </div>

                  {editorError && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-200 text-sm">
                      {editorError}
                    </div>
                  )}

                  {editorSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-200 text-sm">
                      {editorSuccess}
                    </div>
                  )}

                  <form onSubmit={handleSaveArticle} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left: Compose columns */}
                      <div className="lg:col-span-2 space-y-5">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Title</label>
                          <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="How Ogun State Founders are Utilizing AI to Scale..."
                            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Slug</label>
                          <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            placeholder="how-ogun state-founders-utilize-ai"
                            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all border font-mono"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Excerpt</label>
                          <textarea
                            required
                            rows={3}
                            value={formData.excerpt}
                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="A concise summary of the article displayed on homepage feeds..."
                            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all border resize-none"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Body (Full Story)</label>
                          <textarea
                            required
                            rows={15}
                            value={formData.body}
                            onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                            placeholder="Write your article body here in Markdown or raw text..."
                            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all border font-mono"
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      {/* Right: Meta columns */}
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Category</label>
                          <select
                            value={formData.categoryId}
                            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all border"
                            style={inputStyle}
                          >
                            <option value="" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Select a Category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id} style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Cover Image</label>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <label className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                                <span>Choose Image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-xs" style={{ color: 'var(--dash-fg-muted)' }}>
                                {uploading ? 'Uploading...' : 'Upload a local JPEG/PNG/WEBP'}
                              </span>
                            </div>

                            {uploadError && (
                              <p className="text-xs text-red-500 font-medium">{uploadError}</p>
                            )}

                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] uppercase font-semibold tracking-wider" style={{ color: 'var(--dash-fg-subtle)' }}>Or Paste Image URL</span>
                              <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all border"
                                style={inputStyle}
                              />
                            </div>

                            {formData.image && (
                              <div className="relative group rounded-lg overflow-hidden border" style={{ borderColor: 'var(--dash-card-border)' }}>
                                <img
                                  src={formData.image}
                                  alt="Cover Preview"
                                  className="w-full h-40 object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Read Time</label>
                          <input
                            type="text"
                            value={formData.readTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                            placeholder="5 min read"
                            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-all border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Publication Date</label>
                          <input
                            type="date"
                            value={formData.publishedAt}
                            onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-all border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Official Link (Website)</label>
                          <input
                            type="url"
                            value={formData.officialLink}
                            onChange={(e) => setFormData(prev => ({ ...prev, officialLink: e.target.value }))}
                            placeholder="https://example.com"
                            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-all border"
                            style={inputStyle}
                          />
                        </div>

                        {/* Flags Box */}
                        <div className="p-5 rounded-2xl space-y-4 border" style={cardStyle}>
                          <span className="block text-xs font-bold uppercase tracking-wider pb-2 border-b" style={{ color: 'var(--dash-fg-secondary)', borderColor: 'var(--dash-divider)' }}>
                            Publish Flags
                          </span>

                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.featured}
                              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                              className="accent-orange-500 h-4 w-4 rounded"
                            />
                            <div className="flex items-center gap-1.5">
                              <Star className="h-4 w-4 text-yellow-500 shrink-0" />
                              <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--dash-fg-secondary)' }}>Featured Story</span>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.breaking}
                              onChange={(e) => setFormData(prev => ({ ...prev, breaking: e.target.checked }))}
                              className="accent-orange-500 h-4 w-4 rounded"
                            />
                            <div className="flex items-center gap-1.5">
                              <Flame className="h-4 w-4 text-red-500 shrink-0" />
                              <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--dash-fg-secondary)' }}>Breaking News</span>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.trending}
                              onChange={(e) => setFormData(prev => ({ ...prev, trending: e.target.checked }))}
                              className="accent-orange-500 h-4 w-4 rounded"
                            />
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="h-4 w-4 text-orange-500 shrink-0" />
                              <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--dash-fg-secondary)' }}>Trending Section</span>
                            </div>
                          </label>
                        </div>

                        {/* Status Box */}
                        <div className="p-5 rounded-2xl space-y-3 border" style={cardStyle}>
                          <label className="block text-xs font-bold uppercase tracking-wider pb-2 border-b" style={{ color: 'var(--dash-fg-secondary)', borderColor: 'var(--dash-divider)' }}>
                            Status
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['DRAFT', 'PUBLISHED'].map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, status: st }))}
                                className="py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border"
                                style={
                                  formData.status === st
                                    ? { backgroundColor: 'rgba(200,75,49,0.1)', borderColor: '#C84B31', color: '#C84B31', fontWeight: 700 }
                                    : { backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-muted)' }
                                }
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => { resetEditorForm(); setActiveTab('articles'); }}
                            className="w-1/3 font-semibold py-3 rounded-xl transition-all text-sm text-center border"
                            style={{ borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-muted)' }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                          >
                            {saving ? (
                              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              'Save Article'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: SUBSCRIBERS LOG */}
              {activeTab === 'subscribers' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--dash-fg)' }}>Newsletter Subscribers</h1>
                      <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Check email capture lists and metrics</p>
                    </div>
                    {subscribers.length > 0 && (
                      <button
                        onClick={handleExportCSV}
                        className="self-start sm:self-center bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Export CSV
                      </button>
                    )}
                  </div>

                  <div className="rounded-2xl overflow-hidden border" style={cardStyle}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr
                            className="border-b text-xs font-semibold uppercase tracking-wider"
                            style={{ borderColor: 'var(--dash-divider)', backgroundColor: 'var(--dash-thead)', color: 'var(--dash-fg-muted)' }}
                          >
                            <th className="py-4 px-6">Email Address</th>
                            <th className="py-4 px-6">Joined Date</th>
                            <th className="py-4 px-6">Confirmed</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm" style={{ color: 'var(--dash-fg-secondary)' }}>
                          {subscribers.map((sub) => (
                            <tr
                              key={sub.id}
                              className="border-b transition-colors"
                              style={{ borderColor: 'var(--dash-divider)' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dash-hover)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <td className="py-4 px-6 font-medium" style={{ color: 'var(--dash-fg)' }}>{sub.email}</td>
                              <td className="py-4 px-6">
                                {new Date(sub.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold ${
                                  sub.confirmed
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                    : 'border'
                                }`}
                                style={!sub.confirmed ? { backgroundColor: 'var(--dash-badge-bg)', color: 'var(--dash-badge-text)', borderColor: 'var(--dash-badge-border)' } : undefined}
                                >
                                  {sub.confirmed ? 'Confirmed' : 'Pending'}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex gap-2 justify-end">
                                  {!sub.confirmed && (
                                    <button
                                      onClick={() => handleConfirmSubscriber(sub.email)}
                                      className="text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/30 transition-all"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                  <button
                                    onClick={async () => {
                                      if (!confirm(`Unsubscribe ${sub.email}?`)) return;
                                      try {
                                        await api.post('/newsletter/unsubscribe', { email: sub.email });
                                        fetchDashboardData();
                                      } catch (err: any) {
                                        alert(err.message || 'Failed to unsubscribe');
                                      }
                                    }}
                                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-xs font-semibold bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 transition-all"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {subscribers.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-8 text-center" style={{ color: 'var(--dash-fg-subtle)' }}>
                                No subscribers logged in the database.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ADS MANAGER */}
              {activeTab === 'ads' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--dash-fg)' }}>Sponsor Ad Slots</h1>
                    <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Paste HTML banner code or images directly into dedicated zones</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Active Ads Table */}
                    <div className="lg:col-span-2 space-y-4">
                      {adSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden group border"
                          style={cardStyle}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-base" style={{ color: 'var(--dash-fg)' }}>{slot.name}</span>
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded border"
                                style={{ backgroundColor: 'var(--dash-badge-bg)', borderColor: 'var(--dash-badge-border)', color: 'var(--dash-badge-text)' }}
                              >
                                {slot.size}
                              </span>
                            </div>
                            <p className="text-xs font-mono truncate max-w-sm sm:max-w-md" style={{ color: 'var(--dash-fg-subtle)' }}>
                              {slot.code ? slot.code.substring(0, 75) + '...' : 'No raw HTML embed code injected'}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <button
                              onClick={() => handleToggleAd(slot.id)}
                              className={`p-1.5 border rounded-lg transition-all ${
                                slot.active
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                                  : ''
                              }`}
                              style={!slot.active ? { backgroundColor: 'var(--dash-card)', color: 'var(--dash-fg-subtle)', borderColor: 'var(--dash-card-border)' } : undefined}
                              title={slot.active ? 'Disable Ad Slot' : 'Activate Ad Slot'}
                            >
                              {slot.active ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                            </button>
                            <button
                              onClick={() => handleEditAdClick(slot)}
                              className="p-2 rounded-lg transition-all border"
                              style={{ backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-secondary)' }}
                              title="Edit HTML Code"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right: Ad Form Box */}
                    <div className="p-6 rounded-2xl h-fit border" style={cardStyle}>
                      <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--dash-fg)' }}>
                        {editingAdId ? 'Edit Ad Slot' : 'Create Ad Slot'}
                      </h3>

                      {adError && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-200 text-xs">
                          {adError}
                        </div>
                      )}

                      {adSuccess && (
                        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-200 text-xs">
                          {adSuccess}
                        </div>
                      )}

                      <form onSubmit={handleSaveAd} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Zone Name</label>
                          <input
                            type="text"
                            required
                            value={adFormData.name}
                            onChange={(e) => setAdFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Homepage Header Banner"
                            className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Size Category</label>
                          <select
                            value={adFormData.size}
                            onChange={(e) => setAdFormData(prev => ({ ...prev, size: e.target.value }))}
                            className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 border"
                            style={inputStyle}
                          >
                            <option value="LEADERBOARD" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Leaderboard (728x90)</option>
                            <option value="RECTANGLE" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Rectangle (300x250)</option>
                            <option value="INLINE" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Inline Banner (Full Width)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Banner Image File (Optional)</label>
                          <div className="flex items-center gap-2">
                            <label className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                              <span>Choose Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleAdImageUpload}
                                className="hidden"
                              />
                            </label>
                            <span className="text-[10px]" style={{ color: 'var(--dash-fg-muted)' }}>
                              {adUploading ? 'Uploading...' : 'Upload local JPEG/PNG/WEBP'}
                            </span>
                          </div>
                          {adUploadError && (
                            <p className="text-[10px] text-red-500 font-medium">{adUploadError}</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>HTML Embed Code / Image</label>
                          <textarea
                            rows={6}
                            value={adFormData.code}
                            onChange={(e) => setAdFormData(prev => ({ ...prev, code: e.target.value }))}
                            placeholder='<a href="https://sponsor.com"><img src="..." /></a>'
                            className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 border font-mono"
                            style={inputStyle}
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          {editingAdId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAdId(null);
                                setAdFormData({ name: '', size: 'LEADERBOARD', code: '', active: true });
                              }}
                              className="w-1/3 font-semibold py-2.5 rounded-xl transition-all text-xs text-center border"
                              style={{ borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-muted)' }}
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="submit"
                            className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-orange-600/10"
                          >
                            {editingAdId ? 'Update Ad Zone' : 'Create Ad Zone'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--dash-fg)' }}>Profile Settings</h1>
                    <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Manage your administrative details and avatar</p>
                  </div>

                  {profileError && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-200 text-sm">
                      {profileError}
                    </div>
                  )}

                  {profileSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-200 text-sm">
                      {profileSuccess}
                    </div>
                  )}

                  <form onSubmit={handleUpdateProfile} className="max-w-xl space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      {/* Left column: Avatar preview */}
                      <div className="space-y-3 md:col-span-1 flex flex-col items-center">
                        <label className="block text-xs font-semibold uppercase tracking-wider w-full text-left" style={labelStyle}>Avatar</label>
                        <div
                          className="relative group w-28 h-28 rounded-full overflow-hidden border flex items-center justify-center"
                          style={{ borderColor: 'var(--dash-card-border)', backgroundColor: 'var(--dash-input)' }}
                        >
                          {profileData.avatar ? (
                            <img src={profileData.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl font-bold" style={{ color: 'var(--dash-fg-subtle)' }}>
                              {profileData.name ? profileData.name.charAt(0) : 'A'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-center gap-2">
                          <label className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                            <span>Choose Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarUpload}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[10px]" style={{ color: 'var(--dash-fg-muted)' }}>
                            {avatarUploading ? 'Uploading...' : 'Upload a local JPEG/PNG/WEBP'}
                          </span>
                          {avatarUploadError && (
                            <p className="text-[10px] text-red-500 font-medium">{avatarUploadError}</p>
                          )}
                        </div>
                      </div>

                      {/* Right column: Form fields */}
                      <div className="space-y-4 md:col-span-2">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Full Name</label>
                          <input
                            type="text"
                            required
                            value={profileData.name}
                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Or Avatar Image URL</label>
                          <input
                            type="text"
                            value={profileData.avatar}
                            onChange={(e) => setProfileData(prev => ({ ...prev, avatar: e.target.value }))}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 border"
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Biography</label>
                      <textarea
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell readers about yourself, role, and writing background..."
                        className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 border resize-none"
                        style={inputStyle}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Twitter Handle / Link</label>
                        <input
                          type="text"
                          value={profileData.twitter}
                          onChange={(e) => setProfileData(prev => ({ ...prev, twitter: e.target.value }))}
                          placeholder="@editor_handle"
                          className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 border"
                          style={inputStyle}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>LinkedIn Profile Link</label>
                        <input
                          type="text"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                          placeholder="https://linkedin.com/in/profile"
                          className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 border"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        type="submit"
                        disabled={updatingProfile}
                        className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-orange-600/10"
                      >
                        {updatingProfile ? (
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          'Update Profile'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
