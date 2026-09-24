import { AppLink } from "../AppLink";

export default function Adoption() {
  return (
    <section className="koi-adoption" id="adopt" aria-labelledby="adoption-title">
      <header className="koi-section-heading reveal">
        <p>THE DEFAULT ROUTE</p>
        <h2 id="adoption-title">Prepare with junji. Drive with yokai.</h2>
        <span>
          Start with the method so you can inspect the project memory yourself. Add
          the driver when repeating <code>/junji next</code> becomes the boring part.
        </span>
      </header>

      <div className="koi-adoption__route reveal">
        <ol>
          <li>
            <span className="koi-adoption__number">01</span>
            <div>
              <p>project home</p>
              <h3>Put the verification bar beside the code.</h3>
              <span>
                <code>/junji begin</code> creates the working folder. Planning records
                runnable verification commands in CONTEXT.
              </span>
            </div>
            <b>junji</b>
          </li>
          <li>
            <span className="koi-adoption__number">02</span>
            <div>
              <p>prepared position</p>
              <h3>Turn the goal into an ordered, inspectable project.</h3>
              <span>
                junji writes the plan, backlog, phase files, and next action under
                <code>.koi/run/</code>.
              </span>
            </div>
            <b>junji</b>
          </li>
          <li>
            <span className="koi-adoption__number">03</span>
            <div>
              <p>measured execution</p>
              <h3>Let fresh agent turns work through the phases.</h3>
              <span>
                Optionally run yokai to configure runtime preferences, review its
                proposed sensors and start the agent turns.
              </span>
            </div>
            <b>yokai + agent</b>
          </li>
          <li>
            <span className="koi-adoption__number">04</span>
            <div>
              <p>on-disk proof</p>
              <h3>Continue only while the contract holds.</h3>
              <span>
                A done phase needs a new commit, a green sensor gate, and a clean
                tree.
              </span>
            </div>
            <b>repository</b>
          </li>
        </ol>
      </div>

      <div className="koi-adoption__branches reveal">
        <article>
          <p>STAY IN THE SEAT</p>
          <h3>Use junji by itself.</h3>
          <span>
            Drive <code>/junji next</code> in chat and inspect every phase yourself.
            The folder and proof bar are the same.
          </span>
          <AppLink href="/junji">
            Learn the method <span aria-hidden="true">→</span>
          </AppLink>
        </article>
        <article>
          <p>POSITION ALREADY EXISTS</p>
          <h3>Point yokai at the prepared folder.</h3>
          <span>
            Run <code>yokai</code> in a prepared project. It guides missing setup
            and reuses reviewed checks on later runs.
          </span>
          <AppLink href="/yokai">
            Meet the driver <span aria-hidden="true">→</span>
          </AppLink>
        </article>
      </div>
    </section>
  );
}
