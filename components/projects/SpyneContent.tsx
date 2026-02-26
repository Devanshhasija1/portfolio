'use client';

import FlowChart from './FlowChart';
import FunnelChart from './charts/FunnelChart';
import ProcessTimeline from './charts/ProcessTimeline';
import HorizontalBar from './charts/HorizontalBar';
import ChannelBreakdown from './charts/ChannelBreakdown';
import ComparisonMatrix from './charts/ComparisonMatrix';
import PrincipleCards from './charts/PrincipleCards';
import InsightCallout from './charts/InsightCallout';
import KeyDecision from './charts/KeyDecision';
import WidgetStateMap from './charts/WidgetStateMap';

const IMG = '/images/spyne';

/* ─── Layout primitives ─── */

function Section({ id, slug, title, children }: { id: string; slug: string; title: string; children: React.ReactNode }) {
  return (
    <section id={`${slug}-${id}`} className="project-content-section">
      <div className="project-content-container">
        <h2 className="text-overview-overline project-section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <div className="text-projectpage-body project-body-text">{children}</div>;
}

function ImageRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`project-image-row ${className}`}>{children}</div>;
}

function Img({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`project-image-wrap ${className}`}>
      <img src={src} loading="lazy" alt={alt} className="image-default" />
    </div>
  );
}

function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="case-study-stat-row">
      {stats.map((s, i) => (
        <div key={i} className="case-study-stat">
          <div className="case-study-stat-value">{s.value}</div>
          <div className="case-study-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="case-study-subheading">{children}</h3>;
}

function ChartRow({ children }: { children: React.ReactNode }) {
  return <div className="case-study-chart-row">{children}</div>;
}

/* ─── Flow data ─── */

const mainFlow = {
  nodes: [
    { id: 'visitor', label: 'Visitor lands on VDP', x: 20, y: 170, accent: false },
    { id: 'widget', label: 'Widget appears', x: 240, y: 170, accent: true },
    { id: 'chat', label: 'Chat with AI', x: 460, y: 60, accent: true },
    { id: 'call', label: 'Voice Call', x: 460, y: 170, accent: true },
    { id: 'email', label: 'Email Dealer', x: 460, y: 280, accent: true },
    { id: 'exit', label: 'Exit Intent Detected', x: 240, y: 340, accent: false },
    { id: 'reengage', label: 'Re-engage Prompt', x: 460, y: 390, accent: false },
    { id: 'lead', label: 'Lead Captured', x: 680, y: 170, accent: true },
  ],
  edges: [
    { from: 'visitor', to: 'widget' },
    { from: 'widget', to: 'chat' },
    { from: 'widget', to: 'call' },
    { from: 'widget', to: 'email' },
    { from: 'chat', to: 'lead' },
    { from: 'call', to: 'lead' },
    { from: 'email', to: 'lead' },
    { from: 'widget', to: 'exit' },
    { from: 'exit', to: 'reengage' },
    { from: 'reengage', to: 'chat' },
  ],
};

const chatFlow = {
  nodes: [
    { id: 'open', label: 'Open Chat', x: 20, y: 80, accent: false },
    { id: 'greet', label: 'AI Greeting', x: 210, y: 80, accent: true },
    { id: 'actions', label: 'Quick Actions', x: 400, y: 80, accent: true },
    { id: 'testdrive', label: 'Book Test Drive', x: 250, y: 190, accent: false },
    { id: 'finance', label: 'Finance Options', x: 460, y: 190, accent: false },
    { id: 'questions', label: 'Ask Questions', x: 670, y: 190, accent: false },
    { id: 'convo', label: 'AI Conversation', x: 460, y: 290, accent: true },
    { id: 'collect', label: 'Collect Lead Info', x: 460, y: 390, accent: true },
  ],
  edges: [
    { from: 'open', to: 'greet' },
    { from: 'greet', to: 'actions' },
    { from: 'actions', to: 'testdrive' },
    { from: 'actions', to: 'finance' },
    { from: 'actions', to: 'questions' },
    { from: 'testdrive', to: 'convo' },
    { from: 'finance', to: 'convo' },
    { from: 'questions', to: 'convo' },
    { from: 'convo', to: 'collect' },
  ],
};

const callFlow = {
  nodes: [
    { id: 'tap', label: 'Tap Call', x: 20, y: 100, accent: false },
    { id: 'phone', label: 'Enter Phone Number', x: 210, y: 30, accent: false },
    { id: 'direct', label: 'Direct Connect', x: 210, y: 170, accent: false },
    { id: 'connect', label: 'Connecting...', x: 430, y: 100, accent: true },
    { id: 'active', label: 'Active Call', x: 640, y: 100, accent: true },
  ],
  edges: [
    { from: 'tap', to: 'phone', label: 'Phone entry' },
    { from: 'tap', to: 'direct', label: 'One-tap' },
    { from: 'phone', to: 'connect' },
    { from: 'direct', to: 'connect' },
    { from: 'connect', to: 'active' },
  ],
};

const emailFlow = {
  nodes: [
    { id: 'start', label: 'Open Email', x: 20, y: 130, accent: false },
    { id: 'template', label: 'Choose Template', x: 220, y: 50, accent: false },
    { id: 'ai', label: 'Write with AI', x: 220, y: 210, accent: true },
    { id: 'draft', label: 'AI Drafts Email', x: 440, y: 130, accent: true },
    { id: 'edit', label: 'Edit / Regenerate', x: 440, y: 260, accent: false },
    { id: 'send', label: 'Send', x: 640, y: 130, accent: true },
    { id: 'confirm', label: 'Email Sent!', x: 640, y: 260, accent: false },
  ],
  edges: [
    { from: 'start', to: 'template' },
    { from: 'start', to: 'ai' },
    { from: 'template', to: 'draft' },
    { from: 'ai', to: 'draft' },
    { from: 'draft', to: 'send' },
    { from: 'draft', to: 'edit' },
    { from: 'edit', to: 'draft' },
    { from: 'send', to: 'confirm' },
  ],
};

const widgetStates = {
  states: [
    { id: 'dormant', label: 'Dormant', x: 20, y: 30, type: 'initial' as const },
    { id: 'topbar', label: 'Agent Top Bar', x: 200, y: 30, type: 'active' as const },
    { id: 'expanded', label: 'Widget Expanded', x: 400, y: 30, type: 'active' as const },
    { id: 'chat-idle', label: 'Chat — Idle', x: 50, y: 130, type: 'active' as const },
    { id: 'chat-active', label: 'Chat — Active', x: 250, y: 130, type: 'active' as const },
    { id: 'chat-leadcap', label: 'Chat — Lead Form', x: 480, y: 130, type: 'active' as const },
    { id: 'call-dial', label: 'Call — Phone Entry', x: 50, y: 230, type: 'active' as const },
    { id: 'call-connecting', label: 'Call — Connecting', x: 260, y: 230, type: 'active' as const },
    { id: 'call-live', label: 'Call — Live', x: 470, y: 230, type: 'active' as const },
    { id: 'call-minimized', label: 'Call — Minimized', x: 670, y: 230, type: 'active' as const },
    { id: 'email-compose', label: 'Email — Compose', x: 80, y: 330, type: 'active' as const },
    { id: 'email-ai', label: 'Email — AI Draft', x: 290, y: 330, type: 'active' as const },
    { id: 'email-sent', label: 'Email — Sent', x: 500, y: 330, type: 'terminal' as const },
    { id: 'exit-prompt', label: 'Exit Intent Prompt', x: 620, y: 30, type: 'default' as const },
    { id: 'lead-captured', label: 'Lead Captured', x: 680, y: 130, type: 'terminal' as const },
  ],
  transitions: [
    { from: 'dormant', to: 'topbar', label: 'Page load' },
    { from: 'topbar', to: 'expanded', label: 'Click' },
    { from: 'expanded', to: 'chat-idle', label: 'Select chat' },
    { from: 'expanded', to: 'call-dial', label: 'Select call' },
    { from: 'expanded', to: 'email-compose', label: 'Select email' },
    { from: 'chat-idle', to: 'chat-active', label: 'User types' },
    { from: 'chat-active', to: 'chat-leadcap', label: 'Trigger' },
    { from: 'chat-leadcap', to: 'lead-captured' },
    { from: 'call-dial', to: 'call-connecting' },
    { from: 'call-connecting', to: 'call-live' },
    { from: 'call-live', to: 'call-minimized', label: 'Browse' },
    { from: 'call-minimized', to: 'call-live', label: 'Resume' },
    { from: 'call-live', to: 'lead-captured' },
    { from: 'email-compose', to: 'email-ai', label: 'Write with AI' },
    { from: 'email-ai', to: 'email-sent', label: 'Send' },
    { from: 'topbar', to: 'exit-prompt', label: 'Exit intent' },
    { from: 'exit-prompt', to: 'expanded', label: 'Re-engage' },
  ],
};

/* ─── Case Study ─── */

export default function SpyneContent({ slug }: { slug: string }) {
  return (
    <div className="project-content-wrapper">

      {/* ══════════════════ 1. THE PROBLEM ══════════════════ */}
      <Section id="problem" slug={slug} title="The Problem">
        <Body>
          Automotive dealership websites receive thousands of visitors daily, yet the vast
          majority leave without ever contacting the dealer. The Vehicle Detail Page (VDP) is
          the highest-intent page on any dealer site &mdash; a visitor is looking at a specific
          car, its price, its mileage &mdash; but there&apos;s no one to talk to.
        </Body>
        <InsightCallout
          quote="We get 4,000 unique visitors a day, and maybe 30 fill out a contact form. That's a 99.2% drop-off on our most valuable page."
          source="GM, AutoNation Dallas — Discovery Interview"
          type="research"
        />
        <Body>
          Traditional contact forms feel impersonal. Phone calls only work during business hours.
          Email takes hours for a response. Dealers were losing qualified leads at the exact
          moment interest was highest, and scaling human sales teams to provide 24/7 coverage
          was financially impractical.
        </Body>
        <StatRow stats={[
          { value: '~80%', label: 'of VDP visitors leave without engaging' },
          { value: '4+ hrs', label: 'average dealer response time' },
          { value: '24/7', label: 'coverage needed, not financially viable' },
        ]} />
        <Sub>Engagement Funnel (Before)</Sub>
        <FunnelChart
          steps={[
            { label: 'VDP Visitors', value: '100%', pct: 100 },
            { label: 'Noticed CTA', value: '35%', pct: 35 },
            { label: 'Clicked Contact', value: '8%', pct: 8 },
            { label: 'Submitted Form', value: '2.4%', pct: 2.4 },
            { label: 'Qualified Lead', value: '0.8%', pct: 0.8 },
          ]}
          title="Before Spyne Connect"
        />
        <Sub>Competitive Landscape</Sub>
        <Body>
          Existing solutions either bolted on generic chatbots with no vehicle awareness, or
          offered expensive managed live-chat services that couldn&apos;t scale. None combined
          chat, call, and email into a unified AI agent with deep inventory context.
        </Body>
        <ComparisonMatrix
          columns={['Generic Chatbots', 'Live Chat Services', 'Form Builders', 'Spyne Connect']}
          highlightCol={3}
          features={[
            { name: 'Vehicle-Aware AI', values: ['no', 'partial', 'no', 'yes'] },
            { name: 'Multi-Channel (Chat + Call + Email)', values: ['no', 'partial', 'no', 'yes'] },
            { name: '24/7 Availability', values: ['yes', 'no', 'yes', 'yes'] },
            { name: 'AI-Composed Emails', values: ['no', 'no', 'no', 'yes'] },
            { name: 'Exit Intent Re-engagement', values: ['no', 'no', 'no', 'yes'] },
            { name: 'Progressive Lead Capture', values: ['no', 'partial', 'no', 'yes'] },
            { name: 'One-Tap Voice Call', values: ['no', 'yes', 'no', 'yes'] },
            { name: 'Cost per Dealership', values: ['$$$', '$$$$', '$$', '$$'] },
          ]}
        />
      </Section>

      {/* ══════════════════ 2. DESIGN PROCESS ══════════════════ */}
      <Section id="process" slug={slug} title="Design Process">
        <Body>
          I led the end-to-end design from discovery through launch, working closely with
          engineering, product, and dealer success teams. The process was compressed into
          aggressive sprints with continuous dealer feedback loops.
        </Body>
        <ProcessTimeline steps={[
          { label: 'Discovery', sub: '2 weeks', icon: '🔍' },
          { label: 'Research', sub: '3 weeks', icon: '📊' },
          { label: 'Ideation', sub: '2 weeks', icon: '💡' },
          { label: 'Prototype', sub: '4 weeks', icon: '🛠' },
          { label: 'Test', sub: '3 weeks', icon: '🧪' },
          { label: 'Ship', sub: 'Ongoing', icon: '🚀' },
        ]} />
        <StatRow stats={[
          { value: '12', label: 'dealer interviews during discovery' },
          { value: '3', label: 'prototype iterations before launch' },
          { value: '6 wks', label: 'from first concept to beta launch' },
        ]} />
        <Sub>Research Insights</Sub>
        <InsightCallout
          quote="I don't need a robot. I need something that knows my inventory and talks like my best salesperson at 2am."
          source="Sales Director, Hendrick Automotive — User Interview"
          type="research"
        />
        <InsightCallout
          quote="72% of surveyed buyers said they'd engage with an AI assistant on a dealer site if it could answer specific questions about the car they're viewing."
          source="Internal Research Survey, n=340 car shoppers"
          type="metric"
        />
      </Section>

      {/* ══════════════════ 3. DESIGN PRINCIPLES ══════════════════ */}
      <Section id="principles" slug={slug} title="Design Principles">
        <Body>
          Four principles guided every design decision. They emerged from research and became
          the lens through which we evaluated all feature requests and design trade-offs.
        </Body>
        <PrincipleCards principles={[
          {
            icon: '⚡',
            title: 'Zero-Friction Entry',
            description: 'Every interaction starts with one tap. No sign-ups, no mandatory fields. Value first, information second.',
          },
          {
            icon: '🧠',
            title: 'Context-Aware Intelligence',
            description: 'The AI knows the exact vehicle, its price, mileage, and available incentives. It talks like a knowledgeable salesperson, not a generic bot.',
          },
          {
            icon: '🔄',
            title: 'Channel Fluidity',
            description: 'Users move between chat, call, and email without losing context. The system remembers what was discussed regardless of channel.',
          },
          {
            icon: '🎯',
            title: 'Progressive Disclosure',
            description: 'Collect lead information only after delivering value. Each interaction earns the right to ask for the next piece of information.',
          },
        ]} />
      </Section>

      {/* ══════════════════ 4. THE SOLUTION ══════════════════ */}
      <Section id="solution" slug={slug} title="The Solution">
        <Body>
          I designed <strong>Spyne Connect</strong> &mdash; an AI-powered conversational widget
          that embeds directly on Vehicle Detail Pages across 3,000+ dealership websites. It
          gives every visitor an always-available AI sales agent that can chat, call, and email
          &mdash; meeting visitors on their preferred channel the moment intent is highest.
        </Body>
        <Sub>Core User Flow</Sub>
        <FlowChart nodes={mainFlow.nodes} edges={mainFlow.edges} width={860} height={460} />
        <Sub>Widget State Architecture</Sub>
        <Body>
          The widget manages 15 distinct states across three channels. I mapped every possible
          state and transition to ensure users always have a clear path forward and never hit
          a dead end.
        </Body>
        <WidgetStateMap
          states={widgetStates.states}
          transitions={widgetStates.transitions}
          width={860}
          height={420}
        />
      </Section>

      {/* ══════════════════ 5. KEY DECISIONS ══════════════════ */}
      <Section id="decisions" slug={slug} title="Key Design Decisions">
        <Body>
          Three critical design decisions shaped the product. Each involved significant trade-offs
          and required cross-functional alignment.
        </Body>
        <KeyDecision
          number={1}
          title="Quick-Action Chips Over Free-Text Input"
          context="Early prototypes opened with an empty text input. Usability tests showed 60% of visitors stared at the blinking cursor for 5+ seconds before typing, and many abandoned."
          decision="Replaced the initial state with contextual quick-action chips (Book Test Drive, Get Financing, Ask a Question) that require zero typing. The text input appears after the first tap."
          outcome="First-interaction rate jumped from 12% to 38%. Users who tapped a chip were 4.2x more likely to complete a lead form."
        />
        <KeyDecision
          number={2}
          title="AI Email Composition as Default"
          context="The email channel had a 12% send rate — most visitors opened the compose view, saw an empty body, and left. Composing a thoughtful email about a car is cognitive overhead."
          decision="Made 'Write with AI' the default path. The AI pre-fills subject, greeting, vehicle details, and a personalized inquiry. Users can edit, regenerate, or just tap Send."
          outcome="Email send rate increased from 12% to 64%. The AI-composed path became the single highest-converting action in the entire widget."
        />
        <KeyDecision
          number={3}
          title="Persistent Minimized Bar Over Dismissible Widget"
          context="Traditional chat widgets use a floating bubble that can be permanently dismissed. Once dismissed, the engagement opportunity is gone forever."
          decision="Designed a thin, non-intrusive agent bar that persists at the top of the page. It shows the salesperson's name/photo and one-tap access to all three channels. It cannot be fully dismissed — only minimized."
          outcome="Re-engagement rate (users who initially ignored the widget but later interacted) was 18%, accounting for 22% of all qualified leads."
        />
      </Section>

      {/* ══════════════════ 6. CHAT EXPERIENCE ══════════════════ */}
      <Section id="chat" slug={slug} title="Chat Experience">
        <Body>
          The chat interface is the primary engagement channel. The AI agent greets visitors with
          contextual awareness of the vehicle they&apos;re browsing, then offers quick-action chips
          so users can book test drives, explore financing, or ask questions without typing a word.
        </Body>
        <Sub>Chat Flow</Sub>
        <FlowChart nodes={chatFlow.nodes} edges={chatFlow.edges} width={860} height={460} />
        <Sub>Key Screens</Sub>
        <ImageRow>
          <Img src={`${IMG}/hello-vini-desktop.png`} alt="Initial greeting with AI agent avatar" />
          <Img src={`${IMG}/chat-cards-desktop.png`} alt="Quick action cards" />
        </ImageRow>
        <ImageRow>
          <Img src={`${IMG}/chat-testdrive-desktop.png`} alt="Test drive booking flow" />
          <Img src={`${IMG}/chat-testdrive-flow-desktop.png`} alt="Progressive lead collection" />
        </ImageRow>
        <InsightCallout
          quote="Users who engaged with quick-action chips had a 4.2x higher lead conversion rate than those who typed their first message."
          type="metric"
        />
      </Section>

      {/* ══════════════════ 7. VOICE CALLING ══════════════════ */}
      <Section id="call" slug={slug} title="Voice Calling">
        <Body>
          Not every visitor wants to type. The voice channel connects users to an AI sales agent
          with a single tap. I designed the calling experience to feel native and trustworthy:
          showing the salesperson&apos;s name and photo, a clear connecting state, and familiar
          speaker/mute controls.
        </Body>
        <Sub>Call Flow</Sub>
        <FlowChart nodes={callFlow.nodes} edges={callFlow.edges} width={820} height={240} />
        <Sub>Key Screens</Sub>
        <ImageRow>
          <Img src={`${IMG}/need-help-desktop.png`} alt="Phone entry with agent photo" />
          <Img src={`${IMG}/call-connecting-desktop.png`} alt="Connecting state" />
        </ImageRow>
        <ImageRow>
          <Img src={`${IMG}/call-back-desktop.png`} alt="Active call with browse-back" />
          <Img src={`${IMG}/agent-topbar-desktop.png`} alt="Minimized agent bar" />
        </ImageRow>
      </Section>

      {/* ══════════════════ 8. EMAIL & AI WRITING ══════════════════ */}
      <Section id="email" slug={slug} title="Email & AI Writing">
        <Body>
          Email is a high-commitment action that most visitors abandon because composing a
          message feels like work. &ldquo;Write with AI&rdquo; auto-drafts a personalized email
          with the vehicle&apos;s make, model, mileage, and price pre-filled. One tap to
          regenerate, one tap to send.
        </Body>
        <Sub>Email Flow</Sub>
        <FlowChart nodes={emailFlow.nodes} edges={emailFlow.edges} width={820} height={330} />
        <Sub>Key Screens</Sub>
        <ImageRow>
          <Img src={`${IMG}/email-templates-desktop.png`} alt="Email compose with templates" />
          <Img src={`${IMG}/email-ai-write-desktop.png`} alt="AI generating email draft" />
        </ImageRow>
        <ImageRow>
          <Img src={`${IMG}/ai-email-generated-desktop.png`} alt="AI-generated email with vehicle details" />
          <Img src={`${IMG}/email-sent-desktop.png`} alt="Email sent confirmation" />
        </ImageRow>
        <InsightCallout
          quote="Users who used AI composition were 3.4x more likely to send the email than those who typed manually. Reducing cognitive load on high-commitment actions is a massive unlock."
          type="insight"
        />
      </Section>

      {/* ══════════════════ 9. SMART ENGAGEMENT ══════════════════ */}
      <Section id="engagement" slug={slug} title="Smart Engagement">
        <Body>
          The widget reads behavioral signals &mdash; scroll depth, time on page, cursor
          movement toward the close button &mdash; to intervene at the right moment. Exit-intent
          prompts catch leaving visitors. The minimized agent bar stays accessible without
          obstructing the page.
        </Body>
        <Sub>Key Screens</Sub>
        <ImageRow>
          <Img src={`${IMG}/exit-intent-desktop.png`} alt="Exit intent re-engagement" />
          <Img src={`${IMG}/email-signup-desktop.png`} alt="Lead capture form" />
        </ImageRow>
        <ImageRow>
          <Img src={`${IMG}/base-page-desktop.png`} alt="Clean VDP with agent bar" />
          <Img src={`${IMG}/chat-conversation-desktop.png`} alt="Full chat on dealer site" />
        </ImageRow>
      </Section>

      {/* ══════════════════ 10. RESPONSIVE DESIGN ══════════════════ */}
      <Section id="responsive" slug={slug} title="Responsive Design">
        <Body>
          Every interaction was designed mobile-first. On smaller viewports, chat opens as an
          overlay, calls use a full-screen modal, and email adapts to touch targets. The widget
          works identically across 3,000+ dealer sites with different themes and brand identities.
        </Body>
        <Sub>Mobile</Sub>
        <ImageRow className="mobile-row">
          <Img src={`${IMG}/chat-greeting-mobile.png`} alt="Mobile chat greeting" className="mobile-img" />
          <Img src={`${IMG}/widget-dealer-mobile.png`} alt="Mobile widget" className="mobile-img" />
          <Img src={`${IMG}/vdp-mobile.png`} alt="Mobile VDP" className="mobile-img" />
        </ImageRow>
        <ImageRow className="mobile-row">
          <Img src={`${IMG}/need-help-mobile.png`} alt="Mobile phone entry" className="mobile-img" />
          <Img src={`${IMG}/call-connecting-mobile.png`} alt="Mobile call" className="mobile-img" />
          <Img src={`${IMG}/email-compose-mobile.png`} alt="Mobile email" className="mobile-img" />
        </ImageRow>
        <Sub>Desktop</Sub>
        <ImageRow>
          <Img src={`${IMG}/chat-conversation-desktop.png`} alt="Desktop widget" />
          <Img src={`${IMG}/agent-topbar-desktop.png`} alt="Desktop agent bar" />
        </ImageRow>
      </Section>

      {/* ══════════════════ 11. IMPACT & RESULTS ══════════════════ */}
      <Section id="impact" slug={slug} title="Impact & Results">
        <Body>
          After launching across 3,000+ dealership websites, Spyne Connect fundamentally changed
          how visitors engage with dealer inventory. The AI agent handles thousands of
          conversations daily.
        </Body>
        <Sub>Before vs. After</Sub>
        <HorizontalBar
          items={[
            { label: 'Lead Capture Rate', before: 0.8, after: 4.2, unit: '%' },
            { label: 'Avg. Response Time', before: 240, after: 3, unit: ' min' },
            { label: 'Engagement Rate', before: 8, after: 38, unit: '%' },
            { label: 'Email Completion', before: 12, after: 64, unit: '%' },
          ]}
          beforeLabel="Before (Forms only)"
          afterLabel="After (Spyne Connect)"
        />
        <Sub>Engagement Funnel (After)</Sub>
        <FunnelChart
          steps={[
            { label: 'VDP Visitors', value: '100%', pct: 100 },
            { label: 'Widget Interaction', value: '62%', pct: 62 },
            { label: 'Started Conversation', value: '38%', pct: 38 },
            { label: 'Provided Contact', value: '14%', pct: 14 },
            { label: 'Qualified Lead', value: '4.2%', pct: 4.2 },
          ]}
          title="After Spyne Connect"
        />
        <Sub>Channel Distribution</Sub>
        <ChartRow>
          <ChannelBreakdown
            title="Engagement by Channel"
            channels={[
              { name: 'Chat', pct: 58, color: '#6363bd' },
              { name: 'Voice Call', pct: 24, color: '#4ecdc4' },
              { name: 'Email', pct: 18, color: '#ff6b6b' },
            ]}
          />
          <ChannelBreakdown
            title="Leads by Channel"
            channels={[
              { name: 'Chat', pct: 45, color: '#6363bd' },
              { name: 'Voice Call', pct: 35, color: '#4ecdc4' },
              { name: 'Email', pct: 20, color: '#ff6b6b' },
            ]}
          />
        </ChartRow>
        <StatRow stats={[
          { value: '3,000+', label: 'dealerships using the widget' },
          { value: '5.2x', label: 'increase in qualified leads' },
          { value: '<3 min', label: 'average response time (from 4+ hrs)' },
        ]} />
      </Section>

      {/* ══════════════════ 12. RETROSPECTIVE ══════════════════ */}
      <Section id="retro" slug={slug} title="Retrospective">
        <Body>
          <strong>What worked:</strong> Designing for progressive disclosure was the single
          biggest lever. By offering zero-friction entry points (quick-action chips, one-tap
          call) and only asking for personal information after delivering value, we dramatically
          reduced drop-off at each funnel stage.
        </Body>
        <Body>
          <strong>What I&apos;d do differently:</strong> I&apos;d invest more in A/B testing
          the initial widget presentation earlier. We iterated the chat greeting copy and
          layout 3 times post-launch, and each iteration lifted engagement 8&ndash;15%. That
          surface area had outsized impact and deserved more upfront experimentation.
        </Body>
        <InsightCallout
          quote="The 'Write with AI' feature was originally a stretch goal, but it became the highest-converting email path. Users who used AI composition were 3.4x more likely to send. Reducing cognitive load on high-commitment actions is a massive unlock."
          type="insight"
        />
        <Body>
          <strong>Next chapter:</strong> We&apos;re now exploring multilingual support and
          proactive inventory-based nudges (&ldquo;This car just dropped $2,000 — want to
          chat about it?&rdquo;). The widget is evolving from a reactive tool to a proactive
          AI teammate for dealers.
        </Body>
      </Section>
    </div>
  );
}
