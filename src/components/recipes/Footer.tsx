import { AppLink } from "../AppLink";

export default function Footer() {
  return (
    <footer className="recipes-footer">
      <div className="recipes-footer__copy">
        <p className="recipes-eyebrow">field manuals</p>
        <h2>The source is here. The rules stay in the docs.</h2>
        <p>
          Recipes provide files you can inspect and own. The reading room explains how the
          verification bar and sandbox launcher behave.
        </p>
      </div>
      <nav className="recipes-footer__links" aria-label="Recipe documentation">
        <AppLink href="/docs/sensors">
          <span>01</span>
          <strong>Sensors and the gate</strong>
          <small>Atomic checks, filename order, and exit semantics.</small>
        </AppLink>
        <AppLink href="/docs/sensors/how-to/wire-your-bar">
          <span>02</span>
          <strong>Wire your verification bar</strong>
          <small>Survey, copy, tune, mirror, and smoke-run.</small>
        </AppLink>
        <AppLink href="/docs/sandbox/overview">
          <span>03</span>
          <strong>Sandbox boundaries</strong>
          <small>Repo-owned images, launchers, and what isolation does not promise.</small>
        </AppLink>
      </nav>
      <div className="recipes-footer__base">
        <AppLink href="/docs">← Reading room</AppLink>
        <span>The repository owns the files. The gate decides whether they pass.</span>
      </div>
    </footer>
  );
}
