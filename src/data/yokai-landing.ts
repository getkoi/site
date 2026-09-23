export type YokaiMapNodeId =
  | "prepared"
  | "supervisor"
  | "agent"
  | "acts"
  | "repository"
  | "verdict";

export interface YokaiMapNode {
  id: YokaiMapNodeId;
  index: string;
  label: string;
  title: string;
  body: string;
  facts: readonly string[];
}

export interface YokaiMapEdge {
  from: YokaiMapNodeId;
  to: YokaiMapNodeId;
  label: string;
  route: "forward" | "feedback" | "decision";
}

export const YOKAI_MAP_NODES: readonly YokaiMapNode[] = [
  {
    id: "prepared",
    index: "01",
    label: "input",
    title: "A prepared run",
    body:
      "The project already has an ordered backlog, a phase plan, driver preferences, and executable sensors. junji is the usual way to prepare these files.",
    facts: [".koi/run/BACKLOG.md", ".koi/run/config.yml", ".koi/sensors/*.sh"],
  },
  {
    id: "supervisor",
    index: "02",
    label: "deterministic control",
    title: "yokai supervises",
    body:
      "The supervisor selects the next phase, starts fresh agent turns, runs the gate, and decides whether to continue, recover, or halt.",
    facts: ["select phase", "start turns", "measure disk", "classify"],
  },
  {
    id: "agent",
    index: "03",
    label: "engineering intelligence",
    title: "Your agent reasons",
    body:
      "Claude, Cursor, or OpenCode reads the saved project position through ACP. The agent plans the phase, edits the product, and responds to measured feedback.",
    facts: ["your credentials", "fresh sessions", "agent-owned reasoning"],
  },
  {
    id: "acts",
    index: "04",
    label: "one phase",
    title: "Plan → Build → Seal",
    body:
      "Plan writes the phase plan. Build edits and corrects against sensors. Seal records the outcome, advances the backlog, and creates the proving commit.",
    facts: [
      "Plan: phase plan",
      "Build: code + feedback",
      "Seal: outcome + commit",
    ],
  },
  {
    id: "repository",
    index: "05",
    label: "evidence",
    title: "Disk tells the truth",
    body:
      "yokai reads the repository after the agent stops. It does not treat a confident final message as evidence.",
    facts: ["phase [done]", "new commit", "gate green", "clean tree"],
  },
  {
    id: "verdict",
    index: "06",
    label: "outcome",
    title: "Continue, recover, or halt",
    body:
      "A complete contract advances to the next phase. A recoverable miss gets one bounded correction path. A hard boundary halts with the reason and evidence intact.",
    facts: [
      "continue: next phase",
      "recover: same proof bar",
      "halt: human-readable reason",
    ],
  },
] as const;

export const YOKAI_MAP_EDGES: readonly YokaiMapEdge[] = [
  { from: "prepared", to: "supervisor", label: "ready", route: "forward" },
  { from: "supervisor", to: "agent", label: "turn request", route: "forward" },
  { from: "agent", to: "acts", label: "does the work", route: "forward" },
  { from: "acts", to: "repository", label: "writes", route: "forward" },
  {
    from: "repository",
    to: "supervisor",
    label: "measured facts",
    route: "feedback",
  },
  { from: "supervisor", to: "verdict", label: "classifies", route: "decision" },
  {
    from: "verdict",
    to: "supervisor",
    label: "next or recover",
    route: "feedback",
  },
] as const;

export type YokaiRunRail = "plan" | "build" | "seal" | "gate";
export type YokaiRunTone = "accent" | "amber" | "blood" | "jade";

export interface YokaiRunState {
  id: string;
  index: string;
  chapter: string;
  title: string;
  body: string;
  rail: YokaiRunRail;
  tone: YokaiRunTone;
  turn: string;
  phase: string;
  nextAction: string;
  gate: string;
  commit: string;
  stream: readonly string[];
  feedback?: string;
}

export const YOKAI_RUN_STATES: readonly YokaiRunState[] = [
  {
    id: "select",
    index: "01",
    chapter: "supervisor",
    title: "Select the first runnable phase",
    body:
      "The backlog has three ordered phases. yokai selects Token and membership rules, the first phase marked [todo]. No agent turn has been spent yet.",
    rail: "plan",
    tone: "accent",
    turn: "pre-turn",
    phase: "01 · token and membership rules",
    nextAction: "/junji next",
    gate: "idle",
    commit: "HEAD unchanged",
    stream: [
      "read .koi/run/BACKLOG.md",
      "selected phase 01 [todo]",
      "resolved agent profile: claude",
    ],
  },
  {
    id: "plan",
    index: "02",
    chapter: "Plan",
    title: "Give a fresh agent the phase",
    body:
      "The Plan act opens a fresh ACP session. The agent reads the phase contract and repository, then writes a focused implementation plan. yokai supplies the turn; it does not invent the plan.",
    rail: "plan",
    tone: "accent",
    turn: "plan · session 01",
    phase: "01 · planning",
    nextAction: "/junji next",
    gate: "waiting",
    commit: "HEAD unchanged",
    stream: [
      "agent read phase-01-token-rules.md",
      "agent inspected membership model",
      "wrote the phase implementation plan",
    ],
  },
  {
    id: "build-red",
    index: "03",
    chapter: "Build · iteration 01",
    title: "Measure the first implementation",
    body:
      "A new coder session implements the phase. The code looks finished, but 30-test.sh exits 1. yokai records the failure in FEEDBACK.md. The phase cannot advance.",
    rail: "build",
    tone: "blood",
    turn: "coder · session 02",
    phase: "01 · correcting",
    nextAction: "/junji next",
    gate: "RED · 30-test.sh exit 1",
    commit: "HEAD unchanged",
    stream: [
      "agent changed token and membership rules",
      "10-format.sh  PASS",
      "30-test.sh    FAIL",
    ],
    feedback: "expired invitation token returned 500; expected 410",
  },
  {
    id: "build-green",
    index: "04",
    chapter: "Build · iteration 02",
    title: "Correct from durable feedback",
    body:
      "Build starts another fresh coder session. It reads the phase plan and FEEDBACK.md, fixes the cause, and reruns the sensors. Every authoritative sensor is green.",
    rail: "build",
    tone: "jade",
    turn: "coder · session 03",
    phase: "01 · converged",
    nextAction: "/junji next",
    gate: "GREEN · all sensors exit 0",
    commit: "HEAD unchanged",
    stream: [
      "read FEEDBACK.md",
      "fixed expired-token response",
      "10-format.sh  PASS · 30-test.sh PASS",
    ],
    feedback: "optional judge: not configured for this run",
  },
  {
    id: "seal",
    index: "05",
    chapter: "Seal",
    title: "Record what landed",
    body:
      "Seal writes the phase outcome, marks the phase [done], compacts the backlog, and creates one commit. Its claim is still provisional until the supervisor checks disk.",
    rail: "seal",
    tone: "accent",
    turn: "seal · session 04",
    phase: "01 · [done]",
    nextAction: "/junji next",
    gate: "last Build gate: GREEN",
    commit: "8d2f4ab feat: add invitation token rules",
    stream: [
      "recorded phase Outcome",
      "BACKLOG.md phase 01 → [done]",
      "created commit 8d2f4ab",
    ],
  },
  {
    id: "contract",
    index: "06",
    chapter: "supervisor contract",
    title: "Prove the phase on disk",
    body:
      "yokai gathers the four facts itself. All four hold, so the phase advances. The next loop starts with Invite and accept flow.",
    rail: "gate",
    tone: "jade",
    turn: "classification",
    phase: "01 · verified",
    nextAction: "/junji next · phase 02",
    gate: "GREEN · contract holds",
    commit: "HEAD moved to 8d2f4ab",
    stream: [
      "phase marked [done]       PASS",
      "new commit + clean tree   PASS",
      "all sensors exit 0        PASS",
    ],
  },
] as const;

export const YOKAI_CONTRACT = [
  {
    id: "backlog",
    label: "BACKLOG",
    detail: "The selected phase is marked [done].",
  },
  {
    id: "commit",
    label: "git HEAD",
    detail: "A new proving commit exists.",
  },
  {
    id: "gate",
    label: "gate",
    detail: "Every authoritative sensor exits 0.",
  },
  {
    id: "tree",
    label: "tree",
    detail: "Contract-attributed paths are clean.",
  },
] as const;
