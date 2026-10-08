import type { Chapter } from '../types'

const chapter: Chapter = {
  number: 3,
  slug: "security-by-design",
  title: "Security by Design",
  subtitle: "Building security into the development lifecycle",
  summary: "Why security built in from the first line beats security bolted on at the end — and how to weave it through every stage of building software.",
  minutes: 13,
  accent: "teal",
  icon: "PencilRuler",
  objectives: [
    "Explain what 'security by design' means and why it beats bolting security on later.",
    "Identify the stages of the software development lifecycle and the security activity in each.",
    "Compare how security fits into waterfall and agile development.",
    "Describe the origins of Microsoft's Security Development Lifecycle.",
    "Recognise SQL injection and cross-site scripting, and the safer coding patterns that prevent them.",
  ],
  sections: [
    {
      id: 'why-by-design',
      title: 'Built in, not bolted on',
      blocks: [
        {
          kind: 'paragraph',
          text: '**Security by design** means building protection into software from the very start, rather than adding it after the product is finished. The alternative — bolting security on at the end — tends to be more expensive, less effective and full of gaps.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'Security is most effective when it is considered **from the beginning of development and throughout**, rather than treated as a final step. Decisions made early — about architecture, data handling and trust — shape how secure the finished system can ever be.',
        },
        {
          kind: 'paragraph',
          text: 'The reason is simple. A flaw baked into the design is woven through the whole product; by the time it ships, fixing it may mean rebuilding large parts. Catching the same flaw during design costs a conversation. This is the same mindset the earlier chapters hinted at: remove the vulnerability before a threat can ever reach it.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Example',
          text: 'A team building an online shop decides early that card data will never be stored in plain text. Because that choice shapes the database design from day one, there is no risky plain-text store to discover and retrofit later. **The cheapest vulnerability to fix is the one you never built.**',
        },
      ],
    },
    {
      id: 'secure-sdlc',
      title: 'Security across the lifecycle',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Most software is built through a **software development lifecycle (SDLC)** — a set of stages from first idea to ongoing upkeep. Security by design means every stage has its own security activity, not just a check at the end.',
        },
        { kind: 'diagram', id: 'secure-sdlc' },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'A typical lifecycle runs through **Requirements, Design, Development, Testing, Deployment and Maintenance**. Each stage carries security work appropriate to it.',
        },
        {
          kind: 'list',
          items: [
            '**Requirements** — capture security and privacy requirements alongside the features, so protection is a stated goal from the outset.',
            '**Design** — carry out threat modelling and choose a secure architecture, asking how the system could be attacked before it is built.',
            '**Development** — follow secure coding practices and review code so flaws are caught as they are written.',
            '**Testing** — perform security testing and vulnerability assessment to find weaknesses before release.',
            '**Deployment** — apply secure configuration and verify the release, so a well-built system is not undermined by a careless rollout.',
            '**Maintenance** — keep patching, monitoring and updating, because new weaknesses emerge long after launch.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Example',
          text: 'For a university enrolment system, the requirements stage states that only a student should see their own record. Design adds access controls to the architecture; development enforces them in code; testing tries to bypass them; deployment locks down the server; maintenance keeps it patched. **One goal, carried through every stage.**',
        },
      ],
    },
    {
      id: 'waterfall-vs-agile',
      title: 'Waterfall and agile',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Teams organise the lifecycle differently. **Waterfall** moves through the stages in a single linear sequence. **Agile** works in short, repeated iterations, revisiting stages again and again. Security has to fit whichever approach a team uses.',
        },
        { kind: 'diagram', id: 'waterfall-agile' },
        {
          kind: 'compare',
          left: {
            title: 'Waterfall (linear)',
            points: [
              'Stages run **once, in order**, from requirements to maintenance.',
              'Security requirements and threat modelling are set **early and fixed**.',
              'Risk: a flaw found late is costly, because stages are not revisited.',
            ],
          },
          right: {
            title: 'Agile (iterative)',
            points: [
              'Stages **repeat each iteration**, with frequent small releases.',
              'Security must be **revisited every cycle**, not just at the start.',
              'Benefit: issues can be caught and corrected in the next short iteration.',
            ],
          },
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'In practice',
          text: 'Neither approach is automatically more secure. In waterfall, invest heavily in getting security requirements and design right early. In agile, make security a standing part of **every** iteration so it is never quietly dropped when deadlines bite.',
        },
      ],
    },
    {
      id: 'trustworthy-computing',
      title: 'From a memo to a method: Microsoft\'s SDL',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Security by design is not only a theory. A well-known turning point came in **2002**, when Microsoft launched its **Trustworthy Computing** initiative, placing security and reliability at the centre of how it built software.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'Microsoft\'s **Trustworthy Computing** initiative (2002) led to the **Security Development Lifecycle (SDL)** — a structured process for embedding security activities into each stage of software development.',
        },
        {
          kind: 'paragraph',
          text: 'The SDL turned the principle into a repeatable practice: requirements, design, implementation, verification and release each gained defined security tasks. It became an influential model for the whole industry, showing that security by design could be systematic rather than ad hoc — exactly the lifecycle thinking in the stages above.',
        },
      ],
    },
    {
      id: 'web-app-vulnerabilities',
      title: 'Two classic web vulnerabilities',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Secure coding is where design meets reality. Two of the most common and long-lived web flaws — **SQL injection** and **cross-site scripting (XSS)** — both come from trusting user input too much, and both have well-understood safer patterns.',
        },
        {
          kind: 'heading',
          text: 'SQL injection',
        },
        {
          kind: 'paragraph',
          text: '**SQL injection** happens when untrusted user input is pasted straight into a database query, letting an attacker change what the query does. The safer pattern is to use **parameterised queries**, where input is sent as data that can never be read as a command.',
        },
        { kind: 'diagram', id: 'secure-input-handling' },
        {
          kind: 'compare',
          left: {
            title: 'Unsafe: building the query from input',
            points: [
              'User input is **concatenated** directly into the SQL string.',
              'A crafted login field can rewrite the query\'s meaning.',
              'The database cannot tell the attacker\'s input from your command.',
            ],
          },
          right: {
            title: 'Safer: parameterised queries',
            points: [
              'Input is passed as a **bound parameter**, separate from the query.',
              'The database always treats it as **data, never as code**.',
              'The same shape of attack simply fails to run.',
            ],
          },
        },
        {
          kind: 'callout',
          tone: 'danger',
          title: 'Example',
          text: 'On a bank\'s login page, concatenating the username field into the query lets an attacker type input that turns a login check into "log me in as anyone". A parameterised query treats that same text as a literal username, and the attack does nothing.',
        },
        {
          kind: 'heading',
          text: 'Cross-site scripting (XSS)',
        },
        {
          kind: 'paragraph',
          text: '**Cross-site scripting** happens when untrusted content is shown to other users without being neutralised, so it runs as a script in their browsers. The defence is **context-aware output encoding** — converting content so the browser displays it as text instead of executing it.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Example',
          text: 'On an online shop\'s product reviews, an attacker posts a review containing a script. Without encoding, that script runs in the browser of every shopper who views the page. With context-aware output encoding, the browser shows the script as harmless text.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'Both flaws share one root cause: **untrusted input is treated as trusted**. SQL injection is prevented with parameterised queries; XSS is prevented with context-aware output encoding.',
        },
      ],
    },
    {
      id: 'talktalk',
      title: 'Case study: TalkTalk, 2015',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The **2015 TalkTalk breach** is a well-known reminder of why web application security matters. It is widely associated with the exploitation of web application weaknesses to reach customer data.',
        },
        {
          kind: 'callout',
          tone: 'textbook',
          text: 'The TalkTalk breach of 2015 is relevant to web application security: weaknesses in web-facing systems were exploited, exposing customer information and causing significant reputational and financial consequences.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'The lesson',
          text: 'TalkTalk shows that the coding patterns in this chapter are not academic. The same classes of web vulnerability discussed here, left unaddressed in a public-facing system, can expose real customers\' data. Building security in from the start — and testing for these flaws before release — is what prevents outcomes like this.',
        },
      ],
    },
  ],
  definitions: [
    {
      term: 'Security by design',
      definition: 'Building security into software from the start and throughout development, rather than adding it at the end.',
      example: 'Deciding at design time that card data will never be stored in plain text.',
    },
    {
      term: 'Software development lifecycle (SDLC)',
      definition: 'The set of stages software passes through, from requirements to ongoing maintenance.',
      example: 'Requirements, design, development, testing, deployment and maintenance.',
    },
    {
      term: 'Threat modelling',
      definition: 'A design-stage activity that systematically considers how a system could be attacked, so defences can be built in.',
      example: 'Asking how an attacker might bypass access controls on an enrolment system before it is built.',
    },
    {
      term: 'Security Development Lifecycle (SDL)',
      definition: 'A structured process, developed by Microsoft, that embeds security activities into each stage of software development.',
      example: 'Defined security tasks for requirements, design, implementation, verification and release.',
    },
    {
      term: 'SQL injection',
      definition: 'A vulnerability where untrusted input is inserted into a database query, letting an attacker alter what the query does.',
      example: 'A crafted login field that turns a password check into a way to log in as anyone.',
    },
    {
      term: 'Parameterised query',
      definition: 'A safer way to run database queries in which user input is bound as data and never interpreted as part of the command.',
      example: 'Passing a username as a parameter so it can only ever be treated as a value.',
    },
    {
      term: 'Cross-site scripting (XSS)',
      definition: 'A vulnerability where untrusted content runs as a script in another user\'s browser.',
      example: 'A malicious product review that executes in every shopper\'s browser.',
    },
    {
      term: 'Context-aware output encoding',
      definition: 'Converting untrusted content so the browser displays it as text rather than executing it as code.',
      example: 'Encoding a review so an embedded script shows up as harmless text.',
    },
  ],
  misconceptions: [
    {
      myth: 'Security can be added at the end, once the software works.',
      reality: 'Bolting security on late is costly and leaves gaps. Flaws baked into the design are far harder to remove after release.',
    },
    {
      myth: 'Agile development leaves no room for security.',
      reality: 'Security fits agile by being revisited in every iteration, rather than being treated as a one-off early stage.',
    },
    {
      myth: 'Validating input a little is enough to stop SQL injection.',
      reality: 'The reliable fix is parameterised queries, which keep input as data so it can never be run as part of the command.',
    },
    {
      myth: 'Cross-site scripting only harms the person who posts the content.',
      reality: 'XSS runs in the browsers of other users who view the content, so a single injected script can affect many victims.',
    },
  ],
  takeaways: [
    'Building security into development from the start reduces preventable vulnerabilities and lowers the cost of fixing them.',
    'Every SDLC stage — requirements through maintenance — has its own security activity.',
    'Security must be adapted to the process: fixed early in waterfall, revisited each iteration in agile.',
    'Microsoft\'s Trustworthy Computing (2002) and the SDL showed security by design can be systematic.',
    'SQL injection and XSS share one root cause — trusting input — and have well-known safer patterns.',
  ],
  presentationSummary: [
    'Security by design means building protection in from the start, not bolting it on later.',
    'Each SDLC stage carries security work, from security requirements to ongoing patching.',
    'Waterfall fixes security early and linearly; agile revisits it in every iteration.',
    'Microsoft\'s 2002 Trustworthy Computing initiative gave rise to the Security Development Lifecycle.',
    'SQL injection is prevented with parameterised queries; XSS with context-aware output encoding.',
    'TalkTalk 2015 shows the real cost of leaving web application weaknesses unaddressed.',
  ],
  diagramIds: ["secure-sdlc", "waterfall-agile", "secure-input-handling"],
  relatedCaseStudies: ['talktalk'],
}

export default chapter
