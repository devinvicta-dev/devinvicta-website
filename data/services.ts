// data/services.ts
export type ServiceV1Item = {
  num: string
  name: string
  image: string
}

export type ServiceV2Item = {
  id: string
  variant: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6'
  title: string
  description: string
  image?: string
}

export const serviceV1Items: ServiceV1Item[] = [
  {
    num: '(01)',
    name: 'Web Development',
    image: '/assets/images/service-1.jpg',
  },
  {
    num: '(02)',
    name: 'Mobile App Development',
    image: '/assets/images/service-2.jpg',
  },
  {
    num: '(03)',
    name: 'AI Agents & Automation',
    image: '/assets/images/service-3.jpg',
  },
  {
    num: '(04)',
    name: 'UX/UI Design',
    image: '/assets/images/service-4.jpg',
  },
  {
    num: '(05)',
    name: 'Cloud & Backend Solutions',
    image: '/assets/images/service-5.jpg',
  },
]

export const serviceV2Items: ServiceV2Item[] = [
  {
    id: 'web-development',
    variant: 'v1',
    title: 'Web Development',
    description: 'Web Development',
    image: '/assets/images/svc2-1.jpg',
  },
  {
    id: 'mobile-apps',
    variant: 'v2',
    title: 'Mobile Apps',
    description: 'Mobile Apps',
    image: '/assets/images/about.jpg',
  },
  {
    id: 'ai-agents',
    variant: 'v3',
    title: 'AI Agents & LLM Integration',
    description: 'AI Agents & LLM Integration',
    image: '/assets/images/svc2-3.jpg',
  },
  {
    id: 'ux-ui-design',
    variant: 'v4',
    title: 'UX/UI Design',
    description: 'UX/UI Design',
    image: '/assets/images/svc2-4.jpg',
  },
  {
    id: 'ai-automation',
    variant: 'v5',
    title: 'AI Automation & Workflows',
    description: 'AI Automation & Workflows',
    image: '/assets/images/svc2-5.jpg',
  },
  {
    id: 'cloud-backend',
    variant: 'v6',
    title: 'Cloud & Backend',
    description: 'Cloud & Backend',
    image: '/assets/images/service-5.jpg',
  },
]
