# KindBridge369

**Free discovery tools for real human needs.**

KindBridge369 is a no-cost, open-source help portal for people who need plain-language guidance, printable life packets, local resource discovery prompts, elder tech support, pet help, crisis-to-calm steps, and community receipt tracking.

> You are not lost. The map was missing.

## What this is

KindBridge369 is designed to run as a static React site on GitHub Pages. It does not require accounts, payments, tracking, or a backend to be useful.

The current goal is simple:

- Help someone name what kind of help they need.
- Give them a calm first step.
- Show what documents or information to gather.
- Provide plain words for calls, emails, and visits.
- Offer printable packets for common hard moments.
- Help someone support a neighbor, elder, friend, family member, or pet owner without taking over their choices.
- Let communities track needs, promises, and delivered help without drama.

## V0.4 Pocket Plan direction

The v0.4 direction adds a Pocket Plan concept: a one-page next-step plan someone can make quickly, copy, print, and take with them.

- Choose one situation.
- Add one person or place to contact.
- Write one tiny promise for today.
- Include the first step, things to gather, plain words to use, and a receipt line.
- Keep it local-first with no account, no server storage, and no tracking.

The first v0.4 source checkpoint includes `docs/v0.4-pocket-plan.md` and `src/v04.css`. The app wiring is intentionally staged so the green build stays protected while the module is added cleanly.

## V0.3 local bridge pass

The v0.3 pass adds the missing bridge between general guidance and real local usefulness:

- A new **Local Resources** module.
- Resource worksheet cards for food help, utility help, elder tech helpers, and pet support.
- Verification checklists so people do not share stale or guessed information.
- Search terms and questions volunteers can use when calling local places.
- Copyable plain-word starters for calling, confirming details, asking for a next place, and helping someone without taking over.

## V0.2 public toolkit pass

The v0.2 pass makes the homepage feel more like a usable table-side toolkit:

- A three-step mission card: name the need, gather what helps, take one safe step.
- A visible safety-first boundary for urgent danger or professional help situations.
- Quick search chips for common needs like rent, food, scams, pets, ID, resumes, and elder tech.
- A "help someone else" path for people assisting a neighbor, family member, elder, friend, or community member.
- Cleaner single-packet printing so a person can print one KindPacket instead of every card.

## Core modules

- **HelpFinder** — turns plain-language problems into useful help categories and search terms.
- **KindPackets** — printable one-page guides for hard moments.
- **Local Resources** — worksheets for building verified local help maps without a backend.
- **ElderTech Bridge** — gentle tech support cards for elders and families.
- **PetHelp** — discovery prompts and steps for pet food, lost pets, low-cost care, and foster support.
- **SkillSeed** — tiny practical skill cards for resumes, email, budgets, basic tools, and more.
- **Crisis-to-Calm** — non-medical grounding flow for choosing the next safe step.
- **Community Receipts** — a transparent board for needs, promises, progress, delivery, unknowns, and disputes.

## Claim boundary

KindBridge369 is not legal, medical, financial, mental-health, emergency, or professional advice. It is a discovery and organization tool. It helps people prepare, ask better questions, and find the next safe step.

If someone is in immediate danger, they should contact local emergency services or a trusted crisis resource right away.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

This repo includes a GitHub Actions workflow for GitHub Pages. After enabling GitHub Pages for the repository, pushes to `main` will build and publish the site.

## License

MIT — free to use, remix, translate, print, and adapt for community help.
