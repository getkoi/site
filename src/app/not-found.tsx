import { AppLink } from "@/components/AppLink";

export default function NotFound() {
  return (
    <div className="wrap py-20">
      <p className="kicker">404</p>
      <h1 className="pixel mb-3 text-[clamp(1.85rem,4vw,2.6rem)] text-bone">Page not found</h1>
      <p className="mb-8 max-w-[50ch] text-fog">That path is not in this repository.</p>
      <p>
        <AppLink href="/">Home</AppLink>
        {" · "}
        <AppLink href="/docs">Docs</AppLink>
      </p>
    </div>
  );
}
