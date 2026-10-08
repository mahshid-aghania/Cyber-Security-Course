import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 2,
  slug: "cybersecurity-threats",
  title: "Cybersecurity Threats",
  subtitle: "Assets, vulnerabilities, threat actors and malware",
  summary: "The language of threats, the people behind them, the malware they wield, and why not every threat becomes a disaster.",
  minutes: 13,
  accent: "danger",
  icon: "Bug",
  objectives: [
    "Define asset, threat, vulnerability and risk, and explain how they relate.",
    "Trace how an asset with a vulnerability can be exploited to cause impact.",
    "Identify the main types of threat actor and the motivations that drive them.",
    "Distinguish the major categories of malware and how each spreads.",
    "Explain why paying a ransom does not guarantee recovery.",
    "Draw lessons from the 2017 WannaCry outbreak about patching and preparedness.",
  ],
  sections: [
    {
      id: 'threat-terminology',
      title: 'The language of threats',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Security conversations fall apart when people use words loosely. Four terms do most of the work — **asset**, **threat**, **vulnerability** and **risk** — and keeping them straight lets you reason clearly about what could go wrong.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'An **asset** is something of value. A **vulnerability** is a weakness in that asset. A **threat** is something that could exploit the weakness. **Risk** is the combination of how likely that is and how bad the impact would be.',
        },
        {
          kind: 'definition',
          term: 'Asset',
          definition: 'Anything of value to the organisation that is worth protecting.',
          example: 'A university\'s student database holding grades and personal details.',
        },
        {
          kind: 'definition',
          term: 'Vulnerability',
          definition: 'A weakness that could be exploited to harm an asset.',
          example: 'A web application running unpatched software with a known flaw.',
        },
        {
          kind: 'definition',
          term: 'Threat',
          definition: 'A potential cause of an unwanted event — a person, group or circumstance that could exploit a vulnerability.',
          example: 'An attacker scanning the internet for unpatched applications to break into.',
        },
        {
          kind: 'definition',
          term: 'Risk',
          definition: 'The likelihood that a threat exploits a vulnerability, combined with the impact if it does.',
          example: 'The chance that the attacker reaches the student database, times the damage caused.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Not every threat becomes an incident',
          text: 'A threat only causes harm if it meets a matching vulnerability and nothing stops it in time. An attacker (threat) targeting a fully patched, well-monitored system may achieve nothing. **Threats are constant; incidents are the ones that get through.** This is the idea that the risk chapters build on later.',
        },
        {
          kind: 'heading',
          text: 'How the pieces connect',
        },
        {
          kind: 'paragraph',
          text: 'Picture the chain from a quiet asset to real damage. It is this chain — not any single word — that security work tries to break, usually by removing the vulnerability or detecting the threat before it finishes.',
        },
        { kind: 'diagram', id: 'cyber-risk-development' },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Reading the chain',
          text: 'Follow it with the university example: the **asset** is the student database; the **vulnerability** is an unpatched application; the **threat exploitation** is an attacker using that flaw; the **possible impact** is unauthorised access to thousands of students\' records. Patch the application and the chain breaks at step two.',
        },
      ],
    },
    {
      id: 'threat-actors',
      title: 'Who is behind the threats',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Threats do not appear from nowhere. Behind most of them is a **threat actor** — a person or group with a reason to act. Knowing the likely actor helps predict how they will behave and what they are after.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'Threat actors range from lone **cybercriminals** and **organised crime** groups to **hacktivists**, **nation-state or state-supported** groups, and insiders who may be either **malicious** or **accidental**.',
        },
        {
          kind: 'list',
          items: [
            '**Cybercriminals** — mostly after money, through theft, fraud or extortion.',
            '**Organised crime** — larger, structured groups treating attacks as a business, driven by financial gain.',
            '**Hacktivists** — motivated by ideology, aiming to make a point or disrupt a target they oppose.',
            '**Nation-state or state-supported groups** — resourced and patient, often pursuing espionage or strategic disruption.',
            '**Malicious insiders** — employees or partners who abuse legitimate access, sometimes out of revenge.',
            '**Accidental insiders** — people who cause harm through human error, with no bad intent at all.',
          ],
        },
        {
          kind: 'heading',
          text: 'Motivations',
        },
        {
          kind: 'paragraph',
          text: 'The common motivations are **financial gain**, **espionage**, **ideology**, **disruption**, **revenge** and plain **human error**. A single incident can involve more than one — an insider might act from revenge and carelessness at once.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Example',
          text: 'A bank might face cybercriminals chasing account funds, a hacktivist defacing its public site over a policy stance, and a departing employee copying client lists on the way out. Same target, three very different actors and motives — and three different defences.',
        },
      ],
    },
    {
      id: 'malware',
      title: 'Malware: the attacker\'s toolkit',
      blocks: [
        {
          kind: 'paragraph',
          text: '**Malware** — malicious software — is one of the most common ways threats turn into incidents. The main types differ mostly in how they spread and what they do once inside.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'A **virus** attaches to a host file and replicates when that file runs. A **worm** is self-replicating and needs no host, spreading on its own across networks. A **Trojan** disguises itself as something legitimate. **Ransomware** encrypts or blocks access to data and demands payment.',
        },
        { kind: 'diagram', id: 'malware-lab' },
        {
          kind: 'definition',
          term: 'Virus',
          definition: 'Malware that attaches to a host file and replicates when that file is executed by a user.',
          example: 'A booby-trapped document that infects other files once a staff member opens it.',
        },
        {
          kind: 'definition',
          term: 'Worm',
          definition: 'Self-replicating malware that needs no host file and spreads by itself across networks.',
          example: 'A worm that hops from one hospital workstation to the next with no one clicking anything.',
        },
        {
          kind: 'definition',
          term: 'Trojan',
          definition: 'Malware disguised as a legitimate program to trick someone into running it.',
          example: 'A fake "invoice viewer" that installs a backdoor when an accounts clerk opens it.',
        },
        {
          kind: 'definition',
          term: 'Ransomware',
          definition: 'Malware that encrypts or blocks access to data and demands payment to restore it.',
          example: 'Files across a bank\'s shared drive are locked overnight, with a note demanding payment.',
        },
        {
          kind: 'callout',
          tone: 'danger',
          title: 'Paying does not guarantee recovery',
          text: 'With ransomware, paying the demand does **not** guarantee the data comes back. Attackers may vanish, provide broken decryption, or return later. This is why **good backups** and **preparedness** — not payment — are the real defence, a point the WannaCry case drives home.',
        },
      ],
    },
    {
      id: 'wannacry',
      title: 'Case study: WannaCry, 2017',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In 2017 the **WannaCry** ransomware swept across the world in a matter of hours. It is a textbook example of how a single unpatched vulnerability, combined with worm-like spreading, can cause damage on an enormous scale.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'WannaCry was a ransomware outbreak that exploited a vulnerability in **older, unpatched Windows systems**. Its worm-like spreading let it propagate rapidly between machines, and the disruption it caused — including in healthcare — showed how fragile unmaintained systems can be.',
        },
        { kind: 'diagram', id: 'wannacry-propagation' },
        {
          kind: 'callout',
          tone: 'info',
          title: 'An illustration, not an exact reconstruction',
          text: 'The propagation diagram above is a **simplified illustration** of how such an outbreak spreads from machine to machine. It is meant to build intuition, not to reconstruct the precise technical events of 2017.',
        },
        {
          kind: 'heading',
          text: 'Why it spread so far',
        },
        {
          kind: 'list',
          items: [
            'It combined **ransomware** (locking files) with **worm-like spreading**, so it moved without anyone clicking.',
            'Many systems were **unpatched**, leaving the same weakness open across whole networks.',
            'In healthcare, locked systems meant **real disruption to care**, not just inconvenience.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'The lesson',
          text: 'WannaCry is really a lesson about **patch management** and **preparedness**. A patch for the underlying weakness existed; systems that applied it were protected. Keeping software current and holding tested backups would have blunted the outbreak far more than any ransom payment could.',
        },
      ],
    },
  ],
  definitions: [
    {
      term: 'Asset',
      definition: 'Anything of value to an organisation that is worth protecting.',
      example: 'A university student-records database.',
    },
    {
      term: 'Vulnerability',
      definition: 'A weakness in an asset that could be exploited to cause harm.',
      example: 'An unpatched web application with a known flaw.',
    },
    {
      term: 'Threat',
      definition: 'A potential cause of an unwanted event that could exploit a vulnerability.',
      example: 'An attacker scanning for unpatched applications.',
    },
    {
      term: 'Risk',
      definition: 'The likelihood of a threat exploiting a vulnerability, combined with the resulting impact.',
      example: 'The chance an attacker reaches the database, weighed against the harm done.',
    },
    {
      term: 'Threat actor',
      definition: 'A person or group responsible for a threat, with a motivation for acting.',
      example: 'An organised-crime group running extortion for financial gain.',
    },
    {
      term: 'Malware',
      definition: 'Malicious software designed to damage, disrupt or gain unauthorised access to systems.',
      example: 'A Trojan that installs a backdoor when opened.',
    },
    {
      term: 'Worm',
      definition: 'Self-replicating malware that spreads across networks without needing a host file.',
      example: 'Malware that moves from one hospital workstation to another unaided.',
    },
    {
      term: 'Ransomware',
      definition: 'Malware that encrypts or blocks access to data and demands payment to restore it.',
      example: 'A bank\'s shared files locked overnight with a payment demand.',
    },
  ],
  misconceptions: [
    {
      myth: 'Every threat leads to a security incident.',
      reality: 'A threat only causes harm if it meets a matching vulnerability and defences fail to stop it. Many threats come to nothing.',
    },
    {
      myth: 'Paying a ransom reliably gets your data back.',
      reality: 'Payment offers no guarantee — attackers may not provide working decryption or may return later. Backups and preparedness are the real defence.',
    },
    {
      myth: 'All insiders who cause breaches are malicious.',
      reality: 'Many incidents come from accidental insiders making honest mistakes, with no intent to cause harm.',
    },
    {
      myth: 'Viruses and worms are just two names for the same thing.',
      reality: 'A virus needs a host file and user execution to spread; a worm self-replicates across networks with no host and no clicks.',
    },
  ],
  takeaways: [
    'Security begins with understanding your assets, their vulnerabilities, the threats against them, the methods used, and the possible impacts.',
    'Threats are constant, but only become incidents when they meet an unaddressed vulnerability.',
    'Knowing the likely threat actor and motivation helps you anticipate and defend against an attack.',
    'Malware types differ mainly in how they spread — host-bound virus, self-spreading worm, disguised Trojan, data-locking ransomware.',
    'WannaCry shows that patch management and tested backups protect far better than paying a ransom ever could.',
  ],
  presentationSummary: [
    'Four terms anchor threat analysis: asset, vulnerability, threat and risk.',
    'The risk chain runs asset → vulnerability → threat exploitation → possible impact.',
    'Threat actors span cybercriminals, organised crime, hacktivists, nation-states and insiders.',
    'Motivations include financial gain, espionage, ideology, disruption, revenge and human error.',
    'Malware categories — virus, worm, Trojan, ransomware — differ in how they spread and act.',
    'WannaCry 2017 underlines patching and preparedness; paying a ransom guarantees nothing.',
  ],
  diagramIds: ["cyber-risk-development", "malware-lab", "wannacry-propagation"],
  relatedCaseStudies: ['wannacry'],
}

export default chapter
