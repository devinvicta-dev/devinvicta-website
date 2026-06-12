// data/faq.ts
export type FaqItem = {
  question: string
  answer: string
  defaultOpen?: boolean
}

export const faqItems: FaqItem[] = [
  {
    question: 'What is the AI Act and how does it affect my company?',
    answer:
      'The AI Act is the European regulation that classifies and regulates AI systems by risk level. DevInvicta ensures all software we develop is in full compliance, protecting your business from legal risks and sanctions.',
    defaultOpen: true,
  },
  {
    question: 'How long does it take to develop a custom project?',
    answer:
      'It varies a lot from project to project. We always try to work in phases, so you pay as you see concrete results. After the free diagnosis, we present a phased plan adapted to your business reality.',
  },
  {
    question: 'How is the project monitored along the way?',
    answer:
      'We keep regular communication with you throughout the project: progress meetings, progress reports and direct access to the team. You are always aware of every decision and result.',
  },
  {
    question: 'Is the software scalable as we grow?',
    answer:
      'Yes. From the start we design each solution’s architecture with scalability at its core. Your software grows with us, with no need to rebuild from scratch.',
  },
  {
    question: 'What technologies and languages do you work with?',
    answer:
      'We work with the most recent technologies suited to each project — from Python, Node.js and React to AI frameworks like TensorFlow and LangChain. The choice is always guided by the best result for you.',
  },
  {
    question: 'Have you worked with companies in my sector?',
    answer:
      'Yes. We have experience in sectors like fintech, insurance, e-commerce, healthcare, maritime transport and manufacturing. Check our case studies or talk to us to see how we can help in your specific sector.',
  },
  {
    question: 'How do you guarantee the confidentiality of my data and projects?',
    answer:
      'All projects are protected by confidentiality agreements (NDA). Client data is handled with total security and in compliance with GDPR and other applicable regulations.',
  },
  {
    question: 'What happens after the project is delivered?',
    answer:
      'We offer continuous maintenance and support plans, adapted to each client’s needs. Many of our projects include ongoing follow-up to ensure the software evolves with your business.',
  },
  {
    question: 'How does the pricing structure work?',
    answer:
      'We work in a transparent, phased way — you pay as you see results. After the free diagnosis, we present a detailed proposal with clear investments per phase, no surprises.',
  },
  {
    question: 'How does the free diagnosis work?',
    answer:
      'We schedule an initial no-commitment meeting where we analyze your business challenges and opportunities. At the end, we deliver a clear proposal with concrete solutions and the respective investments.',
  },
]
