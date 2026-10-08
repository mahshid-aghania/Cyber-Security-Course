import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 4,
  slug: "human-threats",
  title: "Human Threats",
  subtitle: "Insiders, culture and social engineering",
  summary: "Why people are the most targeted part of any security system, and how training and culture protect them.",
  minutes: 13,
  accent: "violet",
  icon: "Users",
  objectives: [
    "Explain why people are central to cybersecurity and how ordinary mistakes lead to incidents.",
    "Distinguish between malicious and accidental insider threats.",
    "Describe how security awareness, training and a supportive culture reduce human risk.",
    "Define social engineering and identify the main types of phishing (phishing, spear phishing, whaling, BEC, smishing, vishing).",
    "Recognise the stages of a social engineering attack and the warning signs in a phishing email.",
    "Apply safe practices for social media use and remote working.",
  ],
  sections: [
    {
      id: 'people-at-the-centre',
      title: 'People at the centre of security',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Many security incidents happen not because technology failed, but because an attacker exploited human behaviour, or because an ordinary person made an ordinary mistake. People are a central part of every security system.',
        },
        {
          kind: 'paragraph',
          text: 'Firewalls, encryption and strong passwords all matter, but every one of these controls is set up, used and sometimes bypassed by a human being. **An attacker who cannot break the technology will instead try to deceive the person who operates it.** This is why people are often described as both the strongest and the weakest link in security.',
        },
        {
          kind: 'paragraph',
          text: 'Just as important, most damage is not caused by villains. A nurse who emails a patient list to the wrong address, or a student who reuses one password everywhere, can create a serious incident without any malicious intent at all. Understanding human threats therefore means understanding both deliberate attacks and honest mistakes.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Why this matters',
          text: 'If people are the most common route into an organisation, then training, culture and daily habits are genuine security controls, not optional extras.',
        },
      ],
    },
    {
      id: 'insider-threats',
      title: 'Insider threats: malicious and accidental',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'An insider threat is a security risk that comes from someone within the organisation, such as an employee, contractor or partner, who already has legitimate access. Insider threats can be malicious or accidental.',
        },
        {
          kind: 'paragraph',
          text: 'Insiders are dangerous precisely because they are trusted. They already hold keys, accounts and knowledge that an outsider would have to steal. The security question is not only "can we keep intruders out?" but also "what can the people we have let in do, deliberately or by accident?"',
        },
        {
          kind: 'compare',
          left: {
            title: 'Malicious insider',
            points: [
              'Acts on purpose to harm the organisation or benefit personally.',
              'Example: an employee copies the customer database before resigning to sell it to a competitor.',
              'Motivations include money, revenge or coercion.',
              'Often tries to hide activity, so logging and least privilege matter.',
            ],
          },
          right: {
            title: 'Accidental insider',
            points: [
              'Causes harm through a mistake, with no bad intent.',
              'Example: a staff member sends a spreadsheet of patient records to the wrong recipient.',
              'Causes include rushing, confusing interfaces and tiredness.',
              'Reduced by clear processes, good design and a blame-free reporting culture.',
            ],
          },
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'A worked example',
          text: 'At a bank, a loan officer autocompletes an email and sends a list of overdue accounts to a customer with a similar name. No one meant any harm, yet confidential financial data has now left the organisation. The same technical access that lets the officer do their job also let the mistake happen.',
        },
      ],
    },
    {
      id: 'awareness-and-culture',
      title: 'Security awareness and culture',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Security awareness is the knowledge people have about threats and safe behaviour. Security culture is the shared set of attitudes and habits that make secure behaviour normal. Both are built through training, clear reporting routes and support from the organisation.',
        },
        {
          kind: 'paragraph',
          text: 'Awareness is what people know; culture is how they actually behave when no one is watching. You can run a training course and still have a weak culture if staff feel too afraid or too busy to follow the rules. **A strong culture makes the secure choice the easy and expected choice.**',
        },
        {
          kind: 'heading',
          text: 'What a healthy security culture looks like',
        },
        {
          kind: 'list',
          items: [
            'Regular, practical training rather than a one-off slideshow.',
            'Secure daily practices built into normal work, such as locking screens and checking email senders.',
            'A clear, simple way to report anything suspicious, and quick acknowledgement when people do.',
            'A supportive, blame-free attitude: reporting a mistake is treated as helpful, not as grounds for punishment.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Stress and workload',
          text: 'Pressure, long hours and heavy workloads make people more likely to click too fast, skip checks and miss warning signs. A culture that overloads staff quietly undermines its own security.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Why blame-free matters',
          text: 'If a university student who clicks a phishing link expects to be shamed, they will hide it, giving the attacker more time. If they expect help, they report it in minutes and the account can be locked before damage spreads.',
        },
      ],
    },
    {
      id: 'social-engineering',
      title: 'Social engineering and the phishing family',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Social engineering is the manipulation of people into performing actions or revealing information that compromises security. Instead of attacking systems directly, the attacker exploits trust, authority, urgency and helpfulness.',
        },
        {
          kind: 'paragraph',
          text: 'Social engineering works on feelings, not firewalls. An attacker creates a sense of urgency ("your account will be closed today"), authority ("this is the IT department"), or fear ("suspicious activity detected") so the target reacts before thinking. Phishing is the most common form of social engineering, and it comes in several closely related variants.',
        },
        {
          kind: 'heading',
          text: 'The phishing family',
        },
        {
          kind: 'list',
          items: [
            '**Phishing** — broad, generic fake messages (usually email) sent to many people, hoping some will click a link or hand over credentials.',
            '**Spear phishing** — personalised and targeted at a specific person, using details about them to seem convincing.',
            '**Whaling** — spear phishing aimed specifically at senior leadership, such as a chief executive or finance director.',
            '**Business Email Compromise (BEC)** — the attacker impersonates an executive or trusted partner to request a fraudulent payment or sensitive data, often with no link or malware at all.',
            '**Smishing** — phishing carried out through SMS text messages.',
            '**Vishing** — phishing carried out by phone call, where the attacker talks the victim into acting.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Seeing the difference',
          text: 'A generic "your parcel could not be delivered" text is smishing. A call claiming to be your bank asking you to "confirm" your card details is vishing. An email to a finance clerk pretending to be the CEO, asking them to urgently wire money to a new supplier, is BEC. The channel and the target change, but the trick is always manipulating a person.',
        },
      ],
    },
    {
      id: 'attack-lifecycle-and-anatomy',
      title: 'How an attack unfolds, and how to spot it',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'A social engineering attack typically moves through stages: reconnaissance, a deceptive message, victim interaction, and possible compromise. Understanding this journey helps defenders interrupt it early.',
        },
        {
          kind: 'paragraph',
          text: 'The diagram below shows the lifecycle of a social engineering attack. The attacker first gathers information, then crafts and sends a deceptive message, waits for the victim to interact, and only then achieves compromise. Every stage is a chance to stop the attack.',
        },
        {
          kind: 'diagram',
          id: 'social-engineering-journey',
        },
        {
          kind: 'heading',
          text: 'The anatomy of a phishing email',
        },
        {
          kind: 'paragraph',
          text: 'Most phishing emails share recognisable warning signs. Learning to read an email like the diagram below, checking the real sender, the link destination and the tone, is one of the most useful personal defences.',
        },
        {
          kind: 'diagram',
          id: 'phishing-anatomy',
        },
        {
          kind: 'list',
          items: [
            'A sender address that looks almost right but is subtly wrong.',
            'Urgent or threatening language designed to rush you.',
            'Generic greetings, or odd spelling and grammar.',
            'Links whose visible text does not match where they actually lead.',
            'Requests for passwords, payments or personal data.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'HTTPS does not mean safe',
          text: 'A padlock and an address starting with https only mean the connection is encrypted. It does **not** prove the site is legitimate. Attackers routinely obtain valid certificates for their fake sites, so a padlock is not a stamp of trust.',
        },
      ],
    },
    {
      id: 'social-media-and-remote-work',
      title: 'Social media reconnaissance and remote working',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Attackers use publicly available information, including social media, to research targets. This public information lets them personalise attacks so that deceptive messages feel authentic and trustworthy.',
        },
        {
          kind: 'paragraph',
          text: 'The reconnaissance stage often takes place on social media. A public post about a new job, a conference, or a manager\'s name gives an attacker exactly the details needed to craft a convincing spear phishing message. **Information that feels harmless in isolation becomes ammunition when combined.**',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'A hospital employee posts "excited to start in the finance team today!" An attacker now knows the department and can send a tailored BEC email referencing a real project, making the fraud far more believable.',
        },
        {
          kind: 'heading',
          text: 'Working securely away from the office',
        },
        {
          kind: 'paragraph',
          text: 'Remote and hybrid working spreads sensitive data across homes, cafes and personal networks. The same principles still apply, but they must travel with the worker.',
        },
        {
          kind: 'list',
          items: [
            'Use secure connections, such as an approved VPN, rather than untrusted public Wi-Fi for sensitive work.',
            'Protect devices with encryption, screen locks and up-to-date software.',
            'Use strong authentication, ideally multi-factor authentication, on work accounts.',
            'Handle sensitive information carefully: avoid printing at home, and do not store work data on personal devices.',
            'Report lost devices or suspicious activity promptly so access can be revoked.',
          ],
        },
      ],
    },
  ],
  definitions: [
    {
      term: "Insider threat",
      definition: "A security risk arising from someone who already has legitimate access, such as an employee, contractor or partner.",
      example: "A contractor copies confidential designs onto a USB stick before their contract ends.",
    },
    {
      term: "Malicious insider",
      definition: "An insider who deliberately misuses their access to harm the organisation or benefit themselves.",
      example: "An employee sells the customer database to a competitor.",
    },
    {
      term: "Accidental insider",
      definition: "An insider who causes a security incident by mistake, with no harmful intent.",
      example: "A staff member emails a sensitive report to the wrong recipient.",
    },
    {
      term: "Security awareness",
      definition: "The knowledge people hold about threats and safe behaviour, built mainly through training.",
      example: "Staff recognise a phishing email because recent training showed them the warning signs.",
    },
    {
      term: "Social engineering",
      definition: "Manipulating people into actions or disclosures that compromise security, by exploiting trust, authority or urgency.",
      example: "A caller pretends to be IT support and persuades a user to reveal their password.",
    },
    {
      term: "Phishing",
      definition: "A broad social engineering attack using fake messages, usually email, to trick many recipients into clicking links or sharing information.",
      example: "A mass email claiming to be from a bank asks recipients to 'verify' their login.",
    },
    {
      term: "Spear phishing",
      definition: "A targeted, personalised phishing attack aimed at a specific individual, using details about them to appear genuine.",
      example: "An email addresses a named employee and refers to a real project they are working on.",
    },
    {
      term: "Business Email Compromise (BEC)",
      definition: "An attack in which the sender impersonates an executive or trusted partner to request a fraudulent payment or sensitive data.",
      example: "A fake email from the 'CEO' asks the finance team to urgently transfer funds to a new account.",
    },
  ],
  misconceptions: [
    {
      myth: "Security incidents are almost always caused by malicious hackers breaking in.",
      reality: "Many incidents start with ordinary human mistakes or insiders, not external attackers.",
    },
    {
      myth: "If an email looks professional and has no spelling mistakes, it must be genuine.",
      reality: "Targeted attacks like spear phishing and whaling are often polished and well written on purpose.",
    },
    {
      myth: "A padlock icon or an https address proves a website is safe.",
      reality: "HTTPS only means the connection is encrypted; attackers can obtain valid certificates for fake sites.",
    },
    {
      myth: "Punishing people who click phishing links makes the organisation more secure.",
      reality: "A blame-free culture encourages fast reporting, which limits damage far more effectively.",
    },
  ],
  takeaways: [
    "People are central to security: attacks exploit behaviour, and ordinary mistakes cause many incidents.",
    "Insider threats can be malicious or accidental, and both need defences.",
    "Social engineering manipulates trust and urgency; phishing, spear phishing, whaling, BEC, smishing and vishing are variants of the same idea.",
    "HTTPS and a professional appearance do not prove a message or site is legitimate.",
    "Cybersecurity depends on training, a supportive culture and secure daily behaviour by everyone.",
  ],
  presentationSummary: [
    "People are both the strongest and the weakest link in cybersecurity.",
    "Insider threats come in two forms: malicious (deliberate harm) and accidental (honest mistakes).",
    "A supportive, blame-free culture and realistic training reduce human risk.",
    "Social engineering exploits trust and urgency; the phishing family spans email, SMS and phone.",
    "Attacks follow a lifecycle: reconnaissance, deceptive message, interaction, compromise.",
    "Stay safe by checking senders and links, guarding social media detail, and working securely when remote.",
  ],
  diagramIds: ["social-engineering-journey", "phishing-anatomy"],
  relatedCaseStudies: [],
}

export default chapter
