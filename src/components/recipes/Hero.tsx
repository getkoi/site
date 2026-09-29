import { Button } from "@astryxdesign/core/Button";

export default function Hero() {
  return (
    <header className="recipes-hero" id="top">
      <div className="recipes-hero__copy">
        <p className="recipes-eyebrow">koi recipes · project-home workshop</p>
        <h1>
          Copy the artifact.
          <br />
          <em>Keep the proof.</em>
        </h1>
        <p className="recipes-hero__lede">
          Pick one verified sensor script or configure one matched sandbox pair. Put the files in
          <code>.koi/</code>, then run the command that proves the setup works.
        </p>
        <div className="recipes-hero__actions" aria-label="Open a recipe workbench">
          <Button
            href="#sensors"
            label="Find a sensor"
            variant="notch"
            size="lg"
            endContent={<span aria-hidden="true">↓</span>}
          />
          <Button href="#sandboxes" label="Configure a sandbox" variant="outline" size="lg" />
        </div>
        <p className="recipes-hero__note">
          Recipes are starting points. The repository owns every copied file.
        </p>
      </div>

      <div className="recipes-hero__workshop" aria-label="Project-home recipe workshop">
        <div className="recipes-console-bar">
          <span>PROJECT-HOME / PROVISIONING BENCH</span>
          <span>
            <i aria-hidden="true"></i> READY
          </span>
        </div>
        <div className="recipes-hero__scene">
          <div className="recipes-hero__mark-well">
            <span className="recipes-hero__halo" aria-hidden="true"></span>
            <img
              className="recipes-hero__mark"
              src="/niguiri.svg"
              alt="The recipes workshop mark."
              width="176"
              height="176"
              decoding="async"
            />
          </div>
          <div className="recipes-hero__shelves" aria-hidden="true">
            <div className="recipes-hero__shelf">
              <span>01</span>
              <strong>.koi/sensors/*.sh</strong>
              <i>SINGLE CONCERN</i>
            </div>
            <div className="recipes-hero__shelf">
              <span>02</span>
              <strong>.koi/yokai.yml</strong>
              <i>BACKEND</i>
            </div>
            <div className="recipes-hero__shelf">
              <span>03</span>
              <strong>.koi/Dockerfile.sandbox</strong>
              <i>IMAGE</i>
            </div>
          </div>
        </div>
        <div className="recipes-hero__rule">
          <span>observe only</span>
          <strong>one file · one job · one visible result</strong>
        </div>
      </div>
    </header>
  );
}
