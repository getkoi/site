import type { Recipe } from "../../data/recipes";
import RecipeCode from "./RecipeCode";

type Props = {
  recipe: Recipe;
};

export default function RecipeDetail({ recipe }: Props) {
  const kindLabel = recipe.kind === "sensor" ? "sensor recipe" : "sandbox pair";
  const outcomeLabel = recipe.kind === "sensor" ? "exit 0 proves" : "this pair provides";

  return (
    <article
      className="recipe-detail"
      id={recipe.id}
      data-recipe-detail={recipe.id}
      data-recipe-kind={recipe.kind}
      data-recipe-stack={recipe.stack}
      data-recipe-launcher={recipe.launcher}
      data-recipe-agent={recipe.agent}
      tabIndex={-1}
      aria-labelledby={`${recipe.id}-title`}
    >
      <div className="recipes-console-bar">
        <span>
          {kindLabel} / {recipe.stack}
        </span>
        <span>
          <i aria-hidden="true"></i> SOURCE READY
        </span>
      </div>

      <header className="recipe-detail__head">
        <div className="recipe-detail__tags" aria-label="Recipe attributes">
          <span>{recipe.stack}</span>
          {recipe.launcher && <span>{recipe.launcher}</span>}
          {recipe.agent && <span>{recipe.agent}</span>}
        </div>
        <p className="recipe-detail__kind">{kindLabel}</p>
        <h3 id={`${recipe.id}-title`}>{recipe.title}</h3>
        <p>{recipe.summary}</p>
      </header>

      <div className="recipe-detail__contract">
        <div>
          <span>lands at</span>
          <code>{recipe.target}</code>
        </div>
        <div>
          <span>{outcomeLabel}</span>
          <p>{recipe.outcome}</p>
        </div>
      </div>

      <section className="recipe-detail__requirements" aria-labelledby={`${recipe.id}-requirements`}>
        <h4 id={`${recipe.id}-requirements`}>Before you copy</h4>
        <ul>
          {recipe.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </section>

      <section className="recipe-detail__files" aria-labelledby={`${recipe.id}-files`}>
        <div className="recipe-detail__section-head">
          <div>
            <p>ready files</p>
            <h4 id={`${recipe.id}-files`}>
              {recipe.files.length === 1 ? "Copy this file" : "Copy both files"}
            </h4>
          </div>
          <span>{recipe.files.length.toString().padStart(2, "0")} FILES</span>
        </div>
        {recipe.files.map((file) => {
          const targetPath = recipe.kind === "sensor" ? recipe.target : `.koi/${file.label}`;
          return (
            <div className="recipe-detail__file" key={file.path}>
              <div className="recipe-detail__file-label">
                <span>{file.label}</span>
                <code>{targetPath}</code>
              </div>
              <RecipeCode
                path={file.path}
                root={recipe.kind === "sandbox" ? "sandboxes" : "sensors"}
                lang={file.lang}
                targetPath={targetPath}
              />
            </div>
          );
        })}
      </section>

      <section className="recipe-detail__steps" aria-labelledby={`${recipe.id}-steps`}>
        <div className="recipe-detail__section-head">
          <div>
            <p>after the files land</p>
            <h4 id={`${recipe.id}-steps`}>Prove the setup</h4>
          </div>
        </div>
        <ol>
          {recipe.steps.map((step) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <div className="recipe-detail__command" data-slot="code-block">
                <code>{step.command}</code>
                <button
                  type="button"
                  className="copy"
                  data-slot="copy-button"
                  data-size="sm"
                  data-surface="frame"
                  data-copy={step.command}
                  aria-label={`Copy ${step.label} command`}
                >
                  copy
                </button>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
