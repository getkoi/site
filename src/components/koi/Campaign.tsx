import {
  KOI_CAMPAIGN_PHASES,
  KOI_CAMPAIGN_STATES,
  KOI_CONTRACT_FACTS,
} from "../../data/koi-landing";

export default function Campaign() {
  return (
    <section className="koi-campaign" id="campaign" aria-labelledby="campaign-title">
      <header className="koi-section-heading reveal">
        <p>ONE PORT · SIX SAVED POSITIONS</p>
        <h2 id="campaign-title">A production port that will not fit in one prompt.</h2>
        <span>
          Follow one Node-to-Rust API port from a vague mission to a measured phase.
          The pond keeps the same project position while windows and agent turns change.
        </span>
      </header>

      <div className="koi-campaign__layout" data-koi-campaign="">
        <div className="koi-campaign__chapters">
          {KOI_CAMPAIGN_STATES.map((state, index) => (
            <article
              key={state.id}
              className="koi-campaign__chapter reveal"
              data-campaign-step=""
              data-active={String(index === 0)}
              data-tone={state.tone}
            >
              <div className="koi-campaign__chapter-label">
                <span>{state.index}</span>
                <p>{state.label}</p>
              </div>
              <h3>{state.title}</h3>
              <p>{state.body}</p>
              {state.feedback && (
                <div className="koi-campaign__feedback">
                  <b>FEEDBACK.md</b>
                  <span>{state.feedback}</span>
                </div>
              )}

              <div
                className="koi-campaign__mobile-snapshot"
                data-tone={state.tone}
                aria-label={`Saved position: ${state.position}`}
              >
                <div>
                  <span>POSITION</span>
                  <b>{state.position}</b>
                </div>
                <ol>
                  {KOI_CAMPAIGN_PHASES.map((phase, phaseIndex) => (
                    <li key={phase.id} data-status={state.phaseStatuses[phaseIndex]}>
                      <span>{phase.number}</span>
                      {phase.shortTitle}
                    </li>
                  ))}
                </ol>
                <p>
                  <span>gate</span>
                  <b>{state.gate}</b>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className="koi-campaign__stage"
          aria-label="Campaign pond showing the current saved project position"
        >
          {KOI_CAMPAIGN_STATES.map((state, index) => (
            <article
              key={state.id}
              className="campaign-pond"
              data-campaign-scene=""
              data-active={String(index === 0)}
              data-tone={state.tone}
              data-assembled={String(Boolean(state.assembled))}
              aria-hidden={index !== 0}
              aria-label={`${state.label}: ${state.title}`}
            >
              <header className="campaign-pond__bar">
                <div>
                  <img src="/yoru-koi.svg" alt="" width="30" height="30" />
                  <span>koi / PORT-API-RUST</span>
                </div>
                <p>
                  <i></i>
                  {state.position}
                </p>
              </header>

              <div className="campaign-pond__body">
                <div className="campaign-pond__mission">
                  <span>MISSION</span>
                  <b>api.node → api.rust</b>
                  <small>behavior must remain compatible</small>
                </div>

                <div className="campaign-pond__water">
                  <svg
                    className="campaign-pond__route"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M23 28 C39 11 64 11 78 29 S89 69 70 77 S30 89 19 64 S12 39 23 28"></path>
                  </svg>
                  <div className="campaign-pond__koi" aria-hidden="true">
                    <img src="/yoru-koi.svg" alt="" />
                  </div>

                  <ol className="campaign-pond__phases" aria-label="Port phases">
                    {KOI_CAMPAIGN_PHASES.map((phase, phaseIndex) => (
                      <li
                        key={phase.id}
                        data-phase={phase.id}
                        data-status={state.phaseStatuses[phaseIndex]}
                      >
                        <span>{phase.number}</span>
                        <b>{phase.shortTitle}</b>
                        {phase.gated && <small>[gated]</small>}
                      </li>
                    ))}
                  </ol>

                  <div className="campaign-pond__actors" aria-label="Active pieces">
                    {state.actors.includes("junji") && (
                      <span data-actor="junji">junji · method</span>
                    )}
                    {state.actors.includes("agent") && (
                      <span data-actor="agent">your agent</span>
                    )}
                    {state.actors.includes("yokai") && (
                      <span data-actor="yokai">yokai · driver</span>
                    )}
                  </div>
                </div>

                <div className="campaign-pond__drawer">
                  <div>
                    <span>PROJECT MEMORY</span>
                    <b>.koi/</b>
                  </div>
                  <ul>
                    {state.files.length ? (
                      state.files.map((file) => <li key={file}>{file}</li>)
                    ) : (
                      <li data-empty="">waiting for preparation</li>
                    )}
                  </ul>
                </div>

                {state.feedback && (
                  <div className="campaign-pond__alert">
                    <span>SENSOR REJECTED CLAIM</span>
                    <b>{state.feedback}</b>
                  </div>
                )}

                {state.assembled && (
                  <>
                    <div className="campaign-pond__system">
                      <div>
                        <span>junji</span>
                        <b>writes the position</b>
                      </div>
                      <i aria-hidden="true">→</i>
                      <div>
                        <span>.koi/</span>
                        <b>holds the project</b>
                      </div>
                      <i aria-hidden="true">→</i>
                      <div>
                        <span>yokai + agent</span>
                        <b>run the phase</b>
                      </div>
                      <i aria-hidden="true">→</i>
                      <div>
                        <span>sensors + git</span>
                        <b>prove the result</b>
                      </div>
                    </div>
                    <ul className="campaign-pond__contract" aria-label="Verified phase contract">
                      {KOI_CONTRACT_FACTS.map((fact) => (
                        <li key={fact}>
                          <span aria-hidden="true">✓</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <dl className="campaign-pond__meters">
                <div>
                  <dt>window</dt>
                  <dd>{state.window}</dd>
                </div>
                <div>
                  <dt>gate</dt>
                  <dd>{state.gate}</dd>
                </div>
                <div>
                  <dt>commit</dt>
                  <dd>{state.commit}</dd>
                </div>
                <div>
                  <dt>next</dt>
                  <dd>{state.nextAction}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
