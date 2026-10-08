import type { ComponentType, LazyExoticComponent } from 'react'

/** A single educational definition shown in chapter "Key definitions". */
export interface Definition {
  term: string
  definition: string
  example?: string
}

/** A practical scenario or real-world example block. */
export interface Scenario {
  title: string
  body: string
  tag?: 'university' | 'hospital' | 'bank' | 'ecommerce' | 'general'
}

/** A rich content block rendered inside a chapter section. */
export type ContentBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'callout'; tone: 'info' | 'tip' | 'warning' | 'danger' | 'textbook'; title?: string; text: string }
  | { kind: 'definition'; term: string; definition: string; example?: string }
  | { kind: 'diagram'; id: DiagramId }
  | { kind: 'compare'; left: { title: string; points: string[] }; right: { title: string; points: string[] } }

/** A named section inside a chapter (appears in the table of contents). */
export interface ChapterSection {
  id: string
  title: string
  blocks: ContentBlock[]
}

export interface Misconception {
  myth: string
  reality: string
}

export interface Chapter {
  number: number
  slug: string
  title: string
  subtitle: string
  /** One-line hook for cards. */
  summary: string
  minutes: number
  accent: 'cyan' | 'teal' | 'violet' | 'warn' | 'danger'
  icon: string // lucide icon name
  objectives: string[]
  sections: ChapterSection[]
  definitions: Definition[]
  misconceptions: Misconception[]
  takeaways: string[]
  presentationSummary: string[]
  diagramIds: DiagramId[]
  relatedCaseStudies?: string[] // case study slugs
}

export interface GlossaryTerm {
  term: string
  definition: string
  example: string
  chapter: number
  related: string[]
}

export interface CaseStudyTimelineStep {
  label: string
  detail: string
}

export interface CaseStudy {
  slug: string
  name: string
  year: number
  focus: string
  accent: 'cyan' | 'teal' | 'violet' | 'warn' | 'danger'
  background: string
  attackMethod: string[]
  weaknesses: string[]
  whatHappened: string
  businessImpact: string[]
  lessons: string[]
  relatedChapters: number[]
  timeline: CaseStudyTimelineStep[]
}

export type DiagramCategory =
  | 'Foundations'
  | 'Threats'
  | 'Secure Design'
  | 'Physical & Third-Party'
  | 'Risk Management'
  | 'Incident Management'
  | 'Standards'

export type DiagramId =
  | 'cia-triad'
  | 'regulation-explorer'
  | 'cyber-risk-development'
  | 'malware-lab'
  | 'wannacry-propagation'
  | 'social-engineering-journey'
  | 'phishing-anatomy'
  | 'secure-sdlc'
  | 'waterfall-agile'
  | 'secure-input-handling'
  | 'office-entry'
  | 'defense-in-depth'
  | 'supply-chain-network'
  | 'cloud-shared-responsibility'
  | 'target-breach-path'
  | 'risk-matrix'
  | 'risk-treatment-tree'
  | 'security-control-timeline'
  | 'incident-response-lifecycle'
  | 'continuity-vs-recovery'
  | 'backup-recovery-simulator'
  | 'five-foundations'
  | 'isms-cycle'
  | 'nist-csf'

export interface DiagramMeta {
  id: DiagramId
  title: string
  category: DiagramCategory
  chapter: number
  blurb: string
  component: LazyExoticComponent<ComponentType>
}
