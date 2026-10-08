import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 9,
  slug: "standards-and-frameworks",
  title: "Standards and Frameworks",
  subtitle: "Cyber Essentials, ISO 27001 and NIST CSF",
  summary: "Established standards and frameworks give organisations proven ways to organise, implement, assess and improve their cybersecurity — and to demonstrate it to others.",
  minutes: 14,
  accent: "violet",
  icon: "Award",
  objectives: [
    "Explain how standards and frameworks help organise, implement, assess and improve cybersecurity.",
    "Distinguish standards, frameworks, certification, self-assessment and independent verification.",
    "Describe the five foundational controls of Cyber Essentials and the role of Cyber Essentials Plus.",
    "Explain what an ISO 27001 Information Security Management System (ISMS) involves.",
    "Summarise the purpose of ISO 27701, ISO 22301 and the NIST Cybersecurity Framework.",
    "Recognise the difference between older and newer editions of these standards.",
  ],
  sections: [
    {
      id: 'why-standards',
      title: 'Why standards and frameworks exist',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Standards and frameworks provide established approaches to organise, implement, assess and improve cybersecurity. Rather than inventing their own approach, organisations can adopt recognised good practice.',
        },
        {
          kind: 'paragraph',
          text: 'Nobody needs to design security from scratch. Standards and frameworks package years of collective experience into structures an organisation can follow, and following one brings benefits beyond the controls themselves.',
        },
        {
          kind: 'list',
          items: [
            '**Recognised good practices** — proven approaches instead of guesswork.',
            '**Comprehensive coverage** — fewer important areas overlooked.',
            '**Customer confidence** — evidence that security is taken seriously.',
            '**Business requirements** — meeting conditions set by partners or contracts.',
            '**Improved consistency** — the same standard applied across the organisation.',
            '**Continuous improvement** — a cycle built into the approach.',
            '**Fewer repeated audits** — potential reduction in repeated supplier audits.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Standards, frameworks and assurance',
          text: 'These terms are related but different, and mixing them up is common. The comparison below separates them.',
        },
        {
          kind: 'compare',
          left: {
            title: 'Standard vs framework',
            points: [
              '**Standard** — a defined set of requirements you can measure against.',
              '**Framework** — a flexible structure of functions or outcomes to organise around.',
              'A standard says what must be met; a framework helps you organise how.',
            ],
          },
          right: {
            title: 'Certification vs self-assessment vs verification',
            points: [
              '**Self-assessment** — the organisation judges itself against the requirements.',
              '**Independent verification** — an outside party checks the claims.',
              '**Certification** — formal, independently verified confirmation of conformity.',
              'Implementing a standard is **not** the same as being certified against it.',
            ],
          },
        },
      ],
    },
    {
      id: 'cyber-essentials',
      title: 'Cyber Essentials',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Cyber Essentials sets out five foundational technical controls that protect against common cyber attacks: secure configuration, secure networks, access control, patch management and malware protection.',
        },
        {
          kind: 'list',
          items: [
            '**Secure configuration** — set up systems securely rather than leaving defaults.',
            '**Secure networks** — protect connections, for example with firewalls.',
            '**Access control** — give people only the access they need.',
            '**Patch management** — keep software up to date against known flaws.',
            '**Malware protection** — defend against malicious software.',
          ],
        },
        {
          kind: 'diagram',
          id: 'five-foundations',
        },
        {
          kind: 'heading',
          text: 'Cyber Essentials vs Cyber Essentials Plus',
        },
        {
          kind: 'compare',
          left: {
            title: 'Cyber Essentials',
            points: [
              'Based on a **self-assessment** against the five controls.',
              'The organisation reports how it meets each control.',
              'A lighter-weight route to demonstrating the basics.',
            ],
          },
          right: {
            title: 'Cyber Essentials Plus',
            points: [
              'Adds **independent, hands-on technical verification**.',
              'An assessor tests that the controls are really in place.',
              'Gives greater assurance than self-assessment alone.',
            ],
          },
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'A small business might start with Cyber Essentials to show customers it has the basics covered, then move to Cyber Essentials Plus when a client contract requires independently verified assurance.',
        },
      ],
    },
    {
      id: 'iso-27001',
      title: 'ISO 27001 and the ISMS',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'ISO 27001 defines an Information Security Management System (ISMS): a structured approach built on risk assessment, policies, clear responsibilities, appropriate controls, monitoring, internal review and continuous improvement, with the option of independent certification.',
        },
        {
          kind: 'paragraph',
          text: 'Where Cyber Essentials focuses on a handful of technical controls, ISO 27001 governs security management across the whole organisation. An ISMS is a repeating cycle rather than a fixed checklist.',
        },
        {
          kind: 'list',
          items: [
            '**Risk assessment** — understand the risks the organisation faces.',
            '**Policies** — set the rules and expectations for security.',
            '**Responsibilities** — make clear who is accountable for what.',
            '**Appropriate controls** — apply controls suited to the risks.',
            '**Monitoring** — watch that controls work and conditions change.',
            '**Internal review** — check the system against its own requirements.',
            '**Continuous improvement** — refine the system over time.',
            '**Independent certification** — optional external confirmation of conformity.',
          ],
        },
        {
          kind: 'diagram',
          id: 'isms-cycle',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Edition note: 114 vs 93 controls',
          text: 'The textbook references **114 controls** from the older edition of ISO 27001. The current **ISO/IEC 27001:2022** reorganised these into **93 Annex A controls** across four groups (organisational, people, physical and technological). Both numbers are correct for their own edition — be clear about which edition is being discussed.',
        },
      ],
    },
    {
      id: 'related-iso',
      title: 'ISO 27701 and ISO 22301',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'ISO 27701 extends information security management to privacy, covering the protection of personally identifiable information (a privacy information management system). ISO 22301 addresses business continuity management and complements ISO 27001.',
        },
        {
          kind: 'list',
          items: [
            '**ISO 27701** — privacy information management, focused on protecting personally identifiable information. It extends an ISO 27001 ISMS toward privacy.',
            '**ISO 22301** — business continuity management, focused on keeping critical functions running through disruption. It complements ISO 27001.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'A family that fits together',
          text: 'These standards are designed to work alongside ISO 27001 rather than replace it, so an organisation can build security, privacy and continuity management on a common foundation.',
        },
      ],
    },
    {
      id: 'nist-csf',
      title: 'The NIST Cybersecurity Framework',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'The NIST Cybersecurity Framework organises cybersecurity around five core functions: Identify, Protect, Detect, Respond and Recover.',
        },
        {
          kind: 'list',
          items: [
            '**Identify** — understand assets, risks and context.',
            '**Protect** — put safeguards in place.',
            '**Detect** — spot cybersecurity events.',
            '**Respond** — act on detected incidents.',
            '**Recover** — restore capabilities after an incident.',
          ],
        },
        {
          kind: 'diagram',
          id: 'nist-csf',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Edition note: NIST CSF 2.0 adds Govern',
          text: 'The five functions above are from the edition the textbook describes. The newer **NIST CSF 2.0** adds a sixth function, **Govern**, which wraps around the others to address organisational strategy, roles, policy and oversight. Do not mix the two editions without saying which one you mean: the original has five functions, and CSF 2.0 has six.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Comparing the standards',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Each standard or framework has a different primary purpose, focus and typical use. The summary below places them side by side.',
        },
        {
          kind: 'list',
          items: [
            '**Cyber Essentials** — purpose: establish baseline technical controls; focus: five foundational controls; target: organisations of many sizes, especially smaller ones; assurance: self-assessment, with independent verification in Cyber Essentials Plus; typical use: demonstrating the basics to customers or for contracts.',
            '**ISO 27001** — purpose: manage information security organisation-wide; focus: a full ISMS; target: organisations wanting comprehensive, auditable management; assurance: independent certification available; typical use: broad assurance to partners and regulators.',
            '**ISO 27701** — purpose: manage privacy; focus: protecting personally identifiable information; target: organisations handling personal data; assurance: extends an ISO 27001 ISMS; typical use: demonstrating privacy management.',
            '**ISO 22301** — purpose: manage business continuity; focus: keeping critical functions running; target: organisations needing continuity assurance; assurance: complements ISO 27001; typical use: resilience and continuity planning.',
            '**NIST CSF** — purpose: organise and improve cybersecurity; focus: core functions (five, or six in CSF 2.0 with Govern); target: organisations of any size seeking a flexible structure; assurance: a framework for self-organisation and improvement; typical use: structuring and communicating a security programme.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'NIST does not certify against the CSF',
          text: 'The NIST Cybersecurity Framework is a framework for organising and improving security, not a certification scheme. NIST does not officially certify organisations against the CSF, so describe it as a structure to adopt rather than a badge to earn.',
        },
      ],
    },
  ],
  definitions: [
    {
      term: "Standard",
      definition: "A defined set of requirements an organisation can be measured against.",
      example: "ISO 27001, which sets requirements for an information security management system.",
    },
    {
      term: "Framework",
      definition: "A flexible structure of functions or outcomes used to organise and improve security.",
      example: "The NIST Cybersecurity Framework and its core functions.",
    },
    {
      term: "Certification",
      definition: "Formal, independently verified confirmation that an organisation conforms to a standard.",
      example: "An external auditor certifying a company against ISO 27001.",
    },
    {
      term: "Cyber Essentials",
      definition: "A scheme of five foundational technical controls, assessed by self-assessment, protecting against common attacks.",
      example: "A business meeting the five controls and declaring its compliance.",
    },
    {
      term: "Cyber Essentials Plus",
      definition: "Cyber Essentials with added independent, hands-on technical verification of the controls.",
      example: "An assessor testing that patching and malware protection are genuinely in place.",
    },
    {
      term: "Information Security Management System (ISMS)",
      definition: "The structured, organisation-wide approach to managing information security defined by ISO 27001.",
      example: "A company's risk assessments, policies, controls and reviews managed as one system.",
    },
    {
      term: "ISO 27701",
      definition: "A standard for privacy information management, focused on protecting personally identifiable information, extending ISO 27001.",
      example: "Adding privacy management on top of an existing ISO 27001 ISMS.",
    },
    {
      term: "NIST Cybersecurity Framework",
      definition: "A framework that organises cybersecurity around core functions — Identify, Protect, Detect, Respond and Recover, with Govern added in CSF 2.0.",
      example: "Using the functions to structure and communicate a security programme.",
    },
  ],
  misconceptions: [
    {
      myth: "Implementing a standard is the same as being certified against it.",
      reality: "Implementation means meeting the requirements; certification is separate, independently verified confirmation.",
    },
    {
      myth: "Cyber Essentials and Cyber Essentials Plus are the same thing.",
      reality: "Cyber Essentials is self-assessed, while Cyber Essentials Plus adds independent, hands-on technical verification.",
    },
    {
      myth: "ISO 27001 always lists 114 controls and NIST CSF always has five functions.",
      reality: "ISO/IEC 27001:2022 uses 93 Annex A controls, and NIST CSF 2.0 adds a sixth function, Govern — editions matter.",
    },
    {
      myth: "You can get officially certified against the NIST Cybersecurity Framework.",
      reality: "The CSF is a framework to organise and improve security; NIST does not officially certify organisations against it.",
    },
  ],
  takeaways: [
    "Standards and frameworks offer recognised ways to organise, implement, assess and improve cybersecurity.",
    "Standards, frameworks, self-assessment, independent verification and certification are related but distinct.",
    "Cyber Essentials covers five foundational controls; Cyber Essentials Plus adds independent verification.",
    "ISO 27001 defines an ISMS; related standards ISO 27701 (privacy) and ISO 22301 (continuity) complement it.",
    "The NIST CSF organises security into functions — five originally, six in CSF 2.0 with Govern.",
  ],
  presentationSummary: [
    "Standards and frameworks provide proven ways to organise, implement, assess and improve cybersecurity.",
    "Distinguish standard, framework, self-assessment, independent verification and certification.",
    "Cyber Essentials = five controls (self-assessed); Cyber Essentials Plus adds hands-on verification.",
    "ISO 27001 defines an ISMS; note 114 controls (older) vs 93 Annex A controls (ISO/IEC 27001:2022).",
    "ISO 27701 (privacy) and ISO 22301 (continuity) complement ISO 27001.",
    "NIST CSF: Identify, Protect, Detect, Respond, Recover — plus Govern in CSF 2.0; it is not a certification.",
  ],
  diagramIds: ["five-foundations", "isms-cycle", "nist-csf"],
  relatedCaseStudies: [],
}

export default chapter
