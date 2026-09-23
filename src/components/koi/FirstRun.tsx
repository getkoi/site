import { Button } from "@astryxdesign/core/Button";
import { AppLink } from "../AppLink";

const fullRun = `npx skills add getkoi/koi
./install.sh

# in your project repository
koi setup --yes --sandbox off
koi init

# in your coding agent
/junji begin
/junji plan
/junji refine

# back in the shell
koi doctor --probe
yokai --once`;

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
            Install the method and CLIs, prepare the repository, probe the agent, then
            let yokai drive exactly one phase.
          </span>
        </header>

        <div className="koi-first-run__body">
          <ol className="koi-first-run__legend">
            <li>
              <span>01</span>
              <div>
                <b>Install</b>
                <small>skills + two CLIs</small>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <b>Prepare</b>
                <small>project home + phases</small>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <b>Probe</b>
                <small>structure + agent auth</small>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <b>Drive once</b>
                <small>one phase, then exit</small>
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
              <code>
                <span>npx skills add getkoi/koi</span>
                {"\n"}
                <span>./install.sh</span>
                {"\n\n"}
                <i># in your project repository</i>
                {"\n"}
                <span>koi setup --yes --sandbox off</span>
                {"\n"}
                <span>koi init</span>
                {"\n\n"}
                <i># in your coding agent</i>
                {"\n"}
                <span>/junji begin</span>
                {"\n"}
                <span>/junji plan</span>
                {"\n"}
                <span>/junji refine</span>
                {"\n\n"}
                <i># back in the shell</i>
                {"\n"}
                <span>koi doctor --probe</span>
                {"\n"}
                <strong>yokai --once</strong>
              </code>
            </pre>
            <p className="koi-first-run__status" data-copy-status="" aria-live="polite"></p>
          </div>
        </div>

        <footer className="koi-first-run__actions">
          <div>
            <b>Want the method only?</b>
            <span>
              Stop after <code>npx skills add getkoi/koi</code> and drive phases with
              <code>/junji next</code>.
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
          <strong>One name, two scopes.</strong> koi is the product and
          <code>koi</code> is its setup CLI. The CLI creates project-home files;
          <code>yokai</code> drives prepared phases.
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
