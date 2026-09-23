import { Button } from "@astryxdesign/core/Button";
import "../../styles/junji-technical-path.css";

const stages = [
  {
    number: "01",
    label: "orient",
    command: "/junji begin",
    title: "Record the repository",
    body:
      "Creates .koi/run/, copies the method files, and records observable repository facts in CONTEXT.md. It does not choose a solution or change product code.",
    files: [".koi/run/", "CONTEXT.md", "BACKLOG.md"],
  },
  {
    number: "02",
    label: "shape",
    command: "/junji plan + refine",
    title: "Choose and divide the work",
    body:
      "Plan records the approach and verification bar. Refine turns that plan into ordered, independently verifiable phases. Both verbs write markdown, not product code.",
    files: ["PLAN.md", "CONTEXT.md", "BACKLOG.md"],
  },
  {
    number: "03",
    label: "implement",
    command: "/junji next",
    title: "Run one phase",
    body:
      "A fresh window reads the saved position, researches the selected phase, writes or reuses its phase plan, and changes only the code inside that phase.",
    files: ["CONTEXT.md", "BACKLOG.md", "phases/"],
  },
  {
    number: "04",
    label: "prove",
    command: "gate + commit",
    title: "Verify before moving on",
    body:
      "Every sensor must exit 0. A green gate lets junji record the outcome, compact the backlog, create one commit, and stop. A red gate keeps the phase open.",
    files: [".koi/sensors/", "Outcome", "git commit"],
  },
  {
    number: "05",
    label: "resume or close",
    command: "next / iterate / consolidate",
    title: "Continue from disk",
    body:
      "BACKLOG.md names the next verb, so another window can resume without the old chat. When every phase is done, iterate can add work or consolidate can write the deliverable and remove .koi/run/.",
    files: ["Next action", ".koi/run/", ".koi/sensors/ stays"],
  },
] as const;

export default function TechnicalOverview() {
  return (
    <section id="short" className="technical-path" aria-labelledby="technical-path-h">
      <div className="wrap">
        <header className="technical-path__intro reveal">
          <div>
            <p className="kicker">technical path · about 60 seconds</p>
            <h2 className="sec-h" id="technical-path-h">
              junji, without the game.
            </h2>
          </div>
          <p className="sec-p">
            junji keeps a long engineering project in git-committed files. Each agent
            window reads the same decisions, phase order, and verification rules from
            disk. Only <code>/junji next</code> writes product code.
          </p>
        </header>

        <div className="technical-path__board reveal">
          <div className="technical-path__bar">
            <span>METHOD LOOP / FIVE STATIONS</span>
            <p>
              <i></i>position survives every window
            </p>
          </div>

          <ol className="lifecycle" aria-label="junji technical lifecycle" data-reveal-group="">
            {stages.map((stage, index) => (
              <li
                key={stage.number}
                className="lifecycle-stage panel dither-surface dither-card reveal"
              >
                <div className="lifecycle-stage__rail" aria-hidden="true">
                  <span>{stage.number}</span>
                  {index < stages.length - 1 && <i></i>}
                </div>
                <article>
                  <header>
                    <p className="mono">{stage.label}</p>
                    <code>{stage.command}</code>
                  </header>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                  <div className="lifecycle-stage__files mono" aria-label="Files and records involved">
                    {stage.files.map((file) => (
                      <span key={file}>{file}</span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <footer className="technical-path__exit panel dither-surface">
            <p>
              That is the whole loop: save the position, finish one phase, prove it on
              disk, and hand the next window an exact starting point.
            </p>
            <div>
              <Button
                href="#faq"
                label="Continue to common questions"
                variant="notch"
                size="md"
              />
              <a className="technical-path__alternate mono" href="#play">
                Try the interactive version
              </a>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
