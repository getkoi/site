import { YOKAI_CONTRACT } from "../../data/yokai-landing";
import { AppLink } from "../AppLink";

export default function SafetyBoard() {
  return (
    <section className="safety-board section-shell" id="proof" aria-labelledby="safety-title">
      <header className="section-heading reveal">
        <p className="eyebrow">the final gate</p>
        <h2 id="safety-title">The phase is done when four facts agree.</h2>
        <p>
          The agent can report success. yokai still reads the repository and runs the
          gate. A phase advances only when the completion contract holds on disk.
        </p>
      </header>

      <div className="safety-board__gate reveal">
        <div className="safety-board__gate-head">
          <div>
            <span>PHASE CONTRACT</span>
            <strong>01 · token and membership rules</strong>
          </div>
          <p>
            <i></i> HOLDING
          </p>
        </div>

        <ol>
          {YOKAI_CONTRACT.map((fact, index) => (
            <li key={fact.label}>
              <span className="safety-board__index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <b>{fact.label}</b>
                <p>{fact.detail}</p>
              </div>
              <span className="safety-board__pass">PASS</span>
            </li>
          ))}
        </ol>

        <div className="safety-board__verdict">
          <div>
            <span>VERDICT</span>
            <strong>continue to phase 02</strong>
          </div>
          <p>
            4 / 4 facts measured
            <span aria-hidden="true">→</span>
          </p>
        </div>
      </div>

      <div className="safety-board__modes reveal" aria-labelledby="safety-modes-title">
        <div className="safety-board__modes-intro">
          <p className="eyebrow">three useful boundaries</p>
          <h3 id="safety-modes-title">Choose how much room the run gets.</h3>
          <p>
            These controls change containment and intervention. The proof bar stays
            put.
          </p>
        </div>

        <article>
          <span aria-hidden="true">01</span>
          <h4>guarded</h4>
          <p>
            Halt before each phase marked [gated] so a human can review it. Bare
            yokai halts at those phases. Explicit approval applies to one launch.
          </p>
          <code>yokai --allow-gated</code>
        </article>
        <article>
          <span aria-hidden="true">02</span>
          <h4>sandbox</h4>
          <p>
            Declare a container or Apple boundary in the project home. yokai
            launches the agent there; the same files and sensors decide the result.
          </p>
          <code>yokai configure</code>
        </article>
        <article>
          <span aria-hidden="true">03</span>
          <h4>recovery</h4>
          <p>
            Classify a contract or Build miss, save the episode, then repair the run
            or grant another Build. Recovery never lowers the gate.
          </p>
          <code>recovery: true</code>
        </article>
      </div>

      <p className="safety-board__docs reveal">
        Running many independent phases?{" "}
        <AppLink href="/yokai/docs/build#swarm-optional">Swarm mode is in the docs</AppLink>,
        after the single-run model is clear.
      </p>
    </section>
  );
}
