import Sakura from "../Sakura";
import { loadMark } from "../../lib/marks";

const sentinelSvg = loadMark("yoru-sentinel.svg");

const sentinelMarkup = sentinelSvg
  .replace(/\srole="img"/, "")
  .replace(/\saria-label="[^"]*"/, "")
  .replace("<svg ", '<svg class="sentinel-art" aria-hidden="true" ');

export default function JunjiHero() {
  return (
    <section className="junji-hero" id="top" aria-labelledby="junji-title">
      <Sakura layer="back" count={12} />

      <div className="junji-hero__copy">
        <p className="junji-hero__scope reveal">junji · a method for long agent projects</p>
        <div className="junji-hero__wordmark reveal" aria-hidden="true">
          junji
        </div>
        <h1 className="junji-hero__thesis reveal" id="junji-title">
          Give every agent window the <em>same project.</em>
        </h1>
        <p className="junji-hero__lede reveal">
          <strong>
            junji stores decisions, phase order, and verification rules under
            <code>.koi/</code>.
          </strong>
          A fresh window resumes from those files. Only <code>/junji next</code>
          writes product code, one verified phase at a time.
        </p>

        <nav className="junji-hero__routes reveal" aria-label="Choose how to learn junji">
          <a className="junji-route junji-route--short" href="#short">
            <span className="junji-route__number">01</span>
            <span>
              <small>about 60 seconds</small>
              <strong>Read the short version</strong>
              <i>Lifecycle, files, and proof</i>
            </span>
            <b aria-hidden="true">↓</b>
          </a>
          <a className="junji-route junji-route--game" href="#play">
            <span className="junji-route__number">02</span>
            <span>
              <small>interactive project hand</small>
              <strong>Play the card game</strong>
              <i>Choose verbs and move the table</i>
            </span>
            <b aria-hidden="true">↓</b>
          </a>
        </nav>
      </div>

      <div className="junji-hero__console reveal" aria-label="The Sentinel guarding a prepared junji table">
        <header>
          <span>順次 / SENTINEL TABLE</span>
          <p>
            <i></i>project memory ready
          </p>
        </header>

        <div
          className="junji-hero__sentinel"
          role="img"
          aria-label="The Sentinel, junji's armored guardian, watches the project state on disk."
        >
          <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: sentinelMarkup }} />
          <span className="junji-hero__eyes" aria-hidden="true"></span>
          <span className="junji-hero__seal" aria-hidden="true">
            順
          </span>
        </div>

        <div className="junji-hero__position">
          <span>PROJECT TABLE</span>
          <strong>.koi/run/</strong>
          <small>the next window reads the same position</small>
        </div>

        <dl className="junji-hero__readout">
          <div>
            <dt>next action</dt>
            <dd>/junji begin</dd>
          </div>
          <div>
            <dt>write scope</dt>
            <dd>one phase</dd>
          </div>
          <div>
            <dt>proof</dt>
            <dd>sensors + commit</dd>
          </div>
        </dl>
      </div>

      <Sakura layer="front" count={4} />
    </section>
  );
}
