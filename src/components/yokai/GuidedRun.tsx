import { YOKAI_RUN_STATES } from "../../data/yokai-landing";

const rail = [
  { id: "plan", label: "Plan" },
  { id: "build", label: "Build" },
  { id: "seal", label: "Seal" },
  { id: "gate", label: "Gate" },
] as const;

export default function GuidedRun() {
  return (
    <section className="guided-run section-shell" id="guided-run" aria-labelledby="guided-run-title">
      <header className="section-heading reveal">
        <p className="eyebrow">guided run · team invitations</p>
        <h2 id="guided-run-title">Watch one phase meet reality.</h2>
        <p>
          Six moments, four fresh agent sessions, one deliberate failure. Scroll the
          phase log; the cockpit shows what yokai knows at each point.
        </p>
      </header>

      <div className="driver-story__layout">
        <div className="guided-run__chapters">
          {YOKAI_RUN_STATES.map((state, index) => (
            <article
              key={state.id}
              className="guided-run__chapter reveal"
              data-story-step=""
              data-active={String(index === 0)}
              data-tone={state.tone}
            >
              <div className="guided-run__chapter-head">
                <span>{state.index}</span>
                <p>{state.chapter}</p>
              </div>
              <h3>{state.title}</h3>
              <p>{state.body}</p>
              {state.feedback && (
                <div className="guided-run__feedback">
                  <b>FEEDBACK.md</b>
                  <span>{state.feedback}</span>
                </div>
              )}
              <dl className="guided-run__mobile-state">
                <div>
                  <dt>gate</dt>
                  <dd>{state.gate}</dd>
                </div>
                <div>
                  <dt>next action</dt>
                  <dd>{state.nextAction}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="guided-run__stage" aria-label="Live reconstruction of the yokai cockpit">
          {YOKAI_RUN_STATES.map((state, index) => (
            <article
              key={state.id}
              className="yokai-cockpit"
              data-story-scene=""
              data-active={String(index === 0)}
              data-tone={state.tone}
              aria-label={`${state.chapter}: ${state.title}`}
            >
              <header className="yokai-cockpit__topbar">
                <div className="yokai-cockpit__identity">
                  <img src="/yoru-kitsune.svg" alt="" width="34" height="34" />
                  <div>
                    <b>yokai</b>
                    <span>run 01 · local</span>
                  </div>
                </div>
                <div className="yokai-cockpit__status">
                  <i></i>
                  {state.turn}
                </div>
              </header>

              <div className="yokai-cockpit__body">
                <ol className="yokai-cockpit__rail" aria-label="Phase lifecycle">
                  {rail.map((station) => {
                    const currentIndex = rail.findIndex((item) => item.id === state.rail);
                    const stationIndex = rail.findIndex((item) => item.id === station.id);
                    const stationState =
                      stationIndex < currentIndex
                        ? "complete"
                        : station.id === state.rail
                          ? "active"
                          : "waiting";
                    return (
                      <li key={station.id} data-station-state={stationState}>
                        <span className="yokai-cockpit__station">
                          <i></i>
                          <b>{station.label}</b>
                        </span>
                        {station.id === state.rail && (
                          <img
                            className="yokai-cockpit__kitsune-marker"
                            src="/yoru-kitsune.svg"
                            alt="Kitsune is here"
                            width="32"
                            height="32"
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>

                <div className="yokai-cockpit__main">
                  <div className="yokai-cockpit__phase">
                    <span>PHASE</span>
                    <strong>{state.phase}</strong>
                  </div>

                  <div className="yokai-cockpit__terminal">
                    <div className="yokai-cockpit__terminal-bar">
                      <span>event stream</span>
                      <span>turn {state.index}/06</span>
                    </div>
                    <div className="yokai-cockpit__terminal-lines">
                      {state.stream.map((line, lineIndex) => (
                        <p key={`${state.index}-${lineIndex}`}>
                          <span>{String(lineIndex + 1).padStart(2, "0")}</span>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  {state.feedback && (
                    <div className="yokai-cockpit__notice">
                      <span>measured feedback</span>
                      <p>{state.feedback}</p>
                    </div>
                  )}
                </div>
              </div>

              <dl className="yokai-cockpit__meters">
                <div>
                  <dt>agent</dt>
                  <dd>claude via ACP</dd>
                </div>
                <div>
                  <dt>next action</dt>
                  <dd>{state.nextAction}</dd>
                </div>
                <div>
                  <dt>gate</dt>
                  <dd>{state.gate}</dd>
                </div>
                <div>
                  <dt>commit</dt>
                  <dd>{state.commit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>

      <div className="guided-run__understory reveal">
        <details>
          <summary>Why fresh sessions?</summary>
          <p>
            A turn has one job and a bounded context. The next turn recovers its
            position from files, not from a growing conversation. That makes context
            disposal normal instead of dangerous.
          </p>
        </details>
        <details>
          <summary>What did recovery do here?</summary>
          <p>
            This sample used the normal Build correction loop: record measured
            feedback, then start a fresh coder session. Full recovery is a separate,
            bounded path for broken phase state. It does not weaken the gate.
          </p>
        </details>
      </div>
    </section>
  );
}
