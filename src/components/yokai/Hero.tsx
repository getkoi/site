import { Button } from "@astryxdesign/core/Button";
import { loadMark } from "../../lib/marks";
import { AppLink } from "../AppLink";

const kitsuneSvg = loadMark("yoru-kitsune.svg");

const kitsuneMarkup = kitsuneSvg
  .replace(/\srole="img"/, "")
  .replace(/\saria-label="[^"]*"/, "")
  .replace("<svg ", '<svg class="kitsune-art" aria-hidden="true" ');

export default function Hero() {
  return (
    <section className="yokai-hero" aria-labelledby="yokai-title">
      <div className="yokai-hero__copy">
        <p className="eyebrow dither-surface dither-alert">
          deterministic supervisor · agent-powered work
        </p>
        <h1 id="yokai-title">
          Let the run continue.
          <br />
          <em>Know why it stops.</em>
        </h1>
        <p className="lede">
          <strong>yokai drives prepared engineering phases</strong> through your coding
          agent. It starts fresh turns, checks the repository itself, and continues
          until the contract fails or a human is needed.
        </p>
        <div className="cta">
          <Button
            href="#guided-run"
            label="Watch one phase run"
            variant="notch"
            size="lg"
            endContent={<span aria-hidden="true">↓</span>}
          />
          <Button href="#system-map" label="See the whole system" variant="notch" size="lg" />
        </div>
        <p className="yokai-hero__bridge">
          New here? <AppLink href="/junji">junji</AppLink> prepares the durable project memory.
          yokai is the driver that can run it unattended.
        </p>
      </div>

      <div className="yokai-hero__console" aria-label="yokai ready-state console">
        <div className="yokai-hero__console-bar">
          <span>狐 · supervisor</span>
          <span className="yokai-hero__signal">ready</span>
        </div>
        <div className="kitsune" role="img" aria-label="The Kitsune, yokai's silent driver mark.">
          <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: kitsuneMarkup }} />
        </div>
        <dl className="yokai-hero__readout">
          <div>
            <dt>phase</dt>
            <dd>next [todo]</dd>
          </div>
          <div>
            <dt>agent</dt>
            <dd>connected via ACP</dd>
          </div>
          <div>
            <dt>gate</dt>
            <dd>waiting for evidence</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
