export type KoiCampaignTone = "accent" | "amber" | "blood" | "jade";
export type KoiPhaseStatus = "hidden" | "todo" | "active" | "done" | "gated";

export interface KoiCampaignPhase {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  sensor: string;
  gated?: boolean;
}

export interface KoiCampaignState {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  tone: KoiCampaignTone;
  window: string;
  position: string;
  gate: string;
  commit: string;
  nextAction: string;
  phaseStatuses: readonly KoiPhaseStatus[];
  files: readonly string[];
  actors: readonly ("junji" | "agent" | "yokai")[];
  feedback?: string;
  assembled?: boolean;
}

export const KOI_CAMPAIGN_PHASES: readonly KoiCampaignPhase[] = [
  {
    id: "behavior",
    number: "01",
    title: "Characterize current behavior",
    shortTitle: "behavior",
    sensor: "10-contract-fixtures.sh",
  },
  {
    id: "reads",
    number: "02",
    title: "Port read routes",
    shortTitle: "read routes",
    sensor: "20-read-contract.sh",
  },
  {
    id: "writes",
    number: "03",
    title: "Port writes and persistence",
    shortTitle: "writes + data",
    sensor: "30-write-contract.sh",
  },
  {
    id: "cutover",
    number: "04",
    title: "Shadow traffic and cut over",
    shortTitle: "cutover",
    sensor: "40-parity.sh",
    gated: true,
  },
] as const;

export const KOI_CAMPAIGN_STATES: readonly KoiCampaignState[] = [
  {
    id: "mission",
    index: "01",
    label: "the mission",
    title: "Port the production API to Rust.",
    body:
      "Keep every response compatible while the Node service stays live. This is not one prompt. The work crosses routes, persistence, traffic, and several agent windows.",
    tone: "accent",
    window: "window 01 · 0%",
    position: "goal received",
    gate: "not wired",
    commit: "HEAD unchanged",
    nextAction: "prepare the project",
    phaseStatuses: ["hidden", "hidden", "hidden", "hidden"],
    files: [],
    actors: [],
  },
  {
    id: "position",
    index: "02",
    label: "write the position",
    title: "junji moves the plot into the repository.",
    body:
      "The goal becomes a plan, an ordered backlog, and executable sensors under .koi/. A future session can read the same position without reconstructing it from chat.",
    tone: "accent",
    window: "window 01 · 18%",
    position: ".koi/run/ prepared",
    gate: "4 sensors ready",
    commit: "planning files changed",
    nextAction: "/junji refine",
    phaseStatuses: ["todo", "todo", "todo", "gated"],
    files: ["PLAN.md", "BACKLOG.md", "phases/", "sensors/*.sh"],
    actors: ["junji"],
  },
  {
    id: "phases",
    index: "03",
    label: "make it finite",
    title: "One risky port becomes four provable phases.",
    body:
      "Each stone has a narrow job and its own sensor. The cutover is gated because traffic changes need a human decision. The next move is explicit.",
    tone: "amber",
    window: "window 01 · 31%",
    position: "phase 01 selected",
    gate: "waiting",
    commit: "HEAD unchanged",
    nextAction: "/junji next",
    phaseStatuses: ["active", "todo", "todo", "gated"],
    files: ["BACKLOG.md", "phases/01-behavior.md", "10-contract-fixtures.sh"],
    actors: ["junji", "agent"],
  },
  {
    id: "reset",
    index: "04",
    label: "discard the window",
    title: "The context fills halfway through read routes.",
    body:
      "Window 01 ends. The plan does not. A fresh agent reads the backlog, phase file, and last commit, then resumes at the unfinished route without a hand-written summary.",
    tone: "amber",
    window: "window 02 · fresh",
    position: "phase 02 · Build",
    gate: "waiting",
    commit: "4f71d0a · behavior locked",
    nextAction: "resume from disk",
    phaseStatuses: ["done", "active", "todo", "gated"],
    files: ["BACKLOG.md", "phases/02-read-routes.md", "CONTEXT.md"],
    actors: ["junji", "agent"],
  },
  {
    id: "rejected",
    index: "05",
    label: "measure the claim",
    title: "The agent says done. The compatibility sensor says no.",
    body:
      "The Rust route returns the right JSON but drops a cache header. The sensor exits 1, so the phase stays open. The failure is written to FEEDBACK.md for the next turn.",
    tone: "blood",
    window: "window 02 · 46%",
    position: "phase 02 · correcting",
    gate: "RED · 20-read-contract.sh",
    commit: "HEAD unchanged",
    nextAction: "fresh correction turn",
    phaseStatuses: ["done", "active", "todo", "gated"],
    files: ["FEEDBACK.md", "phases/02-read-routes.md", "20-read-contract.sh"],
    actors: ["agent", "yokai"],
    feedback: "cache-control header missing on GET /accounts/:id",
  },
  {
    id: "proven",
    index: "06",
    label: "prove and continue",
    title: "A fresh turn fixes the cause. Disk proves the phase.",
    body:
      "The compatibility sensor passes, phase 02 is marked done, git has a new commit, and the tree is clean. The same folder now points every participant to phase 03.",
    tone: "jade",
    window: "window 03 · 12%",
    position: "phase 02 · verified",
    gate: "GREEN · all sensors exit 0",
    commit: "a81c2e7 · port read routes",
    nextAction: "phase 03 · writes + data",
    phaseStatuses: ["done", "done", "todo", "gated"],
    files: [
      "BACKLOG.md · [done]",
      "git · a81c2e7",
      "gate · green",
      "tree · clean",
    ],
    actors: ["junji", "agent", "yokai"],
    assembled: true,
  },
] as const;

export const KOI_CONTRACT_FACTS = [
  "phase marked [done]",
  "new proving commit",
  "every sensor exits 0",
  "contract paths clean",
] as const;
