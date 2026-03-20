'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock, ChevronRight, ChevronLeft, Check, Building2, Palette,
  Package, Users, ShieldCheck, Globe, BarChart3, Camera, Clock,
  FileText, CheckCircle2, Edit3, X, Menu, Sparkles, Send
} from 'lucide-react'

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

type FieldType = 'text' | 'textarea' | 'select' | 'radio' | 'file'

interface FormField {
  id: string
  label: string
  type: FieldType
  prefilled?: string
  placeholder?: string
  options?: string[]
  helpText?: string
  required?: boolean
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
      { id: 'companyName', label: 'Full Company Name', type: 'text', prefilled: 'Scalderhurst Ltd' },
      { id: 'registeredAddress', label: 'Registered Address', type: 'text', prefilled: 'Little Chart, Ashford, Kent, United Kingdom' },
      { id: 'description', label: 'One-Sentence Description', type: 'textarea', prefilled: 'A UK-based paper merchant and converter supplying paper, board, and bespoke cutting services to packaging and print industries.' },
      { id: 'coreServices', label: 'Core Services / Products', type: 'textarea', prefilled: 'Paper and board supply (reels and sheets)\nPaper conversion (cutting, resizing, bespoke formats)\nStockholding and distribution\nFolding box board supply (including exclusive distribution agreements)' },
      { id: 'differentiators', label: 'What Makes You Different', type: 'textarea', prefilled: 'Large stockholding (7,500–10,000 tonnes)\nAbility to convert paper to bespoke sizes quickly\nLong-established (50+ years)\nExclusive UK/Ireland distribution partnerships (recent 2025 deal)' },
      { id: 'founded', label: 'Year Founded', type: 'text', prefilled: '1973' },
      { id: 'familyBusiness', label: 'Family Business / History', type: 'textarea', prefilled: 'Yes, multi-generation family business (now third generation). Built from paper trading into large-scale stockholding and conversion operation.' },
      { id: 'businessGoals', label: 'Key Business Goals (next 12 months)', type: 'textarea', placeholder: 'What are the most important business objectives you\'re working towards?', required: true },
      { id: 'artinovaRole', label: 'Artinova / Antinova — Please Clarify', type: 'textarea', placeholder: 'What is the role of Artinova/Antinova? (e.g. agents, partner brand, product line)', required: true, helpText: 'This came up in our meeting — we need to understand this relationship to position it correctly on the website.' },
    ]
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    subtitle: 'Help us understand your visual identity and brand direction',
    icon: Palette,
    infoNote: 'Strong branding builds trust with buyers. Even if you don\'t have formal guidelines, your preferences here will shape the website\'s look and feel.',
    fields: [
      { id: 'currentTone', label: 'Current Brand Perception (our assessment)', type: 'textarea', prefilled: 'Currently basic / outdated. Recommended direction: Clean + premium + industrial credibility + strong product clarity.' },
      { id: 'brandGuidelines', label: 'Do you have formal brand guidelines?', type: 'radio', options: ['Yes', 'No', 'Partially — some elements exist'], required: true },
      { id: 'guidelinesDetail', label: 'If yes, please describe what\'s available', type: 'textarea', placeholder: 'e.g. colour palette, fonts, logo usage rules, tone of voice document...' },
      { id: 'logoFiles', label: 'Do you have vector logo files? (SVG, AI, EPS)', type: 'radio', options: ['Yes', 'No', 'Not sure'], required: true, helpText: 'Vector files are essential for sharp rendering at any size. If you only have a JPG/PNG, we\'ll need to vectorise your logo.' },
      { id: 'preferredTone', label: 'How do you want to be perceived?', type: 'select', options: ['Corporate & Professional', 'Technical & Authoritative', 'Approachable & Friendly', 'Premium & Exclusive', 'Industrial & Reliable', 'Other — describe below'], required: true },
      { id: 'brandColors', label: 'Brand Colours', type: 'text', placeholder: 'Hex codes, Pantone references, or descriptions (e.g. "navy blue and silver")' },
      { id: 'toneNotes', label: 'Any other branding notes or preferences?', type: 'textarea', placeholder: 'Anything else about how you\'d like the brand to come across...' },
    ]
  },
  {
    id: 'products-services',
    title: 'Products & Services',
    subtitle: 'Detail your full offering so we can showcase it effectively',
    icon: Package,
    infoNote: 'The more detail you provide here, the better we can structure your product pages and write compelling copy. Technical accuracy matters for your buyers.',
    fields: [
      { id: 'boardTypes', label: 'Types of Board Supplied', type: 'textarea', prefilled: 'Folding box board (GC1 / GC2 confirmed via partnership)\nPaper and board in reels and sheets' },
      { id: 'conversionServices', label: 'Conversion Services', type: 'textarea', prefilled: 'Cutting reels into sheets\nBespoke sizing\nPaper conversion services' },
      { id: 'warehousingCapacity', label: 'Warehousing Capacity', type: 'textarea', prefilled: 'Large-scale stockholding (7,500–10,000 tonnes)\nPrimary site: Kent' },
      { id: 'fullProductList', label: 'Full Product Catalogue', type: 'textarea', placeholder: 'Please list all product types/categories you supply — be as detailed as possible', required: true },
      { id: 'productUSPs', label: 'Unique Selling Points Per Product', type: 'textarea', placeholder: 'For each product category, what makes your offering stand out?', required: true },
      { id: 'primingExplanation', label: 'The "Priming" Process — Please Explain', type: 'textarea', placeholder: 'We\'d like to feature this on the website. How does the priming process work? What are the benefits?', required: true, helpText: 'This is a key differentiator we want to highlight.' },
      { id: 'machineryDetails', label: 'Machinery & Equipment', type: 'textarea', placeholder: 'What machinery do you use for conversion? (names, capabilities, capacity)' },
      { id: 'capacityScale', label: 'Conversion Capacity & Turnaround', type: 'textarea', placeholder: 'Volume capacity, typical turnaround times, minimum/maximum order sizes' },
      { id: 'boardOneInfo', label: 'Board One — Exclusivity Details', type: 'textarea', placeholder: 'Please provide details about Board One and the exclusivity arrangement', required: true },
    ]
  },
  {
    id: 'industries-customers',
    title: 'Industries & Customers',
    subtitle: 'Who you serve and how — this shapes the entire website messaging',
    icon: Users,
    fields: [
      { id: 'primaryIndustries', label: 'Primary Industries Served', type: 'textarea', prefilled: 'Packaging\nPrinting' },
      { id: 'foodPackaging', label: 'Food Packaging', type: 'textarea', prefilled: 'Likely served via folding box board (used in cartons, takeaway packaging, etc.)' },
      { id: 'idealCustomers', label: 'Ideal Customer Types', type: 'textarea', prefilled: 'Packaging manufacturers\nPrinters\nTrade resellers\nIndustrial buyers requiring bulk paper/board' },
      { id: 'keyClients', label: 'Key Clients or Brands', type: 'textarea', placeholder: 'Names of notable clients we could feature (with permission) as social proof', helpText: 'Even anonymous examples help — e.g. "a major UK fast food chain"' },
      { id: 'caseStudies', label: 'Case Studies Available?', type: 'textarea', placeholder: 'Do you have any success stories, testimonials, or projects we can feature?' },
      { id: 'industriesBreakdown', label: 'Detailed Industry Breakdown', type: 'textarea', placeholder: 'Break down the industries you serve with approximate % of business each represents', required: true },
      { id: 'foodPackagingExamples', label: 'Food Packaging Examples', type: 'textarea', placeholder: 'Specific examples — e.g. KFC-style popcorn chicken boxes, bakery cartons, etc.', required: true, helpText: 'Food packaging is a strong proof point. Specific examples make your website more convincing.' },
    ]
  },
  {
    id: 'certifications-resources',
    title: 'Certifications & Resources',
    subtitle: 'Certifications and technical documents build credibility and boost SEO',
    icon: ShieldCheck,
    infoNote: 'B2B buyers specifically look for certifications and technical specs. These are also excellent for search engine rankings.',
    fields: [
      { id: 'fscCertified', label: 'Are you FSC certified?', type: 'radio', options: ['Yes', 'No', 'In progress'], required: true },
      { id: 'pefcCertified', label: 'Are you PEFC certified?', type: 'radio', options: ['Yes', 'No', 'In progress'], required: true },
      { id: 'otherCertifications', label: 'Other Certifications or Compliance', type: 'textarea', placeholder: 'ISO standards, environmental certifications, food safety, etc.' },
      { id: 'specSheets', label: 'Do you have product spec sheets or data sheets?', type: 'radio', options: ['Yes — ready to share', 'Yes — need updating', 'No — need creating', 'Not sure'], required: true },
      { id: 'specSheetsDetail', label: 'Spec Sheet Details', type: 'textarea', placeholder: 'What format are they in? How many products do they cover? Can you share them with us?' },
      { id: 'technicalDocs', label: 'Other Technical Documentation', type: 'textarea', placeholder: 'Any other downloadable resources (product guides, compliance docs, brochures)?' },
    ]
  },
  {
    id: 'website-content',
    title: 'Website & Content',
    subtitle: 'Structure, messaging, and the content that will bring it to life',
    icon: Globe,
    fields: [
      { id: 'currentStructure', label: 'Current Website Structure', type: 'textarea', prefilled: 'Home\nAbout\nProducts/services (limited detail)\nContact' },
      { id: 'recommendedStructure', label: 'Our Recommended Structure (SEO-led)', type: 'textarea', prefilled: '1. Home — value proposition, certifications, services, trust signals\n2. Board & Packaging — core offering, types, food packaging, priming\n3. Conversion — capabilities, machinery, applications\n4. Warehousing & Logistics — storage, distribution, HGV access\n5. Industries — food packaging (hero), retail, other sectors\n6. Technical / Resources — data sheets, spec sheets, downloads\n7. About — family story, history, certifications\n8. Contact — enquiry form, locations, HGV directions' },
      { id: 'competitors', label: 'Competitors & Inspiration', type: 'textarea', prefilled: 'Colombier Paper → clean, premium, editorial feel\nVarsity Packaging → structured, commercial\nChapelton Board → industrial + technical clarity' },
      { id: 'structureApproval', label: 'Do you approve the recommended structure?', type: 'radio', options: ['Yes — looks great', 'Yes — with some changes', 'No — I\'d prefer something different'], required: true },
      { id: 'structureChanges', label: 'Structure Changes / Additions', type: 'textarea', placeholder: 'What would you change, add, or remove from the recommended structure?' },
      { id: 'keyMessages', label: 'Top 3 Messages for Website Visitors', type: 'textarea', placeholder: 'What are the 3 most important things a visitor should understand about your business?', required: true },
      { id: 'existingContent', label: 'Existing Content to Repurpose', type: 'textarea', placeholder: 'Brochures, PDFs, old website copy, presentations — anything we can use as a starting point' },
    ]
  },
  {
    id: 'marketing-seo',
    title: 'Marketing & SEO',
    subtitle: 'Your digital visibility strategy starts here',
    icon: BarChart3,
    fields: [
      { id: 'domain', label: 'Domain Name', type: 'text', prefilled: 'scalderhurst.co.uk' },
      { id: 'inferredKeywords', label: 'Suggested Target Keywords', type: 'textarea', prefilled: 'Paper merchant UK\nPaper converter UK\nFolding box board supplier\nBespoke paper cutting\nBulk paper supplier' },
      { id: 'targetLocations', label: 'Target Locations', type: 'textarea', prefilled: 'UK\nIreland\nNorthern Europe\nGlobal export' },
      { id: 'targetKeywords', label: 'Your Target Keywords', type: 'textarea', placeholder: 'What words or phrases would your ideal customers type into Google to find you?', required: true },
      { id: 'targetMarketsPriority', label: 'Market Priority Ranking', type: 'textarea', placeholder: 'Rank your target markets in order of priority (e.g. 1. UK, 2. Ireland, 3. Europe...)', required: true },
      { id: 'currentMarketing', label: 'Current Marketing Activity', type: 'textarea', placeholder: 'Trade shows, print advertising, digital campaigns, referrals, etc.' },
      { id: 'socialMedia', label: 'Social Media Accounts', type: 'textarea', placeholder: 'Which platforms are you on? Please share links if possible.' },
    ]
  },
  {
    id: 'media-photography',
    title: 'Photography & Media',
    subtitle: 'Great imagery transforms a website — let\'s plan what you need',
    icon: Camera,
    infoNote: 'Professional photography of your facility, products, and team can dramatically improve credibility. We can discuss options that work for your budget.',
    fields: [
      { id: 'existingPhotos', label: 'Do you have professional photography?', type: 'radio', options: ['Yes — facility, products, and team', 'Some — but needs updating', 'No — nothing suitable'], required: true },
      { id: 'photosDetail', label: 'Photo Details', type: 'textarea', placeholder: 'What photos do you have? (facility shots, product images, team photos, machinery, warehouse, etc.)' },
      { id: 'photoPreference', label: 'Photography Preference', type: 'radio', options: ['We\'ll supply our own photos', 'Arrange a professional shoot', 'Mix of both'], required: true },
      { id: 'videoContent', label: 'Do you have video content?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'videoInterest', label: 'Interested in video for the website?', type: 'radio', options: ['Yes — definitely', 'Maybe — tell me more', 'No — not right now'] },
      { id: 'teamPhotos', label: 'Team photos on the website?', type: 'radio', options: ['Yes — individual and/or group', 'Maybe — need to discuss', 'No — prefer not to'] },
    ]
  },
  {
    id: 'timeline-legal',
    title: 'Timeline, Hosting & Legal',
    subtitle: 'Final details to get the project moving',
    icon: Clock,
    fields: [
      { id: 'targetLaunch', label: 'Target Launch Date', type: 'text', prefilled: '1st May 2025' },
      { id: 'currentHosting', label: 'Current Hosting', type: 'text', prefilled: 'GoDaddy (~£500/year)' },
      { id: 'decisionMaker', label: 'Primary Decision Maker', type: 'text', placeholder: 'Name and role of the person signing off on the website', required: true },
      { id: 'approvalProcess', label: 'Approval Process', type: 'textarea', placeholder: 'How do decisions get made? Single sign-off, committee, multiple stakeholders?' },
      { id: 'timelineConfirm', label: 'Can you meet the 1st May launch target?', type: 'radio', options: ['Yes — let\'s do it', 'Tight — but we\'ll try', 'Need more time', 'Prefer earlier'], required: true },
      { id: 'hostingAccess', label: 'Do you have access to your hosting account?', type: 'radio', options: ['Yes', 'No', 'Not sure'], required: true },
      { id: 'domainAccess', label: 'Do you have access to your domain registrar?', type: 'radio', options: ['Yes', 'No', 'Not sure'], required: true },
      { id: 'hostingPreference', label: 'Would you like us to manage hosting?', type: 'radio', options: ['Yes — manage everything', 'No — we\'ll handle it', 'Let\'s discuss'], required: true, helpText: 'We offer managed hosting at £20/month — faster, more secure, and we handle all maintenance.' },
      { id: 'privacyPolicy', label: 'Do you have a privacy policy?', type: 'radio', options: ['Yes — up to date', 'Yes — needs updating', 'No'], required: true },
      { id: 'cookieCompliance', label: 'Cookie compliance in place?', type: 'radio', options: ['Yes', 'No', 'Not sure'], required: true },
      { id: 'otherLegal', label: 'Other Legal / Compliance Requirements', type: 'textarea', placeholder: 'Anything else we should know — industry regulations, data handling, etc.' },
    ]
  },
]

/* ─────────────────────────────────────────────
   MEETING NOTES DATA
   ───────────────────────────────────────────── */

const MEETING_NOTES = [
  {
    title: '1. Key Positioning',
    content: `Board & packaging specialists who add value through "priming" raw paper/board. Strong in food packaging (e.g. KFC-style popcorn chicken boxes). Operate globally with emphasis on UK & Ireland.\n\nHighlights: FSC & PEFC certification, family business heritage, warehousing capability, Board One exclusivity.\n\nAction: Confirm role of Artinova / Antinova.`
  },
  {
    title: '2. Competitor Direction',
    content: `Likes: Colombier Paper (clean, premium, editorial), Varsity Packaging (structured, commercial), Chapelton Board (industrial + technical clarity).\n\nDirection: Clean + premium + industrial credibility + strong product clarity.`
  },
  {
    title: '3. Website Structure',
    content: `Client suggested: Board & Packaging, Conversion, Other Services (Warehousing).\n\nSEO-refined: Home, Board & Packaging, Conversion, Warehousing & Logistics, Industries, Technical/Resources, About, Contact.\n\nRecommend: Reframe "Other Services" → Warehousing & Logistics for SEO.`
  },
  {
    title: '4. Key Features',
    content: `Admin login area (analytics dashboard), downloadable spec/data sheets, SEO-ready structure, mobile optimised, fast load speed.\n\nClear HGV directions (written, map, downloadable). Protected admin analytics page.`
  },
  {
    title: '5. Branding & Assets',
    content: `Logo needs vectorising (critical for print, scaling, consistency).\n\nPhotography: Option 1 — client supplies. Option 2 — professional shoot (likely better for quality + consistency).`
  },
  {
    title: '6. SEO Plan',
    content: `Client to provide: keywords, services, locations, customer types via this discovery form.\n\nStrategy: Focus UK & Ireland initially. Build pages around packaging types, industries, materials. Spec sheets = SEO gold.`
  },
  {
    title: '7. Hosting & Costs',
    content: `Current: GoDaddy (~£500/year).\nNew: £20/month hosting, £200/month SEO (min 4 months).`
  },
  {
    title: '8. Timeline',
    content: `Target launch: 1st May.\nAchievable if discovery form returned quickly and assets supplied early.`
  },
  {
    title: '9. Next Steps',
    content: `Send confirmation email and this discovery form. Clarify Artinova/Antinova. Confirm logo file format. Photography preference. Begin sitemap approval and wireframes.`
  },
  {
    title: '10. Strategic Notes',
    content: `Push food packaging more prominently (strong proof points). Lean into certifications, scale, and reliability. Reframe "Other Services" → Warehousing & Logistics.`
  },
]

/* ─────────────────────────────────────────────
   PASSWORD GATE
   ───────────────────────────────────────────── */

const ACCESS_PASSWORD = 'BSK2025'

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ACCESS_PASSWORD) {
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
          <p className="text-neutral-400 text-sm">Scalderhurst Ltd — Website Project</p>
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
   STEP INDICATORS
   ───────────────────────────────────────────── */

function StepIndicators({ sections, current, visited, onJump }: {
  sections: FormSection[]
  current: number
  visited: Set<number>
  onJump: (i: number) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sections.map((s, i) => {
        const Icon = s.icon
        const isCurrent = i === current
        const isVisited = visited.has(i)
        return (
          <button
            key={s.id}
            onClick={() => onJump(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isCurrent
                ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
                : isVisited
                ? 'bg-neutral-800/50 text-neutral-300 border border-neutral-700 hover:border-neutral-600'
                : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {isVisited && !isCurrent ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Icon className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">{s.title}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        )
      })}
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
            className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-white"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="relative px-4 py-3 bg-neutral-900/50 border-l-2 border-brand-gold/40 rounded-r-xl text-sm text-neutral-300 whitespace-pre-line cursor-pointer group-hover:bg-neutral-800/50 transition-colors"
        >
          {value}
          <button className="absolute top-2 right-2 p-1 text-neutral-600 group-hover:text-brand-gold transition-colors">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   FORM FIELD (empty / to fill)
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
        {field.required && <span className="text-brand-gold text-xs">Required</span>}
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
          field.prefilled ? (
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
              value={values[field.id] ?? ''}
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
          {/* Mobile overlay */}
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
  const STORAGE_KEY = 'discovery-scalderhurst-submitted'

  const [unlocked, setUnlocked] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [visited, setVisited] = useState<Set<number>>(new Set([0]))
  const [showNotes, setShowNotes] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Check if already submitted on mount
  useEffect(() => {
    try {
      const submitted = localStorage.getItem(STORAGE_KEY)
      if (submitted) {
        setUnlocked(true)
        setCompleted(true)
      }
    } catch {}
  }, [])

  // Initialise pre-filled values
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
  }, [])

  const submitForm = useCallback(async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientSlug: 'scalderhurst',
          formData,
          completedAt: new Date().toISOString(),
        }),
      })
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

  // Count filled required fields for current section
  const currentSectionFields = SECTIONS[currentSection]?.fields ?? []
  const requiredFields = currentSectionFields.filter(f => f.required && !f.prefilled)
  const filledRequired = requiredFields.filter(f => formData[f.id]?.trim())

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
    <div className="fixed inset-0 z-[9999] bg-black overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-semibold text-white">Scalderhurst Ltd</h1>
              <p className="text-xs text-neutral-500">Discovery Form — Website Project</p>
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

          <div className="mt-3">
            <StepIndicators
              sections={SECTIONS}
              current={currentSection}
              visited={visited}
              onJump={goToSection}
            />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex">
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <AnimatePresence mode="wait">
            <SectionRenderer
              section={SECTIONS[currentSection]}
              values={formData}
              onChange={handleFieldChange}
            />
          </AnimatePresence>

          {/* Section progress hint */}
          {requiredFields.length > 0 && (
            <div className="mt-6 text-xs text-neutral-500">
              {filledRequired.length} of {requiredFields.length} required fields completed in this section
            </div>
          )}

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
