'use client'

import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'

export default function AboutAnimInit() {
  useGSAP(() => {
    // Counters — from about.html lines 984-1004
    const counterSelectors =
      '.stats-big[data-target], .val-card-stat[data-target], .stat-counter[data-target]'
    document.querySelectorAll<HTMLElement>(counterSelectors).forEach((el) => {
      const target = parseInt(el.dataset.target ?? '0', 10)
      const suffix = el.dataset.suffix ?? ''
      el.textContent = '0' + suffix
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() {
              el.textContent = Math.round(obj.val) + suffix
            },
          })
        },
      })
    })

    // Parallax — from about.html lines 1081-1101
    const parallaxTargets: Array<{ selector: string; y: number }> = [
      { selector: '.stats-photo', y: 40 },
      { selector: '.mission-img-single', y: 50 },
      { selector: '.approach-center-img', y: 40 },
    ]
    parallaxTargets.forEach(({ selector, y }) => {
      const img = document.querySelector<HTMLElement>(selector)
      if (!img) return
      gsap.fromTo(
        img,
        { y: y * 0.5 },
        {
          y: -y * 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('section') || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        }
      )
    })

    // Recompute every trigger's position once sibling sections have mounted and
    // the layout has settled, so each reveal fires exactly when its section is
    // visible (not at stale positions computed before the hero animation ran).
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') refresh()
    else window.addEventListener('load', refresh)
    const raf = requestAnimationFrame(refresh)
    return () => {
      window.removeEventListener('load', refresh)
      cancelAnimationFrame(raf)
    }
  })

  return null
}
