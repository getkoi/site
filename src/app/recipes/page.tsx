import type { Metadata } from "next";
import { RecipesPageEffects } from "@/components/shell/PageEffects";
import RecipesLanding from "@/components/recipes/RecipesLanding";
import "@/styles/recipes.css";

export const metadata: Metadata = {
  title: "recipes — project-home sensors and sandbox pairs",
  description:
    "Find, inspect, and copy atomic sensor scripts or configure a matched sandbox.yml and Dockerfile.sandbox pair for your koi project home.",
};

export default function RecipesPage() {
  return (
    <>
      <RecipesLanding />
      <RecipesPageEffects />
    </>
  );
}
