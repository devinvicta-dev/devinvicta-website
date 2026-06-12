// data/milestones.ts
// Title/description copy lives in the `about` locale namespace
// (about.milestones.items.<key>). The year is locale-independent data.
export type Milestone = {
  year: string
  /** Translation key under `about.milestones.items`. */
  key: string
}

export const milestones: Milestone[] = [
  { year: '2021', key: 'founded' },
  { year: '2022', key: 'firstAgent' },
  { year: '2022', key: 'tenClients' },
  { year: '2023', key: 'llmPractice' },
  { year: '2024', key: 'fiftyProjects' },
  { year: '2025', key: 'automationSuite' },
]
