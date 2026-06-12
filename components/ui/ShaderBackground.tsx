'use client'

import { useCallback, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Self-contained WebGL smoke shader — no external lib, no licensing.
 * A slow blue haze rises from the bottom-center and follows the pointer.
 * Pointer tracking uses React handlers (no global listeners / DOM queries);
 * the imperative WebGL loop lives in an effect, driven by refs.
 * The <canvas> is exempt from the global `img, video` grayscale rule.
 */
const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse; // normalized 0..1, smoothed
uniform vec2 u_anchor; // where the cloud concentrates (0..1 screen space)

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  float aspect = u_res.x / u_res.y;
  vec2 p = gl_FragCoord.xy / u_res;
  p.x *= aspect;

  float vy = gl_FragCoord.y / u_res.y; // 0 bottom .. 1 top
  float cx = gl_FragCoord.x / u_res.x; // 0 left .. 1 right

  float t = u_time * 0.06;

  vec2 mShift = (u_mouse - 0.5) * vec2(0.4, 0.25);
  mShift.x *= aspect;
  // Autonomous drift — the clouds keep "walking" even with no pointer movement.
  vec2 base = p + mShift + vec2(0.05 * t, -0.08 * t);

  // Iterated domain warping with a time-evolving field -> fluid churn + drift.
  vec2 q1 = vec2(fbm(base + vec2(0.0, 0.5 * t)), fbm(base + vec2(5.2, 1.3) - vec2(0.4 * t, 0.0)));
  vec2 q2 = vec2(fbm(base + 1.7 * q1 + vec2(1.7, 9.2) + 0.35 * t),
                 fbm(base + 1.7 * q1 + vec2(8.3, 2.8) - 0.3 * t));
  float clouds = fbm(base + 1.8 * q2);
  clouds = clouds * clouds * 2.1; // billowy depth, brightened to match

  // Soft plume mask anchors the clouds; the anchor tracks the pointer.
  vec2 anchor = u_anchor;
  anchor.x += (u_mouse.x - 0.5) * 0.45;
  anchor.y += (u_mouse.y - 0.5) * 0.1;
  float mask = smoothstep(1.2, 0.0, length(vec2((cx - anchor.x) * 1.5, (vy - anchor.y) * 0.92)));

  // Wide remap = feathered, smoky edges that fade gently into the black.
  float density = mask * (0.22 + clouds);
  density = smoothstep(0.22, 1.0, density);

  // shades of blue only
  vec3 deep  = vec3(0.020, 0.060, 0.200); // near-navy haze
  vec3 blue  = vec3(0.120, 0.260, 0.860); // #1b3bd6
  vec3 royal = vec3(0.180, 0.400, 0.940); // #2563eb
  vec3 sky   = vec3(0.420, 0.620, 1.000); // bright highlight

  vec3 col = vec3(0.0);
  col = mix(col, deep,  smoothstep(0.0, 0.4, density));
  col = mix(col, blue,  smoothstep(0.25, 0.72, density));
  col = mix(col, royal, smoothstep(0.62, 0.92, density));
  col = mix(col, sky,   smoothstep(0.9, 1.0, density));

  // faint grain to kill banding
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.02;

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  return sh
}

export default function ShaderBackground({
  className,
  anchor = [0.5, 0],
  speed = 1,
  interactive = true,
}: {
  className?: string
  /** Where the cloud concentrates, in 0..1 screen space (x: left→right, y: bottom→top). */
  anchor?: [number, number]
  /** Animation speed multiplier (1 = default slow drift). */
  speed?: number
  /** When false, the cloud drifts on its own but ignores the pointer. */
  interactive?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const anchorRef = useRef(anchor)
  anchorRef.current = anchor
  const speedRef = useRef(speed)
  speedRef.current = speed
  // Eased pointer position (driven by gsap.quickTo, read by the ticker).
  const pos = useRef({ mx: 0.5, my: 0.5 })
  const quick = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    quick.current?.x((e.clientX - r.left) / r.width)
    quick.current?.y(1 - (e.clientY - r.top) / r.height) // flip: GL origin is bottom-left
  }, [])

  const handlePointerLeave = useCallback(() => {
    quick.current?.x(0.5)
    quick.current?.y(0.5)
  }, [])

  useGSAP(
    () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const gl = canvas.getContext('webgl', { antialias: true, alpha: false })
      if (!gl) return

      const prog = gl.createProgram()!
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      gl.useProgram(prog)

      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, 'a_pos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

      const uTime = gl.getUniformLocation(prog, 'u_time')
      const uRes = gl.getUniformLocation(prog, 'u_res')
      const uMouse = gl.getUniformLocation(prog, 'u_mouse')
      const uAnchor = gl.getUniformLocation(prog, 'u_anchor')

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = canvas
        canvas.width = Math.max(1, Math.floor(w * dpr))
        canvas.height = Math.max(1, Math.floor(h * dpr))
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      const ro = new ResizeObserver(resize)
      ro.observe(canvas)
      resize()

      // GSAP eases the pointer follow (replaces a manual lerp).
      quick.current = {
        x: gsap.quickTo(pos.current, 'mx', { duration: 1.1, ease: 'power2.out' }),
        y: gsap.quickTo(pos.current, 'my', { duration: 1.1, ease: 'power2.out' }),
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Render through GSAP's ticker (the same rAF that drives ScrollTrigger/Lenis).
      const render = () => {
        gl.uniform1f(uTime, gsap.ticker.time * speedRef.current)
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform2f(uMouse, pos.current.mx, pos.current.my)
        gl.uniform2f(uAnchor, anchorRef.current[0], anchorRef.current[1])
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }

      // Add/remove from the ticker as the panel enters/leaves the viewport.
      let running = false
      const setRunning = (on: boolean) => {
        if (on === running) return
        running = on
        if (on) gsap.ticker.add(render)
        else gsap.ticker.remove(render)
      }
      const io = new IntersectionObserver(([entry]) => {
        if (reduced) render()
        else setRunning(entry.isIntersecting)
      })
      io.observe(canvas)

      return () => {
        gsap.ticker.remove(render)
        ro.disconnect()
        io.disconnect()
        quick.current = null
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      }
    },
    { dependencies: [], scope: canvasRef }
  )

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
      className={className}
    />
  )
}
