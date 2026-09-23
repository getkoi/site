import {
  YOKAI_MAP_EDGES,
  YOKAI_MAP_NODES,
  type YokaiMapNodeId,
} from "../../data/yokai-landing";

const positions: Record<YokaiMapNodeId, string> = {
  prepared: "prepared",
  supervisor: "supervisor",
  agent: "agent",
  acts: "acts",
  repository: "repository",
  verdict: "verdict",
};

export default function SystemMap() {
  return (
    <section className="system-map section-shell" id="system-map" aria-labelledby="system-map-title">
      <header className="section-heading reveal">
        <p className="eyebrow">the whole machine · one map</p>
        <h2 id="system-map-title">A small supervisor around a capable agent.</h2>
        <p>
          Pick a station to inspect its job. The solid route is the phase. The return
          route is measured evidence. The agent never grades its own work.
        </p>
      </header>

      <div className="system-map__frame reveal" data-yokai-map="">
        <div className="system-map__titlebar">
          <span>YOKAI CONTROL ROUTE</span>
          <span>
            <i></i> live model
          </span>
        </div>

        <div className="system-map__board">
          <svg
            className="system-map__routes"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="map-arrow"
                markerWidth="3"
                markerHeight="3"
                refX="2.5"
                refY="1.5"
                orient="auto"
              >
                <path d="M0,0 L3,1.5 L0,3 z"></path>
              </marker>
              <marker
                id="map-arrow-feedback"
                markerWidth="3"
                markerHeight="3"
                refX="2.5"
                refY="1.5"
                orient="auto"
              >
                <path d="M0,0 L3,1.5 L0,3 z"></path>
              </marker>
            </defs>
            <path data-map-edge="prepared supervisor" d="M27 24 H39"></path>
            <path data-map-edge="supervisor agent" d="M61 24 H73"></path>
            <path data-map-edge="agent acts" d="M84 37 V62"></path>
            <path data-map-edge="acts repository" d="M73 76 H61"></path>
            <path
              className="route-feedback"
              data-map-edge="repository supervisor"
              d="M50 63 V37"
            ></path>
            <path
              className="route-decision"
              data-map-edge="supervisor verdict"
              d="M40 35 L26 65"
            ></path>
            <path
              className="route-feedback route-loop"
              data-map-edge="verdict supervisor"
              d="M14 62 C5 42 19 7 43 14"
            ></path>
          </svg>

          {YOKAI_MAP_NODES.map((node, index) => (
            <button
              key={node.id}
              className={`system-map__node is-${positions[node.id]}`}
              type="button"
              data-map-node={node.id}
              data-active={String(index === 0)}
              aria-controls={`map-detail-${node.id}`}
              aria-pressed={index === 0}
            >
              <span className="system-map__node-index">{node.index}</span>
              <span className="system-map__node-label">{node.label}</span>
              <strong>{node.title}</strong>
            </button>
          ))}
        </div>

        <div className="system-map__details" aria-live="polite">
          {YOKAI_MAP_NODES.map((node, index) => (
            <article
              key={node.id}
              id={`map-detail-${node.id}`}
              data-map-detail={node.id}
              data-active={String(index === 0)}
              aria-hidden={index !== 0}
            >
              <div>
                <p className="system-map__detail-label">
                  station {node.index} · {node.label}
                </p>
                <h3>{node.title}</h3>
                <p>{node.body}</p>
              </div>
              <ul>
                {node.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="system-map__legend" aria-label="Map route legend">
          <span>
            <i className="is-forward"></i> run route
          </span>
          <span>
            <i className="is-feedback"></i> evidence / correction
          </span>
          <span>
            <i className="is-decision"></i> supervisor decision
          </span>
        </div>
      </div>

      <ul className="system-map__route-copy">
        {YOKAI_MAP_EDGES.map((edge) => (
          <li key={`${edge.from}-${edge.to}`}>
            <span>{edge.from}</span>
            <b aria-hidden="true">→</b>
            <span>{edge.to}</span>
            <small>{edge.label}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
