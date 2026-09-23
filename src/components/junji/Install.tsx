import { AppLink } from "../AppLink";
import "../../styles/junji-install.css";

export default function Install() {
  return (
    <section id="install" className="install" aria-labelledby="install-h">
      <div className="wrap reveal">
        <p className="kicker">deal your own project</p>
        <h2 className="sec-h" id="install-h">
          Install. Open a repository. Begin.
        </h2>
        <p className="sec-p">
          You do not need yokai or a sandbox for the first hand. Add the skills to your
          coding agent, open the repository you want to change, and ask Junji to set the
          table.
        </p>

        <div className="install__frame">
          <div className="install__bar">
            <span>FIRST HAND / METHOD ONLY</span>
            <p>
              <i></i>three moves to a saved table
            </p>
          </div>

          <ol className="start-path" data-reveal-group="">
            <li className="start-step panel dither-surface dither-card reveal">
              <span className="start-step__number pixel">01</span>
              <div>
                <p className="start-step__label mono">install the method</p>
                <h3>Add the Junji skill</h3>
              </div>
              <div className="command-line">
                <code className="mono">
                  <span aria-hidden="true">$</span> npx skills add getkoi/koi
                </code>
                <button
                  className="copy dither-button mono"
                  type="button"
                  data-cmd="npx skills add getkoi/koi"
                  aria-label="Copy: npx skills add getkoi/koi"
                >
                  copy
                </button>
              </div>
            </li>

            <li className="start-step panel dither-surface dither-card reveal">
              <span className="start-step__number pixel">02</span>
              <div>
                <p className="start-step__label mono">choose the table</p>
                <h3>Open your repository</h3>
                <p>
                  Give the agent your real request. Junji keeps its run state inside that
                  repository, not in the skill.
                </p>
              </div>
            </li>

            <li className="start-step start-step--accent panel pixel-frame dither-surface dither-card reveal">
              <span className="start-step__number pixel">03</span>
              <div>
                <p className="start-step__label mono">play the opening card</p>
                <h3>
                  Run <code>/junji begin</code>
                </h3>
                <p>
                  When <code>.koi/run/</code> appears and <code>BACKLOG.md</code> points to
                  <code>/junji plan</code>, the table is ready.
                </p>
              </div>
            </li>
          </ol>

          <div className="install-more">
            <p className="mono">add more when the project needs it</p>
            <nav aria-label="Setup and reference">
              <AppLink href="/docs/start-here/quickstart">Follow the quickstart</AppLink>
              <AppLink href="/docs/junji/guide">Read the full Junji guide</AppLink>
              <AppLink href="/docs/sensors">Wire project sensors</AppLink>
              <AppLink href="/docs/yokai">Install the yokai driver</AppLink>
              <AppLink href="https://github.com/getkoi/koi">Open the repository</AppLink>
            </nav>
          </div>
          <p className="install__status mono" data-copy-status="" aria-live="polite"></p>
        </div>
      </div>
    </section>
  );
}
