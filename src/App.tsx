import { useMemo, useState } from 'react';
import {
  BookOpen,
  ClipboardCheck,
  Copy,
  FileText,
  HeartHandshake,
  Home,
  MapPin,
  PawPrint,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Wrench
} from 'lucide-react';
import {
  calmSteps,
  elderTechCards,
  helpTopics,
  kindPackets,
  petHelpCards,
  receiptItems,
  skillSeeds
} from './data';

const sections = [
  { id: 'help', label: 'HelpFinder', icon: Search },
  { id: 'packets', label: 'KindPackets', icon: BookOpen },
  { id: 'resources', label: 'Local Resources', icon: MapPin },
  { id: 'eldertech', label: 'ElderTech', icon: ShieldCheck },
  { id: 'pethelp', label: 'PetHelp', icon: PawPrint },
  { id: 'skills', label: 'SkillSeed', icon: Sprout },
  { id: 'calm', label: 'Crisis-to-Calm', icon: HeartHandshake },
  { id: 'receipts', label: 'Receipts', icon: ClipboardCheck }
] as const;

const quickSearches = ['rent', 'food', 'power bill', 'scam', 'pet', 'ID', 'resume', 'elder tech'];

const missionSteps = [
  {
    title: 'Name the need',
    copy: 'Turn a hard moment into plain words without shame.'
  },
  {
    title: 'Gather what helps',
    copy: 'List the papers, details, screenshots, and dates that may matter.'
  },
  {
    title: 'Take one safe step',
    copy: 'Use a plain starter, print a packet, call a resource, or ask someone steady.'
  }
];

const resourceWorksheets = [
  {
    id: 'food-map',
    title: 'Food help map',
    emoji: '🥫',
    useWhen: 'Build a town list of food pantries, community fridges, meal sites, school food support, and delivery options.',
    placesToCheck: ['Public library', 'County social services', 'Churches and community centers', 'School district', 'Mutual aid groups'],
    searchTerms: ['food pantry city county', 'free meals today city', 'community fridge city', 'SNAP application help county'],
    ask: 'What days are you open, what should someone bring, and do you know another place if you are out of supplies?',
    verify: ['Hours updated within 30 days', 'Address and phone checked', 'Eligibility or no-eligibility note', 'What to bring', 'Delivery or transportation note']
  },
  {
    id: 'utility-map',
    title: 'Utility help map',
    emoji: '💡',
    useWhen: 'Collect shutoff-prevention, payment plan, energy assistance, weatherization, and hardship contacts.',
    placesToCheck: ['Utility provider website', 'County assistance office', '211-style resource line where available', 'Community action agency', 'Local churches or aid funds'],
    searchTerms: ['utility assistance county', 'LIHEAP county state', 'energy bill help city', 'weatherization assistance county'],
    ask: 'What options exist before shutoff, what documents are needed, and who else should someone call today?',
    verify: ['Program name', 'Phone and web link', 'Deadline or season', 'Documents needed', 'Whether renters qualify']
  },
  {
    id: 'elder-tech-map',
    title: 'Elder tech helpers',
    emoji: '🛡️',
    useWhen: 'Find gentle tech help for scam checks, video calls, phones, email, printing, passwords, and portals.',
    placesToCheck: ['Library classes', 'Senior center', 'Adult school', 'Trusted repair shop', 'Family helper list'],
    searchTerms: ['senior tech help library city', 'computer help seniors city', 'digital literacy class county', 'scam prevention seniors'],
    ask: 'Do you help with phones, email, scam checks, printing, or video calls, and is there a cost-free option?',
    verify: ['No-pressure help', 'Appointment or walk-in', 'Accessibility notes', 'Language options', 'Privacy expectations']
  },
  {
    id: 'pet-help-map',
    title: 'Pet support map',
    emoji: '🐾',
    useWhen: 'Collect pet food, low-cost vaccines, spay/neuter, lost/found pages, temporary foster, and transport contacts.',
    placesToCheck: ['Humane society', 'Animal control', 'Rescue groups', 'Pet food banks', 'Low-cost clinics'],
    searchTerms: ['pet food bank city', 'low cost vet clinic city', 'lost found pets county', 'temporary pet foster help'],
    ask: 'What support exists before surrender, and who should someone call next if you are full?',
    verify: ['Species served', 'Service area', 'Urgent care limits', 'Foster or transport notes', 'Lost/found posting instructions']
  }
];

const copyLines = [
  {
    id: 'call-resource',
    title: 'Calling a resource',
    context: 'Use when someone is nervous and needs a simple opening line.',
    body: 'Hi, I am trying to find the right help and may not know the right words yet. Can I explain the situation briefly and ask what options or next places you recommend?'
  },
  {
    id: 'confirm-details',
    title: 'Confirming details',
    context: 'Use before driving across town or sending someone to a location.',
    body: 'Before I come in, can you confirm your hours, address, what documents to bring, and whether there are any eligibility rules I should know about?'
  },
  {
    id: 'ask-next-place',
    title: 'When they cannot help',
    context: 'Use when the first place says no, is full, or is closed.',
    body: 'Thank you for checking. Do you know the next best place to call today, and is there a phrase I should use when I contact them?'
  },
  {
    id: 'helping-someone',
    title: 'Helping someone else',
    context: 'Use when sitting with another person and keeping their choice in the center.',
    body: 'I can sit with you and help sort this into one next step, but you stay in charge of what we call, print, or share.'
  }
];

type SectionId = (typeof sections)[number]['id'];

function contains(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('help');
  const [selectedHelpId, setSelectedHelpId] = useState(helpTopics[0].id);
  const [query, setQuery] = useState('');
  const [printTargetId, setPrintTargetId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedHelp = helpTopics.find((topic) => topic.id === selectedHelpId) ?? helpTopics[0];

  const filteredPackets = useMemo(() => {
    if (!query.trim()) return kindPackets;
    return kindPackets.filter((packet) =>
      contains(`${packet.title} ${packet.forMoment} ${packet.sayThis} ${packet.gather.join(' ')}`, query)
    );
  }, [query]);

  const filteredSkills = useMemo(() => {
    if (!query.trim()) return skillSeeds;
    return skillSeeds.filter((skill) =>
      contains(`${skill.title} ${skill.tenMinuteVersion} ${skill.oneHourVersion} ${skill.tools.join(' ')}`, query)
    );
  }, [query]);

  const filteredResources = useMemo(() => {
    if (!query.trim()) return resourceWorksheets;
    return resourceWorksheets.filter((item) =>
      contains(`${item.title} ${item.useWhen} ${item.searchTerms.join(' ')} ${item.placesToCheck.join(' ')}`, query)
    );
  }, [query]);

  function openHelperPath() {
    document.getElementById('helper-path')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function printPacket(packetId: string) {
    setPrintTargetId(packetId);
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => setPrintTargetId(null), 250);
    }, 50);
  }

  async function copyText(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <main>
      <header className="hero">
        <nav className="topbar" aria-label="Primary">
          <button className="brand" onClick={() => setActiveSection('help')}>
            <span className="brand-mark">369</span>
            <span>KindBridge369</span>
          </button>
          <a href="https://github.com/MichaelWave369/kindbridge369" target="_blank" rel="noreferrer">
            Open Repo
          </a>
        </nav>

        <section className="hero-grid">
          <div>
            <p className="eyebrow">Free • open-source • no shame</p>
            <h1>You are not lost. The map was missing.</h1>
            <p className="hero-copy">
              KindBridge369 is a plain-language help portal for hard moments: food, utilities,
              scary letters, elder tech, pet help, tiny skills, grounding steps, and community receipts.
            </p>
            <div className="hero-actions">
              <button onClick={() => setActiveSection('help')}>Find help now</button>
              <button className="secondary" onClick={() => setActiveSection('packets')}>
                Print a KindPacket
              </button>
              <button className="ghost" onClick={openHelperPath}>
                Help someone else
              </button>
            </div>
          </div>
          <div className="mission-card">
            <Sparkles aria-hidden="true" />
            <p className="eyebrow">v0.3 local bridge</p>
            <h2>One calm map. One next step.</h2>
            <div className="mission-steps">
              {missionSteps.map((step, index) => (
                <article key={step.title}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </header>

      <section className="section-tabs" aria-label="KindBridge modules">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              className={activeSection === section.id ? 'active' : ''}
              onClick={() => setActiveSection(section.id)}
            >
              <Icon aria-hidden="true" />
              {section.label}
            </button>
          );
        })}
      </section>

      <aside className="safety-strip" role="note">
        <ShieldCheck aria-hidden="true" />
        <p>
          <strong>Safety first:</strong> if someone is in immediate danger, may hurt themselves or someone else, or needs urgent medical, legal, or protective help, contact local emergency services or a qualified crisis resource now.
        </p>
      </aside>

      <section className="search-area" aria-label="Search KindBridge content">
        <div className="search-strip">
          <Search aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search packets, skills, and resource worksheets: rent, food, pet, ID..."
            aria-label="Search KindBridge content"
          />
        </div>
        <div className="quick-chips" aria-label="Quick searches">
          {quickSearches.map((item) => (
            <button key={item} onClick={() => setQuery(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="helper-path" id="helper-path">
        <div className="helper-heading">
          <Wrench aria-hidden="true" />
          <div>
            <p className="eyebrow">Helping someone else?</p>
            <h2>Use KindBridge as a small table-side toolkit.</h2>
            <p>
              Sit with the person, name the moment together, print or copy one packet, and write down the next receipt. Do not pressure them. Help them choose.
            </p>
          </div>
        </div>
        <div className="helper-actions">
          <button onClick={() => setActiveSection('help')}>Name the need</button>
          <button onClick={() => setActiveSection('resources')}>Find local places</button>
          <button onClick={() => setActiveSection('packets')}>Print a packet</button>
          <button onClick={() => setActiveSection('calm')}>Calm first</button>
          <button onClick={() => setActiveSection('receipts')}>Track a receipt</button>
        </div>
      </section>

      {activeSection === 'help' && (
        <section className="content-grid two-column">
          <div className="panel">
            <p className="eyebrow">HelpFinder</p>
            <h2>Tell the system what is happening in normal words.</h2>
            <p>
              Pick a situation. KindBridge turns it into help categories, search terms, documents to gather, and plain words to use.
            </p>
            <div className="topic-list">
              {helpTopics.map((topic) => (
                <button
                  key={topic.id}
                  className={selectedHelpId === topic.id ? 'topic active' : 'topic'}
                  onClick={() => setSelectedHelpId(topic.id)}
                >
                  <span>{topic.emoji}</span>
                  {topic.title}
                </button>
              ))}
            </div>
          </div>

          <article className="panel detail-card">
            <p className="emoji-large">{selectedHelp.emoji}</p>
            <h2>{selectedHelp.title}</h2>
            <p className="lead">{selectedHelp.situation}</p>
            <h3>First safe step</h3>
            <p>{selectedHelp.firstStep}</p>
            <h3>Gather if you can</h3>
            <TagList items={selectedHelp.gather} />
            <h3>Useful search terms</h3>
            <TagList items={selectedHelp.searchTerms} />
            <h3>Words to use</h3>
            <ul className="script-list">
              {selectedHelp.scripts.map((line) => (
                <li key={line}>“{line}”</li>
              ))}
            </ul>
            <p className="boundary">{selectedHelp.boundary}</p>
          </article>
        </section>
      )}

      {activeSection === 'packets' && (
        <section className="content-grid">
          <SectionIntro
            eyebrow="KindPackets"
            title="Printable one-page guides for hard moments."
            copy="Each packet is built around one tiny next step, what to gather, what to say, what not to panic about, and when to get qualified help."
          />
          <div className="cards three-column">
            {filteredPackets.map((packet) => (
              <article
                className={printTargetId && printTargetId !== packet.id ? 'card printable print-hidden' : 'card printable'}
                key={packet.id}
              >
                <p className="emoji">{packet.emoji}</p>
                <h3>{packet.title}</h3>
                <p>{packet.forMoment}</p>
                <h4>First 5 minutes</h4>
                <p>{packet.fiveMinuteStep}</p>
                <h4>Gather</h4>
                <TagList items={packet.gather} />
                <h4>Say this</h4>
                <p className="quote">“{packet.sayThis}”</p>
                <h4>Do not panic</h4>
                <p>{packet.dontPanic}</p>
                <p className="boundary">{packet.professionalGate}</p>
                <button className="print-button" onClick={() => printPacket(packet.id)}>
                  <Printer aria-hidden="true" /> Print this packet
                </button>
              </article>
            ))}
          </div>
          {filteredPackets.length === 0 && <EmptyState label="No KindPackets matched that search yet." />}
        </section>
      )}

      {activeSection === 'resources' && (
        <section className="content-grid">
          <SectionIntro
            eyebrow="Local Resources"
            title="Turn KindBridge into a map for your town."
            copy="These worksheets help volunteers collect real local contacts without turning the site into a database. Print them, copy the search terms, call places, and verify details before sharing."
          />
          <div className="resource-workflow panel">
            <FileText aria-hidden="true" />
            <div>
              <p className="eyebrow">Local map rule</p>
              <h3>Do not guess. Verify, date it, and leave room for unknowns.</h3>
              <p>
                A useful local list should show who was contacted, when details were checked, what someone should bring, and what is still unknown.
              </p>
            </div>
          </div>
          <div className="cards two-card-grid">
            {filteredResources.map((item) => (
              <article className="card resource-card" key={item.id}>
                <p className="emoji">{item.emoji}</p>
                <h3>{item.title}</h3>
                <p>{item.useWhen}</p>
                <h4>Places to check</h4>
                <TagList items={item.placesToCheck} />
                <h4>Search terms</h4>
                <TagList items={item.searchTerms} />
                <h4>Ask this</h4>
                <p className="quote">“{item.ask}”</p>
                <h4>Verify before sharing</h4>
                <ul className="verify-list">
                  {item.verify.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          {filteredResources.length === 0 && <EmptyState label="No resource worksheets matched that search yet." />}
          <div className="cards two-card-grid">
            {copyLines.map((item) => (
              <article className="card copy-card" key={item.id}>
                <Copy aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.context}</p>
                <p className="quote">“{item.body}”</p>
                <button className="copy-button" onClick={() => copyText(item.id, item.body)}>
                  {copiedId === item.id ? 'Copied' : 'Copy words'}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'eldertech' && (
        <section className="content-grid">
          <SectionIntro
            eyebrow="ElderTech Bridge"
            title="Gentle tech help for elders and families."
            copy="Technology should not make people feel foolish. These cards turn scary digital moments into calm routines."
          />
          <SimpleCardGrid cards={elderTechCards} />
        </section>
      )}

      {activeSection === 'pethelp' && (
        <section className="content-grid">
          <SectionIntro
            eyebrow="PetHelp"
            title="Support before surrender, panic, or preventable loss."
            copy="PetHelp cards point people toward food support, low-cost care, lost/found workflows, and safer first calls."
          />
          <SimpleCardGrid cards={petHelpCards} />
        </section>
      )}

      {activeSection === 'skills' && (
        <section className="content-grid">
          <SectionIntro
            eyebrow="SkillSeed"
            title="Tiny practical skills that help someone move forward."
            copy="Each skill has a 10-minute version, a deeper 1-hour version, tools, common mistakes, and a confidence checklist."
          />
          <div className="cards three-column">
            {filteredSkills.map((skill) => (
              <article className="card" key={skill.id}>
                <p className="emoji">{skill.emoji}</p>
                <h3>{skill.title}</h3>
                <h4>10-minute version</h4>
                <p>{skill.tenMinuteVersion}</p>
                <h4>1-hour version</h4>
                <p>{skill.oneHourVersion}</p>
                <h4>Tools</h4>
                <TagList items={skill.tools} />
                <h4>Common mistakes</h4>
                <ul>{skill.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul>
                <h4>Confidence checklist</h4>
                <ul>{skill.confidenceChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          {filteredSkills.length === 0 && <EmptyState label="No SkillSeeds matched that search yet." />}
        </section>
      )}

      {activeSection === 'calm' && (
        <section className="content-grid two-column">
          <div className="panel">
            <p className="eyebrow">Crisis-to-Calm</p>
            <h2>Slow down and choose the next safe step.</h2>
            <p>
              This is not therapy, diagnosis, emergency care, or a substitute for professional help. It is a small grounding path for when the mind has too many tabs open.
            </p>
            <p className="boundary strong">
              If someone is in immediate danger or may hurt themselves or someone else, contact emergency services or a crisis resource right now.
            </p>
          </div>
          <div className="panel calm-list">
            {calmSteps.map((step, index) => (
              <div className="calm-step" key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'receipts' && (
        <section className="content-grid">
          <SectionIntro
            eyebrow="Community Receipts"
            title="Track needs and promises without drama."
            copy="A receipt board helps people remember what was needed, promised, in progress, delivered, unknown, or disputed. V0.1 uses sample entries that communities can replace."
          />
          <div className="receipt-board">
            {receiptItems.map((item) => (
              <article className={`receipt ${item.status.toLowerCase().replace(/\s+/g, '-')}`} key={item.id}>
                <span>{item.status}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h4>Next receipt</h4>
                <p>{item.nextReceipt}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer>
        <Home aria-hidden="true" />
        <p>
          KindBridge369 is a discovery and organization tool, not professional advice. Copy it, localize it, print it, translate it, and improve it.
        </p>
      </footer>
    </main>
  );
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="tag-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return <p className="empty-state">{label} Try another word or open an issue to add a new guide.</p>;
}

function SimpleCardGrid({ cards }: { cards: { id: string; emoji: string; title: string; summary: string; steps: string[] }[] }) {
  return (
    <div className="cards three-column">
      {cards.map((card) => (
        <article className="card" key={card.id}>
          <p className="emoji">{card.emoji}</p>
          <h3>{card.title}</h3>
          <p>{card.summary}</p>
          <h4>Steps</h4>
          <ul>
            {card.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
