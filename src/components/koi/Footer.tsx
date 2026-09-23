import { AppLink } from "../AppLink";

export default function Footer() {
  return (
    <footer className="koi-footer">
      <AppLink className="koi-footer__mark" href="/" aria-label="koi home">
        <img src="/yoru-koi.svg" alt="" width="38" height="38" />
        <span>koi</span>
      </AppLink>
      <nav aria-label="Koi footer">
        <AppLink href="/junji">junji</AppLink>
        <AppLink href="/yokai">yokai</AppLink>
        <AppLink href="/docs/start-here">docs</AppLink>
        <AppLink href="/recipes">sensors</AppLink>
        <AppLink href="https://github.com/getkoi/koi">GitHub ↗</AppLink>
      </nav>
      <p>The filesystem keeps the position. The next window reads it.</p>
    </footer>
  );
}
