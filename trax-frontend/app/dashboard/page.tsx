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
  User,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Building2,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';
import { api, fetchApi, BASE_URL, getApiHealth } from '@/lib/api';
import Image from 'next/image';
import { compressImage } from '@/lib/image-compressor';
import { useTheme } from 'next-themes';

type Tab = 'overview' | 'articles' | 'editor' | 'subscribers' | 'ads' | 'profile' | 'team' | 'partners';

const AD_SIZE_MAP: Record<string, string> = {
  LEADERBOARD: 'Leaderboard (1024x409)',
  RECTANGLE: 'Square (1080x1080)',
  INLINE: 'Inline Banner (468x120)',
};

export default function DashboardPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Pagination States
  const [articlesPage, setArticlesPage] = useState(1);
  const [subscribersPage, setSubscribersPage] = useState(1);

  // Reset page when filter or search changes
  useEffect(() => {
    setArticlesPage(1);
  }, [articleSearch, articleFilter]);

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
    isSponsored: false,
    partnerId: '',
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

  // Team Management State
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState<string | null>(null);
  const [teamSuccess, setTeamSuccess] = useState<string | null>(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'WRITER',
    avatar: '',
  });
  const [teamAvatarUploading, setTeamAvatarUploading] = useState(false);
  const [teamAvatarUploadError, setTeamAvatarUploadError] = useState<string | null>(null);

  // Partners Management State
  const [partners, setPartners] = useState<any[]>([]);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [partnerError, setPartnerError] = useState<string | null>(null);
  const [partnerSuccess, setPartnerSuccess] = useState<string | null>(null);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [partnerFormData, setPartnerFormData] = useState({
    name: '',
    logoUrl: '',
    website: '',
  });
  const [partnerLogoUploading, setPartnerLogoUploading] = useState(false);
  const [partnerLogoUploadError, setPartnerLogoUploadError] = useState<string | null>(null);

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
    fetchDashboardData(parsedUser.role);
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

  const fetchDashboardData = async (userRole?: string) => {
    setLoading(true);
    setConnectionError(null);
    try {
      await getApiHealth();

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

      // 6. Fetch team members (Admin only)
      const currentRole = userRole || user?.role;
      if (currentRole === 'ADMIN') {
        const members = await api.get('/users');
        setTeamMembers(members);
        const partnersList = await api.get('/partners');
        setPartners(partnersList);
      }
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
      publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null,
      partnerId: formData.partnerId || null,
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
      isSponsored: article.isSponsored || false,
      partnerId: article.partnerId || '',
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

  const handleTeamMemberAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTeamAvatarUploading(true);
    setTeamAvatarUploadError(null);
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
        setTeamFormData(prev => ({ ...prev, avatar: data.url }));
      }
    } catch (err: any) {
      setTeamAvatarUploadError(err.message || 'Failed to upload avatar');
    } finally {
      setTeamAvatarUploading(false);
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
      isSponsored: false,
      partnerId: '',
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

  const handleAddTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamLoading(true);
    setTeamError(null);
    setTeamSuccess(null);

    try {
      await api.post('/users', teamFormData);
      setTeamSuccess('Team member added successfully!');
      setTeamFormData({ name: '', email: '', password: '', role: 'WRITER', avatar: '' });
      
      const members = await api.get('/users');
      setTeamMembers(members);
    } catch (err: any) {
      setTeamError(err.message || 'Failed to add team member');
    } finally {
      setTeamLoading(false);
    }
  };

  const handleDeleteTeamMember = async (id: string, name: string) => {
    if (id === user?.id) {
      alert("You cannot remove yourself!");
      return;
    }
    if (!confirm(`Are you sure you want to remove ${name} from the team?`)) return;

    try {
      await api.delete(`/users/${id}`);
      const members = await api.get('/users');
      setTeamMembers(members);
    } catch (err: any) {
      alert(err.message || 'Failed to delete team member');
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerLoading(true);
    setPartnerError(null);
    setPartnerSuccess(null);

    try {
      if (editingPartnerId) {
        await api.patch(`/partners/${editingPartnerId}`, partnerFormData);
        setPartnerSuccess('Partner updated successfully!');
      } else {
        await api.post('/partners', partnerFormData);
        setPartnerSuccess('Partner added successfully!');
      }
      setPartnerFormData({ name: '', logoUrl: '', website: '' });
      setEditingPartnerId(null);
      const partnersList = await api.get('/partners');
      setPartners(partnersList);
    } catch (err: any) {
      setPartnerError(err.message || 'Failed to save partner');
    } finally {
      setPartnerLoading(false);
    }
  };

  const handleDeletePartner = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete partner "${name}"?`)) return;
    try {
      await api.delete(`/partners/${id}`);
      const partnersList = await api.get('/partners');
      setPartners(partnersList);
    } catch (err: any) {
      alert(err.message || 'Failed to delete partner');
    }
  };

  const handleTogglePartnerActive = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/partners/${id}`, { isActive: !currentStatus });
      const partnersList = await api.get('/partners');
      setPartners(partnersList);
    } catch (err: any) {
      alert(err.message || 'Failed to toggle partner status');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(articleSearch.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(articleSearch.toLowerCase());
    const matchesFilter = articleFilter === 'ALL' || article.status === articleFilter;
    return matchesSearch && matchesFilter;
  });

  const totalArticlesPages = Math.ceil(filteredArticles.length / 10) || 1;
  const paginatedArticles = filteredArticles.slice((articlesPage - 1) * 10, articlesPage * 10);

  const totalSubscribersPages = Math.ceil(subscribers.length / 10) || 1;
  const paginatedSubscribers = subscribers.slice((subscribersPage - 1) * 10, subscribersPage * 10);

  // Sync page state when total pages drop
  useEffect(() => {
    if (articlesPage > totalArticlesPages) {
      setArticlesPage(totalArticlesPages);
    }
  }, [filteredArticles.length, totalArticlesPages, articlesPage]);

  useEffect(() => {
    if (subscribersPage > totalSubscribersPages) {
      setSubscribersPage(totalSubscribersPages);
    }
  }, [subscribers.length, totalSubscribersPages, subscribersPage]);

  console.log('Dashboard rendering - raw articles:', articles.length, 'filtered articles:', filteredArticles.length);


  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--dash-bg)' }}>
        <div className="h-10 w-10 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
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
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: 'var(--dash-bg)', color: 'var(--dash-fg)' }}>
      {/* Sidebar Navigation */}
      <aside
        className="w-full md:w-64 border-b md:border-b-0 md:border-r backdrop-blur-md flex flex-col justify-between shrink-0"
        style={{ backgroundColor: 'var(--dash-sidebar)', borderColor: 'var(--dash-sidebar-border)' }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl font-black tracking-tight" style={{ color: 'var(--dash-fg)' }}>
              <span style={{ color: 'var(--accent)' }}>TRAX</span>
            </span>
            <span className="bg-red-600/10 text-red-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-red-600/20">
              Admin
            </span>
          </div>

          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-6 border"
            style={{ backgroundColor: 'var(--dash-user-card)', borderColor: 'var(--dash-user-card-border)' }}
          >
            <Image
              src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&fit=crop'}
              alt={user?.name ?? 'User avatar'}
              width={36}
              height={36}
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
              ...(user?.role === 'ADMIN' ? [
                { id: 'team', label: 'Team Management', icon: UserPlus },
                { id: 'partners', label: 'Partners Manager', icon: Building2 }
              ] : []),
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    if (item.onClick) item.onClick();
                  }}
                  className={`w-full flex items-center gap-3 py-3 pr-4 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? 'pl-3 border-l-[3px] border-[var(--accent)]' 
                      : 'pl-4 border-l-[3px] border-transparent'
                  }`}
                  style={
                    activeTab === item.id
                      ? { backgroundColor: 'rgba(255, 26, 26, 0.08)', color: 'var(--accent)' }
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

        <div className="p-6 border-t flex flex-col gap-2.5" style={{ borderColor: 'var(--dash-divider)' }}>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--dash-fg-secondary)] hover:bg-[var(--dash-hover)] transition-all border border-transparent"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              <span>{theme === 'dark' ? 'Dark Red Mode' : 'Zinc Dark Mode'}</span>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all border border-transparent hover:border-[var(--accent)]/25"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        {connectionError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-sm flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold">
              <PlusCircle className="h-5 w-5 text-red-500 rotate-45" />
              <span>Backend API Server Offline</span>
            </div>
            <p className="text-xs">{connectionError}</p>
            <button
              type="button"
              onClick={() => fetchDashboardData()}
              className="mt-2 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-100 px-3.5 py-1.5 rounded-lg border border-red-500/30 font-semibold self-start transition-all"
            >
              Retry Connection
            </button>
          </div>
        )}

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="h-8 w-8 border-2 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
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
                    <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Status overview of the TRAX platform</p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Published Articles', value: stats.articlesCount, icon: BookOpen, color: 'text-emerald-500' },
                      { label: 'Draft Articles', value: stats.draftsCount, icon: FileText, color: 'text-yellow-500' },
                      { label: 'Subscribers', value: stats.subscribersCount, icon: Mail, color: 'text-blue-500' },
                      { label: 'Active Ads', value: stats.activeAdsCount, icon: Layout, color: 'text-red-600' },
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
                        <Users className="h-5 w-5 text-red-600" />
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
                          <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                            <span className="text-xl" style={{ opacity: 0.4 }}>📧</span>
                            <p className="text-sm font-medium" style={{ color: 'var(--dash-fg-muted)' }}>No subscribers yet</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Active Ad Slots info */}
                    <div className="rounded-2xl p-6 border" style={cardStyle}>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--dash-fg)' }}>
                        <Settings className="h-5 w-5 text-red-600" />
                        Ad Zones Status
                      </h3>
                      <div className="space-y-3">
                        {adSlots.map((slot) => (
                          <div key={slot.id} className="p-3 border rounded-xl flex justify-between items-center" style={cardStyle}>
                            <div>
                              <span className="text-sm font-semibold block" style={{ color: 'var(--dash-fg)' }}>{slot.name}</span>
                              <span className="text-[10px] font-bold text-red-600">{slot.size}</span>
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
                      className="bg-red-600 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-red-600/10"
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
                        className="w-full rounded-xl pl-10 pr-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all border"
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
                              ? { backgroundColor: 'rgba(255, 26, 26, 0.1)', borderColor: 'var(--accent)', color: 'var(--accent)' }
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
                          {paginatedArticles.map((article) => (
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
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80'
                                      }}
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
                                      className="p-2 bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/25 rounded-lg transition-all"
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
                              <td colSpan={4}>
                                <div className="flex flex-col items-center justify-center py-14 gap-3">
                                  <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(255, 26, 26, 0.08)', border: '1px solid rgba(255, 26, 26, 0.15)' }}
                                  >
                                    <span style={{ fontSize: '1.25rem' }}>📄</span>
                                  </div>
                                  <p className="text-sm font-semibold" style={{ color: 'var(--dash-fg)' }}>No articles found</p>
                                  <p className="text-xs" style={{ color: 'var(--dash-fg-subtle)' }}>Try adjusting your search or filters</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Controls */}
                  {totalArticlesPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                      <p className="text-xs" style={{ color: 'var(--dash-fg-subtle)' }}>
                        Showing <span className="font-semibold" style={{ color: 'var(--dash-fg)' }}>{Math.min(filteredArticles.length, (articlesPage - 1) * 10 + 1)}-{Math.min(filteredArticles.length, articlesPage * 10)}</span> of <span className="font-semibold" style={{ color: 'var(--dash-fg)' }}>{filteredArticles.length}</span> articles
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setArticlesPage(prev => Math.max(prev - 1, 1))}
                          disabled={articlesPage === 1}
                          className="p-2 rounded-xl transition-all border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(232, 0, 15,0.05)]"
                          style={{ backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-secondary)' }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        {Array.from({ length: totalArticlesPages }).map((_, i) => {
                          const pageNum = i + 1;
                          const isActive = pageNum === articlesPage;
                          if (totalArticlesPages > 6 && Math.abs(pageNum - articlesPage) > 1 && pageNum !== 1 && pageNum !== totalArticlesPages) {
                            if (pageNum === 2 || pageNum === totalArticlesPages - 1) {
                              return <span key={pageNum} className="flex items-center justify-center w-9 h-9 text-xs" style={{ color: 'var(--dash-fg-subtle)' }}>...</span>;
                            }
                            return null;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setArticlesPage(pageNum)}
                              className="w-9 h-9 rounded-xl text-xs font-bold transition-all border"
                              style={
                                isActive
                                  ? { backgroundColor: 'rgba(255, 26, 26, 0.1)', borderColor: 'var(--accent)', color: 'var(--accent)' }
                                  : { backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-secondary)' }
                              }
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setArticlesPage(prev => Math.min(prev + 1, totalArticlesPages))}
                          disabled={articlesPage === totalArticlesPages}
                          className="p-2 rounded-xl transition-all border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(232, 0, 15,0.05)]"
                          style={{ backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-secondary)' }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
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
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-sm">
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
                            className="w-full rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all border"
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
                            className="w-full rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all border font-mono"
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
                            className="w-full rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all border resize-none"
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
                            className="w-full rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all border font-mono"
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
                            className="w-full rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all border"
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
                              <label className="cursor-pointer bg-red-600 hover:bg-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
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
                                className="w-full rounded-xl px-4 py-2.5 text-base md:text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all border"
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
                            className="w-full rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:border-red-600 transition-all border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Publication Date</label>
                          <input
                            type="date"
                            value={formData.publishedAt}
                            onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                            className="w-full rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:border-red-600 transition-all border"
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
                            className="w-full rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:border-red-600 transition-all border"
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
                              className="accent-red-600 h-4 w-4 rounded"
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
                              className="accent-red-600 h-4 w-4 rounded"
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
                              className="accent-red-600 h-4 w-4 rounded"
                            />
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="h-4 w-4 text-red-600 shrink-0" />
                              <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--dash-fg-secondary)' }}>Trending Section</span>
                            </div>
                          </label>

                          <div className="border-t border-zinc-800/40 my-3 pt-3 space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={formData.isSponsored}
                                onChange={(e) => setFormData(prev => ({ ...prev, isSponsored: e.target.checked }))}
                                className="accent-red-600 h-4 w-4 rounded"
                              />
                              <div className="flex items-center gap-1.5">
                                <Building2 className="h-4 w-4 text-purple-500 shrink-0" />
                                <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--dash-fg-secondary)' }}>Sponsored / Partner Content</span>
                              </div>
                            </label>

                            {formData.isSponsored && (
                              <div className="space-y-1.5 pl-7">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Select Partner</label>
                                <select
                                  value={formData.partnerId}
                                  onChange={(e) => setFormData(prev => ({ ...prev, partnerId: e.target.value }))}
                                  className="w-full rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-red-600 border"
                                  style={inputStyle}
                                >
                                  <option value="" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Select Partner Profile</option>
                                  {partners.map((partner) => (
                                    <option key={partner.id} value={partner.id} style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
                                      {partner.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
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
                                    ? { backgroundColor: 'rgba(255, 26, 26, 0.1)', borderColor: 'var(--accent)', color: 'var(--accent)', fontWeight: 700 }
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
                            className="flex-1 bg-red-600 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
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
                        className="self-start sm:self-center bg-red-600 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
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
                          {paginatedSubscribers.map((sub) => (
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
                                    className="text-red-300 hover:text-red-100 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/25 transition-all"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {subscribers.length === 0 && (
                            <tr>
                              <td colSpan={4}>
                                <div className="flex flex-col items-center justify-center py-16 gap-3">
                                  <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(255, 26, 26, 0.08)', border: '1px solid rgba(255, 26, 26, 0.15)' }}
                                  >
                                    <span style={{ fontSize: '1.5rem' }}>📭</span>
                                  </div>
                                  <p className="text-sm font-semibold" style={{ color: 'var(--dash-fg)' }}>No subscribers yet</p>
                                  <p className="text-xs max-w-xs text-center" style={{ color: 'var(--dash-fg-subtle)' }}>Subscribers will appear here once readers sign up via the newsletter form</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Controls */}
                  {totalSubscribersPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                      <p className="text-xs" style={{ color: 'var(--dash-fg-subtle)' }}>
                        Showing <span className="font-semibold" style={{ color: 'var(--dash-fg)' }}>{Math.min(subscribers.length, (subscribersPage - 1) * 10 + 1)}-{Math.min(subscribers.length, subscribersPage * 10)}</span> of <span className="font-semibold" style={{ color: 'var(--dash-fg)' }}>{subscribers.length}</span> subscribers
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSubscribersPage(prev => Math.max(prev - 1, 1))}
                          disabled={subscribersPage === 1}
                          className="p-2 rounded-xl transition-all border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(232, 0, 15,0.05)]"
                          style={{ backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-secondary)' }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        {Array.from({ length: totalSubscribersPages }).map((_, i) => {
                          const pageNum = i + 1;
                          const isActive = pageNum === subscribersPage;
                          if (totalSubscribersPages > 6 && Math.abs(pageNum - subscribersPage) > 1 && pageNum !== 1 && pageNum !== totalSubscribersPages) {
                            if (pageNum === 2 || pageNum === totalSubscribersPages - 1) {
                              return <span key={pageNum} className="flex items-center justify-center w-9 h-9 text-xs" style={{ color: 'var(--dash-fg-subtle)' }}>...</span>;
                            }
                            return null;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setSubscribersPage(pageNum)}
                              className="w-9 h-9 rounded-xl text-xs font-bold transition-all border"
                              style={
                                isActive
                                  ? { backgroundColor: 'rgba(255, 26, 26, 0.1)', borderColor: 'var(--accent)', color: 'var(--accent)' }
                                  : { backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-secondary)' }
                              }
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setSubscribersPage(prev => Math.min(prev + 1, totalSubscribersPages))}
                          disabled={subscribersPage === totalSubscribersPages}
                          className="p-2 rounded-xl transition-all border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(232, 0, 15,0.05)]"
                          style={{ backgroundColor: 'var(--dash-card)', borderColor: 'var(--dash-card-border)', color: 'var(--dash-fg-secondary)' }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
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
                                {AD_SIZE_MAP[slot.size] || slot.size}
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
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-xs">
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
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Size Category</label>
                          <select
                            value={adFormData.size}
                            onChange={(e) => setAdFormData(prev => ({ ...prev, size: e.target.value }))}
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          >
                            <option value="LEADERBOARD" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Leaderboard (1024x409)</option>
                            <option value="RECTANGLE" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Square (1080x1080)</option>
                            <option value="INLINE" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Inline Banner (468x120)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Banner Image File (Optional)</label>
                          <div className="flex items-center gap-2">
                            <label className="cursor-pointer bg-red-600 hover:bg-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
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
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border font-mono"
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
                            className="flex-1 bg-red-600 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-red-600/10"
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
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-sm">
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
                            <Image src={profileData.avatar} alt="Avatar Preview" width={112} height={112} className="w-full h-full object-cover" unoptimized={false} />
                          ) : (
                            <span className="text-3xl font-bold" style={{ color: 'var(--dash-fg-subtle)' }}>
                              {profileData.name ? profileData.name.charAt(0) : 'A'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-center gap-2">
                          <label className="cursor-pointer bg-red-600 hover:bg-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
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
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
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
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
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
                        className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border resize-none"
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
                          className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
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
                          className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        type="submit"
                        disabled={updatingProfile}
                        className="bg-red-600 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-red-600/10"
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

              {/* TAB 7: TEAM MANAGEMENT */}
              {activeTab === 'team' && user?.role === 'ADMIN' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--dash-fg)' }}>Team Management</h1>
                    <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Add, update, and manage team members and their roles</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Team Directory Table */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="rounded-2xl overflow-hidden border" style={cardStyle}>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr
                                className="border-b text-xs font-semibold uppercase tracking-wider"
                                style={{ borderColor: 'var(--dash-divider)', backgroundColor: 'var(--dash-thead)', color: 'var(--dash-fg-muted)' }}
                              >
                                <th className="py-4 px-6">Name</th>
                                <th className="py-4 px-6">Email Address</th>
                                <th className="py-4 px-6">Role</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="text-sm" style={{ color: 'var(--dash-fg-secondary)' }}>
                              {teamMembers.map((member) => (
                                <tr
                                  key={member.id}
                                  className="border-b transition-colors"
                                  style={{ borderColor: 'var(--dash-divider)' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dash-hover)'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                  <td className="py-4 px-6 font-semibold" style={{ color: 'var(--dash-fg)' }}>
                                    <div className="flex items-center gap-3">
                                      {member.avatar ? (
                                        <Image src={member.avatar} alt={member.name} width={32} height={32} className="h-8 w-8 rounded-full object-cover border border-neutral-800" />
                                      ) : (
                                        <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-red-600">
                                          {member.name.charAt(0)}
                                        </div>
                                      )}
                                      <span>{member.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-6">{member.email}</td>
                                  <td className="py-4 px-6">
                                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold ${
                                      member.role === 'ADMIN'
                                        ? 'bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/20'
                                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                    }`}>
                                      {member.role}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6 text-right font-medium">
                                    {member.id !== user?.id && (
                                      <button
                                        onClick={() => handleDeleteTeamMember(member.id, member.name)}
                                        className="text-red-300 hover:text-red-100 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/25 transition-all font-medium"
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                              {teamMembers.length === 0 && (
                                <tr>
                                  <td colSpan={4}>
                                    <div className="flex flex-col items-center justify-center py-14 gap-3">
                                      <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: 'rgba(255, 26, 26, 0.08)', border: '1px solid rgba(255, 26, 26, 0.15)' }}
                                      >
                                        <span style={{ fontSize: '1.25rem' }}>👥</span>
                                      </div>
                                      <p className="text-sm font-semibold" style={{ color: 'var(--dash-fg)' }}>No team members found</p>
                                      <p className="text-xs" style={{ color: 'var(--dash-fg-subtle)' }}>Add team members to see them here</p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Right: Add Member Form Box */}
                    <div className="p-6 rounded-2xl h-fit border" style={cardStyle}>
                      <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--dash-fg)' }}>
                        Add Team Member
                      </h3>

                      {teamError && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-xs">
                          {teamError}
                        </div>
                      )}

                      {teamSuccess && (
                        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-200 text-xs">
                          {teamSuccess}
                        </div>
                      )}

                      <form onSubmit={handleAddTeamMember} className="space-y-4">
                        <div className="flex flex-col items-center gap-3 pb-2 border-b border-dashed" style={{ borderColor: 'var(--dash-divider)' }}>
                          <div
                            className="relative group w-20 h-20 rounded-full overflow-hidden border flex items-center justify-center"
                            style={{ borderColor: 'var(--dash-card-border)', backgroundColor: 'var(--dash-input)' }}
                          >
                            {teamFormData.avatar ? (
                              <Image src={teamFormData.avatar} alt="Avatar Preview" width={80} height={80} className="w-full h-full object-cover" unoptimized={false} />
                            ) : (
                              <span className="text-2xl font-bold" style={{ color: 'var(--dash-fg-subtle)' }}>
                                {teamFormData.name ? teamFormData.name.charAt(0) : '?'}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-col items-center gap-1.5">
                            <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
                              <span>Choose Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleTeamMemberAvatarUpload}
                                className="hidden"
                              />
                            </label>
                            <span className="text-[9px]" style={{ color: 'var(--dash-fg-muted)' }}>
                              {teamAvatarUploading ? 'Uploading...' : 'Upload avatar'}
                            </span>
                            {teamAvatarUploadError && (
                              <p className="text-[9px] text-red-500 font-medium">{teamAvatarUploadError}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Or Avatar Image URL</label>
                          <input
                            type="text"
                            value={teamFormData.avatar}
                            onChange={(e) => setTeamFormData(prev => ({ ...prev, avatar: e.target.value }))}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Full Name</label>
                          <input
                            type="text"
                            required
                            value={teamFormData.name}
                            onChange={(e) => setTeamFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="John Doe"
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Email Address</label>
                          <input
                            type="email"
                            required
                            value={teamFormData.email}
                            onChange={(e) => setTeamFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="john@trax.ng"
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Password</label>
                          <input
                            type="password"
                            required
                            value={teamFormData.password}
                            onChange={(e) => setTeamFormData(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="••••••••"
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>System Role</label>
                          <select
                            value={teamFormData.role}
                            onChange={(e) => setTeamFormData(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          >
                            <option value="WRITER" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Writer (Create & edit articles)</option>
                            <option value="ADMIN" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>Admin (Full system access)</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={teamLoading}
                          className="w-full bg-red-600 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-red-600/10 flex items-center justify-center gap-2"
                        >
                          {teamLoading ? (
                            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            'Add Member'
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: PARTNERS MANAGEMENT */}
              {activeTab === 'partners' && user?.role === 'ADMIN' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--dash-fg)' }}>Partners Manager</h1>
                    <p style={{ color: 'var(--dash-fg-muted)' }} className="mt-1">Add, update, and manage official corporate and tech ecosystem partners</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Partners List Table */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="rounded-2xl overflow-hidden border" style={cardStyle}>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr
                                className="border-b text-xs font-semibold uppercase tracking-wider"
                                style={{ borderColor: 'var(--dash-divider)', backgroundColor: 'var(--dash-thead)', color: 'var(--dash-fg-muted)' }}
                              >
                                <th className="py-4 px-6">Logo</th>
                                <th className="py-4 px-6">Name</th>
                                <th className="py-4 px-6">Website</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="text-sm" style={{ color: 'var(--dash-fg-secondary)' }}>
                              {partners.map((partner) => (
                                <tr
                                  key={partner.id}
                                  className="border-b transition-colors"
                                  style={{ borderColor: 'var(--dash-divider)' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dash-hover)'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                  <td className="py-4 px-6">
                                    <img 
                                      src={partner.logoUrl} 
                                      alt={partner.name} 
                                      className="h-10 w-10 rounded-xl object-cover border border-neutral-800 bg-black/40" 
                                    />
                                  </td>
                                  <td className="py-4 px-6 font-semibold" style={{ color: 'var(--dash-fg)' }}>
                                    {partner.name}
                                  </td>
                                  <td className="py-4 px-6 text-zinc-400">
                                    {partner.website ? (
                                      <a 
                                        href={partner.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="hover:underline flex items-center gap-1 hover:text-white"
                                      >
                                        {partner.website.replace(/^https?:\/\/(www\.)?/, '')}
                                        <ExternalLink size={12} />
                                      </a>
                                    ) : (
                                      '-'
                                    )}
                                  </td>
                                  <td className="py-4 px-6">
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePartnerActive(partner.id, partner.isActive)}
                                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                                        partner.isActive
                                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                          : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                                      }`}
                                    >
                                      {partner.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                  </td>
                                  <td className="py-4 px-6 text-right font-medium">
                                    <div className="flex justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingPartnerId(partner.id);
                                          setPartnerFormData({
                                            name: partner.name,
                                            logoUrl: partner.logoUrl,
                                            website: partner.website || '',
                                          });
                                          setPartnerError(null);
                                          setPartnerSuccess(null);
                                        }}
                                        className="text-zinc-300 hover:text-white text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700 transition-all"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeletePartner(partner.id, partner.name)}
                                        className="text-red-300 hover:text-red-100 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/25 transition-all"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                              {partners.length === 0 && (
                                <tr>
                                  <td colSpan={5}>
                                    <div className="flex flex-col items-center justify-center py-14 gap-3">
                                      <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: 'rgba(255, 26, 26, 0.08)', border: '1px solid rgba(255, 26, 26, 0.15)' }}
                                      >
                                        <Building2 className="h-5 w-5 text-red-600" />
                                      </div>
                                      <p className="text-sm font-semibold" style={{ color: 'var(--dash-fg)' }}>No partners found</p>
                                      <p className="text-xs" style={{ color: 'var(--dash-fg-subtle)' }}>Add partners to see them here</p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Right: Add/Edit Partner Form Box */}
                    <div className="p-6 rounded-2xl h-fit border" style={cardStyle}>
                      <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--dash-fg)' }}>
                        {editingPartnerId ? 'Edit Partner' : 'Add Partner'}
                      </h3>

                      {partnerError && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-100 text-xs">
                          {partnerError}
                        </div>
                      )}

                      {partnerSuccess && (
                        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-200 text-xs">
                          {partnerSuccess}
                        </div>
                      )}

                      <form onSubmit={handlePartnerSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Partner Name</label>
                          <input
                            type="text"
                            required
                            value={partnerFormData.name}
                            onChange={(e) => setPartnerFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ogun State Tech Hub"
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Partner Logo</label>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                                <span>{partnerLogoUploading ? 'Uploading...' : 'Upload Logo'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setPartnerLogoUploading(true);
                                    setPartnerLogoUploadError(null);
                                    try {
                                      const compressedFile = await compressImage(file);
                                      const fData = new FormData();
                                      fData.append('file', compressedFile);
                                      const token = localStorage.getItem('token');
                                      const res = await fetch(`${BASE_URL}/uploads`, {
                                        method: 'POST',
                                        headers: { 'Authorization': `Bearer ${token}` },
                                        body: fData,
                                      });
                                      if (!res.ok) {
                                        const json = await res.json();
                                        throw new Error(json.message || 'Upload failed');
                                      }
                                      const data = await res.json();
                                      if (data?.url) {
                                        setPartnerFormData(prev => ({ ...prev, logoUrl: data.url }));
                                      }
                                    } catch (err: any) {
                                      setPartnerLogoUploadError(err.message || 'Failed to upload logo');
                                    } finally {
                                      setPartnerLogoUploading(false);
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-[10px]" style={{ color: 'var(--dash-fg-muted)' }}>
                                JPEG / PNG / WEBP
                              </span>
                            </div>

                            {partnerLogoUploadError && (
                              <p className="text-xs text-red-500 font-medium">{partnerLogoUploadError}</p>
                            )}

                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] uppercase font-semibold tracking-wider" style={{ color: 'var(--dash-fg-subtle)' }}>Or Paste Image URL</span>
                              <input
                                type="text"
                                value={partnerFormData.logoUrl}
                                onChange={(e) => setPartnerFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                                placeholder="https://example.com/logo.png"
                                className="w-full rounded-xl px-4 py-2.5 text-base md:text-xs focus:outline-none focus:border-red-600 border"
                                style={inputStyle}
                              />
                            </div>

                            {partnerFormData.logoUrl && (
                              <div className="relative group rounded-xl overflow-hidden border w-20 h-20" style={{ borderColor: 'var(--dash-card-border)' }}>
                                <img
                                  src={partnerFormData.logoUrl}
                                  alt="Logo Preview"
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => setPartnerFormData(prev => ({ ...prev, logoUrl: '' }))}
                                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded-lg text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider block" style={labelStyle}>Website URL (Optional)</label>
                          <input
                            type="text"
                            value={partnerFormData.website}
                            onChange={(e) => setPartnerFormData(prev => ({ ...prev, website: e.target.value }))}
                            placeholder="https://ogunstate.gov.ng"
                            className="w-full rounded-xl px-4 py-2.5 text-base md:text-sm focus:outline-none focus:border-red-600 border"
                            style={inputStyle}
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={partnerLoading}
                            className="flex-1 bg-red-600 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-red-600/10 flex items-center justify-center gap-2"
                          >
                            {partnerLoading ? (
                              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              editingPartnerId ? 'Save Changes' : 'Add Partner'
                            )}
                          </button>

                          {editingPartnerId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingPartnerId(null);
                                setPartnerFormData({ name: '', logoUrl: '', website: '' });
                                setPartnerError(null);
                                setPartnerSuccess(null);
                              }}
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 px-4 rounded-xl text-xs border border-zinc-700 transition-all"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
