import type { Metadata } from "next";
import { KoiPageEffects } from "@/components/shell/PageEffects";
import KoiLanding from "@/components/koi/KoiLanding";
import "@/styles/koi.css";

export const metadata: Metadata = {
  title: "koi — your project should outlive the window",
  description:
    "koi keeps the plan, phase order, and proof inside your repository so fresh coding-agent sessions can continue the same long project.",
  openGraph: { images: ["/yoru-koi.png"] },
};

export default function HomePage() {
  return (
    <>
      <KoiLanding />
      <KoiPageEffects />
    </>
  );
}
