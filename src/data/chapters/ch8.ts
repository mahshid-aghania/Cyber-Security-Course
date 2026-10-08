import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 8,
  slug: "incident-response-and-management",
  title: "Incident Response and Management",
  subtitle: "Resilience, response and recovery",
  summary: "Perfect security is impossible, so organisations prepare to detect, respond to and recover from incidents while keeping critical operations running.",
  minutes: 13,
  accent: "warn",
  icon: "Siren",
  objectives: [
    "Explain why perfect security is impossible and what cyber resilience means.",
    "Distinguish an event from an incident and describe how thresholds are set.",
    "Describe what an incident response plan establishes and who carries it out.",
    "Compare business continuity with disaster recovery.",
    "Explain the purpose of a business impact analysis and recovery priorities.",
    "Explain why backups and plan testing are essential to recovery.",
  ],
  sections: [
    {
      id: 'cyber-resilience',
      title: 'Why resilience matters',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Perfect security is impossible, so organisations must prepare to respond to and recover from incidents. Cyber resilience relates cybersecurity, incident response, business continuity and recovery, combining them so the organisation can withstand and bounce back from attacks.',
        },
        {
          kind: 'paragraph',
          text: 'No matter how strong the defences, some incidents will get through. **Resilience is the ability to keep going and recover when they do.** It joins four ideas: cybersecurity to reduce risk, incident response to deal with what happens, business continuity to keep critical work running, and recovery to restore what was lost.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Why this matters',
          text: 'An organisation judged only on prevention will eventually be caught out. One that also prepares to respond and recover can turn a potential disaster into a manageable disruption.',
        },
      ],
    },
    {
      id: 'event-vs-incident',
      title: 'Event vs incident',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'An event is something that could affect security but has not necessarily caused any impact. An incident is something that has occurred and affects security. The threshold between the two depends on the organisation\'s own procedures.',
        },
        {
          kind: 'compare',
          left: {
            title: 'Event',
            points: [
              '**Could** affect security but may have caused no impact.',
              'Often routine and high in volume.',
              'May be logged and watched, not acted on urgently.',
              'Example: a single failed login attempt.',
            ],
          },
          right: {
            title: 'Incident',
            points: [
              'Has **occurred** and affects security.',
              'Requires a response under the organisation\'s procedures.',
              'Triggers the incident response plan.',
              'Example: an account confirmed to be compromised.',
            ],
          },
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'The line is set locally',
          text: 'There is no universal boundary between an event and an incident. Each organisation defines its own thresholds in its procedures, so the same activity may be an incident in one organisation and only an event in another.',
        },
      ],
    },
    {
      id: 'incident-response-plan',
      title: 'The incident response plan',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'An incident response plan establishes what constitutes an incident, who responds and how a minimum level of operational capacity is restored. It also covers escalation, evidence preservation, regulatory reporting obligations, roles and responsibilities, communication, and regular testing.',
        },
        {
          kind: 'paragraph',
          text: 'A plan written calmly in advance is far more reliable than decisions made in panic during an attack. It removes ambiguity about who does what and in what order.',
        },
        {
          kind: 'list',
          items: [
            '**What constitutes an incident** — the thresholds that trigger the plan.',
            '**Who responds** — the people and teams involved.',
            '**Restoring minimum capacity** — how to get critical operations working again.',
            '**Escalation** — when and how to raise the matter to higher authority.',
            '**Evidence preservation** — keeping logs and data intact for investigation.',
            '**Regulatory reporting** — meeting legal obligations to notify regulators or affected people.',
            '**Roles and responsibilities** — who is accountable for each task.',
            '**Communication** — how to inform staff, customers and other stakeholders.',
            '**Regular testing** — exercising the plan so it works when needed.',
          ],
        },
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'The incident response team typically combines cybersecurity experts, who handle the technical response, with senior management, who make decisions about the business.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'During a suspected breach, the technical experts isolate affected systems and gather evidence, while senior management decide whether to notify regulators and how to communicate with customers. Both are needed at once.',
        },
      ],
    },
    {
      id: 'response-lifecycle',
      title: 'The incident response lifecycle',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Responding to an incident tends to follow a recognisable sequence. The diagram below shows one such operational flow: **Detection → Escalation → Containment → Investigation → Recovery → Review**, ending by feeding lessons back into the plan.',
        },
        {
          kind: 'diagram',
          id: 'incident-response-lifecycle',
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            '**Detection** — notice that an incident is occurring.',
            '**Escalation** — alert the right people and invoke the plan.',
            '**Containment** — stop the incident from spreading further.',
            '**Investigation** — understand what happened and how.',
            '**Recovery** — restore affected systems and operations.',
            '**Review** — learn from the incident and improve the plan.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'An illustrative sequence',
          text: 'This lifecycle is an illustrative operational sequence to show how a response flows, not an exact sequence taken from the textbook. Real incidents may loop between steps or run some of them in parallel.',
        },
      ],
    },
    {
      id: 'continuity-vs-recovery',
      title: 'Business continuity vs disaster recovery',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Business continuity is concerned with maintaining or restoring critical business functions during and after a disruption. Disaster recovery is the technical restoration of systems and infrastructure. The two are related but distinct.',
        },
        {
          kind: 'compare',
          left: {
            title: 'Business continuity',
            points: [
              'Focus on keeping **critical business functions** going.',
              'Thinks about people, processes and services.',
              'Asks: how does the organisation keep operating?',
              'Example: staff switching to a manual process during an outage.',
            ],
          },
          right: {
            title: 'Disaster recovery',
            points: [
              'Focus on the **technical restoration** of systems.',
              'Thinks about servers, data and infrastructure.',
              'Asks: how do we get the technology back?',
              'Example: rebuilding a failed server from backups.',
            ],
          },
        },
        {
          kind: 'diagram',
          id: 'continuity-vs-recovery',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Two halves of one goal',
          text: 'Continuity keeps the business running while recovery rebuilds the technology underneath it. An organisation usually needs both working together.',
        },
      ],
    },
    {
      id: 'bia-rto',
      title: 'Business impact analysis and recovery priorities',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'A business impact analysis identifies critical systems and processes, the dependencies between them, the operational consequences of losing them and the priorities for recovery.',
        },
        {
          kind: 'list',
          items: [
            '**Critical systems and processes** — what the organisation cannot function without.',
            '**Dependencies** — what each critical process relies on.',
            '**Operational consequences** — what happens if each is unavailable.',
            '**Recovery priorities** — the order in which things should be restored.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Related modern term: Recovery Time Objective (RTO)',
          text: 'A useful related term is the **Recovery Time Objective (RTO)** — the maximum acceptable length of time to restore a function after disruption. RTO is introduced here as a widely used modern term; it is distinct from the chapter\'s original wording and helps turn recovery priorities into concrete targets.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'A hospital\'s impact analysis finds that its patient records system must be restored within two hours (a short RTO), while the internal newsletter system can wait much longer. Recovery effort is directed at the records system first.',
        },
      ],
    },
    {
      id: 'backups-and-testing',
      title: 'Backups, testing and WannaCry',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Backups are central to recovery. They must be tested, kept isolated so ransomware cannot reach them, and verified by confirming that data can actually be restored. A backup that has never been tested cannot be trusted.',
        },
        {
          kind: 'paragraph',
          text: 'The simulator below shows why these properties matter. Without tested, isolated, verified backups, an organisation hit by ransomware may find its only copies encrypted alongside the originals.',
        },
        {
          kind: 'diagram',
          id: 'backup-recovery-simulator',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Case study: WannaCry (2017)',
          text: 'The 2017 WannaCry ransomware spread rapidly across unpatched systems and disrupted organisations worldwide, including parts of the health sector. It is a stark reminder that recovery depends on preparation: reliable, isolated and tested backups let affected organisations restore systems rather than pay or lose data.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Response and recovery plans must be tested through exercises such as tabletop exercises, simulations and backup restoration tests, then reviewed and improved based on what the testing reveals.',
        },
        {
          kind: 'list',
          items: [
            '**Tabletop exercises** — walk through an incident scenario as a discussion.',
            '**Simulations** — practise the response under realistic conditions.',
            '**Backup restoration tests** — confirm that backups can actually be restored.',
            '**Review and improve** — update the plans based on what each test shows.',
          ],
        },
      ],
    },
  ],
  definitions: [
    {
      term: "Cyber resilience",
      definition: "An organisation's ability to withstand and recover from incidents, relating cybersecurity, incident response, business continuity and recovery.",
      example: "A company that keeps serving customers and fully recovers after a ransomware attack.",
    },
    {
      term: "Event",
      definition: "Something that could affect security but has not necessarily caused any impact.",
      example: "A single failed login that may be harmless.",
    },
    {
      term: "Incident",
      definition: "Something that has occurred and affects security, according to the organisation's own thresholds.",
      example: "A confirmed compromise of a user account.",
    },
    {
      term: "Incident response plan",
      definition: "A plan that establishes what constitutes an incident, who responds and how minimum operational capacity is restored, plus escalation, evidence, reporting, roles, communication and testing.",
      example: "A documented playbook that staff follow the moment a breach is suspected.",
    },
    {
      term: "Business continuity",
      definition: "Maintaining or restoring critical business functions during and after a disruption.",
      example: "Switching to a manual process so the business keeps operating during an outage.",
    },
    {
      term: "Disaster recovery",
      definition: "The technical restoration of systems and infrastructure after a disruption.",
      example: "Rebuilding a failed database server from backups.",
    },
    {
      term: "Business impact analysis",
      definition: "An analysis that identifies critical systems, processes, dependencies, operational consequences and recovery priorities.",
      example: "Mapping which systems a hospital must restore first after an outage.",
    },
    {
      term: "Recovery Time Objective (RTO)",
      definition: "The maximum acceptable length of time to restore a function after a disruption; a widely used modern term for setting recovery targets.",
      example: "Requiring the patient records system to be back within two hours.",
    },
  ],
  misconceptions: [
    {
      myth: "If our defences are strong enough, we will never have an incident to respond to.",
      reality: "Perfect security is impossible, so organisations must prepare to respond and recover as well as prevent.",
    },
    {
      myth: "Every security event is an incident that needs an urgent response.",
      reality: "An event may have no impact; it becomes an incident only when it crosses the organisation's defined threshold.",
    },
    {
      myth: "Business continuity and disaster recovery are the same thing.",
      reality: "Continuity keeps critical functions running, while disaster recovery restores the underlying technology.",
    },
    {
      myth: "Having backups means we are safe from ransomware.",
      reality: "Backups only help if they are isolated from ransomware, tested and verified to restore correctly.",
    },
  ],
  takeaways: [
    "Perfect security is impossible, so cyber resilience combines prevention, response, continuity and recovery.",
    "An event could affect security; an incident has, and the threshold between them is set by each organisation.",
    "An incident response plan sets out what, who and how, and is run by technical experts and senior management.",
    "Business continuity keeps critical functions running while disaster recovery restores the technology.",
    "Backups and plans must be isolated, tested and verified, as WannaCry made painfully clear.",
  ],
  presentationSummary: [
    "Perfect security is impossible; cyber resilience joins cybersecurity, response, continuity and recovery.",
    "Event = could affect security; incident = has affected it. The line depends on local procedures.",
    "An incident response plan covers detection, escalation, evidence, reporting, roles, communication and testing.",
    "Business continuity maintains critical functions; disaster recovery restores systems and infrastructure.",
    "A business impact analysis sets recovery priorities, often expressed as Recovery Time Objectives (RTO).",
    "Backups must be isolated, tested and verified; WannaCry 2017 shows why preparation enables recovery.",
  ],
  diagramIds: ["incident-response-lifecycle", "continuity-vs-recovery", "backup-recovery-simulator"],
  relatedCaseStudies: ["wannacry"],
}

export default chapter
