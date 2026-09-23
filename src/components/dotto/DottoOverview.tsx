import { AppLink } from "@/components/AppLink";
import { DottoHtmlKit } from "@/components/docs/DottoHtmlKit";
import { DOTTO_SECTIONS, dottoHref } from "@/dotto/nav";

export function DottoOverview() {
  return (
    <div className="relative max-w-[720px]">
      <p className="mb-2.5 font-mono text-[0.78rem] tracking-[0.06em] text-accent before:mr-1 before:text-steel before:content-['//_']">
        kit
      </p>
      <h1 className="pixel mb-3.5 font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.12] tracking-normal text-bone [font-smooth:never] [-webkit-font-smoothing:none]">
        Design system
      </h1>
      <p className="mb-10 max-w-[62ch] text-[1.05rem] text-fog">
        koi is the product. This tree is the kit: two hours, Astryx primitives wearing dotto,
        native document tags for MDX. Toggle yoru / hiru in the rail. Not linked from the product
        chrome.
      </p>

      {DOTTO_SECTIONS.map((section) => (
        <section key={section.id} className="mb-10">
          <h2 className="pixel mb-3 text-xl text-bone">{section.label}</h2>
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {section.entries.map((entry) => (
              <li key={entry.id}>
                <AppLink
                  className="grid grid-cols-[8.5rem_minmax(0,1fr)] items-baseline gap-x-4 border-b border-line py-2.5 no-underline hover:border-accent-line"
                  href={dottoHref(entry.id)}
                >
                  <strong className="font-mono text-[0.84rem] font-medium text-bone">
                    {entry.navLabel}
                  </strong>
                  <span className="text-[0.95rem] text-fog">{entry.lede}</span>
                </AppLink>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <DottoHtmlKit />
    </div>
  );
}
