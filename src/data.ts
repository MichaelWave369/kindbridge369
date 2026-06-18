import type { HelpTopic, KindPacket, ReceiptItem, SimpleCard, SkillSeed } from './types';

export const helpTopics: HelpTopic[] = [
  {
    id: 'food-this-week',
    title: 'I need food this week',
    emoji: '🥫',
    situation: 'Food is low, money is tight, or someone needs meals soon.',
    firstStep: 'Search for food pantry, community fridge, mutual aid, church food distribution, or school meal support near your city or county.',
    gather: ['Photo ID if you have one', 'Proof of address if available', 'Number of people in the household', 'Any dietary needs', 'A bag or box for pickup'],
    searchTerms: ['food pantry near me', 'community fridge near me', 'free meals today', 'mutual aid food help', 'SNAP application help'],
    scripts: [
      'Hi, I am looking for food help this week. Are you open today, and what should I bring?',
      'Do you know another place nearby if you are out of supplies?',
      'Is there a delivery option for seniors, disabled people, or people without transportation?'
    ],
    boundary: 'This page helps with discovery. It does not determine eligibility for any program.'
  },
  {
    id: 'utility-bill',
    title: 'My power or utility bill is a problem',
    emoji: '💡',
    situation: 'A bill is late, too high, or there may be shutoff risk.',
    firstStep: 'Call the utility company before the shutoff date and ask for assistance, payment plans, hardship options, and local partner agencies.',
    gather: ['Account number', 'Latest bill', 'Shutoff notice if any', 'Proof of address', 'Income documents if requested'],
    searchTerms: ['utility assistance near me', 'LIHEAP application', 'energy bill help county', 'payment plan utility company', 'weatherization assistance'],
    scripts: [
      'Hi, I am calling before my bill gets worse. What hardship, payment plan, or assistance options are available?',
      'Can you tell me the exact date service is at risk and what minimum action prevents shutoff?',
      'Do you have a list of local agencies that help with this bill?'
    ],
    boundary: 'This is not financial or legal advice. Ask the provider or a qualified advocate about your exact rights and options.'
  },
  {
    id: 'scary-letter',
    title: 'I got a scary letter',
    emoji: '✉️',
    situation: 'A notice, bill, legal-looking letter, school letter, medical bill, or government mail feels confusing or urgent.',
    firstStep: 'Find the deadline, sender, contact info, account/case number, and what action the letter is asking for. Do not ignore it, but do not panic-read it either.',
    gather: ['The full letter', 'Envelope if it has dates', 'Account or case number', 'Any previous letters', 'A notebook for call notes'],
    searchTerms: ['legal aid near me', 'consumer help letter', 'medical bill assistance', 'tenant rights help', 'benefits appeal help'],
    scripts: [
      'Hi, I received a letter and want to understand what action is required and by what date.',
      'Can you explain this in plain language and tell me what documents I need?',
      'Can you send confirmation of what we discussed in writing?'
    ],
    boundary: 'This site cannot interpret your legal rights. For legal notices, contact legal aid, a qualified advocate, or an attorney.'
  },
  {
    id: 'lost-id',
    title: 'I lost my ID or documents',
    emoji: '🪪',
    situation: 'An ID, birth certificate, Social Security card, insurance card, or important document is missing.',
    firstStep: 'Make a list of what is missing, then replace the document that unlocks the others first. Often that is a state ID, birth certificate, or proof of address.',
    gather: ['Any photo of the missing document', 'Mail with your name/address', 'Birth certificate if available', 'A trusted mailing address', 'Police report only if required or theft occurred'],
    searchTerms: ['replace ID card state', 'replace birth certificate', 'documents for state ID', 'homeless ID assistance', 'legal aid ID documents'],
    scripts: [
      'Hi, I need to replace my ID. Can you tell me the exact documents required and fee waiver options?',
      'Is there assistance for people without a stable mailing address?',
      'What can I use as temporary proof while I wait?'
    ],
    boundary: 'Document rules vary by place. Always confirm with the official agency or a local advocate.'
  },
  {
    id: 'pet-help',
    title: 'My pet needs help',
    emoji: '🐾',
    situation: 'A pet needs food, low-cost care, temporary foster, transport, lost/found help, or emergency guidance.',
    firstStep: 'Search local humane society, rescue groups, pet food pantry, low-cost clinic, and lost/found pet pages before surrendering if possible.',
    gather: ['Pet photo', 'Pet age and weight', 'Vaccination records if any', 'Urgency level', 'Location last seen if lost'],
    searchTerms: ['pet food bank near me', 'low cost vet clinic near me', 'lost and found pets county', 'temporary pet foster help', 'humane society assistance'],
    scripts: [
      'Hi, I am trying to keep my pet safe and need help with food or care. What options exist nearby?',
      'Do you know any temporary foster or emergency boarding resources?',
      'If you cannot help, who should I call next?'
    ],
    boundary: 'For urgent animal injury, poisoning, heat distress, or severe illness, contact a veterinarian or emergency clinic immediately.'
  }
];

export const kindPackets: KindPacket[] = [
  {
    id: 'rent-late',
    title: 'My rent is late',
    emoji: '🏠',
    forMoment: 'Use this when rent is late, short, or you are worried about a notice.',
    fiveMinuteStep: 'Write down the amount owed, the due date, any late fees, and the earliest realistic payment date. Then contact the landlord before silence makes it worse.',
    gather: ['Lease', 'Rent ledger or payment history', 'Notice if any', 'Proof of hardship if you choose to share it', 'Local tenant help numbers'],
    sayThis: 'Hi, I know my rent is late. I am trying to handle this responsibly. Can we discuss payment options and put any agreement in writing?',
    dontPanic: 'Being late does not mean you are a bad person. Get dates, amounts, and written confirmation.',
    professionalGate: 'If you receive an eviction notice, court date, lockout threat, or confusing legal paper, contact legal aid or a tenant advocate quickly.'
  },
  {
    id: 'need-food',
    title: 'I need food this week',
    emoji: '🥫',
    forMoment: 'Use this when the household needs groceries or meals soon.',
    fiveMinuteStep: 'Search food pantry near me and write down the next two places open today or tomorrow.',
    gather: ['ID if available', 'Proof of address if available', 'Household size', 'Dietary restrictions', 'Bags or boxes'],
    sayThis: 'Hi, I am looking for food help this week. What are your hours, and what should I bring?',
    dontPanic: 'Food help is exactly what food programs are for. You are allowed to ask.',
    professionalGate: 'If a child, elder, disabled person, or medically vulnerable person has no food access today, call local social services, 211 where available, or emergency support.'
  },
  {
    id: 'elder-scam',
    title: 'Someone may be getting scammed',
    emoji: '🛡️',
    forMoment: 'Use this when a text, call, email, or stranger is pressuring someone for money, passwords, gift cards, crypto, or remote computer access.',
    fiveMinuteStep: 'Pause the conversation. Do not click, pay, install apps, or share codes. Call a trusted person using a number you already know.',
    gather: ['Screenshot', 'Phone number or email', 'What they asked for', 'Any money sent', 'Bank or account involved'],
    sayThis: 'I need to pause and verify this with someone I trust. I will not send money or codes right now.',
    dontPanic: 'Scams work by creating fear and urgency. Slowing down is protection.',
    professionalGate: 'If money, passwords, bank access, or identity information was shared, contact the bank, account provider, and appropriate reporting agencies quickly.'
  },
  {
    id: 'lost-pet',
    title: 'My pet is missing',
    emoji: '🐕',
    forMoment: 'Use this in the first hours after a pet goes missing.',
    fiveMinuteStep: 'Make a clear post with photo, location last seen, pet name, safe contact method, and any medical needs. Post to local lost/found groups and call shelters.',
    gather: ['Clear pet photo', 'Collar/chip info', 'Last seen location and time', 'Temperament notes', 'Contact method'],
    sayThis: 'My pet is missing. Can you check intake records and tell me how often I should call back?',
    dontPanic: 'Many pets are found through fast, clear local posting and shelter checks.',
    professionalGate: 'If theft, injury, traffic danger, or aggressive conditions are involved, contact local animal control or emergency support.'
  },
  {
    id: 'overwhelmed',
    title: 'I am overwhelmed',
    emoji: '🌧️',
    forMoment: 'Use this when there are too many problems and the next step feels impossible.',
    fiveMinuteStep: 'Name only three things: what is unsafe now, what is due soon, and who is one safe person or service you can contact.',
    gather: ['Water', 'Medication if prescribed', 'Phone charger', 'One safe contact', 'The most urgent paper or bill'],
    sayThis: 'I am overwhelmed and need help choosing the next step. Can you stay with me while I sort what is urgent?',
    dontPanic: 'You do not have to solve your whole life today. One safe step counts.',
    professionalGate: 'If you may hurt yourself or someone else, are in immediate danger, or cannot stay safe, contact emergency services or a crisis line now.'
  }
];

export const elderTechCards: SimpleCard[] = [
  {
    id: 'scam-texts',
    title: 'Spot a scam text',
    emoji: '📱',
    summary: 'A quick check for suspicious links, fake urgency, prize claims, delivery tricks, and bank impersonation.',
    steps: ['Do not click the link.', 'Do not reply with codes or passwords.', 'Call the company using a number from an official bill or card.', 'Screenshot the message before deleting it.']
  },
  {
    id: 'video-call',
    title: 'Join a video call',
    emoji: '🎥',
    summary: 'A simple routine for joining Zoom, Meet, FaceTime, or similar calls without panic.',
    steps: ['Charge the device.', 'Open the link 10 minutes early.', 'Allow camera and microphone if asked.', 'Use mute when not talking.', 'Ask the host to call if the link fails.']
  },
  {
    id: 'send-photo',
    title: 'Send a photo safely',
    emoji: '🖼️',
    summary: 'How to take a clear picture of a document, pet, receipt, or item and send it to someone trusted.',
    steps: ['Place the item on a flat surface.', 'Use good light.', 'Make sure all corners are visible.', 'Send only to the intended contact.', 'Avoid sending IDs or private documents unless necessary.']
  }
];

export const petHelpCards: SimpleCard[] = [
  {
    id: 'pet-food',
    title: 'Find pet food help',
    emoji: '🐾',
    summary: 'Before surrendering a pet due to food costs, check local food banks, rescues, shelters, and mutual aid groups.',
    steps: ['Search pet food bank near me.', 'Call humane society and local rescues.', 'Ask if human food pantries include pet food.', 'Post a specific request in a trusted local group.', 'Offer pickup windows and pet details.']
  },
  {
    id: 'low-cost-vet',
    title: 'Low-cost vet search',
    emoji: '🩺',
    summary: 'Find lower-cost vaccines, spay/neuter, microchips, basic exams, and emergency options.',
    steps: ['Search low cost vet clinic near me.', 'Ask shelters about clinic days.', 'Check vet schools if nearby.', 'Ask about payment options before care.', 'For emergencies, call the clinic first and describe symptoms clearly.']
  },
  {
    id: 'found-kittens',
    title: 'I found kittens',
    emoji: '🐈',
    summary: 'A calm first response for found kittens when you are not sure whether to intervene.',
    steps: ['Observe from a distance if they are safe.', 'Look for the mother cat returning.', 'Do not feed cow milk.', 'Call a rescue or shelter for local guidance.', 'Act quickly if they are cold, injured, wet, or in danger.']
  }
];

export const skillSeeds: SkillSeed[] = [
  {
    id: 'simple-resume',
    title: 'Make a simple resume',
    emoji: '📄',
    tenMinuteVersion: 'Write your name, phone/email, three work skills, two recent jobs or projects, and one sentence about what kind of work you want.',
    oneHourVersion: 'Create a clean one-page resume, tailor the top skills to one job posting, proofread it, and save as PDF.',
    tools: ['Google Docs or Word', 'A job posting', 'Work history notes'],
    commonMistakes: ['Too many fonts', 'No phone or email', 'Listing duties but not useful skills', 'Making it longer than needed'],
    confidenceChecklist: ['Contact info is correct', 'One page if possible', 'Skills match the job', 'Saved as PDF', 'Someone else reviewed it']
  },
  {
    id: 'professional-email',
    title: 'Write a clear email',
    emoji: '✍️',
    tenMinuteVersion: 'Use a direct subject, one greeting, one clear request, any deadline, and your contact info.',
    oneHourVersion: 'Draft, simplify, attach needed documents, check tone, and send to the right person with a copy saved.',
    tools: ['Email account', 'Recipient address', 'Attachments if needed'],
    commonMistakes: ['No subject line', 'Too much backstory', 'Missing deadline', 'Wrong attachment', 'Sending while angry'],
    confidenceChecklist: ['Subject is clear', 'Request is specific', 'Deadline included', 'Attachments checked', 'Tone is respectful']
  },
  {
    id: 'budget-no-shame',
    title: 'Tiny no-shame budget',
    emoji: '🧾',
    tenMinuteVersion: 'Write down money coming in, bills due in the next 14 days, food/medicine/gas needs, and one bill to call about.',
    oneHourVersion: 'Sort expenses into survival, required, flexible, and pause. Make calls for payment plans before due dates.',
    tools: ['Notebook', 'Bills', 'Bank app or receipts', 'Calendar'],
    commonMistakes: ['Avoiding scary numbers', 'Forgetting small subscriptions', 'Not calling before due dates', 'Shaming yourself'],
    confidenceChecklist: ['Next 14 days listed', 'Essentials marked', 'One call made', 'One unnecessary charge paused', 'No shame language used']
  }
];

export const receiptItems: ReceiptItem[] = [
  {
    id: 'pantry-hours',
    status: 'Need',
    title: 'Verify food pantry hours',
    description: 'The community needs a current list of food pantry hours, eligibility notes, and phone numbers.',
    nextReceipt: 'Call each pantry and record date, person, hours, and requirements.'
  },
  {
    id: 'school-supplies',
    status: 'Promised',
    title: 'Back-to-school supply drive',
    description: 'A local group announced a school supply drive for families needing backpacks and basic supplies.',
    nextReceipt: 'Confirm pickup location, date, item list, and whether registration is required.'
  },
  {
    id: 'pet-food-shelf',
    status: 'In Progress',
    title: 'Pet food shelf at community pantry',
    description: 'Volunteers are collecting unopened pet food to reduce preventable pet surrender.',
    nextReceipt: 'Post current supply count and drop-off instructions.'
  },
  {
    id: 'elder-tech-day',
    status: 'Delivered',
    title: 'Elder phone help day',
    description: 'Volunteers helped neighbors identify scam texts, save contacts, and practice video calls.',
    nextReceipt: 'Share anonymized count of people helped and top lessons learned.'
  }
];

export const calmSteps = [
  'Check immediate safety: am I physically safe right now?',
  'Slow the body: drink water, sit down, breathe gently, and reduce noise if possible.',
  'Name the problem in one sentence without blaming yourself.',
  'Separate now, soon, and later. Only now gets handled first.',
  'Choose one safe person, agency, or next action.',
  'Write down what happened and what you did so your brain does not have to carry it all.'
];
