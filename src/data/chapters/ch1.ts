import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 1,
  slug: "introduction-to-cybersecurity",
  title: "Introduction to Cybersecurity",
  subtitle: "Foundations, the CIA triad and the legal landscape",
  summary: "What cybersecurity really protects, the three goals every defence serves, and the laws that keep organisations honest.",
  minutes: 11,
  accent: "cyan",
  icon: "ShieldCheck",
  objectives: [
    "Explain the difference between cybersecurity and the broader field of information security.",
    "Describe the three goals of the CIA triad and give a practical control for each.",
    "Recognise everyday assets that need protecting, in digital, printed and spoken form.",
    "Distinguish between laws and regulations and voluntary industry standards.",
    "Name key data-protection and payment-security frameworks and when they might apply.",
  ],
  sections: [
    {
      id: 'what-is-cybersecurity',
      title: 'Cybersecurity vs information security',
      blocks: [
        {
          kind: 'paragraph',
          text: 'People often use **cybersecurity** and **information security** as if they mean the same thing, but one sits inside the other. Information security is the wider discipline: it protects information in every form it can take. Cybersecurity is the part of that discipline focused specifically on digital systems, networks and the data they hold.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'Information can exist in **digital** form (files on a server), in **printed** form (documents in a cabinet) and in **spoken** form (a conversation about a patient). Information security is concerned with protecting information in all of these states.',
        },
        {
          kind: 'paragraph',
          text: 'This matters because an organisation can have excellent firewalls and still leak sensitive information through a filing cabinet left unlocked or a careless conversation overheard in a corridor. The two fields overlap heavily, but keeping the distinction clear helps you see where a digital control is the right answer and where a physical or human one is needed.',
        },
        {
          kind: 'heading',
          text: 'Seeing the difference in practice',
        },
        {
          kind: 'compare',
          left: {
            title: 'Cybersecurity focus',
            points: [
              'Protecting a **university student-records database** from hackers.',
              'Encrypting a **laptop** so stolen data stays unreadable.',
              'Blocking malicious traffic aimed at an **online shop** during checkout.',
            ],
          },
          right: {
            title: 'Wider information security focus',
            points: [
              'Locking a **cabinet** of printed admissions paperwork.',
              'Shredding old **patient printouts** before disposal.',
              'Training staff not to discuss **account details** in public areas.',
            ],
          },
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Worked example',
          text: 'Imagine a hospital holds a patient record. The digital copy is protected by cybersecurity (encrypted storage, access controls). The printed copy at the nurses\' station is protected by information security practices (a locked drawer). The spoken version — a doctor describing the case — is protected by behaviour and policy. **Same information, three states, three kinds of protection.**',
        },
      ],
    },
    {
      id: 'cia-triad',
      title: 'The CIA triad',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Almost every security control exists to support one of three goals, known together as the **CIA triad**: Confidentiality, Integrity and Availability. If you can say which of the three a control is protecting, you understand why it is there.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'The **CIA triad** is the foundational model of information security. Confidentiality keeps data from the wrong eyes, Integrity keeps data accurate and unaltered, and Availability keeps data and systems usable when they are needed.',
        },
        { kind: 'diagram', id: 'cia-triad' },
        {
          kind: 'heading',
          text: 'Confidentiality',
        },
        {
          kind: 'paragraph',
          text: '**Confidentiality** means only authorised people can see information. It matters because exposed data — grades, medical history, card numbers — can cause real harm. Typical controls include **passwords**, **encryption**, **access control** (giving each person only the access they need) and **multi-factor authentication (MFA)**.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Example',
          text: 'A university enforces MFA on the student portal, so a stolen password alone is not enough to open someone\'s transcript. Access control also means a library clerk cannot see exam results they have no reason to view.',
        },
        {
          kind: 'heading',
          text: 'Integrity',
        },
        {
          kind: 'paragraph',
          text: '**Integrity** means information stays accurate and is not changed without authorisation. A bank balance that silently changes, or a grade quietly edited, is an integrity failure. Controls include **hashing** (a fingerprint that reveals tampering), **audit logs** (a record of who changed what), **file integrity monitoring** and formal **change procedures**.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'A bank stores a hash of each transaction record. If a single digit in an account balance is altered, the recomputed hash no longer matches, and the tampering is caught. Audit logs then show exactly which account touched the record.',
        },
        {
          kind: 'heading',
          text: 'Availability',
        },
        {
          kind: 'paragraph',
          text: '**Availability** means systems and data are there when people need them. An online shop that is down during a sale, or a hospital system unreachable in an emergency, is an availability failure. Controls include **backups**, **redundancy** (spare systems ready to take over), **disaster recovery** planning and **DDoS protection** that absorbs floods of malicious traffic.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Example',
          text: 'An online shop keeps its catalogue on redundant servers and uses DDoS protection so a traffic flood during a big sale cannot knock checkout offline. Nightly backups mean that even a serious failure does not lose customer orders.',
        },
        {
          kind: 'paragraph',
          text: 'The three goals pull against each other in healthy ways. Locking data down tightly (confidentiality) can make it harder to reach quickly (availability). Good security is the balance that fits the situation — a theme you will see again in later chapters on risk and secure design.',
        },
      ],
    },
    {
      id: 'assets-everywhere',
      title: 'Identifying what you protect',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Before choosing controls, you have to know what is worth protecting. Security starts with recognising your **assets** — anything of value to the organisation and its people.',
        },
        {
          kind: 'list',
          items: [
            'A university\'s **student-records database**, holding grades, fees and personal details.',
            'A hospital\'s **patient information** across digital files, printouts and conversations.',
            'A bank\'s **transaction systems** and the trust customers place in them.',
            'An online shop\'s **customer accounts** and stored payment information.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'In practice',
          text: 'A good habit is to ask, for any asset: **who would want this, what would it cost us if it were exposed, changed or unavailable, and what state does it live in?** Those questions map directly onto the CIA triad and the digital, printed and spoken forms above.',
        },
      ],
    },
    {
      id: 'laws-and-standards',
      title: 'Laws, regulations and standards',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Organisations do not get to decide their security goals entirely on their own. **Laws and regulations** can compel them, and **industry standards** set expected good practice. The difference matters: breaking a law can bring legal penalties, while a standard is usually a voluntary (though sometimes contractually required) benchmark.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'A **law or regulation** is imposed by a government or authority and carries legal force. An **industry standard** is agreed within a sector as good practice; it may be required by contract or by a partner, but it is not itself legislation.',
        },
        { kind: 'diagram', id: 'regulation-explorer' },
        {
          kind: 'heading',
          text: 'Data-protection laws and regulations',
        },
        {
          kind: 'list',
          items: [
            '**GDPR** — the European Union\'s General Data Protection Regulation, governing how personal data of people in the EU is collected and handled.',
            '**NIS-related requirements** — European cybersecurity rules aimed at operators of important and essential services, raising the baseline for network and information system security.',
            '**CCPA** — the California Consumer Privacy Act, giving California residents rights over their personal information.',
            '**LGPD** — Brazil\'s Lei Geral de Proteção de Dados, Brazil\'s general data-protection law, broadly comparable in spirit to GDPR.',
          ],
        },
        {
          kind: 'heading',
          text: 'A payment-security standard',
        },
        {
          kind: 'definition',
          term: 'PCI DSS',
          definition: 'The Payment Card Industry Data Security Standard, a set of security requirements for organisations that handle payment card data. It is an industry standard rather than a government law, but card brands and banks typically require it by contract.',
          example: 'An online shop that stores or processes card payments is expected to meet PCI DSS, for instance by not keeping full card numbers in plain text.',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Applicability depends on circumstances',
          text: 'Whether any of these frameworks applies to a given organisation depends on factors such as where it operates, whose data it handles and what services it provides. This chapter introduces them so you recognise the landscape — it is **not legal advice**, and real decisions should involve qualified specialists.',
        },
      ],
    },
  ],
  definitions: [
    {
      term: 'Information security',
      definition: 'The practice of protecting information in all its forms — digital, printed and spoken — against unauthorised access, change or loss.',
      example: 'Locking a cabinet of printed admissions records is an information security measure.',
    },
    {
      term: 'Cybersecurity',
      definition: 'The part of information security focused on protecting digital systems, networks and the data they hold.',
      example: 'Encrypting a university student-records database to defend it from hackers.',
    },
    {
      term: 'Confidentiality',
      definition: 'Ensuring that only authorised people can access information.',
      example: 'Requiring multi-factor authentication before a student can view their transcript.',
    },
    {
      term: 'Integrity',
      definition: 'Ensuring information stays accurate and is not altered without authorisation.',
      example: 'Using hashing so that any change to a bank transaction record is detectable.',
    },
    {
      term: 'Availability',
      definition: 'Ensuring that systems and data are usable when legitimate users need them.',
      example: 'Keeping redundant servers so an online shop stays online during a sale.',
    },
    {
      term: 'Multi-factor authentication (MFA)',
      definition: 'Requiring two or more independent proofs of identity, so a stolen password alone is not enough to log in.',
      example: 'A password plus a one-time code sent to a phone when signing into a hospital system.',
    },
    {
      term: 'Industry standard',
      definition: 'An agreed benchmark of good practice within a sector, which may be required by contract but is not itself legislation.',
      example: 'PCI DSS is a standard that card brands require of merchants who handle card data.',
    },
    {
      term: 'Regulation',
      definition: 'A rule imposed by a government or authority that carries legal force and potential penalties.',
      example: 'GDPR regulates how organisations handle the personal data of people in the EU.',
    },
  ],
  misconceptions: [
    {
      myth: 'Cybersecurity and information security are the same thing.',
      reality: 'Cybersecurity is the digital subset of the broader field of information security, which also covers printed and spoken information.',
    },
    {
      myth: 'Security is only about keeping secrets (confidentiality).',
      reality: 'Confidentiality is only one of three goals. Integrity (accuracy) and availability (being usable when needed) matter just as much.',
    },
    {
      myth: 'If data is encrypted, it is fully secure.',
      reality: 'Encryption mainly protects confidentiality. Data can still be corrupted, deleted or made unavailable, so other controls are still needed.',
    },
    {
      myth: 'Following a standard like PCI DSS is the same as obeying the law.',
      reality: 'Standards are agreed good practice, often required by contract, but they are not legislation. Laws such as GDPR carry separate legal force.',
    },
  ],
  takeaways: [
    'Cybersecurity protects digital assets; information security protects information broadly, in digital, printed and spoken form.',
    'The CIA triad — Confidentiality, Integrity, Availability — is the foundation that almost every control supports.',
    'Good security balances the three CIA goals rather than maximising any one of them in isolation.',
    'Laws and regulations carry legal force, while industry standards set agreed good practice.',
    'Which frameworks apply depends on the organisation\'s circumstances, so this is an introduction, not legal advice.',
  ],
  presentationSummary: [
    'Information security protects information in all forms; cybersecurity is its digital subset.',
    'Information lives in digital, printed and spoken states, each needing its own protection.',
    'The CIA triad sets three goals: confidentiality, integrity and availability.',
    'Each goal maps to concrete controls, from MFA and encryption to backups and DDoS protection.',
    'Laws and regulations (GDPR, NIS, CCPA, LGPD) differ from industry standards (PCI DSS).',
    'Applicability varies by circumstance — recognise the landscape, and seek specialists for real decisions.',
  ],
  diagramIds: ["cia-triad", "regulation-explorer"],
  relatedCaseStudies: [],
}

export default chapter
