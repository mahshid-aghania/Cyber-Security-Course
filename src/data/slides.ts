import type { DiagramId } from './types'

export interface Slide {
  id: string
  eyebrow?: string
  title: string
  subtitle?: string
  bullets?: string[]
  diagramId?: DiagramId
  notes: string
  accent: 'cyan' | 'teal' | 'violet' | 'warn' | 'danger'
  kind?: 'title' | 'content' | 'closing'
}

export const SLIDES: Slide[] = [
  {
    id: 'title',
    title: 'CYBERATLAS',
    subtitle: 'Understand the threats. Master the defenses. Build resilience.',
    notes:
      'Open by introducing the topic: cybersecurity is about protecting information, systems, networks, devices and digital services from threats. Set expectations — we will move from fundamentals, through threats and defenses, to recovery and frameworks.',
    accent: 'cyan',
    kind: 'title',
  },
  {
    id: 'why',
    eyebrow: 'Chapter 1',
    title: 'Why cybersecurity matters',
    bullets: [
      'Organisations depend on digital systems for nearly everything they do.',
      'Cybersecurity protects digital assets; information security protects information in any form — digital, printed or spoken.',
      'Laws and standards (GDPR, PCI DSS and others) raise the stakes for getting it wrong.',
    ],
    notes:
      'Draw the distinction clearly: cybersecurity is a subset focused on digital threats; information security is broader. Give the locked filing cabinet vs. encrypted database example.',
    accent: 'cyan',
  },
  {
    id: 'cia',
    eyebrow: 'Chapter 1',
    title: 'The CIA Triad',
    subtitle: 'The three goals behind every security decision',
    diagramId: 'cia-triad',
    notes:
      'Walk through Confidentiality (only authorised access), Integrity (accurate and unmodified), Availability (there when needed). Click each corner. Use the hospital scenario to make it concrete.',
    accent: 'cyan',
  },
  {
    id: 'risk',
    eyebrow: 'Chapter 2',
    title: 'Assets, threats, vulnerabilities and risk',
    diagramId: 'cyber-risk-development',
    bullets: [
      'Asset — something valuable (e.g. a student database).',
      'Vulnerability — a weakness (e.g. an unpatched app).',
      'Threat — something that can cause harm (e.g. an attacker).',
      'Risk — the possibility of loss when a threat exploits a vulnerability.',
    ],
    notes:
      'Stress that not every threat becomes an incident. Risk emerges when a threat meets a vulnerability on a valuable asset.',
    accent: 'danger',
  },
  {
    id: 'malware',
    eyebrow: 'Chapter 2',
    title: 'Malware & WannaCry',
    diagramId: 'wannacry-propagation',
    bullets: [
      'Virus, worm, Trojan and ransomware behave differently.',
      'WannaCry (2017) spread through unpatched Windows systems, disrupting healthcare.',
      'Patch management and preparedness dramatically reduce exposure.',
    ],
    notes:
      'Toggle patching in the diagram to show how exposure shrinks. Note: paying a ransom never guarantees recovery.',
    accent: 'danger',
  },
  {
    id: 'sbd',
    eyebrow: 'Chapter 3',
    title: 'Security by Design',
    diagramId: 'secure-sdlc',
    bullets: [
      'Build security in from the start — not bolted on afterwards.',
      'Every SDLC stage has security activities, from requirements to maintenance.',
      'Microsoft’s 2002 Trustworthy Computing initiative popularised secure development (the SDL).',
    ],
    notes:
      'Click through the lifecycle stages. Mention SQL injection and XSS as classic examples of what secure design prevents.',
    accent: 'teal',
  },
  {
    id: 'human',
    eyebrow: 'Chapter 4',
    title: 'Human threats & phishing',
    diagramId: 'phishing-anatomy',
    bullets: [
      'People are central — attacks exploit behaviour, and honest mistakes cause incidents.',
      'Social engineering: phishing, spear phishing, whaling, BEC, smishing, vishing.',
      'A supportive, blame-free culture makes reporting more likely.',
    ],
    notes:
      'Click the hotspots on the phishing email. Emphasise that HTTPS alone does not prove a site is legitimate.',
    accent: 'violet',
  },
  {
    id: 'physical',
    eyebrow: 'Chapter 5',
    title: 'Physical security',
    diagramId: 'defense-in-depth',
    bullets: [
      'Digital security fails if attackers gain physical access.',
      'Tailgating, clear-desk policies, device encryption and USB threats all matter.',
      'Defense in depth: layered controls so no single failure is catastrophic.',
    ],
    notes:
      'Click through the concentric layers. Reference the 2013 bank attacks involving impostor IT workers and planted hardware.',
    accent: 'warn',
  },
  {
    id: 'thirdparty',
    eyebrow: 'Chapter 6',
    title: 'Third-party risk & Target',
    diagramId: 'target-breach-path',
    bullets: [
      'Suppliers, contractors and cloud providers extend your attack surface.',
      'Target (2013): an HVAC supplier was compromised, then weak segmentation let attackers reach point-of-sale systems.',
      'Assess suppliers by data access, criticality and security practice.',
    ],
    notes:
      'Toggle network segmentation in the diagram to show how lateral movement could have been limited.',
    accent: 'cyan',
  },
  {
    id: 'riskmgmt',
    eyebrow: 'Chapter 7',
    title: 'Organisational risk management',
    diagramId: 'risk-matrix',
    bullets: [
      'Identify assets, threats and vulnerabilities; estimate likelihood and impact.',
      'Record findings in asset and risk registers.',
      'Risk score = likelihood × impact (an illustrative qualitative method).',
    ],
    notes:
      'Move the sliders to show how the risk rating changes. Clarify this is one qualitative approach, not a universal formula.',
    accent: 'teal',
  },
  {
    id: '4ts',
    eyebrow: 'Chapter 7',
    title: 'The four risk responses — 4Ts',
    diagramId: 'risk-treatment-tree',
    bullets: [
      'Tolerate — accept within criteria.',
      'Treat — apply controls to reduce likelihood or impact.',
      'Transfer — share financial consequences (e.g. insurance).',
      'Terminate — stop the risky activity.',
    ],
    notes:
      'Remind the audience that accountability cannot be fully transferred, even when some financial risk is.',
    accent: 'teal',
  },
  {
    id: 'ir',
    eyebrow: 'Chapter 8',
    title: 'Incident response & resilience',
    diagramId: 'incident-response-lifecycle',
    bullets: [
      'Perfect security is impossible — prepare to respond and recover.',
      'An event may affect security; an incident has affected it.',
      'Detect → escalate → contain → investigate → recover → review.',
    ],
    notes:
      'Walk the lifecycle. Note this is an illustrative operational sequence, not an exact textbook prescription.',
    accent: 'warn',
  },
  {
    id: 'bcdr',
    eyebrow: 'Chapter 8',
    title: 'Continuity vs. disaster recovery',
    diagramId: 'continuity-vs-recovery',
    bullets: [
      'Business continuity keeps critical functions running.',
      'Disaster recovery restores the technical systems and infrastructure.',
      'Tested, isolated backups are the backbone of recovery.',
    ],
    notes:
      'Use the split-screen university ransomware example: operations continue through alternatives while IT restores systems.',
    accent: 'warn',
  },
  {
    id: 'standards',
    eyebrow: 'Chapter 9',
    title: 'Standards & the NIST CSF',
    diagramId: 'nist-csf',
    bullets: [
      'Cyber Essentials: five foundational controls.',
      'ISO 27001: an Information Security Management System (ISMS).',
      'NIST CSF: Identify, Protect, Detect, Respond, Recover — plus Govern in CSF 2.0.',
    ],
    notes:
      'Toggle the original five-function model and CSF 2.0. Distinguish implementing a standard from being certified against it.',
    accent: 'violet',
  },
  {
    id: 'close',
    title: 'Final lessons',
    subtitle: 'Security is a continuous process, not a one-time project',
    bullets: [
      'Understand your assets, threats and vulnerabilities.',
      'Build security in, support your people, and protect the physical world too.',
      'Assume incidents will happen — and be ready to recover.',
      'Use recognised frameworks to stay structured and keep improving.',
    ],
    notes:
      'Close by tying it back to resilience: understand the threats, master the defenses, build resilience. Thank the audience and invite questions.',
    accent: 'cyan',
    kind: 'closing',
  },
]
