import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { SCHOLARSHIPS_DATA } from '../../data/scholarshipsData'
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Building2,
  Calendar,
  Coins,
  CheckCircle2,
  Lock
} from 'lucide-react'

// Curated Educational Opportunities for the Curved Tile Reel
const HERO_OPPORTUNITY_TILES = [
  {
    id: 'sch-rhodes-2026',
    title: 'Rhodes Scholarship',
    institution: 'University of Oxford',
    grant: '£65,000 / yr',
    type: 'Full Tuition + Stipend',
    tag: 'Global Laureates',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    deadline: 'Oct 02',
    accent: '#2563EB'
  },
  {
    id: 'sch-pmrf-2026',
    title: 'PMRF Fellowship',
    institution: 'IIT & IISc Consortia',
    grant: '₹9.6 Lakhs / yr',
    type: 'Doctoral Stipend + Contingency',
    tag: 'Govt. of India',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    deadline: 'Nov 30',
    accent: '#0D9488'
  },
  {
    id: 'sch-gates-cambridge-2026',
    title: 'Gates Cambridge',
    institution: 'Cambridge University',
    grant: '£55,000 / yr',
    type: 'Full Cost of Study',
    tag: 'Gates Foundation',
    image: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&w=800&q=80',
    deadline: 'Dec 05',
    accent: '#D97706'
  },
  {
    id: 'sch-tata-2026',
    title: 'Tata Trusts Grant',
    institution: 'Accredited Universities',
    grant: '₹1.5 Lakhs / yr',
    type: 'Need-Based Tuition Aid',
    tag: 'Tata Education Trusts',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    deadline: 'Dec 15',
    accent: '#0D9488'
  },
  {
    id: 'sch-google-apac-2026',
    title: 'Google Generation',
    institution: 'APAC Universities',
    grant: '$2,500 USD',
    type: 'Tuition + Tech Mentorship',
    tag: 'Women in Tech',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    deadline: 'Dec 10',
    accent: '#4F46E5'
  },
  {
    id: 'sch-fulbright-nehru-2026',
    title: 'Fulbright-Nehru',
    institution: 'United States Universities',
    grant: '$80,000 / yr',
    type: 'Full J-1 Sponsorship',
    tag: 'USIEF Bilateral',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    deadline: 'Nov 25',
    accent: '#0891B2'
  },
  {
    id: 'sch-reliance-found-2026',
    title: 'Reliance Foundation',
    institution: 'Undergraduate Colleges',
    grant: '₹2.0 Lakhs grant',
    type: 'Merit-cum-Means Grant',
    tag: 'Reliance Foundation',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    deadline: 'Dec 20',
    accent: '#2563EB'
  },
  {
    id: 'sch-charpak-2026',
    title: 'Charpak Master’s',
    institution: 'French Higher Institutions',
    grant: '€14,000 / yr',
    type: 'Living Allowance + Visa Waiver',
    tag: 'Campus France',
    image: 'https://images.unsplash.com/photo-1507842229451-28b144c54f21?auto=format&fit=crop&w=800&q=80',
    deadline: 'Dec 18',
    accent: '#7C3AED'
  }
]

// 24-card continuous loop: 3x seamless repetition ensures zero gaps and smooth carousel physics
const TILES_LOOP = [...HERO_OPPORTUNITY_TILES, ...HERO_OPPORTUNITY_TILES, ...HERO_OPPORTUNITY_TILES].map(
  (item, idx) => ({
    ...item,
    uniqueIndex: idx
  })
)

const CARD_PITCH = 220
const TOTAL_PITCH = TILES_LOOP.length * CARD_PITCH

export function CurvedTileHero() {
  const { setCurrentView, quickOpenModal } = useStore()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])

  const [isMobile, setIsMobile] = useState(false)
  const [scaleUnit, setScaleUnit] = useState(1)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Physics state
  const stateRef = useRef({
    offset: 0,
    velocity: 0,
    isPointerDown: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    autoSpeed: 38 // smooth ambient speed (px/sec)
  })

  useEffect(() => {
    const checkViewport = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      setIsMobile(vw < 1024)
      const u = Math.min(vw / 1440, vh / 960)
      setScaleUnit(u)
      if (containerRef.current) {
        containerRef.current.style.setProperty('--u', `${u}px`)
      }
    }
    checkViewport()
    window.addEventListener('resize', checkViewport, { passive: true })

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)

    // Preload images into browser GPU cache
    HERO_OPPORTUNITY_TILES.forEach((item) => {
      const img = new Image()
      img.src = item.image
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {})
      }
    })

    return () => {
      window.removeEventListener('resize', checkViewport)
      mq.removeEventListener('change', handler)
    }
  }, [])

  // Mathematical cylindrical curved tile animation loop
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return

    let animId: number
    let prevTime = performance.now()
    let isVisible = true
    let isTabActive = !document.hidden

    const onVisibilityChange = () => {
      isTabActive = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    if (containerRef.current) observer.observe(containerRef.current)

    const loop = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.08)
      prevTime = now

      if (!isVisible || !isTabActive) {
        animId = requestAnimationFrame(loop)
        return
      }

      const state = stateRef.current

      if (!state.isPointerDown) {
        if (Math.abs(state.velocity) > 0.5) {
          // Coasting with smooth inertial friction
          state.offset += state.velocity * dt
          state.velocity *= Math.pow(0.06, dt)
        } else {
          // Ambient forward glide
          state.offset += state.autoSpeed * dt
        }
      }

      state.offset = ((state.offset % TOTAL_PITCH) + TOTAL_PITCH) % TOTAL_PITCH

      // Update positions of all cards along the mathematical cylindrical arc
      for (let i = 0; i < TILES_LOOP.length; i++) {
        const cardEl = cardRefs.current[i]
        const pathEl = pathRefs.current[i]
        if (!cardEl) continue

        // Offset from viewport horizontal center (720px in coordinate space)
        let rawT = ((i * CARD_PITCH - state.offset) % TOTAL_PITCH + TOTAL_PITCH) % TOTAL_PITCH
        if (rawT > TOTAL_PITCH / 2) {
          rawT -= TOTAL_PITCH
        }
        const t = rawT

        // Outward pushed center x with non-linear perspective curve
        const tNorm = t / 706
        const x = 720 + t * (1 + 0.078 * Math.pow(tNorm, 2))

        // Normalized distance from center
        const d = Math.min(Math.abs(x - 720) / 706, 1.45)

        // Card width expands slightly in focus
        const w = 205 + 50 * Math.pow(d, 2)
        const xLeft = x - w / 2
        const xRight = x + w / 2

        // Left & right edge heights creating cylindrical vertical perspective
        const qLeft = Math.min(Math.abs(xLeft - 720) / 706, 1.45)
        const qRight = Math.min(Math.abs(xRight - 720) / 706, 1.45)
        const hLeft = 285 + 90 * Math.pow(qLeft, 2.5)
        const hRight = 285 + 90 * Math.pow(qRight, 2.5)

        // Arc baseline center
        const yCenter = 490 - 16 * Math.pow(d, 2)

        const yTopLeft = yCenter - hLeft / 2
        const yBottomLeft = yCenter + hLeft / 2
        const yTopRight = yCenter - hRight / 2
        const yBottomRight = yCenter + hRight / 2

        const minTop = Math.min(yTopLeft, yTopRight)
        const maxBottom = Math.max(yBottomLeft, yBottomRight)
        const totalH = maxBottom - minTop

        // Relative coordinates for rounded quadrilateral path
        const pTL = { x: 0, y: yTopLeft - minTop }
        const pTR = { x: w, y: yTopRight - minTop }
        const pBR = { x: w, y: yBottomRight - minTop }
        const pBL = { x: 0, y: yBottomLeft - minTop }

        const r = 16
        const pathD = `
          M ${pTL.x + r} ${pTL.y}
          L ${pTR.x - r} ${pTR.y}
          Q ${pTR.x} ${pTR.y} ${pTR.x} ${pTR.y + r}
          L ${pBR.x} ${pBR.y - r}
          Q ${pBR.x} ${pBR.y} ${pBR.x - r} ${pBR.y}
          L ${pBL.x + r} ${pBL.y}
          Q ${pBL.x} ${pBL.y} ${pBL.x} ${pBL.y - r}
          L ${pTL.x} ${pTL.y + r}
          Q ${pTL.x} ${pTL.y} ${pTL.x + r} ${pTL.y}
          Z
        `
          .replace(/\s+/g, ' ')
          .trim()

        if (pathEl) {
          pathEl.setAttribute('d', pathD)
        }

        cardEl.style.transform = `translate3d(calc(${xLeft} * var(--u, 1px)), calc(${minTop} * var(--u, 1px)), 0)`
        cardEl.style.width = `calc(${w} * var(--u, 1px))`
        cardEl.style.height = `calc(${totalH} * var(--u, 1px))`

        // Depth culling & z-index
        const zIndex = Math.round(100 - d * 50)
        cardEl.style.zIndex = `${zIndex}`

        // Keep decoded GPU bitmaps in memory; hide only when far outside viewport
        if (x < -800 || x > 2400) {
          cardEl.style.visibility = 'hidden'
        } else {
          cardEl.style.visibility = 'visible'
        }
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [isMobile, prefersReducedMotion])

  // Mouse & Touch drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    const state = stateRef.current
    state.isPointerDown = true
    state.startX = e.clientX
    state.lastX = e.clientX
    state.lastTime = performance.now()
    state.velocity = 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const state = stateRef.current
    if (!state.isPointerDown) return
    const now = performance.now()
    const dt = (now - state.lastTime) / 1000
    const dx = e.clientX - state.lastX

    state.offset -= dx
    if (dt > 0.008) {
      state.velocity = -dx / dt
    }
    state.lastX = e.clientX
    state.lastTime = now
  }

  const handlePointerUp = () => {
    stateRef.current.isPointerDown = false
  }

  const handleStep = (direction: 'left' | 'right') => {
    const delta = direction === 'left' ? -CARD_PITCH * 1.5 : CARD_PITCH * 1.5
    stateRef.current.velocity = delta * 2.5
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] lg:min-h-[1020px] bg-[#FBFBFA] flex flex-col justify-between overflow-hidden pt-8 pb-14 select-none"
      aria-label="GRANTLY Signature Hero"
    >
      {/* Background Ambient Gradient & Pattern */}
      <div className="absolute inset-0 bg-radial from-[#F1F5F9]/80 via-transparent to-transparent pointer-events-none" />

      {/* Top Editorial Centerpiece */}
      <div className="relative z-20 max-w-5xl mx-auto text-center px-4 sm:px-6 pt-4 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A192F] text-white text-xs font-mono uppercase tracking-widest shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Institutional Scholarship Intelligence</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0A192F] leading-[1.06]">
          Your next opportunity <span className="italic font-normal text-[#2563EB]">starts here.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-[#334155] leading-relaxed">
          GRANTLY maps verified educational endowments, doctoral fellowships, and tuition grants directly to your
          academic standing. Find what you are eligible for, assemble verified documents, and apply with certainty.
        </p>

        {/* Primary CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setCurrentView('discovery')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#0A192F] text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-[#1E293B] shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#D97706] group-hover:rotate-45 transition-transform duration-300" />
            <span>Discover Scholarships</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('onboarding')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#0A192F] border border-[#CBD5E1] rounded-xl text-sm sm:text-base font-semibold hover:border-[#2563EB] hover:text-[#2563EB] shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Build My Profile</span>
            <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748B] font-medium pt-1">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>100% Institutional Gazettes</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-[#D97706]" />
            <span>Deterministic Match Scores</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
            <span>Zero Data Monetization</span>
          </span>
        </div>
      </div>

      {/* DESKTOP: Mathematical Cylindrical Curved Tile Animation */}
      {!isMobile && (
        <div
          className="relative w-full h-[540px] mt-6 overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Controls Overlay */}
          <div className="absolute top-4 right-8 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300 shadow-sm">
            <button
              onClick={() => handleStep('left')}
              className="p-1.5 text-slate-700 hover:text-[#2563EB] transition-colors cursor-pointer"
              aria-label="Previous opportunity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">Drag / Glide</span>
            <button
              onClick={() => handleStep('right')}
              className="p-1.5 text-slate-700 hover:text-[#2563EB] transition-colors cursor-pointer"
              aria-label="Next opportunity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cards Track */}
          <div className="relative w-[1440px] h-[720px] mx-auto pointer-events-none">
            {TILES_LOOP.map((tile, i) => (
              <div
                key={`${tile.id}-${tile.uniqueIndex}`}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                onClick={() => quickOpenModal(tile.id)}
                className="absolute top-0 left-0 will-change-transform pointer-events-auto cursor-pointer group"
                style={{ visibility: 'hidden' }}
              >
                {/* SVG Deformation Path Overlay & Clipping */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10">
                  <defs>
                    <clipPath id={`clip-${tile.uniqueIndex}`}>
                      <path
                        ref={(el) => {
                          pathRefs.current[i] = el
                        }}
                        fill="#FFFFFF"
                      />
                    </clipPath>
                  </defs>
                  <path
                    d=""
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                    className="group-hover:stroke-[#2563EB] transition-colors duration-200"
                  />
                </svg>

                {/* Inner Card Content Clipped by Parametric Arc */}
                <div
                  className="w-full h-full bg-white flex flex-col justify-between p-4 shadow-xl overflow-hidden relative"
                  style={{ clipPath: `url(#clip-${tile.uniqueIndex})` }}
                >
                  {/* Top Image Thumbnail */}
                  <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-100 mb-3 shrink-0">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-2 left-2.5 text-[10px] font-mono font-bold text-white px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
                      {tile.tag}
                    </span>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-1 flex-1">
                    <div className="text-[10px] font-mono text-[#2563EB] font-bold uppercase truncate">
                      {tile.institution}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#0A192F] line-clamp-1 leading-snug">
                      {tile.title}
                    </h3>
                    <div className="text-xs font-mono font-bold text-[#0D9488]">
                      {tile.grant}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>Due: {tile.deadline}</span>
                    <span className="text-[#2563EB] font-bold group-hover:underline">Inspect →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MOBILE: Clean Horizontal Snap Card Track */}
      {isMobile && (
        <div className="w-full px-4 mt-8">
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none">
            {HERO_OPPORTUNITY_TILES.map((tile) => (
              <div
                key={tile.id}
                onClick={() => quickOpenModal(tile.id)}
                className="min-w-[82vw] snap-center rounded-2xl bg-white border border-[#CBD5E1] p-5 shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100">
                  <img src={tile.image} alt={tile.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white px-2 py-0.5 rounded-full bg-black/50">
                    {tile.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-[#2563EB] font-bold">{tile.institution}</div>
                  <h3 className="font-serif text-lg font-bold text-[#0A192F]">{tile.title}</h3>
                  <div className="text-sm font-mono font-bold text-[#0D9488]">{tile.grant}</div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Deadline: {tile.deadline}</span>
                  <button className="text-[#2563EB] font-bold">Inspect Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
