import { Button } from "@astryxdesign/core/Button";
import { loadMark } from "../../lib/marks";

const koiSvg = loadMark("yoru-koi.svg");

const koiMarkup = koiSvg
  .replace(/\srole="img"/, "")
  .replace(/\saria-label="[^"]*"/, "")
  .replace("<svg ", '<svg class="koi-art" aria-hidden="true" ');

const STONES = [
  { n: "01", label: "behavior" },
  { n: "02", label: "reads" },
  { n: "03", label: "writes" },
  { n: "04", label: "cutover" },
] as const;

export default function Hero() {
  return (
    <section className="koi-hero" id="top" aria-labelledby="koi-hero-h">
      <div className="koi-hero__copy">
        <p className="koi-hero__scope reveal">koi · long agent projects</p>
        <div className="koi-hero__wordmark reveal" aria-hidden="true">
          koi
        </div>
        <h1 className="koi-hero__thesis reveal" id="koi-hero-h">
          Your project should outlive the <em>window.</em>
        </h1>
        <p className="koi-hero__lede reveal">
          <strong>koi keeps the plan, phase order, and proof inside your repository. </strong>
          Fresh coding-agent sessions can continue the same long project without
          trusting a summary or a confident final message.
        </p>
        <div className="koi-hero__cta reveal">
          <Button
            href="#campaign"
            label="Watch a project outlive the window"
            variant="notch"
            size="lg"
            endContent={<span aria-hidden="true">↓</span>}
          />
          <Button href="#first-run" label="Start with koi" variant="notch" size="lg" />
        </div>
        <p className="koi-hero__note reveal">
          Keep your repository. Keep your coding agent. Add only the pieces you need.
        </p>
      </div>

      <div
        className="koi-hero__campaign reveal"
        aria-label="A production API port waiting to be divided into phases"
      >
        <div className="koi-hero__campaign-bar">
          <span>CAMPAIGN POND</span>
          <span>
            <i></i> position saved
          </span>
        </div>
        <div
          className="koi-hero__pond"
          data-koi=""
          role="img"
          aria-label="Two koi circle a moonlit route of four phase stones."
        >
          <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: koiMarkup }} />
          <span className="koi-hero__orbit koi-hero__orbit--outer" aria-hidden="true"></span>
          <span className="koi-hero__orbit koi-hero__orbit--inner" aria-hidden="true"></span>
          <span className="koi-hero__pond-glow" aria-hidden="true"></span>
        </div>
        <div className="koi-hero__mission">
          <span>MISSION</span>
          <strong>PORT API.NODE → API.RUST</strong>
          <small>preserve production behavior</small>
        </div>
        <ol className="koi-hero__stones" aria-label="Four campaign phases">
          {STONES.map((stone) => (
            <li key={stone.n}>
              <span>{stone.n}</span> {stone.label}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
