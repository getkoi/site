import type { JunjiCardId } from "./junji-cards";

export type TutorialStateId =
  | "empty"
  | "oriented"
  | "planned"
  | "sequenced"
  | "gate-red"
  | "phase-one"
  | "phase-one-briefed"
  | "phase-two"
  | "all-done"
  | "closed";

export type TutorialGate = "idle" | "running" | "red" | "green";
export type TutorialPhaseStatus = "todo" | "building" | "done";

export interface TutorialPhase {
  label: string;
  status: TutorialPhaseStatus;
}

export interface TutorialTable {
  runExists: boolean;
  files: readonly string[];
  nextAction: string | null;
  phases: readonly TutorialPhase[];
  gate: TutorialGate;
  gateNote: string;
  commits: number;
}

export interface TutorialChoice {
  id: string;
  kind: "verb" | "move";
  card?: JunjiCardId;
  label: string;
  hint: string;
  valid: boolean;
  next?: TutorialStateId;
  feedback: string;
}

export interface TriggeredCard {
  card: JunjiCardId;
  relation: "activates" | "embeds" | "reads";
  note: string;
}

export interface TutorialState {
  id: TutorialStateId;
  chapter: string;
  title: string;
  prompt: string;
  result: string;
  rule: string;
  choices: readonly TutorialChoice[];
  triggered: readonly TriggeredCard[];
  table: TutorialTable;
}

const phases = (
  first: TutorialPhaseStatus,
  second: TutorialPhaseStatus,
  third: TutorialPhaseStatus,
): readonly TutorialPhase[] => [
  { label: "Token and membership rules", status: first },
  { label: "Invite and accept flow", status: second },
  { label: "Permissions and browser checks", status: third },
];

export const JUNJI_TUTORIAL_STATES: readonly TutorialState[] = [
  {
    id: "empty",
    chapter: "Opening hand",
    title: "A feature request lands",
    prompt:
      "The team wants workspace owners to invite teammates by email. The repository has no Junji working folder yet. Which card can make the first legal move?",
    result:
      "There is code in the repository, but no saved project position. A fresh agent would have to reconstruct the work from chat.",
    rule:
      "Begin records repository facts and creates the working folder. It does not choose a solution.",
    choices: [
      {
        id: "empty-next",
        kind: "verb",
        card: "next",
        label: "/junji next",
        hint: "Write product code",
        valid: false,
        feedback:
          "There is no phase to execute. Set the table, choose a plan, and lay out the phases first.",
      },
      {
        id: "empty-plan",
        kind: "verb",
        card: "plan",
        label: "/junji plan",
        hint: "Choose the approach",
        valid: false,
        feedback:
          "Plan needs the working folder and repository facts created by begin.",
      },
      {
        id: "empty-begin",
        kind: "verb",
        card: "begin",
        label: "/junji begin",
        hint: "Set the table",
        valid: true,
        next: "oriented",
        feedback:
          "Begin creates .koi/run/, records repository facts, and points Next action to plan.",
      },
    ],
    triggered: [],
    table: {
      runExists: false,
      files: [],
      nextAction: null,
      phases: [],
      gate: "idle",
      gateNote: "No move to verify",
      commits: 0,
    },
  },
  {
    id: "oriented",
    chapter: "Table ready",
    title: "Facts are on disk",
    prompt:
      "The working folder now holds the repository facts and the turn marker. The team has supplied a clear feature request. What should happen before anyone changes code?",
    result:
      "A new window can see what repository it opened and which verb comes next.",
    rule:
      "The top line of BACKLOG.md is Next action. It is the turn marker for the method.",
    choices: [
      {
        id: "oriented-plan",
        kind: "verb",
        card: "plan",
        label: "/junji plan",
        hint: "Choose the line",
        valid: true,
        next: "planned",
        feedback:
          "Plan settles the approach in markdown and sets the verification bar before code becomes expensive.",
      },
      {
        id: "oriented-next",
        kind: "verb",
        card: "next",
        label: "/junji next",
        hint: "Start coding now",
        valid: false,
        feedback:
          "There is still no runnable phase. Next cannot invent the plan or the phase list.",
      },
      {
        id: "oriented-consolidate",
        kind: "verb",
        card: "consolidate",
        label: "/junji consolidate",
        hint: "Close the table",
        valid: false,
        feedback:
          "The game has not produced any completed phases or a deliverable to consolidate.",
      },
    ],
    triggered: [],
    table: {
      runExists: true,
      files: ["CONTEXT.md", "BACKLOG.md", "METHOD.md"],
      nextAction: "/junji plan",
      phases: [],
      gate: "idle",
      gateNote: "The gate waits for an execution turn",
      commits: 0,
    },
  },
  {
    id: "planned",
    chapter: "Plan stack resolved",
    title: "The hard questions are cheap",
    prompt:
      "Plan has settled who can invite, what the accept flow needs, and which checks must pass. The work is still too large for one safe execution turn. Which card cuts it into phases?",
    result:
      "Because this feature has screens, plan activated design. It embedded grill to settle fuzzy choices, and grill activated research for a factual gap. None of those side cards moved Next action.",
    rule:
      "PLAN.md keeps the reasoning. CONTEXT.md keeps the facts that every fresh window must obey.",
    choices: [
      {
        id: "planned-refine",
        kind: "verb",
        card: "refine",
        label: "/junji refine",
        hint: "Lay the sequence",
        valid: true,
        next: "sequenced",
        feedback:
          "Refine turns the plan into ordered, independently verifiable phase headings. It writes no product code.",
      },
      {
        id: "planned-next",
        kind: "verb",
        card: "next",
        label: "/junji next",
        hint: "Play a phase",
        valid: false,
        feedback:
          "The plan exists, but BACKLOG.md has no runnable phase yet. Refine must lay the sequence.",
      },
      {
        id: "planned-iterate",
        kind: "verb",
        card: "iterate",
        label: "/junji iterate",
        hint: "Add another slice",
        valid: false,
        feedback:
          "Iterate extends a fully completed phase list. This project has not started its first sequence.",
      },
    ],
    triggered: [
      {
        card: "design",
        relation: "activates",
        note: "Maps the send and accept experience",
      },
      {
        card: "grill",
        relation: "embeds",
        note: "Settles permissions, expiry, and edge cases",
      },
      {
        card: "research",
        relation: "activates",
        note: "Checks the relevant routing and email documentation",
      },
    ],
    table: {
      runExists: true,
      files: [
        "CONTEXT.md",
        "BACKLOG.md",
        "METHOD.md",
        "PLAN.md",
        "DESIGN.md",
        "researches/",
      ],
      nextAction: "/junji refine",
      phases: [],
      gate: "idle",
      gateNote: "The verification bar is written, but no phase has run",
      commits: 0,
    },
  },
  {
    id: "sequenced",
    chapter: "Sequence ready",
    title: "Three small moves replace one large guess",
    prompt:
      "BACKLOG.md now has three phase headings. Each phase can be verified on its own. Which card may write product code?",
    result:
      "Refine changed markdown only. It did not create phase files and did not touch product code.",
    rule:
      "Next executes one phase from start to commit, then stops. If phases remain, Next action stays on next.",
    choices: [
      {
        id: "sequenced-next",
        kind: "verb",
        card: "next",
        label: "/junji next",
        hint: "Play one full turn",
        valid: true,
        next: "gate-red",
        feedback:
          "Next reads CONTEXT.md and BACKLOG.md, does phase research, writes its phase plan, changes code, and runs every sensor.",
      },
      {
        id: "sequenced-brief",
        kind: "verb",
        card: "brief",
        label: "/junji brief",
        hint: "Report what shipped",
        valid: false,
        feedback:
          "Brief needs at least one completed phase. Nothing has shipped yet.",
      },
      {
        id: "sequenced-consolidate",
        kind: "verb",
        card: "consolidate",
        label: "/junji consolidate",
        hint: "Close the table",
        valid: false,
        feedback:
          "All three phases are still open. Consolidate only closes a completed run.",
      },
    ],
    triggered: [],
    table: {
      runExists: true,
      files: ["CONTEXT.md", "BACKLOG.md", "METHOD.md", "PLAN.md", "DESIGN.md"],
      nextAction: "/junji next",
      phases: phases("todo", "todo", "todo"),
      gate: "idle",
      gateNote: "Ready for the first execution turn",
      commits: 0,
    },
  },
  {
    id: "gate-red",
    chapter: "Inside next",
    title: "The first move does not stand",
    prompt:
      "The implementation reached the verification gate, but a sensor returned exit 1. Choose what happens inside this same execution turn.",
    result:
      "The phase stays [building]. Junji has not marked it [done], advanced the phase list, or created the phase commit.",
    rule:
      "A red gate blocks the commit. Fix the root cause and run the same stable sensors again.",
    choices: [
      {
        id: "gate-fix",
        kind: "move",
        label: "Fix the root cause",
        hint: "Keep the house rules",
        valid: true,
        next: "phase-one",
        feedback:
          "The agent corrects the implementation, reruns the sensors, records the outcome, compacts BACKLOG.md, and creates one commit.",
      },
      {
        id: "gate-weaken",
        kind: "move",
        label: "Weaken the sensor",
        hint: "Make the check easier",
        valid: false,
        feedback:
          "The verification bar is binding. Changing a sensor just to pass would change the rules during the move.",
      },
      {
        id: "gate-skip",
        kind: "move",
        label: "Skip to phase two",
        hint: "Leave this move open",
        valid: false,
        feedback:
          "Junji completes one phase before starting another. The current phase must pass or halt for a human.",
      },
    ],
    triggered: [],
    table: {
      runExists: true,
      files: [
        "CONTEXT.md",
        "BACKLOG.md",
        "METHOD.md",
        "PLAN.md",
        "DESIGN.md",
        "phases/phase-01-token-rules.md",
      ],
      nextAction: "/junji next",
      phases: phases("building", "todo", "todo"),
      gate: "red",
      gateNote: "30-test.sh returned exit 1",
      commits: 0,
    },
  },
  {
    id: "phase-one",
    chapter: "One move sealed",
    title: "The table is ready for a fresh hand",
    prompt:
      "Phase one is done and committed. You can inspect what shipped before continuing, or play the next execution turn.",
    result:
      "The phase outcome, compacted backlog, and commit are on disk. A new context window can continue without a chat handoff.",
    rule:
      "Brief reads completed outcomes and returns a report in chat. It writes nothing and does not move Next action.",
    choices: [
      {
        id: "phase-one-brief",
        kind: "verb",
        card: "brief",
        label: "/junji brief",
        hint: "Read the landed field",
        valid: true,
        next: "phase-one-briefed",
        feedback:
          "Brief reports that token and membership rules shipped. Next action remains /junji next.",
      },
      {
        id: "phase-one-next",
        kind: "verb",
        card: "next",
        label: "/junji next",
        hint: "Play phase two",
        valid: true,
        next: "phase-two",
        feedback:
          "A fresh window reads the saved position and completes the invite and accept flow as one phase.",
      },
      {
        id: "phase-one-consolidate",
        kind: "verb",
        card: "consolidate",
        label: "/junji consolidate",
        hint: "Close early",
        valid: false,
        feedback:
          "Two phases remain. Consolidate cannot remove the working folder yet.",
      },
    ],
    triggered: [],
    table: {
      runExists: true,
      files: [
        "CONTEXT.md",
        "BACKLOG.md",
        "METHOD.md",
        "PLAN.md",
        "DESIGN.md",
        "phases/phase-01-token-rules.md",
      ],
      nextAction: "/junji next",
      phases: phases("done", "todo", "todo"),
      gate: "green",
      gateNote: "All sensors exit 0",
      commits: 1,
    },
  },
  {
    id: "phase-one-briefed",
    chapter: "Side card played",
    title: "The report changed nothing on disk",
    prompt:
      "Brief has explained the completed work. The turn marker still points to the next execution phase.",
    result:
      "The user got a plain product briefing in chat. BACKLOG.md and the phase list did not move.",
    rule:
      "Research, design, grill, and brief are pointer-neutral side cards. They support the spine without becoming the next required verb.",
    choices: [
      {
        id: "briefed-next",
        kind: "verb",
        card: "next",
        label: "/junji next",
        hint: "Play phase two",
        valid: true,
        next: "phase-two",
        feedback:
          "The next fresh window completes the invite and accept flow, verifies it, and seals one commit.",
      },
      {
        id: "briefed-plan",
        kind: "verb",
        card: "plan",
        label: "/junji plan",
        hint: "Plan again",
        valid: false,
        feedback:
          "The plan is already locked and the phase list is active. Continue the sequence that is on disk.",
      },
      {
        id: "briefed-iterate",
        kind: "verb",
        card: "iterate",
        label: "/junji iterate",
        hint: "Add a new slice",
        valid: false,
        feedback:
          "Iterate waits until every current phase is done.",
      },
    ],
    triggered: [
      {
        card: "brief",
        relation: "reads",
        note: "Reads the completed Outcome and writes nothing",
      },
    ],
    table: {
      runExists: true,
      files: [
        "CONTEXT.md",
        "BACKLOG.md",
        "METHOD.md",
        "PLAN.md",
        "DESIGN.md",
        "phases/phase-01-token-rules.md",
      ],
      nextAction: "/junji next",
      phases: phases("done", "todo", "todo"),
      gate: "green",
      gateNote: "The last execution turn passed",
      commits: 1,
    },
  },
  {
    id: "phase-two",
    chapter: "Second move sealed",
    title: "One phase remains",
    prompt:
      "The invite and accept flow now has its own outcome and commit. The sequence row still has one open phase.",
    result:
      "Next action stays on /junji next because BACKLOG.md still contains a runnable phase.",
    rule:
      "Each play of next uses one fresh window and produces at most one completed phase commit.",
    choices: [
      {
        id: "phase-two-next",
        kind: "verb",
        card: "next",
        label: "/junji next",
        hint: "Play the final phase",
        valid: true,
        next: "all-done",
        feedback:
          "The final execution turn completes permissions and browser checks, passes the gate, and seals the third commit.",
      },
      {
        id: "phase-two-refine",
        kind: "verb",
        card: "refine",
        label: "/junji refine",
        hint: "Reshape finished work",
        valid: false,
        feedback:
          "The active sequence is already runnable. Finish it before adding another slice.",
      },
      {
        id: "phase-two-consolidate",
        kind: "verb",
        card: "consolidate",
        label: "/junji consolidate",
        hint: "Close with work open",
        valid: false,
        feedback:
          "One phase is still open. Consolidate requires every phase to be done.",
      },
    ],
    triggered: [],
    table: {
      runExists: true,
      files: [
        "CONTEXT.md",
        "BACKLOG.md",
        "METHOD.md",
        "PLAN.md",
        "DESIGN.md",
        "phases/phase-01-token-rules.md",
        "phases/phase-02-invite-flow.md",
      ],
      nextAction: "/junji next",
      phases: phases("done", "done", "todo"),
      gate: "green",
      gateNote: "The last execution turn passed",
      commits: 2,
    },
  },
  {
    id: "all-done",
    chapter: "Sequence complete",
    title: "Close this run or deal new work",
    prompt:
      "Every planned phase is done. This sample has no new request, so the correct finish is to produce the repository deliverable and clear the temporary working folder.",
    result:
      "BACKLOG.md now points to consolidate. The three phase commits and durable sensors remain in the repository.",
    rule:
      "Use iterate only when all phases are done and the user supplies a new request. Otherwise, consolidate the completed run.",
    choices: [
      {
        id: "all-done-consolidate",
        kind: "verb",
        card: "consolidate",
        label: "/junji consolidate",
        hint: "Close the table",
        valid: true,
        next: "closed",
        feedback:
          "Consolidate writes the repository-native deliverable and removes .koi/run/. Git history and project-home sensors remain.",
      },
      {
        id: "all-done-iterate",
        kind: "verb",
        card: "iterate",
        label: "/junji iterate",
        hint: "Deal another slice",
        valid: false,
        feedback:
          "All phases are done, but iterate also needs a new user request. This sample has none.",
      },
      {
        id: "all-done-next",
        kind: "verb",
        card: "next",
        label: "/junji next",
        hint: "Play without a phase",
        valid: false,
        feedback:
          "There is no runnable phase left. Next action has advanced to consolidate.",
      },
    ],
    triggered: [],
    table: {
      runExists: true,
      files: [
        "CONTEXT.md",
        "BACKLOG.md",
        "METHOD.md",
        "PLAN.md",
        "DESIGN.md",
        "phases/",
      ],
      nextAction: "/junji consolidate",
      phases: phases("done", "done", "done"),
      gate: "green",
      gateNote: "All three execution turns passed",
      commits: 3,
    },
  },
  {
    id: "closed",
    chapter: "Run complete",
    title: "The temporary table is clear",
    prompt:
      "The team-invitations run is complete. The repository keeps the deliverable, the phase commits, and the verification scripts.",
    result:
      ".koi/run/ is gone. The durable project home at .koi/ still holds sensors and optional sandbox configuration.",
    rule:
      "The working folder is temporary project memory. Consolidate removes it only after every phase is done.",
    choices: [],
    triggered: [],
    table: {
      runExists: false,
      files: [],
      nextAction: null,
      phases: phases("done", "done", "done"),
      gate: "green",
      gateNote: "Run closed with three verified commits",
      commits: 3,
    },
  },
] as const;

export const JUNJI_TUTORIAL_STATE_BY_ID = new Map(
  JUNJI_TUTORIAL_STATES.map((state) => [state.id, state]),
);

export function tutorialStateById(id: TutorialStateId): TutorialState {
  const state = JUNJI_TUTORIAL_STATE_BY_ID.get(id);
  if (!state) throw new Error(`Unknown Junji tutorial state: ${id}`);
  return state;
}
