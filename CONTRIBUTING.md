# Contributing to KindBridge369

Thank you for helping make KindBridge369 kinder, clearer, safer, and more useful.

## Contribution principles

1. **No shame language.** People asking for help are not lazy, broken, stupid, or failures.
2. **Plain language first.** Write for someone who is stressed, tired, or helping a loved one.
3. **Bounded claims.** Do not present legal, medical, financial, mental-health, or emergency guidance as professional advice.
4. **Localize carefully.** Rules, eligibility, phone numbers, and office hours change. Encourage verification.
5. **Small next step.** Every guide should help someone do one useful thing within five minutes.
6. **Privacy by default.** Do not ask users to reveal private information to the site.

## Good content pattern

Each KindPacket should answer:

- What moment is this for?
- What should someone do in the first five minutes?
- What should they gather if they can?
- What words can they use when calling, emailing, or visiting?
- What should they not panic about?
- When should they contact qualified help or emergency support?

## How to add content

Most v0.1 content lives in `src/data.ts`.

To add a new guide:

1. Add a new object to the correct array.
2. Keep titles short and human.
3. Use scripts that someone can read out loud.
4. Add a boundary note when the topic touches legal, medical, financial, safety, or crisis issues.
5. Run the site locally and check the card layout.

## Local development

```bash
npm install
npm run dev
```

## Before submitting

```bash
npm run build
```

## Content safety examples

Use:

> This page helps you prepare questions and gather documents. It is not legal advice.

Avoid:

> This is what the law says you should do.

Use:

> If someone is in immediate danger, contact emergency services or a crisis resource now.

Avoid:

> This breathing exercise will solve a crisis.
