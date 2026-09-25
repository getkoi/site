import { Button } from "@astryxdesign/core/Button";
import { AppLink } from "../AppLink";

const fullRun = `npx skills add getkoi/koi --skill junji

# in your coding agent, from your project
/junji begin
/junji plan
/junji refine
/junji next`;

export default function FirstRun() {
  return (
    <section className="koi-first-run" id="first-run" aria-labelledby="first-run-title">
      <div className="koi-first-run__frame reveal">
        <header>
          <div>
            <p>FIRST SAFE RUN</p>
            <h2 id="first-run-title">Give koi one phase.</h2>
          </div>
          <span>
            Install Junji and work through one phase in your coding agent.
            Add Yokai whenever you want automated execution.
          </span>
        </header>

        <div className="koi-first-run__body">
          <ol className="koi-first-run__legend">
            <li>
              <span>01</span>
              <div>
                <b>Install</b>
                <small>the free Junji skill</small>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <b>Prepare</b>
                <small>context + phases</small>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <b>Verify</b>
                <small>document runnable checks</small>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <b>Execute</b>
                <small>one phase with /junji next</small>
              </div>
            </li>
          </ol>

          <div className="koi-first-run__terminal">
            <div className="koi-first-run__terminal-bar">
              <span>recommended first run</span>
              <button
                className="copy dither-button"
                type="button"
                data-cmd={fullRun}
                aria-label="Copy the complete first-run command sequence"
              >
                copy all
              </button>
            </div>
            <pre>
              <code>{fullRun}</code>
            </pre>
            <p className="koi-first-run__status" data-copy-status="" aria-live="polite"></p>
          </div>
        </div>

        <footer className="koi-first-run__actions">
          <div>
            <b>Ready to automate?</b>
            <span>
              Install Yokai with <code>./install.sh</code> from the framework checkout,
              then run <code>yokai --once</code> in your prepared repository.
            </span>
          </div>
          <Button
            href="/koi/docs/quickstart"
            label="Open the full quickstart"
            variant="notch"
            size="md"
          />
        </footer>
      </div>

      <div className="koi-first-run__footnote reveal">
        <p>
          <strong>Two entry points.</strong> koi is the framework. Junji is its standalone
          method; Yokai owns runtime setup, gate review and automated execution.
        </p>
        <p>
          <strong>Under the floor:</strong> tori is the shared ACP connector port used
          by yokai. It is an implementation detail, documented in the
          <AppLink href="/koi/docs/glossary">glossary map</AppLink>.
        </p>
      </div>
    </section>
  );
}
