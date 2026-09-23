import type { Metadata } from "next";
import { JunjiPageEffects } from "@/components/shell/PageEffects";
import JunjiLanding from "@/components/junji/JunjiLanding";
import "@/styles/junji.css";

export const metadata: Metadata = {
  title: "junji | Keep long agent projects on disk",
  description:
    "Learn the junji method through an interactive project hand or a short technical lifecycle. Save the project position on disk and run one verified phase at a time.",
  openGraph: { images: ["/yoru-sentinel.png"] },
};

export default function JunjiPage() {
  return (
    <>
      <JunjiLanding />
      <JunjiPageEffects />
    </>
  );
}
