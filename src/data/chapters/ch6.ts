import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 6,
  slug: "third-party-threats",
  title: "Third-Party Threats",
  subtitle: "Supply chains, cloud and vendor risk",
  summary: "Why your security depends partly on your suppliers, and how to manage the risk they introduce.",
  minutes: 14,
  accent: "cyan",
  icon: "Network",
  objectives: [
    "Explain why organisations depend on third parties and how this introduces risk.",
    "Describe supply chain security and the challenges of scale, authority and data flow.",
    "Prioritise supplier risk assessments using sensible criteria.",
    "Explain the shared responsibility model for cloud security across SaaS, PaaS and IaaS.",
    "Trace how the 2013 Target breach spread from a supplier to payment systems.",
    "Summarise lessons from the 2014 Home Depot breach about third-party credentials.",
  ],
  sections: [
    {
      id: 'depending-on-others',
      title: 'Depending on others',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Modern organisations depend on many third parties: suppliers, contractors, cloud services and other external providers. Each relationship can introduce security risk, because the organisation now relies on the practices of others.',
        },
        {
          kind: 'paragraph',
          text: 'No organisation operates alone. An online shop uses a payment processor, a cloud host, a logistics firm and software vendors, and each one touches its systems or data. **Every connection is both a convenience and a potential route in.** When you trust a supplier, you partly inherit their security weaknesses.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Why this matters',
          text: 'You can secure your own systems perfectly and still be breached through a supplier you barely think about. Third-party risk is now one of the most important parts of cybersecurity.',
        },
      ],
    },
    {
      id: 'supply-chain-security',
      title: 'Supply chain security and its challenges',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Supply chain security addresses the risk that a weakness in one supplier can affect all of its customers. A single compromised supplier can become a path into many organisations at once.',
        },
        {
          kind: 'paragraph',
          text: 'A supply chain attack targets a weaker supplier in order to reach a stronger customer. Managing this risk is hard for three main reasons.',
        },
        {
          kind: 'list',
          items: [
            '**Scale** — organisations have so many suppliers that assessing every one thoroughly is difficult.',
            '**Authority** — a customer often has limited power to impose security requirements on a supplier, especially a large or essential one.',
            '**Data flow and dependency** — suppliers may process sensitive information or run critical services, so a failure at the supplier directly affects the customer.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'A hospital relies on an external laboratory to process test results. The hospital cannot easily dictate the lab\'s internal security, yet the lab holds highly sensitive patient data. Scale, authority and data flow all appear in a single relationship.',
        },
      ],
    },
    {
      id: 'supplier-risk-assessment',
      title: 'Prioritising supplier risk assessment',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Because not every supplier can be assessed equally, organisations prioritise. Risk assessment considers factors such as access to sensitive data, the quantity of data handled, how critical the service is, network access, disruption potential, the supplier\'s own security practices and regulatory considerations.',
        },
        {
          kind: 'paragraph',
          text: 'The goal is to spend the most effort on the suppliers that could cause the most harm. The diagram below shows a central organisation surrounded by a cloud provider, a payment processor, a software vendor, an IT contractor and a logistics provider, each with an illustrative risk rating based on these factors.',
        },
        {
          kind: 'diagram',
          id: 'supply-chain-network',
        },
        {
          kind: 'list',
          items: [
            '**Access to sensitive data** — can the supplier see personal or financial information?',
            '**Quantity of data handled** — a little, or millions of records?',
            '**Service criticality** — would the business stop if this supplier failed?',
            '**Network access** — does the supplier connect into your internal systems?',
            '**Disruption potential** — how badly could an outage or breach hurt you?',
            '**Security practices** — does the supplier follow recognised standards?',
            '**Regulatory considerations** — does the relationship carry legal or compliance obligations?',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Ratings are illustrative',
          text: 'The risk ratings in the diagram are examples to show how prioritisation works. Real ratings depend on the specific suppliers and the data and services involved.',
        },
      ],
    },
    {
      id: 'cloud-security',
      title: 'Cloud security and shared responsibility',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'In cloud computing, security is a shared responsibility between the provider and the customer. The provider secures the underlying infrastructure, while the customer must secure how they configure and use the service.',
        },
        {
          kind: 'paragraph',
          text: 'A common mistake is assuming the cloud provider handles all security. In reality, responsibility is split, and where the line falls depends on the type of service. The diagram below compares SaaS, PaaS and IaaS and shows how more of the burden shifts to the customer as they take more control.',
        },
        {
          kind: 'diagram',
          id: 'cloud-shared-responsibility',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Responsibilities vary',
          text: 'The exact split between provider and customer depends on the specific service and provider. Always check the provider\'s documentation rather than assuming.',
        },
        {
          kind: 'heading',
          text: 'Good cloud security practices',
        },
        {
          kind: 'list',
          items: [
            'Assess the provider before adopting them, as you would any supplier.',
            'Use strong authentication and multi-factor authentication (MFA) on cloud accounts.',
            'Encrypt sensitive data and understand where it is physically stored (data location).',
            'Apply data loss prevention (DLP) to stop sensitive data leaving.',
            'Use only approved cloud services, not unsanctioned personal accounts.',
            'Enable monitoring and logging so suspicious activity can be detected.',
          ],
        },
      ],
    },
    {
      id: 'target-2013',
      title: 'Case study: Target 2013',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'In the 2013 Target breach, attackers first compromised a heating, ventilation and air-conditioning (HVAC) supplier. Using the supplier\'s stolen credentials, they entered Target\'s network through the supplier relationship. Weak network segmentation then let them reach the point-of-sale (POS) systems, exposing customers\' payment data.',
        },
        {
          kind: 'paragraph',
          text: 'Target is the classic supply chain breach. The attackers did not break into the retailer directly. They compromised a smaller, less-defended supplier, stole its access and walked in through the trusted connection. The diagram below traces that path and shows, conceptually, how proper network segmentation could have contained the attack before it reached payment systems.',
        },
        {
          kind: 'diagram',
          id: 'target-breach-path',
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            'An HVAC supplier is compromised.',
            'The supplier\'s legitimate credentials are stolen.',
            'The attackers use those credentials to enter via the trusted supplier relationship.',
            'Weak segmentation lets them move from a low-value system toward critical ones.',
            'The point-of-sale systems are compromised and payment card data is exposed.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Lessons',
          text: 'Treat supplier access as a serious risk, limit what each supplier can reach, and segment networks so a foothold in one area cannot spread to sensitive systems like payment processing.',
        },
      ],
    },
    {
      id: 'home-depot-2014',
      title: 'Case study: Home Depot 2014',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'In the 2014 Home Depot breach, attackers used compromised third-party credentials to gain access, and payment card information was ultimately exposed.',
        },
        {
          kind: 'paragraph',
          text: 'Coming soon after Target, Home Depot reinforced the same lesson: third-party access is a prime target. Stolen vendor credentials again became the entry point, and once more it was customers\' payment card data that was exposed. **Two of the largest retail breaches of the era both began outside the victim, with a supplier.**',
        },
        {
          kind: 'compare',
          left: {
            title: 'What the two breaches shared',
            points: [
              'Entry began with compromised third-party credentials.',
              'Attackers exploited trusted connections rather than breaking in directly.',
              'Payment card data was ultimately exposed.',
            ],
          },
          right: {
            title: 'What they teach',
            points: [
              'Vendor accounts need strong authentication and limited access.',
              'Monitor and segment third-party connections.',
              'Your security depends partly on your suppliers.',
            ],
          },
        },
      ],
    },
  ],
  definitions: [
    {
      term: "Third party",
      definition: "An external supplier, contractor or service provider that an organisation relies on.",
      example: "A payment processor handling an online shop's card transactions.",
    },
    {
      term: "Supply chain security",
      definition: "Managing the risk that a weakness in one supplier can affect all of its customers.",
      example: "Vetting a software vendor because a flaw in their product would reach every customer.",
    },
    {
      term: "Supplier risk assessment",
      definition: "Evaluating and prioritising suppliers by the risk they pose, based on factors like data access and service criticality.",
      example: "Rating a cloud provider as higher risk than a stationery supplier.",
    },
    {
      term: "Shared responsibility model",
      definition: "The division of security duties between a cloud provider and its customer.",
      example: "The provider secures the servers, while the customer secures their own user accounts and data.",
    },
    {
      term: "SaaS, PaaS, IaaS",
      definition: "Cloud service models (Software, Platform and Infrastructure as a Service) that shift more responsibility to the customer as they gain more control.",
      example: "Using an online email service (SaaS) versus renting virtual servers (IaaS).",
    },
    {
      term: "Network segmentation",
      definition: "Dividing a network into separate zones so that access to one area does not grant access to others.",
      example: "Keeping payment systems on a network segment isolated from general office systems.",
    },
    {
      term: "Data loss prevention (DLP)",
      definition: "Controls that detect and stop sensitive data from leaving an organisation.",
      example: "Blocking an attempt to upload a customer database to a personal cloud account.",
    },
    {
      term: "Multi-factor authentication (MFA)",
      definition: "Requiring more than one form of proof of identity before granting access.",
      example: "A cloud login that needs a password plus a code from a phone app.",
    },
  ],
  misconceptions: [
    {
      myth: "If we secure our own systems well, our suppliers' security does not affect us.",
      reality: "A supplier's weakness can become a direct path into your organisation, as the Target breach showed.",
    },
    {
      myth: "Moving to the cloud means the provider takes care of all security.",
      reality: "Cloud security is shared; customers must still secure their configuration, accounts and data.",
    },
    {
      myth: "Every supplier should receive the same level of security scrutiny.",
      reality: "Assessment should be prioritised by risk, focusing effort on suppliers that could cause the most harm.",
    },
    {
      myth: "Attackers always target the main organisation directly.",
      reality: "They often compromise a weaker third party first and enter through the trusted connection.",
    },
  ],
  takeaways: [
    "Organisations depend on many third parties, and each relationship introduces risk.",
    "Supply chain security is hard because of scale, limited authority and data flow or dependency.",
    "Supplier risk assessments should be prioritised by data access, criticality, network access and more.",
    "Cloud security is a shared responsibility that varies with SaaS, PaaS and IaaS.",
    "Your security depends partly on your suppliers and on controlling third-party access.",
  ],
  presentationSummary: [
    "Suppliers, contractors and cloud services all extend an organisation's attack surface.",
    "Supply chain challenges are scale, authority, and data flow or dependency.",
    "Prioritise supplier assessments by data access, quantity, criticality, network access and practices.",
    "Cloud security is shared; responsibility shifts to the customer from SaaS to IaaS.",
    "Target 2013: an HVAC supplier led to stolen credentials, weak segmentation and POS compromise.",
    "Home Depot 2014 repeats the lesson: third-party credentials exposed payment card data.",
  ],
  diagramIds: ["supply-chain-network", "cloud-shared-responsibility", "target-breach-path"],
  relatedCaseStudies: ["target", "home-depot"],
}

export default chapter
