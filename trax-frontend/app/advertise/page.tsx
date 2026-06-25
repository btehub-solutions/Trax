'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Mail, Send } from 'lucide-react'

export default function AdvertisePage() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const packages = [
    {
      name: 'Newsletter Sponsor',
      price: '₦150k / week',
      desc: 'Reach 8,000+ tech founders, VCs, and developers directly in their inbox.',
      features: ['Primary header placement', '100-word product description', 'Call-to-action button', 'Performance analytics report'],
    },
    {
      name: 'Sponsored Feature',
      price: '₦250k / article',
      desc: 'Work with our editorial team to tell your story, highlight your tech stack, or launch products.',
      features: ['Granular feature article', 'Homepage visibility for 7 days', 'Social media shares', 'Indefinite search inclusion'],
      featured: true,
    },
    {
      name: 'Event Partnerships',
      price: 'Custom Packages',
      desc: 'Collaborate on webinars, startup pitch nights, hackathons, or physical summits.',
      features: ['Co-branding & logo inclusion', 'Keynote/panel opportunities', 'Attendee registry list', 'Custom media assets coverage'],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('https://formspree.io/f/maqgevgz', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Partnership/Advertise Inquiry',
          form_name: 'Partnership / Advertise Form'
        }),
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        const data = await response.json()
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      alert('Network error. Please check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            PARTNERSHIPS
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
            Partner with Trax
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Connect your brand with the decision-makers, venture capitalists, technical founders, and developers building Ogun State&apos;s tech future.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border flex flex-col justify-between relative"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: pkg.featured ? 'var(--accent)' : 'var(--card-border)',
                boxShadow: pkg.featured ? '0 8px 32px rgba(200, 75, 49, 0.1)' : 'var(--shadow-sm)',
              }}
            >
              {pkg.featured && (
                <span
                  className="absolute -top-3 right-6 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Most Popular
                </span>
              )}
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
                >
                  {pkg.name}
                </h3>
                <span
                  className="text-2xl font-black block mb-4"
                  style={{ fontFamily: 'var(--font-oxanium)', color: pkg.featured ? 'var(--accent)' : 'var(--fg)' }}
                >
                  {pkg.price}
                </span>
                <p
                  className="text-xs md:text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {pkg.desc}
                </p>
                <div className="h-px mb-6" style={{ backgroundColor: 'var(--border)' }} />
                <ul className="space-y-3 mb-8" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-3 items-center text-xs text-white" style={{ color: 'var(--fg)' }}>
                      <Check size={14} className="shrink-0" style={{ color: 'var(--accent)' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('contact-form')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full py-2.5 rounded-xl text-center font-bold text-xs transition-colors"
                style={{
                  backgroundColor: pkg.featured ? 'var(--accent)' : 'transparent',
                  color: pkg.featured ? '#fff' : 'var(--fg-muted)',
                  border: pkg.featured ? 'none' : '1.5px solid var(--border)',
                }}
              >
                Inquire Now
              </button>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" className="max-w-xl mx-auto rounded-3xl border p-8 md:p-10" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2
            className="text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
          >
            Start a Partnership
          </h2>
          <p
            className="text-xs md:text-sm text-center mb-8"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Fill out the form below or email us directly at <span style={{ color: 'var(--accent)' }}>traxnewsng@gmail.com</span> and we will follow up with our sponsorship deck.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kola"
                      className="px-3.5 py-2 text-base md:text-xs rounded-xl outline-none border bg-transparent"
                      style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>Company</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Venti Tech"
                      className="px-3.5 py-2 text-base md:text-xs rounded-xl outline-none border bg-transparent"
                      style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="kola@company.com"
                    className="px-3.5 py-2 text-base md:text-xs rounded-xl outline-none border bg-transparent w-full"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>Inquiry Details</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your campaign goals, budget, or preferred packages..."
                    className="px-3.5 py-2.5 text-base md:text-xs rounded-xl outline-none border bg-transparent w-full resize-none"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-white"
                  style={{ backgroundColor: 'var(--accent)', cursor: loading ? 'wait' : 'pointer' }}
                >
                  {loading ? 'Sending Request...' : <><Send size={13} /> Send Inquiry</>}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 border"
                  style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}
                >
                  <Check size={20} color="#10B981" />
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ color: 'var(--fg)' }}>Inquiry Received!</h3>
                <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                  Thank you for reaching out. An account partner will get in touch with you shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
