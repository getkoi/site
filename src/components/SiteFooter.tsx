import { AppLink } from "@/components/AppLink";

export default function SiteFooter() {
  return (
    <footer className="mt-5 border-t border-line pt-11 pb-[72px]">
      <div className="wrap">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-[18px]">
          <AppLink className="inline-flex items-baseline gap-2.5 no-underline" href="/">
            <span className="text-[1.1rem] font-bold tracking-[-0.03em] text-bone">koi</span>
          </AppLink>
          <nav className="flex flex-wrap gap-x-6 gap-y-3.5" aria-label="Footer">
            <AppLink
              className="font-mono text-[0.82rem] text-bone no-underline transition-colors duration-200 hover:text-accent"
              href="/docs/start-here/quickstart"
            >
              install
            </AppLink>
            <AppLink
              className="font-mono text-[0.82rem] text-bone no-underline transition-colors duration-200 hover:text-accent"
              href="/docs/junji/guide"
            >
              guide
            </AppLink>
            <AppLink
              className="font-mono text-[0.82rem] text-bone no-underline transition-colors duration-200 hover:text-accent"
              href="/docs/start-here"
            >
              start here
            </AppLink>
            <AppLink
              className="font-mono text-[0.82rem] text-bone no-underline transition-colors duration-200 hover:text-accent"
              href="/blog"
            >
              field notes
            </AppLink>
            <AppLink
              className="font-mono text-[0.82rem] text-bone no-underline transition-colors duration-200 hover:text-accent"
              href="https://github.com/getkoi/koi"
            >
              GitHub ↗
            </AppLink>
          </nav>
        </div>
        <p className="m-0 max-w-[60ch] text-[0.82rem] text-bone">
          <strong>koi</strong> ships a method and a driver: <strong>junji</strong> keeps the
          project contract on disk, <strong>yokai</strong> drives Plan → Build → Seal and verifies
          each phase. The separately exported yokai helper skill wires the{" "}
          <code className="text-bone">.koi/sensors/</code> verification bar.
        </p>
      </div>
    </footer>
  );
}
