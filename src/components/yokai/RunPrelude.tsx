import { AppLink } from "../AppLink";

export default function RunPrelude() {
  return (
    <section className="run-prelude section-shell" aria-labelledby="run-prelude-title">
      <header className="section-heading reveal">
        <p className="eyebrow">before the fox moves</p>
        <h2 id="run-prelude-title">yokai starts from a prepared position.</h2>
        <p>
          It is not a ticket picker with opinions. The project already says what is
          next, how to work, and what counts as proof.
        </p>
      </header>

      <div className="run-prelude__table reveal">
        <article className="run-prelude__files">
          <div className="run-prelude__bar">
            <span>TEAM-INVITATIONS / .koi</span>
            <span>prepared</span>
          </div>
          <div className="run-prelude__file-tree" aria-label="Prepared project files">
            <div className="is-root">
              <span aria-hidden="true">◆</span>
              <b>.koi/</b>
            </div>
            <div>
              <span aria-hidden="true">├─</span>
              <b>run/BACKLOG.md</b>
              <small>ordered phases</small>
            </div>
            <div>
              <span aria-hidden="true">├─</span>
              <b>run/config.yml</b>
              <small>driver preferences</small>
            </div>
            <div>
              <span aria-hidden="true">├─</span>
              <b>sensors/10-format.sh</b>
              <small>fast proof</small>
            </div>
            <div>
              <span aria-hidden="true">└─</span>
              <b>sensors/30-test.sh</b>
              <small>behavior proof</small>
            </div>
          </div>
          <div className="run-prelude__backlog" aria-label="Example ordered backlog">
            <p>
              <span>[todo]</span> 01 · token and membership rules
            </p>
            <p>
              <span>[todo]</span> 02 · invite and accept flow
            </p>
            <p>
              <span>[todo]</span> 03 · revoke and resend
            </p>
          </div>
        </article>

        <aside className="run-prelude__brief">
          <p className="run-prelude__brief-label">default preparation</p>
          <h3>junji writes the campaign memory.</h3>
          <p>
            Its planning verbs turn an engineering goal into an ordered backlog and
            phase files. You can prepare the same folder by hand, but the contract
            stays the same.
          </p>
          <AppLink href="/junji">
            Learn the junji method <span aria-hidden="true">→</span>
          </AppLink>
          <div className="run-prelude__contrast">
            <div>
              <b>yokai skill</b>
              <span>Helps you wire sensors and sandbox files.</span>
            </div>
            <div>
              <b>yokai driver</b>
              <span>Runs the prepared phases through an agent.</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
