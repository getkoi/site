export const JUNJI_FAMILIES = [
  {
    id: "orient",
    label: "Orient",
    description: "Read the table before committing to a move.",
  },
  {
    id: "define",
    label: "Define",
    description: "Settle the experience, strategy, and hard decisions.",
  },
  {
    id: "arrange",
    label: "Arrange",
    description: "Cut decided work into an ordered, playable sequence.",
  },
  {
    id: "execute",
    label: "Execute",
    description: "Play one verified phase all the way to a commit.",
  },
  {
    id: "resolve",
    label: "Resolve",
    description: "Close the table without losing what it produced.",
  },
] as const;

export type JunjiFamilyId = (typeof JUNJI_FAMILIES)[number]["id"];

export const JUNJI_RELATION_KINDS = ["activates", "embeds", "reads"] as const;
export type JunjiRelationKind = (typeof JUNJI_RELATION_KINDS)[number];

export interface JunjiCardRelation {
  target: JunjiCardId;
  kind: JunjiRelationKind;
  label: string;
}

export interface JunjiCard {
  id: JunjiCardId;
  command: `/junji ${JunjiCardId}`;
  family: JunjiFamilyId;
  number: number;
  title: string;
  purpose: string;
  playCondition: string;
  diskEffect: string;
  pointerEffect: string;
  timing: string;
  writesCode: boolean;
  mythName: string;
  artLabel: string;
  relations: readonly JunjiCardRelation[];
}

export type JunjiCardId =
  | "begin"
  | "research"
  | "design"
  | "plan"
  | "grill"
  | "brief"
  | "refine"
  | "next"
  | "iterate"
  | "consolidate";

export const JUNJI_CARDS: readonly JunjiCard[] = [
  {
    id: "begin",
    command: "/junji begin",
    family: "orient",
    number: 1,
    title: "Set the table",
    purpose:
      "Scaffold the working folder and survey observable repository facts before anyone makes a load-bearing decision.",
    playCondition: "Any repo. Safe to replay; begin is idempotent.",
    diskEffect:
      "Creates the .koi/run/ working files and phase folder when absent, then writes repository facts to CONTEXT.md.",
    pointerEffect:
      "Leaves the initial Next action at /junji plan and never overwrites a live pointer.",
    timing: "Opening play",
    writesCode: false,
    mythName: "komainu · 狛犬",
    artLabel: "Paired komainu guard a torii threshold lit by the first sun over the mountains.",
    relations: [],
  },
  {
    id: "research",
    command: "/junji research",
    family: "orient",
    number: 2,
    title: "Consult the archive",
    purpose:
      "Answer factual questions from primary sources before a decision depends on them.",
    playCondition: "The working folder exists and a factual question is worth pinning down.",
    diskEffect:
      "Writes one cited note per question under .koi/run/researches/. It locks no decisions.",
    pointerEffect: "Next action stays exactly where it was.",
    timing: "On demand",
    writesCode: false,
    mythName: "hakutaku · 白澤",
    artLabel: "Lantern light reveals Hakutaku, the many-eyed knowing beast, consulting an archive scroll.",
    relations: [],
  },
  {
    id: "brief",
    command: "/junji brief",
    family: "orient",
    number: 3,
    title: "Read the landed field",
    purpose:
      "Tell a user or reviewer what completed phases shipped, how to use it, and what remains.",
    playCondition: "At least one phase is marked done.",
    diskEffect:
      "Reads completed Outcomes and the execution contract. Returns a chat briefing and writes nothing.",
    pointerEffect: "Next action stays exactly where it was.",
    timing: "On demand",
    writesCode: false,
    mythName: "yatagarasu · 八咫烏",
    artLabel: "Sun-rimmed Yatagarasu carries a tied field report toward a waiting standard.",
    relations: [],
  },
  {
    id: "design",
    command: "/junji design",
    family: "define",
    number: 4,
    title: "Draw the experience",
    purpose:
      "Turn visual references and product intent into a binding, checkable experience contract.",
    playCondition:
      "The work has a human-facing surface; plan or iterate may activate this card when DESIGN.md is missing.",
    diskEffect:
      "Writes design notes, .koi/run/DESIGN.md, and the Design contract pointer in CONTEXT.md.",
    pointerEffect: "Next action stays exactly where it was.",
    timing: "On demand or conditionally activated",
    writesCode: false,
    mythName: "tsuki no usagi · 月の兎",
    artLabel: "The moon rabbit draws a measured experience contract by full-moon light.",
    relations: [
      {
        target: "grill",
        kind: "embeds",
        label: "embeds grill when visual direction is unsettled",
      },
    ],
  },
  {
    id: "plan",
    command: "/junji plan",
    family: "define",
    number: 5,
    title: "Choose the line",
    purpose:
      "Make the expensive strategic decisions in cheap text and set the runnable verification bar.",
    playCondition: "Begin is complete and the user has supplied a source document or clear idea.",
    diskEffect:
      "Writes PLAN.md, locks facts in CONTEXT.md, and scaffolds sensors only when the project has none.",
    pointerEffect: "Advances Next action to /junji refine.",
    timing: "Required sequence",
    writesCode: false,
    mythName: "onmyōji · 陰陽師",
    artLabel: "A candlelit onmyōji and paper shikigami trace one chosen route across a divination board.",
    relations: [
      {
        target: "design",
        kind: "activates",
        label: "conditionally activates design for human-facing work",
      },
      {
        target: "grill",
        kind: "embeds",
        label: "embeds the decision grill before locking the plan",
      },
      {
        target: "research",
        kind: "reads",
        label: "reads existing cited research notes",
      },
    ],
  },
  {
    id: "grill",
    command: "/junji grill",
    family: "define",
    number: 6,
    title: "Test every edge",
    purpose:
      "Walk the decision frontier until fuzzy terms and load-bearing choices become explicit.",
    playCondition:
      "Standalone use requires PLAN.md; plan, design, and iterate can embed the same protocol.",
    diskEffect:
      "Promotes settled terms and decisions into PLAN, CONTEXT, DESIGN, and sensors as applicable.",
    pointerEffect: "Next action stays exactly where it was.",
    timing: "On demand or embedded",
    writesCode: false,
    mythName: "oni · 鬼",
    artLabel: "A red oni tests blade and kanabō over a forge until every weak edge shows.",
    relations: [
      {
        target: "research",
        kind: "activates",
        label: "activates research when a durable factual gap appears",
      },
    ],
  },
  {
    id: "refine",
    command: "/junji refine",
    family: "arrange",
    number: 7,
    title: "Lay the sequence",
    purpose:
      "Cut the plan into ordered, independently verifiable phases while the boundaries are still cheap to change.",
    playCondition:
      "PLAN.md and CONTEXT.md exist. A completed backlog redirects new work to iterate.",
    diskEffect:
      "Writes or reshapes phase headings in BACKLOG.md. It creates no phase files and no product code.",
    pointerEffect: "Advances Next action to /junji next.",
    timing: "Required sequence",
    writesCode: false,
    mythName: "ryū · 龍",
    artLabel: "A moonlit ryū threads ordered ema tablets around a glowing tide jewel.",
    relations: [],
  },
  {
    id: "iterate",
    command: "/junji iterate",
    family: "arrange",
    number: 8,
    title: "Deal the next hand",
    purpose:
      "Add a newly requested slice after the current phase list is fully complete.",
    playCondition: "Every existing phase is done and the user names the next request.",
    diskEffect:
      "Appends phase headings and full phase contracts, updates settled documents, and commits those artifacts. No product code.",
    pointerEffect: "Moves consolidate back to /junji next; iterate never occupies the pointer.",
    timing: "After a completed sequence",
    writesCode: false,
    mythName: "hō-ō · 鳳凰",
    artLabel: "A hō-ō rises from a ring of completed cards toward one fresh scroll.",
    relations: [
      {
        target: "design",
        kind: "activates",
        label: "conditionally activates design for a new human-facing slice",
      },
      {
        target: "grill",
        kind: "embeds",
        label: "embeds grill, including the new phase boundaries",
      },
      {
        target: "research",
        kind: "reads",
        label: "reads existing research notes when relevant",
      },
    ],
  },
  {
    id: "next",
    command: "/junji next",
    family: "execute",
    number: 9,
    title: "Play one full turn",
    purpose:
      "Run one phase through phase research, implementation, verification, backlog compaction, and commit. Then stop.",
    playCondition: "A runnable phase exists and any gated phase has explicit authorization.",
    diskEffect:
      "Writes or reuses the phase plan, changes product code, records the Outcome, compacts BACKLOG, and creates one commit.",
    pointerEffect:
      "Stays at /junji next while phases remain; otherwise advances to /junji consolidate.",
    timing: "One phase per play",
    writesCode: true,
    mythName: "momotarō · 桃太郎",
    artLabel: "Lantern-lit Momotarō crosses seven wet stones toward a jade torii gate.",
    relations: [
      {
        target: "design",
        kind: "reads",
        label: "obeys the existing design contract for human-facing work",
      },
    ],
  },
  {
    id: "consolidate",
    command: "/junji consolidate",
    family: "resolve",
    number: 10,
    title: "Close the table",
    purpose:
      "Distill the completed working history into the repository's native deliverable, then clear the volatile tableau.",
    playCondition: "Every phase is done.",
    diskEffect:
      "Writes the repo-native deliverable and removes .koi/run/. Sensors and sandbox infrastructure survive in project home.",
    pointerEffect: "The working folder and its pointer are removed; git history remains the archive.",
    timing: "Final play",
    writesCode: false,
    mythName: "tsuru · 鶴",
    artLabel: "A sunrise-lit crane binds an emaki while durable house-rule stones remain beyond the shōji.",
    relations: [],
  },
] as const;

export function junjiCardById(id: JunjiCardId): JunjiCard {
  const card = JUNJI_CARDS.find((candidate) => candidate.id === id);
  if (!card) throw new Error(`Unknown junji card: ${id}`);
  return card;
}
