export type HelpTopic = {
  id: string;
  title: string;
  emoji: string;
  situation: string;
  firstStep: string;
  gather: string[];
  searchTerms: string[];
  scripts: string[];
  boundary: string;
};

export type KindPacket = {
  id: string;
  title: string;
  emoji: string;
  forMoment: string;
  fiveMinuteStep: string;
  gather: string[];
  sayThis: string;
  dontPanic: string;
  professionalGate: string;
};

export type SimpleCard = {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  steps: string[];
};

export type SkillSeed = {
  id: string;
  title: string;
  emoji: string;
  tenMinuteVersion: string;
  oneHourVersion: string;
  tools: string[];
  commonMistakes: string[];
  confidenceChecklist: string[];
};

export type ReceiptItem = {
  id: string;
  status: 'Need' | 'Promised' | 'In Progress' | 'Delivered' | 'Unknown' | 'Disputed';
  title: string;
  description: string;
  nextReceipt: string;
};
