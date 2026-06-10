'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Globe, Award, Database } from 'lucide-react'

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<'hubs' | 'startups' | 'labs'>('startups')

  const directory = {
    startups: [
      {
        name: 'Ogun Agrotech',
        location: 'Abeokuta, Nigeria',
        type: 'NLP & Language Models',
        desc: 'Developing Ogun State\'s first digital framework trained on local dialects and cultural nuances.',
        link: '#',
      },
      {
        name: 'Venti Tech',
        location: 'Abeokuta, Ogun',
        type: 'FinTech / Fraud Detection',
        desc: 'digital-native fraud mitigation engine designed specifically for mobile money transactions.',
        link: '#',
      },
      {
        name: 'AcraTech Health',
        location: 'Ijebu Ode, Nigeria',
        type: 'HealthTech / Computer Vision',
        desc: 'Low-bandwidth image diagnostic systems helping rural clinics test malaria in seconds.',
        link: '#',
      },
      {
        name: 'Ijebu Transport Tech',
        location: 'Sagamu, Nigeria',
        type: 'Supply Chain / Optimization',
        desc: 'Predictive routing and load dispatching algorithms for sub-Saharan trucking fleets.',
        link: '#',
      },
    ],
    hubs: [
      {
        name: 'Abeokuta Tech Hub',
        location: 'Yaba, Abeokuta',
        type: 'Incubator / Co-working',
        desc: 'Community workspace and compute resources funded by regional tech councils.',
        link: '#',
      },
      {
        name: 'Ogun State IT Center',
        location: 'Abeokuta, Ogun',
        type: 'Corporate Lab / Ecosystem',
        desc: 'Google DeepMind\'s physical infrastructure partnering with local research universities.',
        link: '#',
      },
      {
        name: 'Trax Founders Sandbox',
        location: 'Ijebu Ode, Nigeria',
        type: 'Policy Sandbox',
        desc: 'NITDA-backed facility for startups testing models under upcoming regulatory policies.',
        link: '#',
      },
    ],
    labs: [
      {
        name: 'Unilag ML Research Group',
        location: 'Abeokuta, Nigeria',
        type: 'Academic Research',
        desc: 'University group publishing papers on low-resource language translation models.',
        link: '#',
      },
      {
        name: 'Ogun Tech Research Institute',
        location: 'Bamako, Mali',
        type: 'Research Lab',
        desc: 'High-performance computing cluster researching genomics and vector-borne diseases.',
        link: '#',
      },
    ],
  }

  const currentList = directory[activeTab]

  return (
    <div className="relative pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            ECOSYSTEM DIRECTORY
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
            Ogun State Tech Map
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            A curated directory mapping active startup platforms, corporate labs, research centers, and infrastructure providers across the region.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2.5 border-b mb-10 overflow-x-auto py-1 scroll-smooth" style={{ borderColor: 'var(--border)' }}>
          {[
            { id: 'startups', label: 'Startups', count: directory.startups.length },
            { id: 'hubs', label: 'Tech Hubs & Incubators', count: directory.hubs.length },
            { id: 'labs', label: 'Academic & Labs', count: directory.labs.length },
          ].map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="px-4 py-3 text-xs md:text-sm font-semibold tracking-wide border-b-2 transition-all shrink-0"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  borderColor: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--fg-muted)',
                }}
              >
                {tab.label} <span className="ml-1 text-[10px] opacity-65 font-bold">({tab.count})</span>
              </button>
            )
          })}
        </div>

        {/* Directory Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          <AnimatePresence mode="popLayout">
            {currentList.map((item, idx) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="p-6 rounded-2xl border flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div>
                  <div className="flex gap-2 items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>
                      {item.type}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                      <MapPin size={11} style={{ color: 'var(--fg-subtle)' }} />
                      {item.location}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold mb-2 text-white"
                    style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                  <a
                    href={item.link}
                    className="text-xs font-bold flex items-center gap-1.5 transition-colors hover:text-accent"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <Globe size={12} /> Website
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
