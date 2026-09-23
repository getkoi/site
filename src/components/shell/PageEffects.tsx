"use client";

import { useEffect } from "react";
import { afterPaint } from "@/scripts/after-paint";
import { initKoiStory } from "@/scripts/koi-story";
import { initJunjiTutorial } from "@/scripts/junji-tutorial";
import { initVerbDeck } from "@/scripts/verb-deck";
import { initYokaiMapLifecycle } from "@/scripts/yokai-map";
import { initRecipesWorkbenchLifecycle } from "@/scripts/recipes-workbench";
import { initDocsLifecycle } from "@/scripts/docs-lifecycle";
import { initMermaidLifecycle } from "@/scripts/mermaid-render";

const LEGACY_JUNJI_HASHES = new Set([
  "top",
  "install",
  "idea",
  "verbs",
  "sensors",
  "model",
  "next",
  "autopilot",
]);

export function KoiPageEffects() {
  useEffect(() => {
    function forwardLegacyJunjiHash() {
      if (location.pathname !== "/") return;
      const hash = location.hash.slice(1);
      if (LEGACY_JUNJI_HASHES.has(hash)) location.replace(`/junji#${hash}`);
    }
    forwardLegacyJunjiHash();
    const stop = initKoiStory();
    return () => {
      stop?.();
    };
  }, []);
  return null;
}

export function JunjiPageEffects() {
  useEffect(() => {
    const stopTutorial = initJunjiTutorial();
    const stopDeck = initVerbDeck();
    return () => {
      stopTutorial?.();
      stopDeck?.();
    };
  }, []);
  return null;
}

export function YokaiPageEffects() {
  useEffect(() => {
    initYokaiMapLifecycle();
  }, []);
  return null;
}

export function RecipesPageEffects() {
  useEffect(() => {
    initRecipesWorkbenchLifecycle();
  }, []);
  return null;
}

export function DocsPageEffects() {
  useEffect(() => {
    initDocsLifecycle();
    initMermaidLifecycle();
  }, []);
  return null;
}

export function MermaidPageEffects() {
  useEffect(() => {
    afterPaint(() => initMermaidLifecycle());
  }, []);
  return null;
}
