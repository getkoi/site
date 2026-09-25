import { Button } from "@astryxdesign/core/Button";
import { AppLink } from "../AppLink";

export default function FirstRun() {
  return (
    <section className="first-run section-shell" id="first-run" aria-labelledby="first-run-title">
      <div className="first-run__frame reveal">
        <header className="first-run__heading">
          <div>
            <p className="eyebrow">your first safe run</p>
            <h2 id="first-run-title">Run one phase. Then decide what to automate.</h2>
          </div>
          <p>
            Run Yokai in a prepared project. Review its proposed checks, choose
            the runtime, then drive one phase and inspect the commit.
          </p>
        </header>

        <ol className="first-run__steps">
          <li>
            <span>01</span>
            <div>
              <h3>Install once</h3>
              <p>Install Yokai from the koi checkout. Add Junji to prepare a new project.</p>
              <pre>
                <code>
                  {`./install.sh
npx skills add getkoi/koi --skill junji`}
                </code>
              </pre>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Prepare the project</h3>
              <p>Skip this step if the project already has a prepared Junji working folder.</p>
              <pre>
                <code>
                  {`# in your coding agent
/junji begin
/junji plan
/junji refine`}
                </code>
              </pre>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Review setup, then drive once</h3>
              <p>Interactive startup guides setup, reviews sensors and phase assessments, and offers to start.</p>
              <pre>
                <code>
                  {`yokai --once`}
                </code>
              </pre>
            </div>
          </li>
        </ol>

        <div className="first-run__footer">
          <div>
            <b>No yokai login.</b>
            <span>Your credentials stay with Claude, Cursor, or OpenCode.</span>
          </div>
          <div className="first-run__actions">
            <Button
              href="/koi/docs/quickstart"
              label="Open the full quickstart"
              variant="notch"
              size="md"
            />
            <AppLink href="/yokai/docs/run">
              Read the run reference <span aria-hidden="true">→</span>
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
