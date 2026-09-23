import { Button } from "@astryxdesign/core/Button";
import { JUNJI_CARDS } from "../../data/junji-cards";
import { JUNJI_TUTORIAL_STATES } from "../../data/junji-tutorial";
import VerbCardArt from "./VerbCardArt";
import "../../styles/junji-tutorial.css";

const initial = JUNJI_TUTORIAL_STATES[0];
const cardById = new Map(JUNJI_CARDS.map((card) => [card.id, card]));
const spine = [
  { id: "begin", label: "set the table" },
  { id: "plan", label: "choose the line" },
  { id: "refine", label: "lay the sequence" },
  { id: "next", label: "play one phase" },
  { id: "consolidate", label: "close the run" },
] as const;

export default function TutorialBoard() {
  return (
    <section id="play" className="tutorial" aria-labelledby="tutorial-h" data-junji-tutorial="">
      <span id="tutorial" className="anchor-alias" aria-hidden="true"></span>
      <div className="wrap">
        <header className="tutorial__intro reveal">
          <p className="kicker">interactive path · learn by playing</p>
          <h2 className="sec-h" id="tutorial-h">
            Play one project hand.
          </h2>
          <p className="sec-p">
            The sample project needs team invitations. Pick a card from the hand and watch
            the files, turn marker, and verification gate change. A wrong card costs
            nothing. The table will tell you what is missing.
          </p>
        </header>

        <div className="tutorial-shell panel pixel-frame dither-surface" data-slot="panel">
          <div className="tutorial-shell__bar">
            <span>JUNJI TABLE / TEAM-INVITATIONS</span>
            <p>
              <i></i>practice hand · no penalty
            </p>
          </div>
          <div className="tutorial-spine" aria-label="Required junji path">
            {spine.map((item, index) => (
              <div
                key={item.id}
                className="spine-card"
                data-spine-card={item.id}
                data-state={index === 0 ? "current" : "pending"}
              >
                <span className="spine-card__dot" aria-hidden="true"></span>
                <code>/junji {item.id}</code>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="tutorial-grid">
            <div className="tutorial-play">
              <article className="quest-card dither-surface dither-card">
                <p className="quest-card__label mono">sample request</p>
                <h3>Invite teammates by email</h3>
                <p>
                  Let workspace owners send an invitation and let the recipient accept it.
                </p>
                <span className="quest-card__party mono">human + agent</span>
              </article>

              <div className="turn-copy">
                <div>
                  <p className="turn-copy__chapter mono" data-tutorial-chapter="">
                    {initial.chapter}
                  </p>
                  <h3 tabIndex={-1} data-tutorial-title="">
                    {initial.title}
                  </h3>
                </div>
                <span className="turn-copy__position mono" data-tutorial-position="">
                  position 01/{String(JUNJI_TUTORIAL_STATES.length).padStart(2, "0")}
                </span>
              </div>

              <p className="turn-copy__prompt" data-tutorial-prompt="">
                {initial.prompt}
              </p>

              <div className="tutorial-hand" aria-label="Cards in hand" data-tutorial-hand="">
                {initial.choices.map((choice) => {
                  const card = choice.card ? cardById.get(choice.card) : undefined;
                  return (
                    <button
                      key={choice.id}
                      className="tutorial-choice"
                      type="button"
                      data-tutorial-choice={choice.id}
                    >
                      {card ? (
                        <span className="tutorial-choice__art">
                          <VerbCardArt id={card.id} />
                        </span>
                      ) : (
                        <span className="tutorial-choice__move" aria-hidden="true">
                          ◆
                        </span>
                      )}
                      <span className="tutorial-choice__kind mono">
                        {choice.kind === "verb" ? "verb card" : "inside this turn"}
                      </span>
                      <strong className="mono">{choice.label}</strong>
                      <span>{choice.hint}</span>
                    </button>
                  );
                })}
              </div>

              <div className="turn-feedback" data-kind="neutral" role="status" aria-live="polite">
                <span className="turn-feedback__mark" aria-hidden="true">
                  ?
                </span>
                <p data-tutorial-feedback="">
                  Choose a card. Invalid choices explain what the table still needs.
                </p>
              </div>

              <div className="trigger-stack" data-tutorial-triggers="" hidden>
                <p className="trigger-stack__label mono">cards resolved inside this play</p>
                <div data-tutorial-trigger-list=""></div>
              </div>
            </div>

            <aside className="table-state" aria-label="Current project table">
              <header className="table-state__head">
                <div>
                  <p className="mono">tableau</p>
                  <h3>
                    <code>.koi/run/</code>
                  </h3>
                </div>
                <span className="table-state__window mono">fresh window safe</span>
              </header>

              <div className="table-state__run" data-tutorial-run="">
                <p data-tutorial-run-label="">No working folder yet</p>
                <div className="file-rack" data-tutorial-files=""></div>
              </div>

              <div className="turn-marker">
                <span className="mono">turn marker · BACKLOG.md › Next action</span>
                <strong className="mono" data-tutorial-next="">
                  not set
                </strong>
              </div>

              <div className="phase-board">
                <p className="phase-board__label mono">sequence row · phases</p>
                <ol data-tutorial-phases="">
                  <li className="phase-board__empty">No phases have been dealt.</li>
                </ol>
              </div>

              <div className="gate-board" data-gate="idle" data-tutorial-gate="">
                <span className="gate-board__sigil" aria-hidden="true"></span>
                <div>
                  <p className="mono">verification gate · .koi/sensors/</p>
                  <strong data-tutorial-gate-label="">No move to verify</strong>
                </div>
              </div>

              <div className="table-result">
                <div>
                  <span className="mono">sealed phase commits</span>
                  <strong data-tutorial-commits="">0</strong>
                </div>
                <p data-tutorial-result="">{initial.result}</p>
              </div>
            </aside>
          </div>

          <footer className="tutorial-footer">
            <p className="tutorial-rule">
              <span className="mono">rule in play</span>
              <strong data-tutorial-rule="">{initial.rule}</strong>
            </p>
            <div className="tutorial-footer__actions">
              <Button
                href="#install"
                label="Start your own game"
                variant="notch"
                size="md"
                data-tutorial-start=""
                hidden
              />
              <button
                type="button"
                className="tutorial-reset mono dither-button"
                data-tutorial-reset=""
              >
                replay sample
              </button>
            </div>
          </footer>
        </div>

        <noscript>
          <style>{`.tutorial-shell { display: none; }`}</style>
          <article className="tutorial-fallback panel">
            <h3>The sample hand</h3>
            <ol>
              <li>
                <code>/junji begin</code> creates the working folder and records facts.
              </li>
              <li>
                <code>/junji plan</code> settles the approach and verification bar.
              </li>
              <li>
                <code>/junji refine</code> cuts the plan into runnable phases.
              </li>
              <li>
                <code>/junji next</code> completes one verified phase and one commit.
              </li>
              <li>
                <code>/junji consolidate</code> writes the deliverable and removes the
                working folder.
              </li>
            </ol>
          </article>
        </noscript>
      </div>
    </section>
  );
}
