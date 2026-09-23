import { docHref, type DocEntryLike } from "@/docs/registry";
import { AppLink } from "@/components/AppLink";

export function DocsPrevNext({
  previous,
  next,
}: {
  previous?: DocEntryLike;
  next?: DocEntryLike;
}) {
  if (!previous && !next) return null;

  return (
    <nav data-slot="prev-next" aria-label="Adjacent documentation">
      {previous ? (
        <AppLink data-slot="prev-next-link" href={docHref(previous.id)} rel="prev">
          <span data-slot="prev-next-kicker">Previous</span>
          <strong data-slot="prev-next-title">{previous.data.navLabel}</strong>
        </AppLink>
      ) : (
        <span />
      )}
      {next ? (
        <AppLink
          data-slot="prev-next-link"
          className="text-right max-narrow:text-left"
          href={docHref(next.id)}
          rel="next"
        >
          <span data-slot="prev-next-kicker">Next</span>
          <strong data-slot="prev-next-title">{next.data.navLabel}</strong>
        </AppLink>
      ) : null}
    </nav>
  );
}
