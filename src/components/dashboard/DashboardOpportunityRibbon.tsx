import React, { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../../services/scholarshipStore'
import { Scholarship, EligibilityResult } from '../../types/scholarship'
import {
  Sparkles,
  ArrowRight,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface QualifiedMatch {
  scholarship: Scholarship
  eligibility: EligibilityResult | null
}

export function DashboardOpportunityRibbon() {
  const { scholarships, getEligibilityFor, quickOpenModal, profile } = useStore()
  const mountRef = useRef<HTMLDivElement | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  // Rank top 4 qualified opportunities for the ribbon
  const topQualified: QualifiedMatch[] = useMemo(() => {
    return [...scholarships]
      .map((sch) => ({
        scholarship: sch,
        eligibility: getEligibilityFor(sch.id)
      }))
      .sort((a, b) => (b.eligibility?.overallMatchScore || 0) - (a.eligibility?.overallMatchScore || 0))
      .slice(0, 4)
  }, [scholarships, getEligibilityFor])

  // Screen check
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024)
    checkScreen()
    window.addEventListener('resize', checkScreen)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handleMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handleMotion)

    return () => {
      window.removeEventListener('resize', checkScreen)
      mq.removeEventListener('change', handleMotion)
    }
  }, [])

  // Three.js 3D Ribbon Scene
  useEffect(() => {
    if (isMobile || prefersReducedMotion || !mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = 480

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a192f, 0.04)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 11)

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3. Catmull-Rom Spline Curve for the 3D Ribbon
    const curvePoints = [
      new THREE.Vector3(-6.5, -1.2, -2.5),
      new THREE.Vector3(-3.2, 1.8, 1.0),
      new THREE.Vector3(0.0, -0.8, 2.0),
      new THREE.Vector3(3.2, 1.6, -0.5),
      new THREE.Vector3(6.5, -1.0, -2.0)
    ]
    const spline = new THREE.CatmullRomCurve3(curvePoints)
    spline.curveType = 'centripetal'

    // Ribbon Tube Geometry
    const tubeGeometry = new THREE.TubeGeometry(spline, 120, 0.18, 16, false)
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false
    })
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial)
    scene.add(tubeMesh)

    // Floating Halo Ribbon Wireframe (Glow Echo)
    const haloGeometry = new THREE.TubeGeometry(spline, 80, 0.24, 8, false)
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    })
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial)
    scene.add(haloMesh)

    // 4. Background Starfield Particles
    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22
      positions[i + 1] = (Math.random() - 0.5) * 14
      positions[i + 2] = (Math.random() - 0.5) * 12
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.06,
      transparent: true,
      opacity: 0.6
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5)
    keyLight.position.set(5, 8, 8)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.8)
    fillLight.position.set(-6, -4, 4)
    scene.add(fillLight)

    // 6. Interaction State & Visibility Optimization
    let mouseX = 0
    let mouseY = 0
    let targetRotationY = 0
    let targetRotationX = 0
    let currentRotationY = 0
    let currentRotationX = 0
    let animId: number
    let clock = new THREE.Clock()

    let isVisible = true
    let isTabActive = !document.hidden

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    const onVisibilityChange = () => {
      isTabActive = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotationY = mouseX * 0.35
      targetRotationX = mouseY * 0.2
    }
    container.addEventListener('mousemove', onPointerMove)

    // 7. Animation Loop with Power-Saving Offscreen Suspension
    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible || !isTabActive) return

      const elapsed = clock.getElapsedTime()

      // Smooth camera / mesh orbit damping
      currentRotationY += (targetRotationY - currentRotationY) * 0.05
      currentRotationX += (targetRotationX - currentRotationX) * 0.05

      tubeMesh.rotation.y = currentRotationY + Math.sin(elapsed * 0.4) * 0.06
      tubeMesh.rotation.x = currentRotationX + Math.cos(elapsed * 0.3) * 0.04

      haloMesh.rotation.y = tubeMesh.rotation.y
      haloMesh.rotation.x = tubeMesh.rotation.x

      particles.rotation.y = elapsed * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // 8. Resize Handler
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      camera.aspect = w / height
      camera.updateProjectionMatrix()
      renderer.setSize(w, height)
    }
    window.addEventListener('resize', onResize)

    // 9. Full Memory Cleanup
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      container.removeEventListener('mousemove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      observer.disconnect()

      tubeGeometry.dispose()
      tubeMaterial.dispose()
      haloGeometry.dispose()
      haloMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [isMobile, prefersReducedMotion])

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev + 1) % topQualified.length)
  }

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev - 1 + topQualified.length) % topQualified.length)
  }

  return (
    <section className="w-full bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden mb-10">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-black/70 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-mono text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>3D Opportunity Ribbon</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Top Qualified Fellowships
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Synthesized against your {profile.cgpa.toFixed(2)} CGPA, {profile.course} degree, and verified institutional criteria.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <span className="text-xs font-mono text-slate-400">
            0{activeCardIndex + 1} / 0{topQualified.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Previous opportunity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Next opportunity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* THREE.JS WEBGL CANVAS (Desktop) */}
      {!isMobile && !prefersReducedMotion && (
        <div
          ref={mountRef}
          className="relative w-full h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          {/* Overlay Opportunity Card Floating in Center */}
          <div className="absolute z-20 w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 shadow-2xl text-white space-y-4 transform transition-all duration-500 hover:scale-[1.02] hover:border-blue-400">
            {topQualified[activeCardIndex] && (
              <>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{topQualified[activeCardIndex].eligibility?.overallMatchScore}% Compatibility</span>
                  </div>

                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{topQualified[activeCardIndex].scholarship.daysRemaining} Days Left</span>
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{topQualified[activeCardIndex].scholarship.provider}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight leading-snug">
                    {topQualified[activeCardIndex].scholarship.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans line-clamp-2">
                    {topQualified[activeCardIndex].scholarship.description}
                  </p>
                </div>

                {/* Amount & Status */}
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Grant Value:</span>
                  <span className="font-bold text-lg text-amber-300">
                    {topQualified[activeCardIndex].scholarship.amountFormatted}
                  </span>
                </div>

                {/* Action button */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Verified Statutory Opportunity
                  </span>
                  <button
                    onClick={() => quickOpenModal(topQualified[activeCardIndex].scholarship.id)}
                    className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md"
                  >
                    <span>Inspect Full Criteria</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MOBILE / REDUCED MOTION: High-performance Horizontal Card Track */}
      {(isMobile || prefersReducedMotion) && (
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
          {topQualified.map((item, idx) => (
            <div
              key={item.scholarship.id}
              onClick={() => quickOpenModal(item.scholarship.id)}
              className="min-w-[85vw] snap-center rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {item.eligibility?.overallMatchScore}% Match
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {item.scholarship.daysRemaining}d left
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono text-blue-400 font-bold">{item.scholarship.provider}</div>
                <h3 className="font-serif text-lg font-bold text-white">{item.scholarship.title}</h3>
                <div className="text-sm font-mono font-bold text-amber-300">{item.scholarship.amountFormatted}</div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Due {item.scholarship.deadline}</span>
                <button className="text-blue-400 font-bold flex items-center gap-1">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
