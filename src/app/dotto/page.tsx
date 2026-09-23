import type { Metadata } from "next";
import { DottoOverview } from "@/components/dotto/DottoOverview";
import { DottoShell } from "@/components/dotto/DottoShell";

export const metadata: Metadata = {
  title: "dotto — pixel design system",
  description: "Internal noindex gallery for the dotto design system: Astryx primitives wearing the theme.",
  robots: { index: false, follow: false },
};

export default function DottoPage() {
  return (
    <DottoShell current="home">
      <DottoOverview />
    </DottoShell>
  );
}
