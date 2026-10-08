import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 7,
  slug: "securing-the-organisation",
  title: "Securing the Organisation",
  subtitle: "Risk assessment, the 4Ts and controls",
  summary: "How organisations manage cybersecurity as a planned, repeatable risk process — assessing risk, choosing responses and selecting the right controls.",
  minutes: 13,
  accent: "teal",
  icon: "Gauge",
  objectives: [
    "Explain why cybersecurity should be managed as a planned, proactive and continuously improved process.",
    "Describe the steps of a risk assessment, from identifying assets to selecting responses.",
    "Compare asset-based and scenario-based approaches to risk assessment.",
    "Apply the four risk responses (the 4Ts) to realistic situations.",
    "Distinguish preventive, detective and reactive security controls.",
    "Explain the difference between the performance and the effectiveness of a control.",
  ],
  sections: [
    {
      id: 'managing-risk',
      title: 'Cybersecurity as a managed process',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Securing an organisation is not a one-off task. Cybersecurity should be managed through a planned, proactive, repeatable and continuously improved risk-management process, rather than reacting to problems as they appear.',
        },
        {
          kind: 'paragraph',
          text: 'Good security is a **process, not an event**. An organisation that only reacts after something goes wrong is always one step behind. Managing risk means deciding in advance what you are protecting, what could go wrong, how likely and how serious it would be, and what you will do about it — then repeating that cycle and improving it over time.',
        },
        {
          kind: 'list',
          items: [
            '**Planned** — security decisions are made deliberately, not by accident.',
            '**Proactive** — risks are addressed before they cause harm, not only afterwards.',
            '**Repeatable** — the same process can be run again consistently.',
            '**Continuously improved** — each cycle learns from the last.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Why this matters',
          text: 'Resources are always limited. A risk-management process helps an organisation spend its effort where it reduces the most risk, instead of trying to protect everything equally.',
        },
      ],
    },
    {
      id: 'risk-assessment-steps',
      title: 'The steps of a risk assessment',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'A risk assessment works through a sequence of steps: identify assets, identify threats, identify vulnerabilities, estimate the likelihood of harm, estimate the impact, evaluate the overall risk, and select appropriate responses.',
        },
        {
          kind: 'paragraph',
          text: 'Each step builds on the one before it. You cannot judge a risk until you know what is at stake, what might threaten it and how exposed it is.',
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            '**Identify assets** — what is valuable and worth protecting (data, systems, people, services).',
            '**Identify threats** — what could cause harm (attackers, malware, human error, natural events).',
            '**Identify vulnerabilities** — the weaknesses a threat could exploit.',
            '**Estimate likelihood** — how probable it is that the harm occurs.',
            '**Estimate impact** — how serious the consequences would be.',
            '**Evaluate the risk** — combine likelihood and impact to judge overall severity.',
            '**Select responses** — decide what action to take for each risk.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'A university identifies its student records database as a key asset. The threat is a cyber attacker, the vulnerability is an unpatched server, the likelihood is judged moderate and the impact high. Evaluating these together marks it as a serious risk that needs a response.',
        },
      ],
    },
    {
      id: 'assessment-methods',
      title: 'Asset-based vs scenario-based methods',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'There are two common starting points for a risk assessment. An asset-based approach starts from the organisation\'s most important assets and asks what could threaten them. A scenario-based approach starts from possible incidents or attack scenarios and asks what they would affect.',
        },
        {
          kind: 'compare',
          left: {
            title: 'Asset-based approach',
            points: [
              'Starts from the organisation\'s important **assets**.',
              'Asks: what threats and vulnerabilities could affect this asset?',
              'Good when you know clearly what is most valuable.',
              'Example: start from the patient database and work outward.',
            ],
          },
          right: {
            title: 'Scenario-based approach',
            points: [
              'Starts from possible **incidents or attack scenarios**.',
              'Asks: what would this scenario affect and how badly?',
              'Good for imagining threats that cut across many assets.',
              'Example: start from "ransomware outbreak" and trace its effects.',
            ],
          },
        },
        {
          kind: 'paragraph',
          text: 'The two methods are complementary rather than competing. Many organisations use **both**: asset-based thinking makes sure nothing valuable is overlooked, while scenario-based thinking surfaces realistic attacks that might span several systems at once.',
        },
      ],
    },
    {
      id: 'registers',
      title: 'Asset and risk registers',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Organisations record what they are protecting and the risks they face in registers. An asset register lists each asset with details such as its name, owner, location, importance and other relevant information. A risk register records identified risks with their likelihood, impact, risk owner, treatment actions and status.',
        },
        {
          kind: 'heading',
          text: 'Asset register',
        },
        {
          kind: 'list',
          items: [
            '**Asset name** — what the asset is.',
            '**Owner** — who is responsible for it.',
            '**Location** — where it lives (physical or logical).',
            '**Importance** — how valuable or critical it is.',
            '**Relevant information** — anything else that matters for protecting it.',
          ],
        },
        {
          kind: 'heading',
          text: 'Risk register',
        },
        {
          kind: 'list',
          items: [
            '**Identified risks** — the risks that have been found.',
            '**Likelihood** — how probable each risk is.',
            '**Impact** — how serious each would be.',
            '**Risk owner** — who is accountable for managing it.',
            '**Treatment actions** — what will be done about it.',
            '**Status** — where the treatment currently stands.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'A living document',
          text: 'Registers are not written once and filed away. They are reviewed and updated as assets change, new threats emerge and treatments are completed, which is what makes the process repeatable.',
        },
      ],
    },
    {
      id: 'risk-matrix',
      title: 'Evaluating risk with a matrix',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Risk can be evaluated by combining likelihood and impact. A risk matrix plots likelihood against impact so that each risk can be placed in a cell and given a qualitative rating that helps with prioritisation.',
        },
        {
          kind: 'paragraph',
          text: 'The matrix below shows a 5×5 grid with likelihood on one axis and impact on the other. A risk in the high-likelihood, high-impact corner demands urgent attention, while one in the low-likelihood, low-impact corner may be tolerated. The diagram turns two separate judgements into a single picture the whole team can read.',
        },
        {
          kind: 'diagram',
          id: 'risk-matrix',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Scoring is illustrative',
          text: 'The colours and ratings in a 5×5 matrix are a qualitative aid to prioritisation, not a universal formula. Different organisations define their own scales and thresholds, so the same risk can sit in different cells elsewhere.',
        },
      ],
    },
    {
      id: 'risk-responses',
      title: 'The four risk responses (4Ts)',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Once a risk has been evaluated, the organisation chooses a response. The four options, often called the 4Ts, are to Tolerate, Treat, Transfer or Terminate the risk.',
        },
        {
          kind: 'list',
          items: [
            '**Tolerate** — accept the risk because it falls within the organisation\'s risk-acceptance criteria.',
            '**Treat** — apply controls that reduce the likelihood or the impact of the risk.',
            '**Transfer** — share the financial consequences with another party, for example through insurance or contracts.',
            '**Terminate** — stop the activity altogether, or remove the source of the risk.',
          ],
        },
        {
          kind: 'paragraph',
          text: 'The decision tree below walks from an evaluated risk to one of these four responses. Treating is the most common, but it is not always the right answer: a low risk may simply be tolerated, and a risk that cannot be reduced to an acceptable level may be terminated.',
        },
        {
          kind: 'diagram',
          id: 'risk-treatment-tree',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Transfer has limits',
          text: 'Transferring a risk can share its financial cost, but accountability and all consequences cannot necessarily be transferred. Insurance may cover some losses, yet reputational damage and legal responsibility often remain with the organisation.',
        },
      ],
    },
    {
      id: 'controls',
      title: 'Security control types and effectiveness',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Controls can be grouped by when they act. Preventive controls reduce the likelihood that an incident occurs. Detective controls identify suspicious or malicious activity. Reactive controls limit damage and support recovery after an incident.',
        },
        {
          kind: 'list',
          items: [
            '**Preventive** — reduce the likelihood of an incident, for example an account lockout after repeated failed logins.',
            '**Detective** — identify suspicious activity, for example an intrusion detection system.',
            '**Reactive** — limit damage and support recovery, for example incident response procedures.',
          ],
        },
        {
          kind: 'paragraph',
          text: 'The timeline below places these control types against the life of an incident: preventive controls act before, detective controls act during, and reactive controls act after. A strong programme uses all three, because no single type is enough on its own.',
        },
        {
          kind: 'diagram',
          id: 'security-control-timeline',
        },
        {
          kind: 'heading',
          text: 'Performance vs effectiveness',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'A control\'s performance is whether it operates as intended. Its effectiveness is whether it actually reduces risk. A control can perform well yet still be ineffective, so effectiveness must be measured by real outcomes.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'A phishing-awareness training course may run successfully, with every employee completing it on time — strong performance. Its effectiveness, however, is shown only when real phishing attempts are reported and not clicked. Measuring those outcomes tells you whether the control truly reduces risk.',
        },
      ],
    },
  ],
  definitions: [
    {
      term: "Risk assessment",
      definition: "The process of identifying assets, threats and vulnerabilities, then estimating likelihood and impact to evaluate and respond to risk.",
      example: "Reviewing a payroll system to judge how likely and how damaging a breach would be.",
    },
    {
      term: "Asset-based approach",
      definition: "A risk assessment method that starts from the organisation's important assets and asks what could threaten them.",
      example: "Starting from the customer database and listing the threats to it.",
    },
    {
      term: "Scenario-based approach",
      definition: "A risk assessment method that starts from possible incidents or attack scenarios and asks what they would affect.",
      example: "Starting from a 'ransomware outbreak' scenario and tracing which systems it would hit.",
    },
    {
      term: "Asset register",
      definition: "A record of an organisation's assets, including each asset's name, owner, location, importance and other relevant information.",
      example: "A spreadsheet listing servers, their owners and how critical each one is.",
    },
    {
      term: "Risk register",
      definition: "A record of identified risks with their likelihood, impact, risk owner, treatment actions and status.",
      example: "A table tracking each open risk and who is responsible for treating it.",
    },
    {
      term: "Risk matrix",
      definition: "A grid that plots likelihood against impact to give each risk a qualitative rating for prioritisation.",
      example: "A 5×5 grid placing a high-likelihood, high-impact risk in the red corner.",
    },
    {
      term: "The 4Ts",
      definition: "The four risk responses: Tolerate, Treat, Transfer and Terminate.",
      example: "Choosing to Treat a risk by adding multi-factor authentication.",
    },
    {
      term: "Security control",
      definition: "A measure that reduces risk, classified as preventive, detective or reactive by when it acts relative to an incident.",
      example: "An intrusion detection system acting as a detective control.",
    },
  ],
  misconceptions: [
    {
      myth: "Cybersecurity is something you set up once and then leave alone.",
      reality: "It is a repeatable, continuously improved process that must be reviewed as assets and threats change.",
    },
    {
      myth: "Buying insurance (transferring a risk) makes the risk and its consequences disappear.",
      reality: "Transfer can share financial cost, but accountability and consequences such as reputational harm often remain.",
    },
    {
      myth: "Preventive controls alone are enough to keep an organisation safe.",
      reality: "Detective and reactive controls are also needed, because some incidents will slip past prevention.",
    },
    {
      myth: "If a control runs successfully, it must be reducing risk.",
      reality: "Performance is not the same as effectiveness; effectiveness has to be measured by real outcomes.",
    },
  ],
  takeaways: [
    "Cybersecurity should be managed as a planned, proactive, repeatable and continuously improved process.",
    "Risk assessment moves through assets, threats, vulnerabilities, likelihood, impact, evaluation and response.",
    "Asset-based and scenario-based methods complement each other; a risk matrix helps prioritise.",
    "The 4Ts — Tolerate, Treat, Transfer, Terminate — are the four ways to respond to a risk.",
    "Effective security needs preventive, detective and reactive controls whose effectiveness is measured, not assumed.",
  ],
  presentationSummary: [
    "Manage cybersecurity as a planned, proactive, repeatable and continuously improved risk process.",
    "Risk assessment: identify assets, threats and vulnerabilities, then estimate likelihood and impact and respond.",
    "Choose a starting point: asset-based (from valuables) or scenario-based (from incidents) — often both.",
    "Record assets and risks in registers, and prioritise with a 5×5 likelihood-by-impact matrix.",
    "Respond with the 4Ts: Tolerate, Treat, Transfer or Terminate — but transfer cannot move all consequences.",
    "Use preventive, detective and reactive controls, and judge them by effectiveness, not just performance.",
  ],
  diagramIds: ["risk-matrix", "risk-treatment-tree", "security-control-timeline"],
  relatedCaseStudies: [],
}

export default chapter
