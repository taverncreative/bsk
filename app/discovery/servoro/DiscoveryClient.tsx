'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock, ChevronRight, ChevronLeft, Check, Building2, Palette,
  Package, Users, ShieldCheck, Globe, BarChart3, Camera, Clock,
  FileText, CheckCircle2, Edit3, X, Menu, Sparkles, Send
} from 'lucide-react'

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

type FieldType = 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file'

interface FormField {
  id: string
  label: string
  type: FieldType
  prefilled?: string
  placeholder?: string
  options?: string[]
  helpText?: string
}

interface FormSection {
  id: string
  title: string
  subtitle: string
  icon: React.ElementType
  infoNote?: string
  fields: FormField[]
}

/* ─────────────────────────────────────────────
   FORM SECTIONS DATA
   ───────────────────────────────────────────── */

const SECTIONS: FormSection[] = [
  {
    id: 'business-overview',
    title: 'Business Overview',
    subtitle: 'Review and confirm your core business information',
    icon: Building2,
    infoNote: 'We\'ve pre-filled what we know — please review each field and update anything that\'s inaccurate or needs more detail.',
    fields: [
      { id: 'companyName', label: 'Company Name', type: 'text', prefilled: 'Servoro' },
      { id: 'registeredAddress', label: 'Business Address / Location', type: 'text', prefilled: 'Central London' },
      { id: 'specificBoroughs', label: 'Key Boroughs / Areas You Serve', type: 'textarea', placeholder: 'e.g. Westminster, City of London, Camden, Islington, Kensington & Chelsea, etc.' },
      { id: 'contactName', label: 'Primary Contact Name', type: 'text', prefilled: 'Alan Benfield' },
      { id: 'contactEmail', label: 'Contact Email', type: 'text', placeholder: 'Your email address' },
      { id: 'contactPhone', label: 'Contact Phone', type: 'text', placeholder: 'Your phone number' },
      { id: 'currentWebsite', label: 'Current Website', type: 'text', prefilled: 'servoro.co.uk' },
      { id: 'businessSummary', label: 'Business Summary', type: 'textarea', prefilled: 'London-based cleaning company specialising in commercial, public sector, and residential cleaning services. Positioning for broader building services including security and lift maintenance in the future.' },
      { id: 'businessGoals', label: 'Key Business Goals (next 12 months)', type: 'textarea', placeholder: 'What are the most important business objectives you\'re working towards?' },
    ]
  },
  {
    id: 'services',
    title: 'Services & Positioning',
    subtitle: 'Help us understand your service offering and how to present it',
    icon: Package,
    infoNote: 'We understand cleaning is the initial focus, with full building services to follow. Please help us clarify how to position this on the website.',
    fields: [
      { id: 'currentServices', label: 'Current Services (launching with)', type: 'textarea', prefilled: 'Commercial Cleaning, Specialist Services, Facilities Support, Housekeeping Services, Domestic Cleaning, Maintenance & Support, Event & Venue Cleaning' },
      { id: 'futureServices', label: 'Future Services (to add later)', type: 'textarea', prefilled: 'Security, Lift Maintenance, Full Building/Facilities Management' },
      { id: 'positioningApproach', label: 'Website Positioning', type: 'radio', options: ['Cleaning only — add other services later', 'Building services — mention cleaning is available now, others coming soon', 'Full facilities — list everything as available'], helpText: 'How should we frame the business on the website at launch?' },
      { id: 'serviceAreas', label: 'What types of properties do you clean?', type: 'checkbox', options: ['Offices', 'Schools', 'Residential', 'Retail', 'Healthcare', 'Hospitality', 'Industrial', 'Other'], helpText: 'Tick all that apply' },
      { id: 'serviceAreasOther', label: 'Other property types (if applicable)', type: 'text', placeholder: 'Any other property types not listed above' },
      { id: 'uniqueSellingPoints', label: 'What sets Servoro apart from competitors?', type: 'textarea', placeholder: 'e.g. eco-friendly products, DBS-checked staff, rapid response, flexible scheduling, etc.' },
      { id: 'accreditations', label: 'Accreditations / Certifications', type: 'textarea', placeholder: 'e.g. CHAS, SafeContractor, ISO certifications, BICS, etc.' },
    ]
  },
  {
    id: 'target-audience',
    title: 'Target Audience',
    subtitle: 'Who are you trying to reach with the new website?',
    icon: Users,
    fields: [
      { id: 'idealClient', label: 'Ideal Client Profile', type: 'textarea', placeholder: 'Describe your ideal client — building managers, facilities managers, school administrators, landlords, homeowners, etc.' },
      { id: 'decisionMakers', label: 'Who typically makes the buying decision?', type: 'textarea', placeholder: 'e.g. Facilities managers, office managers, head teachers, property managers, homeowners' },
      { id: 'clientSize', label: 'Typical Client Size', type: 'checkbox', options: ['Small businesses', 'Medium enterprises', 'Large corporates', 'Public sector / Government', 'Residential homeowners'], helpText: 'Tick all that apply' },
      { id: 'geographicFocus', label: 'Geographic Focus', type: 'textarea', prefilled: 'Central London', helpText: 'Specific boroughs, postcode areas, or broader London coverage?' },
    ]
  },
  {
    id: 'branding',
    title: 'Branding & Design',
    subtitle: 'Help us get the look and feel right',
    icon: Palette,
    fields: [
      { id: 'hasLogo', label: 'Do you have a logo?', type: 'radio', options: ['Yes — ready to use', 'Yes — but needs updating', 'No — need one created'] },
      { id: 'brandColours', label: 'Preferred Brand Colours', type: 'textarea', placeholder: 'Do you have specific colours in mind? Or happy for us to propose something? e.g. "Blues and whites for clean/professional feel" or "Happy for BSK to choose"', helpText: 'If you don\'t have a preference, we\'ll propose options based on your industry.' },
      { id: 'fontPreference', label: 'Font / Typography Preference', type: 'textarea', placeholder: 'Any font preferences? Modern, classic, bold? Or happy for us to choose?', helpText: 'If unsure, just say "Happy for BSK to choose" — we\'ll find something that fits.' },
      { id: 'designDirection', label: 'Design Direction', type: 'radio', options: ['Clean & minimal', 'Bold & corporate', 'Warm & approachable', 'Premium & sophisticated', 'Happy for BSK to decide'] },
      { id: 'websitesYouLike', label: 'Websites You Like (for inspiration)', type: 'textarea', placeholder: 'Links to any websites whose look and feel you admire — doesn\'t have to be in your industry' },
      { id: 'websitesToAvoid', label: 'Anything to Avoid?', type: 'textarea', placeholder: 'Any design styles, colours, or approaches you definitely don\'t want?' },
    ]
  },
  {
    id: 'website-content',
    title: 'Website & Content',
    subtitle: 'Pages, features, and content for the new site',
    icon: Globe,
    fields: [
      { id: 'mustHavePages', label: 'Must-Have Pages', type: 'textarea', prefilled: 'Home, About, Services (with sub-pages), Contact, Blog', helpText: 'We\'ll suggest a full sitemap — but let us know if you have specific pages in mind.' },
      { id: 'blogTopics', label: 'Blog Topics / Content Ideas', type: 'textarea', prefilled: 'Commercial cleaning, school cleaning, residential cleaning', helpText: 'What topics would you want to write about or have us create content for?' },
      { id: 'keyFeatures', label: 'Key Website Features', type: 'checkbox', options: ['Quote request form', 'Live chat', 'Booking system', 'Client portal', 'Testimonials section', 'Case studies', 'FAQ section'], helpText: 'Tick any features you\'d like on the website' },
      { id: 'existingContent', label: 'Do you have existing content to reuse?', type: 'radio', options: ['Yes — text and images from current site', 'Some — but most needs rewriting', 'No — starting from scratch'] },
      { id: 'toneOfVoice', label: 'Tone of Voice', type: 'radio', options: ['Professional & corporate', 'Friendly & approachable', 'Authoritative & expert', 'Mix of professional and friendly'] },
    ]
  },
  {
    id: 'timeline-project',
    title: 'Timeline & Project Details',
    subtitle: 'Final details to get the project moving',
    icon: Clock,
    fields: [
      { id: 'targetLaunch', label: 'Target Launch Date', type: 'text', prefilled: 'May 2025' },
      { id: 'domainStatus', label: 'Domain Registration (servoro.co.uk)', type: 'radio', options: ['I own it — full access', 'I own it — need help accessing', 'Not registered yet', 'Not sure'], helpText: 'Please confirm your domain registration status so we can plan hosting and DNS.' },
      { id: 'currentHosting', label: 'Current Hosting Provider', type: 'text', placeholder: 'Where is your current site hosted? (e.g. Wix, GoDaddy, etc.)' },
      { id: 'otherNotes', label: 'Anything Else?', type: 'textarea', placeholder: 'Anything else we should know about the project, your business, or your expectations?' },
      { id: 'contactPreference', label: 'Preferred Contact Method (tick all that apply)', type: 'checkbox', options: ['Email', 'WhatsApp', 'Phone Call', 'Video Call'], helpText: 'How would you like us to stay in touch during the project?' },
    ]
  },
]

/* ─────────────────────────────────────────────
   MEETING NOTES DATA
   ───────────────────────────────────────────── */

const MEETING_NOTES = [
  {
    title: '1. Background',
    content: `Client: Alan Benfield — met via Precision Lifts. Servoro is an independent side project.\n\nCurrent website appears to be a Wix-based template. Needs a professional rebuild to credibly compete for commercial contracts.`
  },
  {
    title: '2. Positioning',
    content: `Servoro wants to position as building services — covering cleaning, security, and lift maintenance.\n\nInitially launching with cleaning services only. Full facilities management to follow.\n\nKey question: how to present this on the website — cleaning-only for now, or broader "building services" messaging with cleaning available immediately?`
  },
  {
    title: '3. Service Areas',
    content: `Commercial cleaning, specialist services, facilities support, housekeeping, domestic cleaning, maintenance & support, event & venue cleaning.\n\nTarget properties: offices, schools, residential, commercial.`
  },
  {
    title: '4. Location',
    content: `Central London based. Need to clarify specific boroughs served.`
  },
  {
    title: '5. Content',
    content: `Blog topics: commercial cleaning, school cleaning, residential cleaning.\n\nWebsite should have clear service pages, contact forms, and professional imagery.\n\nAll forms need contact preference options (email, WhatsApp, phone call).`
  },
  {
    title: '6. Branding',
    content: `Ask about preferred brand colours and font preferences — or whether he's happy for BSK to choose.\n\nCurrent site tagline: "Simply Clean Perfectly Managed" and "Quality You Can Trust".`
  },
  {
    title: '7. Domain & Timeline',
    content: `Domain: servoro.co.uk — confirm registration status and access details.\n\nLaunch target: by May 2025.`
  },
  {
    title: '8. Next Steps',
    content: `Send discovery form. Clarify positioning approach (cleaning-only vs building services). Confirm domain status. Begin sitemap and wireframes once form is returned.`
  },
]

/* ─────────────────────────────────────────────
   PASSWORD GATE
   ───────────────────────────────────────────── */

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'BSK2025') {
      onUnlock()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
            <Lock className="w-7 h-7 text-brand-gold" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Client Discovery Form</h1>
          <p className="text-neutral-400 text-sm">Servoro — Website Project</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          animate={shaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-8"
        >
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent mb-6 -mt-4" />

          <label className="block text-sm text-neutral-300 mb-2">Enter access password</label>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            placeholder="Password"
            className={`w-full px-4 py-3.5 bg-neutral-900 border rounded-xl text-white placeholder:text-neutral-600 text-base focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all ${
              error ? 'border-red-500' : 'border-neutral-700'
            }`}
            autoFocus
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mt-2"
            >
              Incorrect password. Please try again.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full mt-4 px-6 py-3.5 bg-brand-gold text-black font-semibold rounded-xl hover:bg-white transition-colors shadow-brand-cta"
          >
            Access Form
          </button>
        </motion.form>

        <p className="text-center text-neutral-600 text-xs mt-6">
          Prepared by Business Sorted Kent
        </p>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PROGRESS BAR
   ───────────────────────────────────────────── */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-neutral-400">
          Section {current + 1} of {total}
        </span>
        <span className="text-xs font-medium text-brand-gold">{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-gold/80 to-brand-gold"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PREFILLED FIELD (editable)
   ───────────────────────────────────────────── */

function PrefilledField({ field, value, onChange }: {
  field: FormField
  value: string
  onChange: (v: string) => void
}) {
  const [editing, setEditing] = useState(false)

  return (
    <div className="relative group">
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-200 mb-1.5">
        {field.label}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-semibold uppercase tracking-wider">
          <Check className="w-2.5 h-2.5" /> Pre-filled
        </span>
      </label>
      {field.helpText && (
        <p className="text-xs text-neutral-500 mb-2">{field.helpText}</p>
      )}

      {editing ? (
        <div className="relative">
          {field.type === 'textarea' ? (
            <textarea
              value={value}
              onChange={e => onChange(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-neutral-900 border border-brand-gold/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all resize-y"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900 border border-brand-gold/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
              autoFocus
            />
          )}
          <button
            onClick={() => setEditing(false)}
            className="absolute top-3 right-3 text-xs text-brand-gold hover:text-white transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <div
          className="relative px-4 py-3 bg-brand-gold/5 border border-brand-gold/15 rounded-xl cursor-pointer hover:border-brand-gold/30 transition-all"
          onClick={() => setEditing(true)}
        >
          <p className="text-sm text-white pr-16 whitespace-pre-wrap">{value}</p>
          <button className="absolute top-3 right-3 flex items-center gap-1 text-xs text-brand-gold hover:text-white transition-colors">
            <Edit3 className="w-3 h-3" /> Edit
          </button>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   FORM FIELD INPUT
   ───────────────────────────────────────────── */

function FormFieldInput({ field, value, onChange }: {
  field: FormField
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-200 mb-1.5">
        {field.label}
      </label>
      {field.helpText && (
        <p className="text-xs text-neutral-500 mb-2">{field.helpText}</p>
      )}

      {field.type === 'textarea' && (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          placeholder={field.placeholder}
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all resize-y"
        />
      )}

      {field.type === 'text' && (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
        />
      )}

      {field.type === 'select' && (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all appearance-none"
        >
          <option value="">Select an option...</option>
          {field.options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {field.type === 'radio' && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                value === opt
                  ? 'bg-brand-gold/15 border-brand-gold/40 text-brand-gold'
                  : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300'
              }`}
            >
              {value === opt && <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
              {opt}
            </button>
          ))}
        </div>
      )}

      {field.type === 'checkbox' && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map(opt => {
            const selected = value ? value.split(', ') : []
            const isChecked = selected.includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  const next = isChecked
                    ? selected.filter(s => s !== opt)
                    : [...selected, opt]
                  onChange(next.join(', '))
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  isChecked
                    ? 'bg-brand-gold/15 border-brand-gold/40 text-brand-gold'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                {opt}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SECTION RENDERER
   ───────────────────────────────────────────── */

function SectionRenderer({ section, values, onChange }: {
  section: FormSection
  values: Record<string, string>
  onChange: (fieldId: string, value: string) => void
}) {
  const Icon = section.icon

  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-gold" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{section.title}</h2>
          <p className="text-sm text-neutral-400 mt-0.5">{section.subtitle}</p>
        </div>
      </div>

      {section.infoNote && (
        <div className="mb-6 px-4 py-3 bg-brand-gold/5 border border-brand-gold/15 rounded-xl">
          <p className="text-sm text-brand-gold/80">{section.infoNote}</p>
        </div>
      )}

      <div className="space-y-5">
        {section.fields.map(field => (
          field.prefilled && field.type !== 'radio' && field.type !== 'select' && field.type !== 'checkbox' ? (
            <PrefilledField
              key={field.id}
              field={field}
              value={values[field.id] ?? field.prefilled}
              onChange={v => onChange(field.id, v)}
            />
          ) : (
            <FormFieldInput
              key={field.id}
              field={field}
              value={values[field.id] ?? field.prefilled ?? ''}
              onChange={v => onChange(field.id, v)}
            />
          )
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MEETING NOTES PANEL
   ───────────────────────────────────────────── */

function MeetingNotesPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-neutral-800 z-50 overflow-y-auto lg:relative lg:z-auto lg:border-l-0"
          >
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-neutral-800 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-gold" />
                <h3 className="text-sm font-semibold text-white">Meeting Notes</h3>
              </div>
              <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white lg:hidden">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {MEETING_NOTES.map((note, i) => (
                <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-brand-gold mb-2">{note.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-line">{note.content}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────
   COMPLETION SCREEN
   ───────────────────────────────────────────── */

function CompletionScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 10 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-green-400" />
      </motion.div>

      <h2 className="text-2xl font-semibold text-white mb-3">Discovery Form Complete</h2>
      <p className="text-neutral-400 max-w-md mx-auto mb-8">
        Thank you for taking the time to complete this. Your responses have been recorded and our team will begin work on your website project.
      </p>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-xl hover:bg-neutral-700 transition-colors"
        >
          Review Responses
        </button>
      </div>

      <p className="text-neutral-600 text-xs mt-8">
        Business Sorted Kent — We&apos;ll be in touch shortly
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

export default function DiscoveryClient() {
  const STORAGE_KEY = 'discovery-servoro-submitted'

  const [unlocked, setUnlocked] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [visited, setVisited] = useState<Set<number>>(new Set([0]))
  const [showNotes, setShowNotes] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const submitted = localStorage.getItem(STORAGE_KEY)
      if (submitted) {
        setUnlocked(true)
        setCompleted(true)
      }
    } catch {}
  }, [])

  useEffect(() => {
    const initial: Record<string, string> = {}
    SECTIONS.forEach(section => {
      section.fields.forEach(field => {
        if (field.prefilled) {
          initial[field.id] = field.prefilled
        }
      })
    })
    setFormData(prev => ({ ...initial, ...prev }))
  }, [])

  const handleFieldChange = useCallback((fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
  }, [])

  const goToSection = useCallback((i: number) => {
    setCurrentSection(i)
    setVisited(prev => new Set([...prev, i]))
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 })
    }
  }, [])

  const submitForm = useCallback(async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const fieldSummary = Object.entries(formData).filter(([, v]) => v && v.trim()).slice(0, 10).map(([k, v]) => `${k}: ${v}`).join('\n')
      const [res] = await Promise.all([
        fetch('/api/discovery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientSlug: 'servoro',
            formData,
            completedAt: new Date().toISOString(),
          }),
        }),
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: '31fb5677-3e73-4a83-abc3-4c668ba876df',
            subject: 'Discovery Form Submitted: Servoro',
            from_name: 'Business Sorted Kent',
            Client: 'Servoro',
            'Fields Completed': String(Object.keys(formData).length),
            'Sample Fields': fieldSummary,
          }),
        }).catch(() => new Response('{}', { status: 200 })),
      ])
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed')
      }
      try { localStorage.setItem(STORAGE_KEY, new Date().toISOString()) } catch {}
      setCompleted(true)
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [formData])

  const nextSection = useCallback(() => {
    if (currentSection < SECTIONS.length - 1) {
      goToSection(currentSection + 1)
    } else {
      submitForm()
    }
  }, [currentSection, goToSection, submitForm])

  const prevSection = useCallback(() => {
    if (currentSection > 0) {
      goToSection(currentSection - 1)
    }
  }, [currentSection, goToSection])


  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black overflow-auto">
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </div>
    )
  }

  if (completed) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black overflow-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <CompletionScreen onBack={() => { setCompleted(false); setCurrentSection(SECTIONS.length - 1) }} />
        </div>
      </div>
    )
  }

  return (
    <div ref={scrollRef} className="fixed inset-0 z-[9999] bg-black overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Business Sorted Kent" className="h-8 w-auto" />
              <div>
                <h1 className="text-lg font-semibold text-white">Servoro</h1>
                <p className="text-xs text-neutral-500">Discovery Form — Website Project</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  showNotes
                    ? 'bg-brand-gold/15 border-brand-gold/30 text-brand-gold'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Meeting Notes</span>
              </button>
            </div>
          </div>

          <ProgressBar current={currentSection} total={SECTIONS.length} />
        </div>
      </header>

      {/* Body */}
      <div className="flex">
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {currentSection === 0 && (
            <div className="mb-8 px-5 py-4 bg-brand-gold/5 border border-brand-gold/15 rounded-xl">
              <p className="text-sm text-brand-gold/90 font-medium mb-1">Welcome to your discovery form</p>
              <p className="text-sm text-neutral-400">Include as much or as little information as you can. The more you provide, the better Business Sorted Kent can understand your business and build a website that truly represents you.</p>
            </div>
          )}
          <AnimatePresence mode="wait">
            <SectionRenderer
              section={SECTIONS[currentSection]}
              values={formData}
              onChange={handleFieldChange}
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800">
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-neutral-900 border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={nextSection}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand-gold text-black hover:bg-white transition-colors shadow-brand-cta disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {currentSection === SECTIONS.length - 1 ? (
                submitting ? (
                  <>
                    Submitting...
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Send className="w-4 h-4" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    Submit
                    <Send className="w-4 h-4" />
                  </>
                )
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400"
            >
              {submitError}
            </motion.div>
          )}
        </main>

        {/* Meeting Notes - Desktop sidebar */}
        <div className="hidden lg:block">
          <AnimatePresence>
            {showNotes && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 380, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-l border-neutral-800 overflow-y-auto h-[calc(100vh-140px)] sticky top-[140px]"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-brand-gold" />
                    <h3 className="text-sm font-semibold text-white">Meeting Notes</h3>
                  </div>
                  {MEETING_NOTES.map((note, i) => (
                    <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                      <h4 className="text-xs font-semibold text-brand-gold mb-2">{note.title}</h4>
                      <p className="text-[11px] text-neutral-400 leading-relaxed whitespace-pre-line">{note.content}</p>
                    </div>
                  ))}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Meeting Notes - Mobile panel */}
      <div className="lg:hidden">
        <MeetingNotesPanel isOpen={showNotes} onClose={() => setShowNotes(false)} />
      </div>
    </div>
  )
}
