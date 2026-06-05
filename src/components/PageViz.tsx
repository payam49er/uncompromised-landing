import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

// ─── Shared canvas scaffold ────────────────────────────────────────────────────

function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void,
  setup?: (w: number, h: number) => void,
) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, animId = 0

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width  = w
      canvas.height = h
      setup?.(w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const loop = (t: number) => {
      animId = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, w, h)
      draw(ctx, w, h, t)
    }
    animId = requestAnimationFrame(loop)

    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [draw, setup])

  return ref
}

const canvasStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT VIZ — Orbital rings
// Multiple elliptical orbital planes slowly rotating at different speeds.
// Nodes travel along each orbit; nearby cross-orbit nodes pulse with connections.
// Suggests depth, expertise, interconnected knowledge.
// ─────────────────────────────────────────────────────────────────────────────

export function AboutViz() {
  interface OrbNode { angle: number; speed: number; r: number; opacity: number }
  interface Orbit { rx: number; ry: number; tilt: number; rotSpeed: number; rot: number; nodes: OrbNode[] }

  const orbits = useRef<Orbit[]>([])

  const setup = (w: number, h: number) => {
    orbits.current = [
      { rx: w * 0.38, ry: h * 0.18, tilt: -0.25, rotSpeed: 0.00018, rot: 0,   nodes: makeNodes(4, 0.012) },
      { rx: w * 0.27, ry: h * 0.13, tilt:  0.40, rotSpeed: 0.00025, rot: 1.2, nodes: makeNodes(3, 0.018) },
      { rx: w * 0.48, ry: h * 0.10, tilt: -0.55, rotSpeed: 0.00012, rot: 2.5, nodes: makeNodes(5, 0.009) },
      { rx: w * 0.20, ry: h * 0.22, tilt:  0.15, rotSpeed: 0.00030, rot: 0.7, nodes: makeNodes(3, 0.022) },
    ]
  }

  function makeNodes(count: number, speed: number): OrbNode[] {
    return Array.from({ length: count }, (_, i) => ({
      angle:   (i / count) * Math.PI * 2,
      speed,
      r:       1.2 + Math.random() * 1.4,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  }

  const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cx = w * 0.55, cy = h * 0.5
    const orbs = orbits.current
    if (!orbs.length) return

    // Update rotations & node angles
    orbs.forEach(o => {
      o.rot += o.rotSpeed
      o.nodes.forEach(n => { n.angle += n.speed })
    })

    // Compute world positions
    const positions: { x: number; y: number; r: number; op: number }[] = []
    orbs.forEach(o => {
      o.nodes.forEach(n => {
        const lx = Math.cos(n.angle) * o.rx
        const ly = Math.sin(n.angle) * o.ry
        const x  = cx + lx * Math.cos(o.rot + o.tilt) - ly * Math.sin(o.rot + o.tilt)
        const y  = cy + lx * Math.sin(o.rot + o.tilt) + ly * Math.cos(o.rot + o.tilt)
        positions.push({ x, y, r: n.r, op: n.opacity })
      })
    })

    // Draw orbit ellipses (very faint)
    orbs.forEach(o => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(o.rot + o.tilt)
      ctx.beginPath()
      ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.restore()
    })

    // Cross-node connections
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i].x - positions[j].x
        const dy = positions[i].y - positions[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 140) continue
        const alpha = (1 - dist / 140) * 0.18
        ctx.beginPath()
        ctx.moveTo(positions[i].x, positions[i].y)
        ctx.lineTo(positions[j].x, positions[j].y)
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    // Draw nodes
    positions.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${p.op})`
      ctx.fill()
    })
  }

  const ref = useCanvas(draw, setup)
  return <canvas ref={ref} aria-hidden style={canvasStyle} />
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES VIZ — Rippling dot grid
// A regular grid of dots. Sine waves propagate through, brightening each dot
// as the wavefront passes. Multiple simultaneous waves from random origins.
// Suggests systematic methodology, structured delivery, ripple-effect impact.
// ─────────────────────────────────────────────────────────────────────────────

export function FeaturesViz() {
  interface Wave { ox: number; oy: number; born: number; speed: number }
  const waves = useRef<Wave[]>([])
  const lastSpawn = useRef(0)

  const draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cols = Math.floor(w / 44)
    const rows = Math.floor(h / 40)
    const gx   = w / cols
    const gy   = h / rows

    // Spawn a new wave every ~1.8 s
    if (t - lastSpawn.current > 1800) {
      waves.current.push({
        ox:    Math.random() * w,
        oy:    Math.random() * h,
        born:  t,
        speed: 0.14 + Math.random() * 0.08,
      })
      lastSpawn.current = t
      if (waves.current.length > 5) waves.current.shift()
    }

    for (let col = 0; col <= cols; col++) {
      for (let row = 0; row <= rows; row++) {
        const x = col * gx
        const y = row * gy

        let brightness = 0
        waves.current.forEach(wave => {
          const age  = (t - wave.born) * 0.001
          const dist = Math.sqrt((x - wave.ox) ** 2 + (y - wave.oy) ** 2)
          const front = age * wave.speed * Math.max(w, h)
          const diff  = dist - front
          if (diff > -60 && diff < 60) {
            brightness += Math.exp(-diff * diff / 900) * 0.7
          }
        })

        const base  = 0.08
        const total = Math.min(base + brightness, 0.85)
        const r     = 1.2 + brightness * 2.2

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${total})`
        ctx.fill()
      }
    }
  }

  const ref = useCanvas(draw)
  return <canvas ref={ref} aria-hidden style={canvasStyle} />
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICING VIZ — Flowing data streams
// Horizontal particle streams flow left → right at different speeds & densities.
// Suggests workflow phases, delivery pipelines, phased engagement progression.
// ─────────────────────────────────────────────────────────────────────────────

export function PricingViz() {
  interface Particle { x: number; y: number; speed: number; opacity: number; r: number }
  interface Stream {
    yFrac:     number
    wobble:    number
    wobbleSpd: number
    phase:     number
    particles: Particle[]
    gap:       number
    color:     string
  }

  const streams = useRef<Stream[]>([])

  const setup = (w: number, h: number) => {
    const count = 9
    streams.current = Array.from({ length: count }, (_, i) => {
      const yFrac = 0.08 + (i / (count - 1)) * 0.84
      const speed = 0.4 + Math.random() * 0.9
      const gap   = 60 + Math.random() * 120
      return {
        yFrac,
        wobble:    4 + Math.random() * 8,
        wobbleSpd: 0.5 + Math.random() * 0.8,
        phase:     Math.random() * Math.PI * 2,
        gap,
        color: i % 3 === 0 ? 'rgba(255,255,255,' : 'rgba(255,255,255,',
        particles: Array.from({ length: Math.floor(w / gap) + 2 }, (_, j) => ({
          x:       j * gap - Math.random() * gap,
          y:       yFrac * h,
          speed,
          opacity: 0.12 + Math.random() * 0.3,
          r:       0.8 + Math.random() * 1.4,
        })),
      }
    })
  }

  const draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const ts = t * 0.001
    streams.current.forEach(s => {
      const baseY = s.yFrac * h
      let prev: { x: number; y: number } | null = null

      s.particles.forEach(p => {
        p.x += p.speed
        if (p.x > w + 20) p.x = -s.gap * Math.random()
        const y = baseY + Math.sin(ts * s.wobbleSpd + p.x * 0.02 + s.phase) * s.wobble

        // Faint connecting line between consecutive particles in stream
        if (prev) {
          const dx   = p.x - prev.x
          const dist = Math.sqrt(dx * dx + (y - prev.y) ** 2)
          if (dist < s.gap * 1.4) {
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(p.x, y)
            ctx.strokeStyle = `rgba(255,255,255,${p.opacity * 0.25})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()

        prev = { x: p.x, y }
      })
    })
  }

  const ref = useCanvas(draw, setup)
  return <canvas ref={ref} aria-hidden style={canvasStyle} />
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG VIZ — Rising idea particles
// Particles emerge from random x positions at the bottom and drift upward.
// They fade in, float with gentle lateral drift, and fade out near the top.
// When two particles come close, a brief connection flash appears.
// Suggests ideas surfacing, insights rising, knowledge converging.
// ─────────────────────────────────────────────────────────────────────────────

export function BlogViz() {
  interface RisingParticle extends d3.SimulationNodeDatum {
    id:      number
    x:       number
    y:       number
    vy:      number
    drift:   number
    driftSpd:number
    phase:   number
    r:       number
    life:    number   // 0→1 (born → dead)
    lifeSpd: number
    pulse:   boolean
    pulseT:  number
  }

  const particles = useRef<RisingParticle[]>([])
  const nextId    = useRef(0)
  const lastSpawn = useRef(0)
  const LINK_DIST = 100

  const spawnParticle = (w: number, h: number): RisingParticle => ({
    id:       nextId.current++,
    index:    0,
    x:        20 + Math.random() * (w - 40),
    y:        h + 10,
    vy:       0.25 + Math.random() * 0.45,
    drift:    0,
    driftSpd: (Math.random() - 0.5) * 0.012,
    phase:    Math.random() * Math.PI * 2,
    r:        1.0 + Math.random() * 1.8,
    life:     0,
    lifeSpd:  0.003 + Math.random() * 0.003,
    pulse:    Math.random() < 0.08,
    pulseT:   Math.random() * Math.PI * 2,
    vx: 0,
  })

  const draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    // Spawn
    if (t - lastSpawn.current > 300 && particles.current.length < 55) {
      particles.current.push(spawnParticle(w, h))
      lastSpawn.current = t
    }

    // Update & cull
    particles.current = particles.current.filter(p => {
      p.life += p.lifeSpd
      p.phase += 0.018
      p.drift += p.driftSpd
      p.x += Math.sin(p.phase * 0.7 + p.drift) * 0.4
      p.y -= p.vy
      if (p.pulse) p.pulseT += 0.04
      return p.life < 1 && p.y > -20
    })

    // Connections
    const pts = particles.current
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx   = pts[i].x - pts[j].x
        const dy   = pts[i].y - pts[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > LINK_DIST) continue
        const proximity = 1 - dist / LINK_DIST
        const alpha = proximity * 0.18 * Math.min(pts[i].life * 4, 1) * Math.min(pts[j].life * 4, 1)
        ctx.beginPath()
        ctx.moveTo(pts[i].x, pts[i].y)
        ctx.lineTo(pts[j].x, pts[j].y)
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    // Draw particles
    pts.forEach(p => {
      // Envelope: fade in (0→0.25 life), hold, fade out (0.75→1 life)
      const env = p.life < 0.25
        ? p.life / 0.25
        : p.life > 0.75
          ? 1 - (p.life - 0.75) / 0.25
          : 1

      let r  = p.r
      let op = 0.55 * env
      if (p.pulse) {
        const beat = Math.sin(p.pulseT * 4) * 0.4
        r  = p.r * (1.5 + beat)
        op = (0.75 + beat * 0.15) * env

        // Halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,255,255,${0.12 * env})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, Math.max(0.4, r), 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${op})`
      ctx.fill()
    })
  }

  const ref = useCanvas(draw)
  return <canvas ref={ref} aria-hidden style={canvasStyle} />
}
