export default function HarvestCycle() {
  return (
    <section className="harvest-cycle" aria-labelledby="harvest-cycle-title">
      <header className="harvest-cycle__header">
        <div>
          <p>crop-cycle map</p>
          <h2 id="harvest-cycle-title">One crop, four measured parts</h2>
        </div>
        <p className="harvest-cycle__summary">
          Prepare the ground, move through the measured work, then use what you learned to improve
          the next crop.
        </p>
      </header>

      <div className="harvest-cycle__map">
        <div className="harvest-cycle__soil">
          <span className="harvest-cycle__glyph" aria-hidden="true">
            ▥
          </span>
          <div>
            <small>before measured work</small>
            <strong>Fertile soil</strong>
            <span>
              Write a short vision, set minimum requirements, and make the verification bar
              runnable.
            </span>
          </div>
        </div>

        <p className="harvest-cycle__connector">
          Measured crop cycle <span aria-hidden="true">↓</span>
        </p>

        <ol className="harvest-cycle__steps">
          <li data-stage="shape" data-weight="optional">
            <span className="harvest-cycle__number">0 to 1 unit</span>
            <div>
              <small>01 / shape</small>
              <strong>Walk the field</strong>
              <p>Clarify the outcome and investigate only what could change it.</p>
            </div>
          </li>
          <li data-stage="plant" data-weight="one">
            <span className="harvest-cycle__number">1 unit</span>
            <div>
              <small>02 / junji</small>
              <strong>Plant</strong>
              <p>Turn the idea into a plan and an ordered phase list.</p>
            </div>
          </li>
          <li data-stage="grow" data-weight="two">
            <span className="harvest-cycle__number">2 units</span>
            <div>
              <small>03 / yokai</small>
              <strong>Grow</strong>
              <p>Drive each phase through implementation, sensing, and sealing.</p>
            </div>
          </li>
          <li data-stage="harvest" data-weight="one">
            <span className="harvest-cycle__number">1 unit</span>
            <div>
              <small>04 / accept</small>
              <strong>Harvest</strong>
              <p>Validate the outcome, iterate on gaps, then consolidate.</p>
            </div>
          </li>
        </ol>

        <div className="harvest-cycle__care">
          <span className="harvest-cycle__return" aria-hidden="true">
            ↰
          </span>
          <div>
            <small>between crops, outside the ratio</small>
            <strong>Care for the field</strong>
            <span>
              Put each lesson into its durable home so the next crop starts on better ground.
            </span>
          </div>
        </div>
      </div>

      <p className="harvest-cycle__note">
        <strong>How to read the units:</strong> they compare capacity within one crop. They are not
        hours, days, or delivery estimates.
      </p>
    </section>
  );
}
