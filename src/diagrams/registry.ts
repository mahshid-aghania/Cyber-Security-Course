import { lazy } from 'react'
import type { DiagramMeta, DiagramId } from '../data/types'

// Each diagram is code-split into its own chunk and loaded on demand.
export const DIAGRAMS: DiagramMeta[] = [
  { id: 'cia-triad', title: 'CIA Triad', category: 'Foundations', chapter: 1, blurb: 'Click each corner to explore Confidentiality, Integrity and Availability across real scenarios.', component: lazy(() => import('./CIATriad')) },
  { id: 'regulation-explorer', title: 'Security Regulation Explorer', category: 'Foundations', chapter: 1, blurb: 'Explore GDPR, NIS, CCPA, LGPD and PCI DSS — jurisdiction, purpose and scope.', component: lazy(() => import('./RegulationExplorer')) },
  { id: 'cyber-risk-development', title: 'How Cyber Risk Develops', category: 'Foundations', chapter: 2, blurb: 'Follow the chain from asset to vulnerability to threat exploitation to impact.', component: lazy(() => import('./CyberRiskDevelopment')) },
  { id: 'malware-lab', title: 'Malware Behaviour Laboratory', category: 'Threats', chapter: 2, blurb: 'Animated models of virus, worm, Trojan and ransomware behaviour.', component: lazy(() => import('./MalwareLab')) },
  { id: 'wannacry-propagation', title: 'WannaCry Propagation', category: 'Threats', chapter: 2, blurb: 'Toggle patching on a simplified network to see how exposure changes.', component: lazy(() => import('./WannaCryPropagation')) },
  { id: 'social-engineering-journey', title: 'Social Engineering Attack Journey', category: 'Threats', chapter: 4, blurb: 'Reconnaissance to compromise across phishing, whaling, BEC, smishing and vishing.', component: lazy(() => import('./SocialEngineeringJourney')) },
  { id: 'phishing-anatomy', title: 'Phishing Email Anatomy', category: 'Threats', chapter: 4, blurb: 'Inspect a fictional email — click hotspots to learn the warning signs.', component: lazy(() => import('./PhishingAnatomy')) },
  { id: 'secure-sdlc', title: 'Secure SDLC', category: 'Secure Design', chapter: 3, blurb: 'A circular lifecycle: dev activities, security activities, risks and controls per stage.', component: lazy(() => import('./SecureSDLC')) },
  { id: 'waterfall-agile', title: 'Waterfall vs. Agile', category: 'Secure Design', chapter: 3, blurb: 'Compare linear and iterative delivery and where security fits in each.', component: lazy(() => import('./WaterfallAgile')) },
  { id: 'secure-input-handling', title: 'Secure vs. Insecure Input Handling', category: 'Secure Design', chapter: 3, blurb: 'Two pipelines for SQL injection and XSS — unsafe vs. safer handling.', component: lazy(() => import('./SecureInputHandling')) },
  { id: 'office-entry', title: 'Office Entry Security', category: 'Physical & Third-Party', chapter: 5, blurb: 'An interactive floor plan — inspect controls and watch a tailgating example.', component: lazy(() => import('./OfficeEntry')) },
  { id: 'defense-in-depth', title: 'Defense in Depth', category: 'Physical & Third-Party', chapter: 5, blurb: 'Concentric security layers from building perimeter to data encryption.', component: lazy(() => import('./DefenseInDepth')) },
  { id: 'supply-chain-network', title: 'Supply Chain Network', category: 'Physical & Third-Party', chapter: 6, blurb: 'A central organisation and its suppliers — inspect access and illustrative risk.', component: lazy(() => import('./SupplyChainNetwork')) },
  { id: 'cloud-shared-responsibility', title: 'Cloud Shared Responsibility', category: 'Physical & Third-Party', chapter: 6, blurb: 'See how responsibility shifts across SaaS, PaaS and IaaS.', component: lazy(() => import('./CloudSharedResponsibility')) },
  { id: 'target-breach-path', title: 'Target Breach Attack Path', category: 'Physical & Third-Party', chapter: 6, blurb: 'Follow the attack path and toggle network segmentation.', component: lazy(() => import('./TargetBreachPath')) },
  { id: 'risk-matrix', title: 'Risk Matrix', category: 'Risk Management', chapter: 7, blurb: 'A 5x5 likelihood-impact matrix with sliders and example scenarios.', component: lazy(() => import('./RiskMatrix')) },
  { id: 'risk-treatment-tree', title: 'Risk Treatment Decision Tree', category: 'Risk Management', chapter: 7, blurb: 'Explore Tolerate, Treat, Transfer and Terminate for a scenario.', component: lazy(() => import('./RiskTreatmentTree')) },
  { id: 'security-control-timeline', title: 'Security Control Timeline', category: 'Risk Management', chapter: 7, blurb: 'Preventive, detective and reactive controls across an incident timeline.', component: lazy(() => import('./SecurityControlTimeline')) },
  { id: 'incident-response-lifecycle', title: 'Incident Response Lifecycle', category: 'Incident Management', chapter: 8, blurb: 'Detection to review — purpose, owners, actions and outcomes per stage.', component: lazy(() => import('./IncidentResponseLifecycle')) },
  { id: 'continuity-vs-recovery', title: 'Continuity vs. Recovery', category: 'Incident Management', chapter: 8, blurb: 'A split-screen university ransomware incident: keep operating vs. restore systems.', component: lazy(() => import('./ContinuityVsRecovery')) },
  { id: 'backup-recovery-simulator', title: 'Backup & Recovery Simulator', category: 'Incident Management', chapter: 8, blurb: 'Change backup frequency, isolation and testing to see recovery outcomes.', component: lazy(() => import('./BackupRecoverySimulator')) },
  { id: 'five-foundations', title: 'Five Security Foundations', category: 'Standards', chapter: 9, blurb: 'The five Cyber Essentials controls — purpose, example and what goes wrong.', component: lazy(() => import('./FiveFoundations')) },
  { id: 'isms-cycle', title: 'ISMS Continuous Improvement Cycle', category: 'Standards', chapter: 9, blurb: 'The ISO 27001 improvement loop, stage by stage.', component: lazy(() => import('./ISMSCycle')) },
  { id: 'nist-csf', title: 'NIST Cybersecurity Framework', category: 'Standards', chapter: 9, blurb: 'A radial view of the functions — toggle the original five vs. CSF 2.0 with Govern.', component: lazy(() => import('./NISTCSF')) },
]

export const DIAGRAM_MAP: Record<DiagramId, DiagramMeta> = Object.fromEntries(
  DIAGRAMS.map((d) => [d.id, d]),
) as Record<DiagramId, DiagramMeta>

export const DIAGRAM_CATEGORIES = [
  'Foundations',
  'Threats',
  'Secure Design',
  'Physical & Third-Party',
  'Risk Management',
  'Incident Management',
  'Standards',
] as const
