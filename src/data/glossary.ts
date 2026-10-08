import type { GlossaryTerm } from './types'

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Cybersecurity',
    definition:
      'The practice of protecting computers, networks, programs and data from digital attacks, unauthorised access and damage.',
    example:
      'A company installs firewalls, trains staff to spot phishing and encrypts laptops to reduce the chance of a successful attack.',
    chapter: 1,
    related: ['Information Security', 'CIA Triad', 'Threat'],
  },
  {
    term: 'Information Security',
    definition:
      'Protecting information in all its forms (digital, paper, spoken) so it stays confidential, accurate and available to those who need it.',
    example:
      'Shredding printed patient records and locking filing cabinets is information security, even though no computer is involved.',
    chapter: 1,
    related: ['Cybersecurity', 'CIA Triad', 'Confidentiality'],
  },
  {
    term: 'CIA Triad',
    definition:
      'A model that describes the three core goals of security: Confidentiality, Integrity and Availability.',
    example:
      'An online bank must keep balances secret (confidentiality), accurate (integrity) and reachable 24/7 (availability).',
    chapter: 1,
    related: ['Confidentiality', 'Integrity', 'Availability'],
  },
  {
    term: 'Confidentiality',
    definition:
      'Ensuring that information is only accessible to people who are authorised to see it.',
    example:
      'Encrypting a customer database so that stolen files cannot be read without the key.',
    chapter: 1,
    related: ['CIA Triad', 'Encryption', 'Authorization'],
  },
  {
    term: 'Integrity',
    definition:
      'Ensuring that information is accurate and complete and has not been altered without authorisation.',
    example:
      'A checksum reveals that a downloaded file was tampered with in transit, so it is rejected.',
    chapter: 1,
    related: ['CIA Triad', 'Availability', 'Confidentiality'],
  },
  {
    term: 'Availability',
    definition:
      'Ensuring that systems and information are accessible to authorised users when they are needed.',
    example:
      'A hospital keeps backup power and spare servers so patient records stay reachable during an outage.',
    chapter: 1,
    related: ['CIA Triad', 'Integrity', 'Confidentiality'],
  },
  {
    term: 'Asset',
    definition:
      'Anything of value to an organisation that is worth protecting, such as data, hardware, software, people or reputation.',
    example:
      "A retailer's customer payment database and its point-of-sale terminals are both assets.",
    chapter: 2,
    related: ['Threat', 'Vulnerability', 'Asset Register'],
  },
  {
    term: 'Threat',
    definition:
      'Any potential cause of harm to an asset, such as an attacker, a piece of malware, or a natural event.',
    example:
      'A ransomware gang targeting hospitals is a threat to patient record systems.',
    chapter: 2,
    related: ['Threat Actor', 'Vulnerability', 'Risk'],
  },
  {
    term: 'Vulnerability',
    definition:
      'A weakness in a system, process or control that a threat could exploit to cause harm.',
    example:
      'An unpatched web server running outdated software is a vulnerability an attacker can target.',
    chapter: 2,
    related: ['Threat', 'Risk', 'Patch Management'],
  },
  {
    term: 'Risk',
    definition:
      'The combination of how likely a threat is to exploit a vulnerability and how much harm it would cause.',
    example:
      'The risk of a data breach is high when sensitive data is stored on an unpatched, internet-facing server.',
    chapter: 2,
    related: ['Threat', 'Vulnerability', 'Risk Assessment'],
  },
  {
    term: 'Threat Actor',
    definition:
      'A person or group that carries out, or intends to carry out, an attack. Motivations range from money to activism or espionage.',
    example:
      'An organised crime group that deploys ransomware for profit is a threat actor.',
    chapter: 2,
    related: ['Threat', 'Malware', 'Insider Threat'],
  },
  {
    term: 'Malware',
    definition:
      'Malicious software designed to damage, disrupt or gain unauthorised access to systems and data.',
    example:
      'A fake invoice attachment installs software that silently records everything the user types.',
    chapter: 2,
    related: ['Virus', 'Worm', 'Trojan'],
  },
  {
    term: 'Virus',
    definition:
      'A type of malware that attaches itself to a legitimate file or program and spreads when that file is run or shared.',
    example:
      'A macro hidden in a shared spreadsheet runs when the file is opened and infects other documents.',
    chapter: 2,
    related: ['Malware', 'Worm', 'Trojan'],
  },
  {
    term: 'Worm',
    definition:
      'A type of malware that copies itself and spreads across networks on its own, without needing a user to run it.',
    example:
      'A worm scans the network for vulnerable machines and infects them automatically, one after another.',
    chapter: 2,
    related: ['Malware', 'Virus', 'Ransomware'],
  },
  {
    term: 'Trojan',
    definition:
      'Malware disguised as something harmless or useful so that a user is tricked into installing it.',
    example:
      'A free game download secretly contains a program that opens a backdoor for an attacker.',
    chapter: 2,
    related: ['Malware', 'Virus', 'Social Engineering'],
  },
  {
    term: 'Ransomware',
    definition:
      'Malware that encrypts or locks a victim’s data and demands a payment in exchange for restoring access.',
    example:
      'Staff arrive to find every file renamed and a ransom note demanding payment to unlock them.',
    chapter: 2,
    related: ['Malware', 'Worm', 'Disaster Recovery'],
  },
  {
    term: 'Zero-Day Vulnerability',
    definition:
      'A security flaw that is unknown to the vendor or has no available fix, giving defenders zero days to prepare before it can be exploited.',
    example:
      'Attackers exploit a flaw in a browser before the vendor has released any patch for it.',
    chapter: 2,
    related: ['Vulnerability', 'Patch Management', 'Threat'],
  },
  {
    term: 'Patch Management',
    definition:
      'The process of regularly identifying, testing and applying updates that fix security flaws in software and systems.',
    example:
      "An IT team rolls out a critical operating-system update across all laptops within a week of its release.",
    chapter: 2,
    related: ['Vulnerability', 'Zero-Day Vulnerability', 'Preventive Control'],
  },
  {
    term: 'Encryption',
    definition:
      'Converting information into a coded form so that only someone with the correct key can read it.',
    example:
      'A laptop’s hard drive is encrypted, so a thief who steals it cannot read the files.',
    chapter: 1,
    related: ['Confidentiality', 'Authentication', 'CIA Triad'],
  },
  {
    term: 'Authentication',
    definition:
      'The process of verifying that someone or something is who or what they claim to be.',
    example:
      'Logging in with a username and password proves (authenticates) your identity to the system.',
    chapter: 1,
    related: ['Authorization', 'Multifactor Authentication', 'Confidentiality'],
  },
  {
    term: 'Authorization',
    definition:
      'Deciding what an authenticated user is allowed to do or access once their identity is confirmed.',
    example:
      'After logging in, a cashier can process sales but is not authorised to view payroll data.',
    chapter: 1,
    related: ['Authentication', 'Confidentiality', 'Multifactor Authentication'],
  },
  {
    term: 'Multifactor Authentication',
    definition:
      'A login method that requires two or more different types of proof of identity, such as a password plus a code from a phone.',
    example:
      'After entering a password, a user must also approve a prompt on their phone before access is granted.',
    chapter: 1,
    related: ['Authentication', 'Authorization', 'Phishing'],
  },
  {
    term: 'Social Engineering',
    definition:
      'Manipulating people into revealing information or taking actions that weaken security, rather than attacking technology directly.',
    example:
      'An attacker phones an employee pretending to be IT support and persuades them to reveal their password.',
    chapter: 4,
    related: ['Phishing', 'Vishing', 'Tailgating'],
  },
  {
    term: 'Phishing',
    definition:
      'A broad attack that sends deceptive messages, usually email, to trick many people into clicking malicious links or giving up information.',
    example:
      'A mass email claiming a parcel is waiting asks recipients to log in on a fake delivery website.',
    chapter: 4,
    related: ['Social Engineering', 'Spear Phishing', 'Smishing'],
  },
  {
    term: 'Spear Phishing',
    definition:
      'A targeted phishing attack aimed at a specific person or organisation, using personalised details to appear convincing.',
    example:
      'An email addressed to a named finance clerk references a real project to trick them into paying a fake invoice.',
    chapter: 4,
    related: ['Phishing', 'Whaling', 'Business Email Compromise'],
  },
  {
    term: 'Whaling',
    definition:
      'A spear phishing attack that targets senior executives or other high-value individuals.',
    example:
      "A message crafted to look like the CEO’s style targets the finance director to approve a large transfer.",
    chapter: 4,
    related: ['Spear Phishing', 'Business Email Compromise', 'Phishing'],
  },
  {
    term: 'Business Email Compromise',
    definition:
      'A scam where attackers impersonate a trusted executive, supplier or colleague by email to trick staff into transferring money or data.',
    example:
      'An email appearing to come from the CEO urgently asks accounts to pay a new supplier, but the account is the attacker’s.',
    chapter: 4,
    related: ['Whaling', 'Spear Phishing', 'Phishing'],
  },
  {
    term: 'Smishing',
    definition:
      'Phishing carried out through SMS or text messages that lure the recipient into clicking a link or replying with information.',
    example:
      'A text claiming to be from your bank asks you to confirm a payment by tapping a link.',
    chapter: 4,
    related: ['Phishing', 'Vishing', 'Social Engineering'],
  },
  {
    term: 'Vishing',
    definition:
      'Phishing carried out over the phone (voice), where an attacker talks a victim into revealing information or making payments.',
    example:
      'A caller pretending to be from the fraud team persuades a customer to read out a one-time security code.',
    chapter: 4,
    related: ['Phishing', 'Smishing', 'Social Engineering'],
  },
  {
    term: 'Insider Threat',
    definition:
      'A risk that comes from people inside the organisation, such as employees or contractors, whether they act maliciously or by mistake.',
    example:
      'A departing employee copies the customer list to a personal drive before leaving.',
    chapter: 4,
    related: ['Threat Actor', 'Social Engineering', 'Data Loss Prevention'],
  },
  {
    term: 'Tailgating',
    definition:
      'Gaining unauthorised entry to a secure area by following closely behind an authorised person through a controlled door.',
    example:
      'A stranger carrying coffee slips through a badge-controlled door behind a helpful employee who holds it open.',
    chapter: 5,
    related: ['Physical Security', 'Social Engineering', 'Defense in Depth'],
  },
  {
    term: 'Physical Security',
    definition:
      'Protecting people, buildings, equipment and information from physical threats using measures such as locks, guards and access controls.',
    example:
      'Server rooms are protected by badge readers, CCTV and a locked door so only authorised staff can enter.',
    chapter: 5,
    related: ['Tailgating', 'Defense in Depth', 'Preventive Control'],
  },
  {
    term: 'Defense in Depth',
    definition:
      'A strategy of layering multiple, independent security controls so that if one fails, others still protect the asset.',
    example:
      'A company combines locked doors, firewalls, antivirus and staff training rather than relying on any single control.',
    chapter: 5,
    related: ['Physical Security', 'Preventive Control', 'Security by Design'],
  },
  {
    term: 'Security by Design',
    definition:
      'Building security into a product or system from the very start, rather than adding it as an afterthought.',
    example:
      'A development team defines access rules and data protection before writing a line of code.',
    chapter: 3,
    related: ['SDLC', 'Defense in Depth', 'SQL Injection'],
  },
  {
    term: 'SDLC',
    definition:
      'The Software Development Life Cycle: the structured stages a software project moves through, from planning and design to testing and maintenance.',
    example:
      'Security reviews are scheduled at the design, build and testing stages of the SDLC.',
    chapter: 3,
    related: ['Security by Design', 'SQL Injection', 'Cross-Site Scripting'],
  },
  {
    term: 'SQL Injection',
    definition:
      'An attack where malicious input is inserted into a database query, letting an attacker read, change or delete data they should not reach.',
    example:
      'Typing crafted text into a login box tricks a poorly built website into revealing other users’ accounts.',
    chapter: 3,
    related: ['Cross-Site Scripting', 'SDLC', 'Security by Design'],
  },
  {
    term: 'Cross-Site Scripting',
    definition:
      'An attack that injects malicious scripts into a trusted website so they run in other visitors’ browsers.',
    example:
      'An attacker posts a comment containing a hidden script that steals the session of anyone who views it.',
    chapter: 3,
    related: ['SQL Injection', 'SDLC', 'Security by Design'],
  },
  {
    term: 'Supply Chain Attack',
    definition:
      'An attack that compromises an organisation indirectly by first breaching a supplier, partner or software it relies on.',
    example:
      'Attackers hide malicious code in a software update, which then spreads to every customer that installs it.',
    chapter: 6,
    related: ['Third-Party Risk', 'Cloud Security', 'Malware'],
  },
  {
    term: 'Third-Party Risk',
    definition:
      'The risk introduced by outside suppliers, vendors or partners who have access to your systems, data or facilities.',
    example:
      "A maintenance contractor’s weak security becomes a way into the client’s network.",
    chapter: 6,
    related: ['Supply Chain Attack', 'Cloud Security', 'Risk Assessment'],
  },
  {
    term: 'Cloud Security',
    definition:
      'The practices and controls used to protect data, applications and infrastructure hosted in cloud services.',
    example:
      'A team configures access controls and encryption on their cloud storage to keep files private.',
    chapter: 6,
    related: ['Shared Responsibility', 'Third-Party Risk', 'Encryption'],
  },
  {
    term: 'Shared Responsibility',
    definition:
      'The model where a cloud provider secures the underlying platform while the customer remains responsible for securing their own data and configuration.',
    example:
      'The provider patches the servers, but the customer must still set strong passwords and correct access rules.',
    chapter: 6,
    related: ['Cloud Security', 'Third-Party Risk', 'Authorization'],
  },
  {
    term: 'Data Loss Prevention',
    definition:
      'Tools and processes that detect and block sensitive information from leaving the organisation without authorisation.',
    example:
      'A system blocks an email because it detects a spreadsheet of customer card numbers attached.',
    chapter: 6,
    related: ['Confidentiality', 'Insider Threat', 'Detective Control'],
  },
  {
    term: 'Risk Assessment',
    definition:
      'The process of identifying assets, threats and vulnerabilities, then judging the likelihood and impact of things going wrong.',
    example:
      'Before launching a new app, a team lists what could go wrong and rates each risk by likelihood and impact.',
    chapter: 7,
    related: ['Risk', 'Risk Register', 'Risk Treatment'],
  },
  {
    term: 'Risk Register',
    definition:
      'A living record that lists identified risks along with their likelihood, impact, owner and planned response.',
    example:
      'Each risk is logged in a spreadsheet with a score, an owner and the action agreed to reduce it.',
    chapter: 7,
    related: ['Risk Assessment', 'Risk Treatment', 'Asset Register'],
  },
  {
    term: 'Asset Register',
    definition:
      'A documented inventory of an organisation’s assets, used as the starting point for protecting them.',
    example:
      'An IT list records every laptop, server and application, including who owns it and how sensitive it is.',
    chapter: 7,
    related: ['Asset', 'Risk Register', 'Risk Assessment'],
  },
  {
    term: 'Risk Appetite',
    definition:
      'The amount and type of risk an organisation is willing to accept in pursuit of its objectives.',
    example:
      'A bank has a low appetite for fraud risk, so it invests heavily in controls even when they are costly.',
    chapter: 7,
    related: ['Risk Treatment', 'Risk Assessment', 'Risk Register'],
  },
  {
    term: 'Risk Treatment',
    definition:
      'Deciding how to respond to each risk: reducing it, avoiding it, transferring it (for example with insurance) or accepting it.',
    example:
      'A company reduces one risk with new controls, transfers another via insurance and accepts a minor one.',
    chapter: 7,
    related: ['Risk Appetite', 'Risk Assessment', 'Preventive Control'],
  },
  {
    term: 'Preventive Control',
    definition:
      'A control designed to stop a security incident from happening in the first place.',
    example:
      'A firewall and staff security training both aim to prevent attacks before they succeed.',
    chapter: 7,
    related: ['Detective Control', 'Reactive Control', 'Defense in Depth'],
  },
  {
    term: 'Detective Control',
    definition:
      'A control designed to identify and alert on a security incident while or shortly after it occurs.',
    example:
      'An intrusion-detection system raises an alert when it spots unusual activity on the network.',
    chapter: 7,
    related: ['Preventive Control', 'Reactive Control', 'Incident Response'],
  },
  {
    term: 'Reactive Control',
    definition:
      'A control that responds to an incident after it has been detected, to limit damage and restore normal operations.',
    example:
      'After malware is found, the team isolates the affected machines and restores files from backup.',
    chapter: 7,
    related: ['Preventive Control', 'Detective Control', 'Incident Response'],
  },
  {
    term: 'Incident Response',
    definition:
      'The organised approach to detecting, containing, investigating and recovering from a security incident.',
    example:
      'A documented plan guides the team to isolate systems, investigate the cause and restore service after a breach.',
    chapter: 8,
    related: ['Security Incident', 'Security Event', 'Disaster Recovery'],
  },
  {
    term: 'Security Event',
    definition:
      'Any observable occurrence in a system or network, which may be routine and harmless or an early sign of trouble.',
    example:
      'A single failed login is a security event; it is logged but may be entirely normal.',
    chapter: 8,
    related: ['Security Incident', 'Detective Control', 'Incident Response'],
  },
  {
    term: 'Security Incident',
    definition:
      'A security event, or series of events, that actually threatens the confidentiality, integrity or availability of information.',
    example:
      'Thousands of failed logins followed by a successful one from an unknown country is treated as an incident.',
    chapter: 8,
    related: ['Security Event', 'Incident Response', 'Cyber Resilience'],
  },
  {
    term: 'Cyber Resilience',
    definition:
      'An organisation’s ability to keep delivering its key services and recover quickly despite cyber incidents.',
    example:
      'A firm hit by ransomware keeps critical operations running from backups and resumes fully within a day.',
    chapter: 8,
    related: ['Business Continuity', 'Disaster Recovery', 'Incident Response'],
  },
  {
    term: 'Business Continuity',
    definition:
      'Planning that keeps an organisation’s essential functions running during and after a disruptive event.',
    example:
      'If the main office is unusable, staff can keep serving customers from a backup site or from home.',
    chapter: 8,
    related: ['Disaster Recovery', 'Business Impact Analysis', 'Cyber Resilience'],
  },
  {
    term: 'Disaster Recovery',
    definition:
      'The specific plans and steps for restoring IT systems and data after a major disruption.',
    example:
      'After a server failure, the team follows a documented procedure to rebuild systems from backups.',
    chapter: 8,
    related: ['Business Continuity', 'Recovery Time Objective', 'Cyber Resilience'],
  },
  {
    term: 'Business Impact Analysis',
    definition:
      'An assessment that identifies critical activities and the effect of their disruption, used to prioritise recovery.',
    example:
      'Analysis shows that the online checkout must be restored within an hour, while the blog can wait a day.',
    chapter: 8,
    related: ['Business Continuity', 'Recovery Time Objective', 'Disaster Recovery'],
  },
  {
    term: 'Recovery Time Objective',
    definition:
      'The maximum acceptable length of time a service or system can be down before the impact becomes unacceptable.',
    example:
      'The payment system has a recovery time objective of one hour, so plans must restore it within that window.',
    chapter: 8,
    related: ['Business Impact Analysis', 'Disaster Recovery', 'Business Continuity'],
  },
  {
    term: 'ISMS',
    definition:
      'An Information Security Management System: a structured set of policies, processes and controls for managing information security across an organisation.',
    example:
      'A company documents its security policies, risk process and controls into one managed system that is reviewed regularly.',
    chapter: 9,
    related: ['ISO 27001', 'Risk Assessment', 'Cyber Essentials'],
  },
  {
    term: 'ISO 27001',
    definition:
      'An international standard that sets out requirements for establishing and maintaining an information security management system.',
    example:
      'A business is independently audited and certified to ISO 27001 to demonstrate strong security practices.',
    chapter: 9,
    related: ['ISMS', 'ISO 27701', 'ISO 22301'],
  },
  {
    term: 'ISO 27701',
    definition:
      'An international standard that extends ISO 27001 with requirements for managing personal data and privacy.',
    example:
      'A firm adds privacy controls to its existing security system to align with ISO 27701 and support data protection law.',
    chapter: 9,
    related: ['ISO 27001', 'GDPR', 'ISMS'],
  },
  {
    term: 'ISO 22301',
    definition:
      'An international standard that specifies requirements for a business continuity management system.',
    example:
      'An organisation uses ISO 22301 to structure how it prepares for and recovers from major disruptions.',
    chapter: 9,
    related: ['Business Continuity', 'Disaster Recovery', 'ISO 27001'],
  },
  {
    term: 'Cyber Essentials',
    definition:
      'A UK government-backed scheme that defines a baseline set of technical controls to protect against common cyber attacks.',
    example:
      'A small business certifies to Cyber Essentials by showing it has firewalls, patching and access controls in place.',
    chapter: 9,
    related: ['ISO 27001', 'NIST CSF', 'Patch Management'],
  },
  {
    term: 'NIST CSF',
    definition:
      'The NIST Cybersecurity Framework: a widely used set of guidelines that organise security activities into core functions such as identify, protect, detect, respond and recover.',
    example:
      'A company maps its security program to the NIST CSF functions to find and close gaps.',
    chapter: 9,
    related: ['ISMS', 'Cyber Essentials', 'Incident Response'],
  },
  {
    term: 'GDPR',
    definition:
      'The General Data Protection Regulation: a European data protection law that governs how organisations collect, use and protect personal data.',
    example:
      'A company must gain consent to use personal data and report certain data breaches to the regulator.',
    chapter: 1,
    related: ['PCI DSS', 'ISO 27701', 'Confidentiality'],
  },
  {
    term: 'PCI DSS',
    definition:
      'The Payment Card Industry Data Security Standard: a set of requirements for organisations that store, process or transmit payment card data.',
    example:
      'A retailer must encrypt card data and restrict access to comply with PCI DSS.',
    chapter: 1,
    related: ['GDPR', 'Encryption', 'Confidentiality'],
  },
]
