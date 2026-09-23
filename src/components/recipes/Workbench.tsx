import { RECIPES, RECIPE_STACKS } from "../../data/recipes";
import RecipeDetail from "./RecipeDetail";
import { AppLink } from "../AppLink";

const sensors = RECIPES.filter((recipe) => recipe.kind === "sensor");
const sandboxes = RECIPES.filter((recipe) => recipe.kind === "sandbox");
const sensorStacks = RECIPE_STACKS.filter((stack) =>
  sensors.some((recipe) => recipe.stack === stack),
);
const sandboxStacks = RECIPE_STACKS.filter((stack) =>
  sandboxes.some((recipe) => recipe.stack === stack),
);
const sandboxBackends = [
  ...new Set(sandboxes.flatMap((recipe) => (recipe.launcher ? [recipe.launcher] : []))),
];
const sandboxAgents = [
  ...new Set(sandboxes.flatMap((recipe) => (recipe.agent ? [recipe.agent] : []))),
];

export default function Workbench() {
  return (
    <section className="recipes-workbench" id="workbench" data-recipes-workbench="">
      <header className="recipes-workbench__heading">
        <p className="recipes-eyebrow">the provisioning bench</p>
        <h2>Choose one artifact. See every consequence.</h2>
        <p>
          Search the sensor shelf or configure a sandbox pair. Nothing is installed from this page:
          you inspect the source, copy it into project home, and run the proof command yourself.
        </p>
      </header>

      <nav className="recipes-mode-switch" aria-label="Recipe workbenches">
        <a
          href="#sensors"
          data-recipe-mode="sensor"
          data-active="true"
          aria-controls="sensors"
          aria-current="page"
        >
          <span>01</span>
          <strong>Sensors</strong>
          <small>{sensors.length} atomic scripts</small>
        </a>
        <a
          href="#sandboxes"
          data-recipe-mode="sandbox"
          data-active="false"
          aria-controls="sandboxes"
        >
          <span>02</span>
          <strong>Sandboxes</strong>
          <small>{sandboxes.length} matched pairs</small>
        </a>
      </nav>

      <div className="recipes-workbench__frame">
        <div className="recipes-console-bar">
          <span>RECIPE INDEX / SOURCE INSPECTION</span>
          <span>
            <i aria-hidden="true"></i> LOCAL COPY ONLY
          </span>
        </div>

        <section
          className="recipes-mode-panel"
          id="sensors"
          data-recipe-mode-panel="sensor"
          aria-labelledby="sensors-title"
        >
          <div className="recipes-bench">
            <aside className="recipes-index" aria-labelledby="sensors-title" data-recipes-index="">
              <div className="recipes-index__head">
                <p>verification bar</p>
                <h3 id="sensors-title">Find a sensor</h3>
                <span>One script. One concern. Exit 0 means pass.</span>
              </div>

              <label className="recipes-search">
                <span>Search recipes</span>
                <input
                  type="search"
                  name="recipe-search"
                  placeholder="fmt, coverage, Playwright…"
                  autoComplete="off"
                  data-recipe-search=""
                />
                <kbd aria-hidden="true">/</kbd>
              </label>

              <div className="recipes-stack-filter" aria-label="Filter sensors by stack">
                <p>Stack</p>
                <div role="group">
                  <button type="button" data-recipe-stack="all" aria-pressed="true">
                    all
                  </button>
                  {sensorStacks.map((stack) => (
                    <button
                      key={stack}
                      type="button"
                      data-recipe-stack={stack}
                      aria-pressed="false"
                    >
                      {stack}
                    </button>
                  ))}
                </div>
              </div>

              <p className="recipes-index__count" data-recipe-count="" aria-live="polite">
                {sensors.length} recipes
              </p>
              <ol className="recipes-index__list" data-recipe-list="">
                {sensors.map((recipe) => (
                  <li
                    key={recipe.id}
                    data-recipe-result={recipe.id}
                    data-recipe-stack-value={recipe.stack}
                  >
                    <a href={`#${recipe.id}`} data-recipe-choice={recipe.id}>
                      <span>{recipe.stack}</span>
                      <strong>{recipe.title}</strong>
                      <small>{recipe.target}</small>
                      <i aria-hidden="true">→</i>
                    </a>
                  </li>
                ))}
              </ol>
              <p className="recipes-index__empty" data-recipe-empty="" hidden>
                No sensor matches that stack and search. Try a broader term.
              </p>
            </aside>

            <div className="recipes-detail-well" data-recipes-detail-well="">
              <button type="button" className="recipes-mobile-back" data-recipes-back="">
                <span aria-hidden="true">←</span> Back to recipes
              </button>
              <div className="recipes-welcome" data-recipe-welcome="" hidden tabIndex={-1}>
                <div className="recipes-welcome__diagram" aria-hidden="true">
                  <span>1</span>
                  <i></i>
                  <span>2</span>
                  <i></i>
                  <span>3</span>
                </div>
                <p>work surface clear</p>
                <h3>Pick a sensor from the shelf.</h3>
                <ol>
                  <li>
                    <span>01</span> Choose a stack or search by job.
                  </li>
                  <li>
                    <span>02</span> Read what the script expects and proves.
                  </li>
                  <li>
                    <span>03</span> Copy it, then smoke-run it from the repository root.
                  </li>
                </ol>
              </div>

              <header className="recipes-static-head">
                <p className="recipes-eyebrow">sensor shelf</p>
                <h3>Atomic verification scripts</h3>
                <p>
                  Copy one concern at a time into <code>.koi/sensors/</code>.
                </p>
              </header>
              {sensors.map((recipe) => (
                <RecipeDetail key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="recipes-mode-panel"
          id="sandboxes"
          data-recipe-mode-panel="sandbox"
          aria-labelledby="sandboxes-title"
        >
          <div className="recipes-bench">
            <aside className="recipes-index recipes-configurator" aria-labelledby="sandboxes-title">
              <div className="recipes-index__head">
                <p>repo-owned Linux image</p>
                <h3 id="sandboxes-title">Configure a pair</h3>
                <span>
                  Sandboxing is optional. Start on the host unless you need a reproducible Linux
                  run.
                </span>
              </div>

              <div className="recipes-configurator__fields">
                <label>
                  <span>Stack</span>
                  <select data-sandbox-option="stack">
                    {sandboxStacks.map((stack) => (
                      <option key={stack} value={stack}>
                        {stack}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Sandbox backend</span>
                  <select data-sandbox-option="launcher">
                    {sandboxBackends.map((backend) => (
                      <option key={backend} value={backend}>
                        {backend}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Coding agent</span>
                  <select data-sandbox-option="agent">
                    {sandboxAgents.map((agent) => (
                      <option key={agent} value={agent}>
                        {agent}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="recipes-configurator__notice">
                <strong>No stock image catalog.</strong>
                <p>
                  Your repository owns the OCI image. Copy both files, inspect them, then build the
                  declared image locally.
                </p>
              </div>
              <AppLink className="recipes-configurator__docs" href="/yokai/docs/sandbox">
                Read sandbox boundaries <span aria-hidden="true">↗</span>
              </AppLink>
            </aside>

            <div className="recipes-detail-well" data-recipes-detail-well="">
              <button type="button" className="recipes-mobile-back" data-recipes-back="">
                <span aria-hidden="true">←</span> Back to configurator
              </button>
              <header className="recipes-static-head">
                <p className="recipes-eyebrow">sandbox shelf</p>
                <h3>Matched project-home pairs</h3>
                <p>
                  Choose one pair. The agent and every gate tool must be baked into its image.
                </p>
              </header>
              {sandboxes.map((recipe) => (
                <RecipeDetail key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <p className="recipes-workbench__status" data-recipe-status="" aria-live="polite"></p>
      <p className="recipes-workbench__copy-status" data-copy-status="" aria-live="polite"></p>
      <noscript>
        <p className="recipes-noscript">
          JavaScript is off. Every recipe is expanded below so you can still inspect and copy it.
        </p>
      </noscript>
    </section>
  );
}
