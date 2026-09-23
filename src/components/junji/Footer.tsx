import { AppLink } from "../AppLink";

export default function Footer() {
  return (
    <footer className="junji-footer">
      <AppLink className="junji-footer__mark" href="/junji" aria-label="junji home">
        <img src="/yoru-sentinel.svg" alt="" width="42" height="42" />
        <span>junji</span>
      </AppLink>
      <nav aria-label="Junji footer">
        <AppLink href="/">koi</AppLink>
        <AppLink href="/yokai">yokai</AppLink>
        <AppLink href="/junji/docs/guide">guide</AppLink>
        <AppLink href="/yokai/docs/sensors">sensors</AppLink>
        <AppLink href="https://github.com/getkoi/koi">GitHub ↗</AppLink>
      </nav>
      <p>The chat may disappear. The next action stays in the repository.</p>
    </footer>
  );
}
