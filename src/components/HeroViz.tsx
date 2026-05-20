import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

// ─── Types ────────────────────────────────────────────────────────────────────

interface VizNode extends d3.SimulationNodeDatum {
  id: number
  r: number
  baseOpacity: number
  pulsePhase: number
  active: boolean
  activatedAt: number
  isHub: boolean
}

interface FlowParticle {
  source: VizNode
  target: VizNode
  progress: number
  speed: number
  opacity: number
}

// ─── Config ───────────────────────────────────────────────────────────────────

const NODE_COUNT       = 80
const HUB_COUNT        = 10   // larger "hub" nodes that activate more often
const LINK_DIST        = 170  // max pixel distance for drawing a connection
const ACTIVE_DURATION  = 3000 // ms a node stays "active"
const SPAWN_INTERVAL   = 900  // ms between new activations
const CHARGE_STRENGTH  = -12
const VELOCITY_DECAY   = 0.65

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width  = canvas.offsetWidth
    let height = canvas.offsetHeight
    let animId = 0

    const setSize = () => {
      width  = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width  = width
      canvas.height = height
    }
    setSize()

    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    // ── Nodes ──────────────────────────────────────────────────────────────

    const nodes: VizNode[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const isHub = i < HUB_COUNT
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        r: isHub
          ? 2.5 + Math.random() * 2
          : 0.8 + Math.random() * 1.6,
        baseOpacity: isHub
          ? 0.45 + Math.random() * 0.2
          : 0.15 + Math.random() * 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
        active: false,
        activatedAt: 0,
        isHub,
      }
    })

    // ── D3 force simulation ────────────────────────────────────────────────

    const sim = d3.forceSimulation<VizNode>(nodes)
      .force('charge', d3.forceManyBody<VizNode>()
        .strength(CHARGE_STRENGTH)
        .distanceMax(120))
      .force('x', d3.forceX<VizNode>().x(d => d.isHub ? width / 2 : width / 2)
        .strength(0.002))
      .force('y', d3.forceY<VizNode>().y(d => d.isHub ? height / 2 : height / 2)
        .strength(0.002))
      .velocityDecay(VELOCITY_DECAY)
      .alphaDecay(0)       // never cool down — runs forever
      .alpha(0.3)

    // seed with random velocities for initial drift feel
    nodes.forEach(n => {
      n.vx = (Math.random() - 0.5) * 2
      n.vy = (Math.random() - 0.5) * 2
    })

    // ── Flow particles ─────────────────────────────────────────────────────

    const particles: FlowParticle[] = []

    const spawnParticlesFrom = (source: VizNode) => {
      nodes.forEach(target => {
        if (target.id === source.id) return
        const dx = (source.x ?? 0) - (target.x ?? 0)
        const dy = (source.y ?? 0) - (target.y ?? 0)
        if (Math.sqrt(dx * dx + dy * dy) > LINK_DIST) return
        if (Math.random() > 0.55) return
        particles.push({
          source,
          target,
          progress: 0,
          speed: 0.003 + Math.random() * 0.004,
          opacity: 0.6 + Math.random() * 0.4,
        })
      })
    }

    // ── Node activation ────────────────────────────────────────────────────

    const activate = () => {
      // Prefer hub nodes (weight 3×)
      const pool = [...nodes.filter(n => n.isHub), ...nodes.filter(n => n.isHub), ...nodes.filter(n => n.isHub), ...nodes]
      const node = pool[Math.floor(Math.random() * pool.length)]
      node.active    = true
      node.activatedAt = performance.now()
      spawnParticlesFrom(node)
      setTimeout(() => { node.active = false }, ACTIVE_DURATION)
    }

    // Stagger initial activations
    for (let i = 0; i < 6; i++) setTimeout(activate, i * 350)
    const timer = setInterval(activate, SPAWN_INTERVAL)

    // ── Draw loop ──────────────────────────────────────────────────────────

    let lastT = 0

    const draw = (t: number) => {
      animId = requestAnimationFrame(draw)
      const dt = Math.min(t - lastT, 32)
      lastT = t

      ctx.clearRect(0, 0, width, height)

      // Advance simulation
      sim.tick()

      // Soft boundary — nudge velocities back inward
      const pad = 50
      nodes.forEach(n => {
        if ((n.x ?? 0) < pad)          n.vx = (n.vx ?? 0) + 0.15
        if ((n.x ?? 0) > width - pad)  n.vx = (n.vx ?? 0) - 0.15
        if ((n.y ?? 0) < pad)          n.vy = (n.vy ?? 0) + 0.15
        if ((n.y ?? 0) > height - pad) n.vy = (n.vy ?? 0) - 0.15
      })

      // Advance + cull particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].progress += particles[i].speed * (dt / 16)
        if (particles[i].progress >= 1) particles.splice(i, 1)
      }

      const now = performance.now()

      // ── Draw connection lines ────────────────────────────────────────────
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const ax = a.x ?? 0, ay = a.y ?? 0
          const bx = b.x ?? 0, by = b.y ?? 0
          const dx = ax - bx, dy = ay - by
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > LINK_DIST) continue

          const proximity = 1 - dist / LINK_DIST
          const isLive = a.active || b.active
          const alpha = isLive
            ? proximity * 0.45
            : proximity * 0.10

          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(bx, by)
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`
          ctx.stroke()
        }
      }

      // ── Draw flow particles ──────────────────────────────────────────────
      particles.forEach(p => {
        const sx = p.source.x ?? 0, sy = p.source.y ?? 0
        const tx = p.target.x ?? 0, ty = p.target.y ?? 0
        const px = sx + (tx - sx) * p.progress
        const py = sy + (ty - sy) * p.progress
        // fade in/out along the path
        const fade = 1 - Math.pow(Math.abs(p.progress - 0.5) * 2, 1.5)

        ctx.beginPath()
        ctx.arc(px, py, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * fade})`
        ctx.fill()
      })

      // ── Draw nodes ───────────────────────────────────────────────────────
      nodes.forEach(node => {
        const x = node.x ?? 0
        const y = node.y ?? 0
        node.pulsePhase += 0.022

        let r       = node.r
        let opacity = node.baseOpacity

        if (node.active) {
          const age   = Math.min((now - node.activatedAt) / ACTIVE_DURATION, 1)
          const beat  = Math.sin(node.pulsePhase * 5) * 0.35
          r       = node.r * (1.6 + beat) * (1 - age * 0.3)
          opacity = (0.85 - age * 0.55) + beat * 0.15

          // outer halo
          const haloAlpha = Math.max(0, (0.22 - age * 0.2))
          const haloR     = node.r * (3.5 + beat * 1.5)
          ctx.beginPath()
          ctx.arc(x, y, haloR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255,255,255,${haloAlpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }

        // dot
        ctx.beginPath()
        ctx.arc(x, y, Math.max(0.4, r), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, opacity)})`
        ctx.fill()
      })
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(timer)
      sim.stop()
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
