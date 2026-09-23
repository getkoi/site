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
            Start on the host with sandbox off. Preflight the agent and gate, drive
            exactly one phase, then inspect the commit and cockpit.
          </p>
        </header>

        <ol className="first-run__steps">
          <li>
            <span>01</span>
            <div>
              <h3>Install once</h3>
              <p>Install the CLIs from the koi repository and add the junji skill.</p>
              <pre>
                <code>
                  {`./install.sh
npx skills add getkoi/koi`}
                </code>
              </pre>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Prepare the project</h3>
              <p>Create project-home files, run preferences, and a phased plan.</p>
              <pre>
                <code>
                  {`koi setup --yes --sandbox off
koi init

# in your coding agent
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
              <h3>Preflight, then drive once</h3>
              <p>Fix any failed probe before giving the driver a phase.</p>
              <pre>
                <code>
                  {`koi doctor --probe
yokai --once`}
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
              href="/docs/start-here/quickstart"
              label="Open the full quickstart"
              variant="notch"
              size="md"
            />
            <AppLink href="/docs/yokai/run">
              Read the run reference <span aria-hidden="true">→</span>
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
