import "../../styles/junji-faq.css";

const questions = [
  {
    id: "files",
    label: "repository",
    question: "What does junji add to my repository?",
    answer: [
      "An active run has a git-committed working folder at .koi/run/. Begin puts METHOD.md, BACKLOG.md, and CONTEXT.md there. Plan adds PLAN.md for the human-readable reasoning, then refine adds the phase list to BACKLOG.md.",
      "The durable project home is .koi/. Its sensors and optional sandbox configuration sit outside the working folder. If .koi/sensors/ is empty, plan can scaffold one atomic script per check.",
    ],
  },
  {
    id: "window",
    label: "continuity",
    question: "What survives a fresh agent window?",
    answer: [
      "The files do. A fresh next window reads CONTEXT.md and BACKLOG.md, then follows METHOD.md. It does not need the old chat or the planning discussion to recover the project position.",
      "BACKLOG.md starts with Next action. That pointer tells a new window which verb is legal now and which phase is first to run.",
    ],
  },
  {
    id: "next",
    label: "scope",
    question: "When does junji write product code?",
    answer: [
      "Only next writes product code. One invocation loads the saved position, researches one phase, writes or reuses its phase plan, implements that phase, verifies it, records the outcome, commits, and stops.",
      "Begin, research, design, plan, grill, brief, refine, and iterate do not write product code. Plan may create sensor scripts, and iterate may append phase contracts, but the application stays untouched.",
    ],
  },
  {
    id: "sensors",
    label: "proof",
    question: "Who decides whether a phase is done?",
    answer: [
      "Every script in .koi/sensors/ must exit 0. The gate is green only when all of them pass. A failed sensor keeps the phase open so next can fix the cause and run the gate again.",
      "The files, sensor exits, recorded outcome, and commit are the evidence. The agent's final message is not proof.",
    ],
  },
  {
    id: "resume",
    label: "continuity",
    question: "How do I resume or close a run?",
    answer: [
      "Resume by following BACKLOG.md › Next action. Repeated next calls finish one phase at a time. When every phase is done, iterate can add another set of phases or consolidate can close the run.",
      "Consolidate writes the repository's native deliverable and removes .koi/run/ in one commit. The project home, including .koi/sensors/ and sandbox configuration, survives.",
    ],
  },
  {
    id: "driver",
    label: "junji and yokai",
    question: "What is the difference between junji and yokai?",
    answer: [
      "junji is the method. Its ten verbs decide, record, divide, execute, and close the work. You can use it directly with a coding agent.",
      "yokai is an optional driver for the repetitive execution loop. After begin, plan, and refine have prepared the working folder, yokai opens fresh agent windows for phases and checks the result on disk. It stops when the contract fails or a human decision is needed.",
    ],
  },
] as const;

export default function JunjiFaq() {
  return (
    <section id="faq" className="faq" aria-labelledby="faq-h">
      <span id="idea" className="faq__anchor" aria-hidden="true"></span>
      <span id="model" className="faq__anchor" aria-hidden="true"></span>
      <div className="wrap faq__layout">
        <header className="faq__intro reveal">
          <p className="kicker">common questions</p>
          <h2 className="sec-h" id="faq-h">
            What you need to know before the first run.
          </h2>
          <p className="sec-p">
            The game and the short version describe the same method. These answers use
            the exact files and rules that junji uses in a repository.
          </p>
          <div className="faq__facts mono" aria-label="junji facts">
            <span>product code: next only</span>
            <span>proof: sensors + commit</span>
            <span>memory: files in git</span>
          </div>
        </header>

        <div className="faq__list">
          {questions.map((item, index) => (
            <details
              key={item.id}
              id={item.id === "next" || item.id === "sensors" ? item.id : undefined}
              className="faq-item panel dither-surface dither-card reveal"
              open={index === 0}
            >
              <summary>
                <span className="faq-item__number pixel">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="faq-item__heading">
                  <span className="mono">{item.label}</span>
                  <strong>{item.question}</strong>
                </span>
                <span className="faq-item__toggle" aria-hidden="true"></span>
              </summary>
              <div className="faq-item__answer">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
