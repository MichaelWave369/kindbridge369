import { useMemo, useState } from 'react';
import {
  BookOpen,
  ClipboardCheck,
  HeartHandshake,
  Home,
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
    copy: 'Use a script, print a packet, call a resource, or ask someone steady.'
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
            <p className="eyebrow">v0.2 public toolkit</p>
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
            placeholder="Search packets and skills, like rent, food, email, scam, pet..."
            aria-label="Search packets and skills"
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
              Pick a situation. KindBridge turns it into help categories, search terms, documents to gather, and plain scripts.
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
              {selectedHelp.scripts.map((script) => (
                <li key={script}>“{script}”</li>
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
            <h2>Slow down. Get safe. Choose one next step.</h2>
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
