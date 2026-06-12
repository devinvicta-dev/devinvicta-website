'use client'

import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'

export default function CounterInit() {
  useGSAP(() => {
    const selectors = [
      '.counter-value[data-target]',
      '.bc-stat-number[data-target]',
      '.stats-big[data-target]',
      '.val-card-stat[data-target]',
      '.stat-counter[data-target]',
    ]
    document.querySelectorAll<HTMLElement>(selectors.join(', ')).forEach((el) => {
      const suffix = el.dataset.suffix ?? ''
      el.textContent = '0' + suffix
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          const target = Number(el.dataset.target)
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
  })

  return null
}
