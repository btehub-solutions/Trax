'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function CareersPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const roles = [
    {
      title: 'AI Tech Reporter (Abeokuta or Remote)',
      dept: 'Editorial',
      type: 'Full-time',
      summary: "We are seeking an experienced technical journalist to track startup fundraisings, codebases, and product updates in the Ogun State's AI landscape.",
      requirements: [
        '3+ years covering tech/venture business in Africa.',
        'Ability to read simple Python, parse software development notebooks, or discuss models at a high level.',
        'Extensive network among local startup founders and engineering teams.',
      ],
      responsibilities: [
        'Breaking stories on investments, startup formations, and regulatory frameworks.',
        'Conducting detailed interviews with technical founders and research leads.',
        'Writing weekly analytical review reports.',
      ],
    },
    {
      title: 'Community Growth & Marketing Lead',
      dept: 'Marketing',
      type: 'Full-time',
      summary: 'Lead marketing strategies, manage our newsletter audience metrics, and organize offline founder/investor mixers.',
      requirements: [
        'Track record growing SaaS or media subscription channels.',
        'Experienced with marketing funnels, copy writing, and social campaigns.',
        'Strong event planning and host presence.',
      ],
      responsibilities: [
        'Growing newsletter subscriber base and managing sponsorship partners.',
        'Organizing regional events, founder dinners, and panels.',
        'Directing brand presence across social networks (LinkedIn, X, YouTube).',
      ],
    },
    {
      title: 'Developer Relations & Community Intern',
      dept: 'Engineering / Growth',
      type: 'Internship (6 Months)',
      summary: 'Ideal for computer science students or boot camp grads. Help curate local technical datasets and manage developer forums.',
      requirements: [
        'Basic understanding of web technologies, Git, and Python data scraping.',
        'Familiar with local developer circles (tech communities in Abeokuta and Ota).',
        'Strong communication and research skills.',
      ],
      responsibilities: [
        'Maintaining our public database listings and Tech Startup Maps.',
        'Providing support at our regional developer hackathons and workshops.',
        'Drafting short tutorials/reviews on libraries built in Africa.',
      ],
    },
  ]

  const toggleExpand = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i)
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
            CAREERS
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
            Join Trax
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Help us write the history of the software development revolution in Ogun State. We are always looking for passionate writers, developers, and researchers.
          </p>
        </div>

        {/* Roles List */}
        <div className="max-w-3xl space-y-4" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          {roles.map((role, i) => {
            const isExpanded = expandedIndex === i
            return (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                }}
              >
                {/* Header row */}
                <button
                  onClick={() => toggleExpand(i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div>
                    <div className="flex gap-2.5 items-center mb-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}>
                        {role.dept}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                        {role.type}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold transition-colors group-hover:text-accent"
                      style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
                    >
                      {role.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1 rounded-lg"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Expanded details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>
                          {role.summary}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--fg)' }}>Responsibilities</h4>
                            <ul className="space-y-2 text-xs" style={{ color: 'var(--fg-muted)' }}>
                              {role.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex gap-2 items-start">
                                  <span style={{ color: 'var(--accent)' }}>•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--fg)' }}>Requirements</h4>
                            <ul className="space-y-2 text-xs" style={{ color: 'var(--fg-muted)' }}>
                              {role.requirements.map((req, idx) => (
                                <li key={idx} className="flex gap-2 items-start">
                                  <span style={{ color: 'var(--accent)' }}>•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <a
                          href="mailto:careers@trax.co"
                          className="inline-block px-5 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: 'var(--accent)' }}
                        >
                          Apply for this role
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
