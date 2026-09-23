import Sakura from "../Sakura";
import FirstRun from "./FirstRun";
import GuidedRun from "./GuidedRun";
import Hero from "./Hero";
import RunPrelude from "./RunPrelude";
import SafetyBoard from "./SafetyBoard";
import SystemMap from "./SystemMap";
import { AppLink } from "../AppLink";

const GH = "https://github.com/getkoi/koi/blob/main";

export default function YokaiLanding() {
  return (
    <>
      <Sakura count={12} layer="back" />
      <div className="wrap">
        <Hero />
        <SystemMap />
        <RunPrelude />
        <GuidedRun />
        <SafetyBoard />
        <FirstRun />

        <footer className="yokai-foot">
          <div className="links">
            <a href={`${GH}/crates/yokai/CONTEXT.md`}>CONTEXT.md — the glossary</a>
            <AppLink href="/koi/docs/quickstart">Quickstart</AppLink>
            <AppLink href="/yokai/docs/run">Run reference</AppLink>
            <AppLink href="/yokai/docs/build">Plan → Build → Seal</AppLink>
            <AppLink href="/junji">← junji</AppLink>
          </div>
          <div>The Kitsune moves the run. The repository decides whether it worked.</div>
        </footer>
      </div>
    </>
  );
}
