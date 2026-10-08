import type { CaseStudy } from './types'

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'wannacry',
    name: 'WannaCry',
    year: 2017,
    accent: 'danger',
    focus: 'Ransomware, unpatched systems, widespread disruption and resilience.',
    background:
      'In May 2017 a ransomware attack known as WannaCry spread rapidly across the world in a matter of hours. It affected large numbers of organisations in many countries, including parts of the UK’s National Health Service, where appointments and operations were disrupted. The incident became a landmark example of how quickly modern malware can spread and how damaging it is when critical systems are left unpatched.',
    attackMethod: [
      'Exploited a known vulnerability in older versions of Microsoft Windows for which a security update had already been released.',
      'Combined ransomware (which encrypts files and demands payment) with worm-like behaviour that let it spread by itself.',
      'Once inside a network, it scanned for other vulnerable machines and infected them automatically, without any user action.',
      'Encrypted files on infected computers and displayed a ransom note demanding payment in cryptocurrency.',
    ],
    weaknesses: [
      'Many systems had not applied the security patch that was already available before the outbreak.',
      'Older, unsupported operating systems were still in use in some environments.',
      'Flat networks allowed the malware to move easily from one machine to many others.',
      'Backup and recovery arrangements were not always sufficient to restore quickly.',
    ],
    whatHappened:
      'WannaCry began spreading on 12 May 2017 and, within a day, had reached a very large number of computers across many countries. In affected healthcare settings, clinicians lost access to systems and some services had to divert patients or revert to manual processes. The spread was eventually slowed when a researcher registered a web domain that acted as an unintended "kill switch" built into the malware. Even so, the clean-up, recovery and reputational cost were substantial, and the event is widely cited as a wake-up call about basic security hygiene.',
    businessImpact: [
      'Disruption to critical services, including cancelled or delayed healthcare appointments and procedures.',
      'Significant staff time and cost spent on recovery, rebuilding systems and restoring data.',
      'Reputational damage and intense public and media scrutiny.',
      'Renewed pressure to invest in patching, supported software and resilience planning.',
    ],
    lessons: [
      'Apply security patches promptly, especially for known, high-severity vulnerabilities.',
      'Retire or isolate unsupported systems that can no longer receive updates.',
      'Segment networks so that malware cannot spread freely across the whole organisation.',
      'Maintain and test reliable backups so systems can be restored without paying a ransom.',
    ],
    relatedChapters: [2, 8],
    timeline: [
      {
        label: 'Patch available (before the outbreak)',
        detail:
          'A security update that fixed the underlying Windows vulnerability had already been released, but many systems had not yet applied it.',
      },
      {
        label: '12 May 2017 — outbreak begins',
        detail:
          'The ransomware starts spreading and, using worm-like behaviour, infects vulnerable machines across networks without user interaction.',
      },
      {
        label: 'Rapid global spread',
        detail:
          'Within hours it reaches organisations in many countries, encrypting files and disrupting critical services such as healthcare.',
      },
      {
        label: 'Kill switch slows it down',
        detail:
          'A researcher registers a domain hard-coded in the malware, which unintentionally halts much of the further spread.',
      },
      {
        label: 'Recovery and clean-up',
        detail:
          'Affected organisations restore systems, apply patches and rebuild machines, incurring significant cost and disruption.',
      },
      {
        label: 'Lasting lessons',
        detail:
          'The event drives wider investment in patching, supported software, network segmentation and tested backups.',
      },
    ],
  },
  {
    slug: 'talktalk',
    name: 'TalkTalk',
    year: 2015,
    accent: 'teal',
    focus: 'Web application security and preventable vulnerabilities.',
    background:
      'TalkTalk, a UK telecommunications company, suffered a significant data breach in October 2015 that exposed personal data belonging to a large number of its customers. The breach drew intense public attention because it involved a well-known consumer brand and because the technical weaknesses exploited were widely regarded as basic and preventable. It became a frequently cited example of how web application flaws can lead to serious data loss and regulatory consequences.',
    attackMethod: [
      'Attackers targeted web-facing systems that handled customer data.',
      'The breach was widely reported to involve SQL injection, where malicious input is used to manipulate a database query.',
      'By exploiting this flaw, attackers were able to reach customer records held in the underlying database.',
      'Personal details, and in some cases partial financial information, were extracted from the affected systems.',
    ],
    weaknesses: [
      'Web applications were vulnerable to a well-known and avoidable attack technique.',
      'Input from users was not sufficiently validated or handled safely before reaching the database.',
      'Some data was not adequately protected in the event that systems were accessed.',
      'Security testing did not catch the vulnerabilities before attackers did.',
    ],
    whatHappened:
      'In October 2015 TalkTalk disclosed that its systems had been breached and that customer personal data had been accessed. The incident prompted a police investigation, significant media coverage and widespread customer concern about identity theft and fraud. The UK data protection regulator subsequently issued a substantial fine, concluding that the company had failed to take basic steps to protect customer information. The case is often used to illustrate how preventable web application vulnerabilities can translate directly into financial and reputational harm.',
    businessImpact: [
      'Exposure of personal data for a large number of customers, raising fraud and identity-theft concerns.',
      'A significant regulatory fine for failing to protect personal information.',
      'Loss of customers and the costs associated with responding to the breach.',
      'Lasting reputational damage and reduced customer trust.',
    ],
    lessons: [
      'Protect web applications against common attacks such as SQL injection by validating and safely handling input.',
      'Build security into the software development life cycle rather than bolting it on later.',
      'Carry out regular security testing, including on internet-facing systems.',
      'Minimise and protect the personal data held so that a breach causes less harm.',
    ],
    relatedChapters: [3],
    timeline: [
      {
        label: 'Vulnerable web systems',
        detail:
          'Internet-facing applications handling customer data contained weaknesses that had not been identified and fixed.',
      },
      {
        label: 'Attackers probe the application',
        detail:
          'Attackers target the web systems, reportedly using SQL injection to manipulate database queries.',
      },
      {
        label: 'Customer data accessed',
        detail:
          'Exploiting the flaw gives access to customer records, and personal data is extracted from the database.',
      },
      {
        label: 'October 2015 — breach disclosed',
        detail:
          'TalkTalk publicly discloses the breach, prompting a police investigation and widespread media coverage.',
      },
      {
        label: 'Regulatory action',
        detail:
          'The data protection regulator later issues a substantial fine, citing a failure to take basic security steps.',
      },
      {
        label: 'Aftermath',
        detail:
          'The company faces customer loss, remediation costs and lasting reputational harm.',
      },
    ],
  },
  {
    slug: 'bank-2013',
    name: 'Bank Physical-Access Attacks',
    year: 2013,
    accent: 'warn',
    focus: 'Impersonation, unauthorized physical access and malicious hardware.',
    background:
      'In 2013 UK banks were targeted by criminals who gained physical access to branch premises in order to attack their systems from the inside. In widely reported cases, offenders posed as IT maintenance engineers to reach bank computers and attach a device that let them control a machine remotely. These incidents showed that a determined attacker does not always need to break in over the internet; sometimes simply walking into a building can be enough.',
    attackMethod: [
      'Offenders impersonated legitimate IT or maintenance engineers to gain entry to bank branches.',
      'Once inside, they attached a hardware device (a remote-access KVM-type device) to a branch computer.',
      'The device allowed the computer to be controlled remotely from outside the premises.',
      'Using that remote control, the gang attempted to move money and access banking systems.',
    ],
    weaknesses: [
      'Staff accepted the attackers’ claimed identity without verifying it properly.',
      'Physical access to sensitive equipment was not tightly controlled.',
      'There were insufficient checks on devices being connected to internal computers.',
      'Monitoring did not immediately flag the unusual remote-control activity.',
    ],
    whatHappened:
      'Posing as engineers, members of the gang persuaded or walked past branch staff and attached a remote-control device to a computer, enabling accomplices to operate the machine from elsewhere. In the reported cases, law enforcement intervened and arrests were made, limiting the ultimate losses in some attempts. The incidents were widely covered as a striking reminder that physical security and identity verification are an essential part of protecting IT systems, not just firewalls and passwords.',
    businessImpact: [
      'Direct financial risk from attempted and, in some cases, fraudulent transfers.',
      'Cost of investigation, remediation and strengthening of branch security.',
      'Reputational concern about the physical safety of branch systems.',
      'Pressure to improve staff awareness and visitor verification procedures.',
    ],
    lessons: [
      'Verify the identity of anyone claiming to be an engineer or contractor before granting access.',
      'Control and monitor physical access to computers and network points, especially in public-facing sites.',
      'Watch for and restrict unauthorised devices being connected to internal systems.',
      'Treat physical security and staff awareness as core parts of a defence-in-depth strategy.',
    ],
    relatedChapters: [5],
    timeline: [
      {
        label: 'Impersonation of an engineer',
        detail:
          'An offender arrives at a bank branch posing as a legitimate IT or maintenance engineer.',
      },
      {
        label: 'Unauthorised physical access',
        detail:
          'Branch staff do not fully verify the visitor, who is allowed near sensitive computer equipment.',
      },
      {
        label: 'Malicious device attached',
        detail:
          'The attacker connects a remote-access hardware device to a branch computer.',
      },
      {
        label: 'Remote control established',
        detail:
          'Accomplices outside the premises use the device to control the computer and reach banking systems.',
      },
      {
        label: 'Attempted fraud',
        detail:
          'The gang tries to move money and exploit access using the compromised machine.',
      },
      {
        label: 'Detection and arrests',
        detail:
          'Law enforcement investigates and makes arrests, limiting losses and prompting tighter branch security.',
      },
    ],
  },
  {
    slug: 'target',
    name: 'Target',
    year: 2013,
    accent: 'cyan',
    focus:
      'Supplier compromise, stolen credentials, insufficient network segmentation and payment system compromise.',
    background:
      'In late 2013, during the busy holiday shopping season, the US retailer Target suffered a major breach in which payment card data for a very large number of customers was stolen. The attack is one of the most widely studied examples of a supply chain breach, because the attackers did not break into Target directly at first. Instead, they used a third-party supplier as the way in, and then exploited weak internal separation to reach the payment systems.',
    attackMethod: [
      'Attackers first compromised a third-party heating, ventilation and air-conditioning (HVAC) supplier that had a business relationship with Target.',
      'They obtained the supplier’s credentials for Target’s systems.',
      'Using that supplier access, the attackers gained a foothold inside Target’s network.',
      'Weak internal network separation let them move laterally toward the payment environment.',
      'They installed malware on point-of-sale systems to capture payment card data as cards were swiped.',
    ],
    weaknesses: [
      'A third-party supplier had access to the network but was not sufficiently secured or isolated.',
      'Supplier credentials could be used to reach far more of the network than necessary.',
      'Insufficient network segmentation allowed movement from supplier-facing systems toward sensitive payment systems.',
      'Point-of-sale systems were vulnerable to malware that harvested card data in use.',
      'Early warning signals were not acted upon quickly enough to stop the theft.',
    ],
    whatHappened:
      'The attackers used stolen credentials from a third-party supplier to enter Target’s network, then moved through poorly separated internal systems until they reached the point-of-sale environment. There they deployed malware that captured customers’ payment card details during transactions over several weeks of the holiday period. The stolen data affected a very large number of customers, led to the exposure of card and personal information, and resulted in significant financial, legal and reputational consequences for the company, including the departure of senior leaders.',
    businessImpact: [
      'Theft of payment card data affecting a very large number of customers.',
      'Major financial costs from remediation, legal settlements and card-replacement expenses.',
      'Significant reputational damage during a peak shopping period.',
      'Leadership changes and increased scrutiny of supplier and payment security.',
    ],
    lessons: [
      'Treat third-party suppliers as part of your attack surface and assess their security.',
      'Limit supplier access to only what is needed and keep it separate from sensitive systems.',
      'Segment networks so a foothold in one area cannot easily reach payment or critical systems.',
      'Protect and monitor point-of-sale systems, and act promptly on security alerts.',
    ],
    relatedChapters: [6],
    timeline: [
      {
        label: 'Third-party supplier compromised',
        detail:
          'Attackers breach an HVAC/third-party supplier that has a business relationship with Target.',
      },
      {
        label: 'Supplier credentials stolen',
        detail:
          'The attackers obtain the supplier’s login credentials for Target’s systems.',
      },
      {
        label: 'Access via the supplier relationship',
        detail:
          'Using the supplier’s access, the attackers gain an initial foothold inside Target’s network.',
      },
      {
        label: 'Lateral movement through weak segmentation',
        detail:
          'Insufficient internal network separation lets the attackers move toward the payment environment.',
      },
      {
        label: 'Point-of-sale systems compromised',
        detail:
          'Malware is installed on point-of-sale systems to capture card data as customers pay.',
      },
      {
        label: 'Payment card data exposed',
        detail:
          'Over the holiday period, payment card data for a very large number of customers is stolen.',
      },
    ],
  },
  {
    slug: 'home-depot',
    name: 'Home Depot',
    year: 2014,
    accent: 'violet',
    focus: 'Third-party access, point-of-sale compromise and supply-chain security.',
    background:
      'In 2014 the US home-improvement retailer Home Depot disclosed a large breach of its payment systems that exposed payment card data for a very large number of customers. Coming not long after the Target breach, it reinforced a troubling pattern: attackers gaining a foothold through third-party access and then compromising point-of-sale systems to steal card data at scale. The case is frequently studied alongside Target as a lesson in supply-chain and payment security.',
    attackMethod: [
      'Attackers were widely reported to have used credentials associated with a third-party vendor to gain initial access.',
      'From that foothold they worked their way toward the retailer’s payment environment.',
      'They installed malware on point-of-sale systems in stores.',
      'The malware captured customers’ payment card details as transactions were processed.',
    ],
    weaknesses: [
      'Third-party vendor access provided an entry point into the retailer’s environment.',
      'Internal systems were not sufficiently separated to keep attackers away from payment systems.',
      'Point-of-sale systems were vulnerable to card-harvesting malware.',
      'Monitoring did not detect and stop the activity before large amounts of data were taken.',
    ],
    whatHappened:
      'Over a period of several months in 2014, malware installed on Home Depot’s point-of-sale systems quietly collected payment card data from transactions across many stores. The breach was eventually discovered and disclosed, revealing that payment card information, and separately a large number of email addresses, had been exposed. The company faced substantial remediation costs, legal settlements and reputational damage, and the incident became another high-profile example of why retailers must secure both their suppliers and their payment infrastructure.',
    businessImpact: [
      'Exposure of payment card data for a very large number of customers.',
      'Substantial costs from investigation, remediation and legal settlements.',
      'Reputational harm and loss of customer confidence.',
      'Accelerated investment in payment security and vendor controls across the retail sector.',
    ],
    lessons: [
      'Manage third-party and vendor access carefully, as it is a common route in for attackers.',
      'Segment and protect the payment environment so a foothold elsewhere cannot reach it.',
      'Harden and monitor point-of-sale systems against card-harvesting malware.',
      'Invest in detection so breaches are caught before data is stolen over long periods.',
    ],
    relatedChapters: [6],
    timeline: [
      {
        label: 'Third-party access obtained',
        detail:
          'Attackers reportedly use credentials linked to a third-party vendor to gain initial access.',
      },
      {
        label: 'Movement toward payment systems',
        detail:
          'From the initial foothold, the attackers work their way toward the retailer’s payment environment.',
      },
      {
        label: 'Point-of-sale malware installed',
        detail:
          'Malware is deployed on point-of-sale systems across stores to capture card data.',
      },
      {
        label: 'Card data harvested over months',
        detail:
          'For several months the malware quietly collects payment card details from customer transactions.',
      },
      {
        label: '2014 — breach discovered and disclosed',
        detail:
          'The breach is identified and publicly disclosed, revealing the scale of the data exposed.',
      },
      {
        label: 'Aftermath',
        detail:
          'Home Depot faces remediation costs, legal settlements and reputational damage, prompting stronger controls.',
      },
    ],
  },
]

export const CASE_STUDY_BY_SLUG: Record<string, CaseStudy> = Object.fromEntries(
  CASE_STUDIES.map((c) => [c.slug, c]),
)
