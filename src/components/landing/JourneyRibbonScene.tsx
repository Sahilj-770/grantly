import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import {
  Compass,
  FileCheck2,
  Send,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Find Relevant Opportunities',
    description: 'Pinpoint verified scholarships matching your academic level, state, income bracket, and course of study from our national database.',
    icon: Compass,
    color: '#2563EB',
    tag: 'Profile Matching'
  },
  {
    step: '02',
    title: 'CHECK',
    subtitle: 'Audit Eligibility Criteria',
    description: 'Deterministic gap analysis: instantly see which requirements you meet, which are missing, and your calculated qualification percentage.',
    icon: FileCheck2,
    color: '#0D9488',
    tag: 'Gap Analysis'
  },
  {
    step: '03',
    title: 'APPLY',
    subtitle: 'Prepare & Submit Dossier',
    description: 'Assemble required documents with one click using the encrypted Document Vault, format your essays, and submit before deadlines.',
    icon: Send,
    color: '#D97706',
    tag: 'Vault Integration'
  },
  {
    step: '04',
    title: 'PROGRESS',
    subtitle: 'Track Milestones to Award',
    description: 'Follow every stage from document verification to interview rounds and direct benefit disbursement on a visual Kanban tracker.',
    icon: TrendingUp,
    color: '#7C3AED',
    tag: 'Disbursement Tracking'
  }
]

export function JourneyRibbonScene() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)

    return () => {
      window.removeEventListener('resize', checkMobile)
      mq.removeEventListener('change', handler)
    }
  }, [])

  // WebGL 3D Ribbon implementation on Desktop
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let animId: number
    let isVisible = true
    let width = container.clientWidth
    let height = 480

    // Three.js Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 14)

    // Curved Spline Path
    const curvePoints = [
      new THREE.Vector3(-9, -2.5, -4),
      new THREE.Vector3(-4.5, 1.5, -1),
      new THREE.Vector3(0, -0.5, 1),
      new THREE.Vector3(4.5, 2.0, -1),
      new THREE.Vector3(9, -1.5, -4)
    ]
    const spline = new THREE.CatmullRomCurve3(curvePoints)

    // Create 3D step placards as CanvasTextures
    const stepMeshes: THREE.Mesh[] = []
    const textures: THREE.CanvasTexture[] = []
    const geometries: THREE.BufferGeometry[] = []
    const materials: THREE.Material[] = []

    JOURNEY_STEPS.forEach((item, index) => {
      const texCanvas = document.createElement('canvas')
      texCanvas.width = 512
      texCanvas.height = 300
      const ctx = texCanvas.getContext('2d')
      if (ctx) {
        // Card Background
        ctx.fillStyle = '#FFFFFF'
        ctx.roundRect ? ctx.roundRect(0, 0, 512, 300, 24) : ctx.rect(0, 0, 512, 300)
        ctx.fill()

        // Border
        ctx.strokeStyle = '#CBD5E1'
        ctx.lineWidth = 4
        ctx.stroke()

        // Accent top bar
        ctx.fillStyle = item.color
        ctx.fillRect(0, 0, 512, 12)

        // Step number
        ctx.fillStyle = item.color
        ctx.font = 'bold 28px monospace'
        ctx.fillText(`STAGE ${item.step}`, 40, 60)

        // Title
        ctx.fillStyle = '#0A192F'
        ctx.font = 'bold 36px serif'
        ctx.fillText(item.title, 40, 115)

        // Subtitle
        ctx.fillStyle = '#2563EB'
        ctx.font = 'bold 22px sans-serif'
        ctx.fillText(item.subtitle, 40, 155)

        // Description
        ctx.fillStyle = '#475569'
        ctx.font = '18px sans-serif'
        ctx.fillText(item.description.slice(0, 48) + '...', 40, 210)
        ctx.fillText(item.description.slice(48, 96) + '...', 40, 240)
      }

      const texture = new THREE.CanvasTexture(texCanvas)
      textures.push(texture)

      const geom = new THREE.PlaneGeometry(3.6, 2.1)
      geometries.push(geom)

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      })
      materials.push(mat)

      const mesh = new THREE.Mesh(geom, mat)
      scene.add(mesh)
      stepMeshes.push(mesh)
    })

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    let scrollProgress = 0
    let targetScrollProgress = 0

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const total = window.innerHeight + rect.height
      const current = window.innerHeight - rect.top
      targetScrollProgress = Math.max(0, Math.min(1, current / total))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Render loop
    const animate = () => {
      if (isVisible) {
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.08

        // Position step cards along spline
        stepMeshes.forEach((mesh, idx) => {
          const baseT = idx / (JOURNEY_STEPS.length - 1)
          const offset = (scrollProgress - 0.5) * 0.3
          const t = Math.max(0.05, Math.min(0.95, baseT + offset))
          const pt = spline.getPoint(t)
          mesh.position.copy(pt)

          // Gentle rotation towards camera
          mesh.rotation.y = (t - 0.5) * -0.4
          mesh.rotation.x = Math.sin(t * Math.PI) * 0.1
        })

        renderer.render(scene, camera)
      }
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()

      // Comprehensive WebGL Resource Disposal
      stepMeshes.forEach((m) => scene.remove(m))
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      textures.forEach((t) => t.dispose())
      renderer.dispose()
    }
  }, [isMobile, prefersReducedMotion])

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#FBFBFA] border-t border-[#E2E8F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The End-to-End Method</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A192F]">
            How GRANTLY Works
          </h2>
          <p className="text-sm sm:text-lg text-[#475569] leading-relaxed">
            From initial discovery through gap analysis, document assembly, and final status tracking, experience a seamless path to funding.
          </p>
        </div>

        {/* Desktop WebGL Ribbon Canvas */}
        {!isMobile && !prefersReducedMotion && (
          <div className="relative w-full h-[480px] rounded-3xl bg-slate-50 border border-slate-200/80 shadow-inner flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#64748B] font-mono pointer-events-none">
              <span>01 DISCOVER</span>
              <span>02 CHECK</span>
              <span>03 APPLY</span>
              <span>04 PROGRESS</span>
            </div>
          </div>
        )}

        {/* Structured 4-Step Resolution Grid (Responsive on all devices & accessible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-[#0A192F]">
                      STAGE {step.step}
                    </span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#2563EB] mb-3">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                  <span>{step.tag}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
