import { Button } from "@astryxdesign/core/Button";
import { loadMark } from "../../lib/marks";
import { AppLink } from "../AppLink";
import "../../styles/junji-yokai-bonus.css";

const kitsuneSvg = loadMark("yoru-kitsune.svg");

const kitsuneMarkup = kitsuneSvg
  .replace(/\srole="img"/, "")
  .replace(/\saria-label="[^"]*"/, "")
  .replace("<svg ", '<svg class="kitsune-art" aria-hidden="true" ');

export default function YokaiBonus() {
  return (
    <section id="autopilot" className="yokai-bonus" aria-labelledby="yokai-bonus-h">
      <div className="wrap">
        <article className="bonus-card panel pixel-frame dither-surface dither-card reveal">
          <div
            className="bonus-card__art"
            role="img"
            aria-label="The Kitsune, yokai's three-quarter pixel-art mask."
          >
            <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: kitsuneMarkup }} />
            <span className="bonus-card__spark bonus-card__spark--a"></span>
            <span className="bonus-card__spark bonus-card__spark--b"></span>
          </div>
          <div className="bonus-card__copy">
            <p className="kicker">optional driver card</p>
            <h2 id="yokai-bonus-h">Leave the repetitive turns to yokai.</h2>
            <p>
              junji is the method. yokai is an optional driver. Once the working
              folder and verification bar exist, yokai can open a fresh agent window for
              each phase and check the result on disk. It stops when the contract fails or
              a phase needs a human.
            </p>
            <div className="bonus-card__checks mono" aria-label="What yokai verifies">
              <span>phase done</span>
              <span>new commit</span>
              <span>sensors green</span>
            </div>
          </div>
          <div className="bonus-card__actions">
            <Button href="/yokai" label="Meet yokai" variant="notch" size="md" />
            <AppLink href="/yokai/docs/build">Read the driver contract</AppLink>
          </div>
        </article>
      </div>
    </section>
  );
}
