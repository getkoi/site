import type { Metadata } from "next";
import { YokaiPageEffects } from "@/components/shell/PageEffects";
import YokaiLanding from "@/components/yokai/YokaiLanding";
import "@/styles/yokai.css";

export const metadata: Metadata = {
  title: "yokai — drive prepared phases through your coding agent",
  description:
    "yokai is a deterministic supervisor for long engineering runs. It starts fresh agent turns, verifies each phase on disk, and continues until the contract fails or a human is needed.",
  openGraph: { images: ["/yoru-kitsune.png"] },
};

export default function YokaiPage() {
  return (
    <>
      <YokaiLanding />
      <YokaiPageEffects />
    </>
  );
}
