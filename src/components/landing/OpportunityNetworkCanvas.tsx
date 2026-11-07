import React, { useEffect, useRef } from 'react'

interface NodePoint {
  x: number
  y: number
  z: number
  radius: number
  color: string
  alpha: number
  vx: number
  vy: number
  pulse: number
  pulseSpeed: number
}

export function OpportunityNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Reduced motion check
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let isVisible = true
    let width = (canvas.width = container.clientWidth)
    let height = (canvas.height = container.clientHeight)

    const handleResize = () => {
      if (!container || !canvas) return
      width = canvas.width = container.clientWidth
      height = canvas.height = container.clientHeight
    }
    window.addEventListener('resize', handleResize)

    // Visibility observer to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    // Opportunity constellation nodes
    const isMobile = width < 768
    const nodeCount = isMobile ? 16 : 36
    const nodes: NodePoint[] = []

    const palette = [
      '#2563EB', // Cobalt
      '#3B82F6', // Azure
      '#D97706', // Amber
      '#0D9488', // Teal
      '#1E293B', // Slate
    ]

    for (let i = 0; i < nodeCount; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)]
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 800 + 100,
        radius: Math.random() * 2.5 + 1.5,
        color,
        alpha: Math.random() * 0.4 + 0.15,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      })
    }

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetMouseX = e.clientX - rect.left
      targetMouseY = e.clientY - rect.top
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render)
        return
      }

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      ctx.clearRect(0, 0, width, height)

      // Soft ambient opportunity glow around cursor
      const glow = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 280)
      glow.addColorStop(0, 'rgba(37, 99, 235, 0.04)')
      glow.addColorStop(1, 'rgba(37, 99, 235, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // Update and draw network connections
      const maxDistance = isMobile ? 80 : 130
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.12
            ctx.beginPath()
            ctx.moveTo(n1.x, n1.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Render individual opportunity nodes
      nodes.forEach((node) => {
        // Drift position
        node.x += node.vx
        node.y += node.vy

        // Bounce on boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Pulse size
        node.pulse += node.pulseSpeed
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.6

        // Gentle cursor interaction
        const cdx = mouseX - node.x
        const cdy = mouseY - node.y
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
        if (cdist < 140) {
          const force = (1 - cdist / 140) * 0.5
          node.x -= (cdx / cdist) * force
          node.y -= (cdy / cdist) * force
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, Math.max(0.5, currentRadius), 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.globalAlpha = node.alpha
        ctx.fill()
        ctx.globalAlpha = 1.0
      })

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
