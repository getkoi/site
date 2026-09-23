import { JUNJI_CARDS, JUNJI_FAMILIES, type JunjiRelationKind } from "../../data/junji-cards";
import VerbCardArt from "./VerbCardArt";
import { AppLink } from "../AppLink";
import "../../styles/junji-verb-deck.css";

const relationLabels: Record<JunjiRelationKind, string> = {
  activates: "auto-play",
  embeds: "plays within",
  reads: "reads result",
};

export default function VerbDeck() {
  return (
    <section id="verbs" className="deck-story" aria-labelledby="verbs-h" data-verb-deck="">
      <div className="wrap">
        <div className="reveal deck-story__intro">
          <p className="kicker">full verb deck</p>
          <h2 className="sec-h" id="verbs-h">
            Every card has one job.
          </h2>
          <p className="sec-p">
            The tutorial showed the required path, but Junji is not a ten-step checklist.
            Some cards form the project spine and others help when a condition calls for
            them. Select a card to see when it is legal, what it changes on disk, and
            where its relationships lead. Card chains distinguish what Junji
            <strong>activates</strong>, what a verb <strong>embeds</strong>, and what merely
            <strong>reads an earlier result</strong>.
          </p>
          <div className="chain-key mono" aria-label="Card relationship legend">
            <span data-kind="activates">auto-play</span>
            <span data-kind="embeds">plays within</span>
            <span data-kind="reads">reads result</span>
          </div>
        </div>

        <div className="deck-layout">
          <div className="deck-layout__bar">
            <span>FULL DECK / TEN VERBS</span>
            <p>
              <i></i>select a card to inspect its rule
            </p>
          </div>
          <div className="deck-board panel pixel-frame dither-surface" data-slot="panel">
            <div className="deck-families" aria-label="junji verb cards">
              {JUNJI_FAMILIES.map((family) => {
                const cards = JUNJI_CARDS.filter((card) => card.family === family.id);
                return (
                  <section
                    key={family.id}
                    className="card-family"
                    aria-labelledby={`family-${family.id}`}
                  >
                    <header className="card-family__head">
                      <h3 id={`family-${family.id}`} className="pixel">
                        {family.label}
                      </h3>
                      <p>{family.description}</p>
                    </header>
                    <div className="card-family__row">
                      {cards.map((card) => (
                        <button
                          key={card.id}
                          className="verb-card"
                          type="button"
                          data-verb-card={card.id}
                          data-family={card.family}
                          data-relations={card.relations
                            .map((relation) => `${relation.target}:${relation.kind}`)
                            .join(",")}
                          data-selected={card.id === "begin" ? "true" : "false"}
                          aria-pressed={card.id === "begin" ? "true" : "false"}
                          aria-controls={`verb-detail-${card.id}`}
                          tabIndex={card.id === "begin" ? 0 : -1}
                        >
                          <span className="verb-card__meta mono">
                            <span>{family.label}</span>
                          </span>
                          <span className="verb-card__art">
                            <VerbCardArt id={card.id} />
                            <span className="verb-card__myth mono">{card.mythName}</span>
                          </span>
                          <span className="verb-card__command mono">{card.command}</span>
                          <span className="verb-card__title">{card.title}</span>
                          <span className="verb-card__timing mono">{card.timing}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
            <svg
              className="relation-map"
              data-relation-map=""
              aria-hidden="true"
              focusable="false"
              preserveAspectRatio="none"
            >
              <g data-relation-lines=""></g>
            </svg>
          </div>

          <div className="rulebook" aria-live="polite" aria-atomic="true">
            {JUNJI_CARDS.map((card) => (
              <article
                key={card.id}
                className="rule-card panel pixel-frame dither-surface dither-card"
                data-slot="panel"
                data-verb-detail={card.id}
                id={`verb-detail-${card.id}`}
                hidden={card.id !== "begin"}
                tabIndex={-1}
              >
                <header className="rule-card__head">
                  <div>
                    <p className="rule-card__family mono">
                      {JUNJI_FAMILIES.find((family) => family.id === card.family)?.label}
                    </p>
                    <h3 className="pixel">{card.command}</h3>
                    <p className="rule-card__title">{card.title}</p>
                  </div>
                  <span
                    className="rule-card__status mono"
                    data-writes-code={String(card.writesCode)}
                  >
                    {card.writesCode ? "writes product code" : card.timing}
                  </span>
                </header>

                <div className="rule-card__scene">
                  <VerbCardArt id={card.id} />
                  <p className="rule-card__myth mono">{card.mythName}</p>
                  <span className="visually-hidden">{card.artLabel}</span>
                </div>

                <p className="rule-card__purpose">{card.purpose}</p>

                <dl className="rule-card__effects">
                  <div>
                    <dt className="mono">play when</dt>
                    <dd>{card.playCondition}</dd>
                  </div>
                  <div>
                    <dt className="mono">effect on disk</dt>
                    <dd>{card.diskEffect}</dd>
                  </div>
                  <div>
                    <dt className="mono">turn marker</dt>
                    <dd>{card.pointerEffect}</dd>
                  </div>
                </dl>

                <div className="rule-card__chains">
                  <p className="mono">card chains</p>
                  {card.relations.length ? (
                    <ul>
                      {card.relations.map((relation) => {
                        const target = JUNJI_CARDS.find(
                          (candidate) => candidate.id === relation.target,
                        );
                        return (
                          <li key={`${relation.target}:${relation.kind}`} data-kind={relation.kind}>
                            <span className="chain-kind mono">{relationLabels[relation.kind]}</span>
                            <span aria-hidden="true">→</span>
                            <button
                              type="button"
                              className="chain-target mono"
                              data-deck-link={relation.target}
                            >
                              {target?.command}
                            </button>
                            <span>{relation.label}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="rule-card__solo">
                      This card has no automatic card calls. Its effect is complete on its own.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <noscript>
          <div className="deck-fallback">
            {JUNJI_CARDS.map((card) => (
              <article key={card.id}>
                <h3>
                  {card.command}: {card.title}
                </h3>
                <p>{card.purpose}</p>
                <p>
                  <strong>Effect:</strong> {card.diskEffect}
                </p>
              </article>
            ))}
          </div>
        </noscript>

        <p className="deck-story__guide reveal">
          The cards are the map, not a replacement for the rules.
          <AppLink href="/docs/junji/guide">Read the complete junji guide →</AppLink>
        </p>
      </div>
    </section>
  );
}
