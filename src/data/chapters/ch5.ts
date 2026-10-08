import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 5,
  slug: "physical-threats",
  title: "Physical Threats",
  subtitle: "Perimeters, tailgating and defense in depth",
  summary: "How physical access to buildings and devices can undo even the strongest digital security.",
  minutes: 12,
  accent: "warn",
  icon: "DoorClosed",
  objectives: [
    "Explain how physical access to buildings, devices and information undermines digital security.",
    "Describe common perimeter controls and understand the limits of any single control.",
    "Define tailgating and explain how escorts and checks reduce it.",
    "Apply a clear desk policy and good practices for mobile devices and removable media.",
    "Explain defense in depth using layered physical and digital controls.",
    "Draw lessons from the 2013 bank attacks about verifying personnel and controlling physical access.",
  ],
  sections: [
    {
      id: 'physical-matters',
      title: 'Why physical security matters',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Even the strongest digital defences can be undermined by physical access. If an attacker can reach a building, a device or printed information, many technical controls can be bypassed entirely.',
        },
        {
          kind: 'paragraph',
          text: 'A locked-down network means little if someone can walk up to an unlocked computer, plug a device into a server, or read a password left on a sticky note. **Physical security and digital security are two halves of the same job.** Attackers will always choose whichever path is easier, and sometimes the easiest path is simply through the front door.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Why this matters',
          text: 'Think of physical access as a master key. Once an attacker is physically present at a device, they can often reset, copy or tamper with it in ways that encryption and firewalls were never meant to stop.',
        },
      ],
    },
    {
      id: 'perimeter-security',
      title: 'Perimeter security and its limits',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Physical perimeter security uses controls such as door locks, access cards, PIN entry, RFID, CCTV, visitor logs, security personnel and restricted areas to limit who can enter a building or sensitive space.',
        },
        {
          kind: 'paragraph',
          text: 'Perimeter controls decide who gets in and create a record of who was present. No single control is enough on its own, which is why they are layered together.',
        },
        {
          kind: 'list',
          items: [
            '**Door locks** — the most basic barrier, but useless if a door is propped open.',
            '**Access cards and RFID** — grant entry to cardholders, but a lost or cloned card bypasses them.',
            '**PIN entry** — simple, but PINs can be shared or shoulder-surfed.',
            '**CCTV** — records activity, but usually detects rather than prevents.',
            '**Visitor logs and security personnel** — track and challenge outsiders, but depend on people being diligent.',
            '**Restricted areas** — reserve sensitive rooms (such as a server room) for authorised staff only.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'The limit of any single control',
          text: 'Each control has a weakness. A card reader does not know if the cardholder is being followed; a camera does not stop an intruder in real time. Relying on one control alone creates a false sense of safety.',
        },
      ],
    },
    {
      id: 'tailgating',
      title: 'Tailgating and the office floor plan',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Tailgating is when an unauthorised person follows an authorised person through a controlled entry point, slipping in behind them without presenting their own credentials.',
        },
        {
          kind: 'paragraph',
          text: 'Tailgating defeats expensive access systems using nothing but politeness. Most people hold the door for someone carrying coffee or boxes. The floor plan below shows how an attacker who tailgates past reception can move from public areas into staff offices, a server room and secure document storage, and how escorts and checks interrupt that path.',
        },
        {
          kind: 'diagram',
          id: 'office-entry',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'At a hospital, a stranger in scrubs carrying a clipboard follows a doctor through a badge-controlled door into a ward. No one challenges them because they look the part. A simple habit, letting the door close and asking visitors to badge in themselves, would have stopped them.',
        },
        {
          kind: 'list',
          items: [
            'Let secure doors close behind you rather than holding them for strangers.',
            'Escort visitors and ensure they sign the visitor log.',
            'Challenge, politely, anyone without a visible badge in a restricted area.',
          ],
        },
      ],
    },
    {
      id: 'clear-desk-and-devices',
      title: 'Clear desk policy, mobile devices and USB threats',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'A clear desk policy requires staff to lock away documents, lock their computers when away, keep passwords out of sight and secure removable storage, so sensitive information is not exposed.',
        },
        {
          kind: 'heading',
          text: 'Clear desk policy',
        },
        {
          kind: 'list',
          items: [
            'Lock sensitive documents away when not in use.',
            'Lock the computer screen whenever you step away.',
            'Never leave passwords written where they can be seen.',
            'Store removable media (USB sticks, drives) securely.',
          ],
        },
        {
          kind: 'heading',
          text: 'Mobile devices',
        },
        {
          kind: 'list',
          items: [
            'Encrypt devices so data is unreadable if they are lost or stolen.',
            'Use authentication such as a PIN, password or biometric lock.',
            'Keep backups so a lost device does not mean lost data.',
            'Protect devices physically: do not leave them unattended in public.',
            'Report lost or stolen devices immediately so access can be revoked.',
          ],
        },
        {
          kind: 'heading',
          text: 'USB and removable device threats',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Removable devices carry real risk. USB baiting leaves infected drives for curious people to plug in, malicious devices can impersonate a keyboard, hardware keyloggers can capture typed credentials, and some devices can even damage the hardware they are connected to.',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Do not plug in unknown devices',
          text: 'A USB stick found in a car park may be bait. Plugging it into a bank workstation could install malware or record keystrokes. Treat unknown removable devices as untrusted and hand them to IT or security.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'A note on scope',
          text: 'This section describes the risks so you can defend against them. It intentionally gives no instructions for building or using harmful devices.',
        },
      ],
    },
    {
      id: 'defense-in-depth',
      title: 'Defense in depth',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'Defense in depth is the practice of layering multiple controls so that if one fails, others still protect the asset. Physical and digital layers work together: building perimeter, identity verification, restricted room access, device authentication and data encryption.',
        },
        {
          kind: 'paragraph',
          text: 'No single lock, card or password is perfect. Defense in depth accepts this and stacks controls so an attacker must defeat several in a row. The diagram below shows layers from the outside in, each one a fresh obstacle.',
        },
        {
          kind: 'diagram',
          id: 'defense-in-depth',
        },
        {
          kind: 'compare',
          left: {
            title: 'Single control (fragile)',
            points: [
              'One locked door protects the server room.',
              'If the door is propped open, the asset is fully exposed.',
              'A single failure becomes a full breach.',
            ],
          },
          right: {
            title: 'Layered controls (resilient)',
            points: [
              'Perimeter, then badge check, then locked room, then device login, then encryption.',
              'Defeating one layer still leaves others standing.',
              'The attacker needs multiple failures to succeed.',
            ],
          },
        },
      ],
    },
    {
      id: 'bank-2013',
      title: 'Case study: the 2013 bank attacks',
      blocks: [
        {
          kind: 'callout',
          tone: 'textbook',
          title: 'From the textbook',
          text: 'In the 2013 bank attacks, criminals posed as IT workers to gain physical access to bank branches. They connected remotely accessible hardware to systems linked to the banking network, then controlled those devices from outside.',
        },
        {
          kind: 'paragraph',
          text: 'The attack shows how physical access turns into digital compromise. By impersonating trusted IT staff, the attackers walked past perimeter controls and attached their own hardware to bank systems. From there they could operate remotely, never needing to break the digital defences from outside.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Lessons for defenders',
          text: 'Verify the identity of anyone claiming to be support or maintenance staff. Control and supervise physical access to equipment. Regularly inspect for unauthorised or unfamiliar devices connected to your systems.',
        },
        {
          kind: 'list',
          items: [
            'Impersonation defeated trust-based entry: confirm appointments and identities independently.',
            'Physical access to hardware enabled remote control: restrict who can reach sensitive equipment.',
            'Unknown devices were the attack tool: audit connected hardware and investigate anything unexpected.',
          ],
        },
      ],
    },
  ],
  definitions: [
    {
      term: "Physical security",
      definition: "Measures that protect buildings, devices and printed information from unauthorised physical access.",
      example: "Locked server rooms, access cards and CCTV at a bank branch.",
    },
    {
      term: "Perimeter security",
      definition: "The layer of controls at the boundary of a building or space that decides who may enter.",
      example: "A reception desk with a visitor log and a badge-controlled door.",
    },
    {
      term: "Tailgating",
      definition: "Gaining entry by following an authorised person through a controlled door without presenting one's own credentials.",
      example: "A stranger slips through a badge-protected door behind an employee carrying boxes.",
    },
    {
      term: "Clear desk policy",
      definition: "A rule that sensitive documents, screens and passwords must not be left exposed when unattended.",
      example: "Staff lock their screens and file away patient records before leaving for lunch.",
    },
    {
      term: "USB baiting",
      definition: "Leaving infected removable devices where curious people will find and plug them in.",
      example: "An infected USB stick dropped in a company car park.",
    },
    {
      term: "Hardware keylogger",
      definition: "A physical device attached between a keyboard and computer that secretly records what is typed.",
      example: "A small device records a user's typed password for an attacker to collect later.",
    },
    {
      term: "Defense in depth",
      definition: "Layering multiple independent controls so that if one fails, others still protect the asset.",
      example: "Perimeter, badge checks, a locked room, device login and encryption all protecting the same data.",
    },
    {
      term: "Restricted area",
      definition: "A space reserved for authorised personnel only, with stronger access controls than public areas.",
      example: "A server room that only IT staff may enter.",
    },
  ],
  misconceptions: [
    {
      myth: "Strong passwords and encryption mean physical security no longer matters.",
      reality: "Physical access to a device or document can bypass many digital controls entirely.",
    },
    {
      myth: "An access card system makes tailgating impossible.",
      reality: "A card reader cannot tell if someone slips through the door behind an authorised person.",
    },
    {
      myth: "A found USB stick is harmless to plug in just to see what is on it.",
      reality: "Unknown removable devices can carry malware, impersonate a keyboard or log keystrokes.",
    },
    {
      myth: "One strong control, like a good lock, is enough to protect a sensitive room.",
      reality: "Single controls fail; defense in depth layers several so one failure is not a breach.",
    },
  ],
  takeaways: [
    "Physical access can undermine even the strongest digital security.",
    "Perimeter controls are useful but each has limits, so they must be layered.",
    "Tailgating defeats access systems through human politeness; escorts and door discipline stop it.",
    "Clear desks, protected mobile devices and caution with removable media reduce everyday physical risk.",
    "Cybersecurity needs both digital and physical protection, applied in depth.",
  ],
  presentationSummary: [
    "Physical access to buildings, devices or paper can bypass digital defences.",
    "Perimeter controls (locks, cards, PIN, RFID, CCTV, logs, guards) are strongest when layered.",
    "Tailgating lets an unauthorised person follow an authorised one inside.",
    "Clear desk policies, device encryption and removable-media caution protect daily work.",
    "Defense in depth stacks physical and digital layers so one failure is not a breach.",
    "The 2013 bank attacks show the need to verify personnel and control physical access.",
  ],
  diagramIds: ["office-entry", "defense-in-depth"],
  relatedCaseStudies: ["bank-2013"],
}

export default chapter
