import type { CSSProperties } from "react";
import "../styles/sakura.css";

type Props = {
  count?: number;
  layer?: "back" | "front";
};

export default function Sakura({ count = 18, layer = "back" }: Props) {
  const front = layer === "front";

  // A unique symbol id per layer so two instances never collide on the DOM id.
  const petalId = front ? "sakura-petal-front" : "sakura-petal-back";

  // Blossom tones from DESIGN.md — atmosphere only (not interactive accent).
  const TONES = front
    ? ["var(--blossom)", "var(--blossom-soft)", "#ffbbf5"]
    : ["var(--blossom-soft)", "var(--blossom)", "#ffd2f5", "#ffbbf5"];

  // Deterministic spread — scattered but stable across builds. The front layer
  // runs bigger, swings wider and falls a little faster (fewer of them), so it
  // reads as "closer".
  const petals = Array.from({ length: count }, (_, i) => {
    const left = (i * (front ? 41 : 53)) % 100;
    const size = front ? 10 + ((i * 5) % 8) : 6 + ((i * 7) % 6);
    // slow, unhurried descent — front is closer, so it drifts down a touch quicker
    const fall = front ? 10 + ((i * 4) % 7) : 15 + ((i * 5) % 10);
    const delay = -((i * 2.9) % fall).toFixed(2);
    // the pendulum: how far it swings sideways, and the half-period (right→left)
    const amp = (front ? 16 : 10) + (i % 4) * (front ? 8 : 5);
    const swayDur = (2.2 + (i % 6) * 0.4).toFixed(2);
    // rest roughly flat like a petal off a branch (alternating which way it points),
    // then rock gently around horizontal as it sways
    const base = i % 2 === 0 ? 90 : -90;
    const r0 = base - (14 + (i % 3) * 5);
    const r1 = base + (12 + (i % 4) * 5);
    // the swing is an arc, not a flat sweep: the petal lifts at each extreme and
    // dips through the centre, like a pendulum / a leaf carving a shallow circle
    const lift = Math.round(amp * 0.4);
    const op = front
      ? (0.48 + (i % 3) * 0.07).toFixed(2)
      : (0.68 + (i % 4) * 0.09).toFixed(2);
    const tone = TONES[i % TONES.length];
    return { left, size, fall, delay, amp, swayDur, r0, r1, lift, base, op, tone };
  });

  return (
    <div className={front ? "sakura front" : "sakura"} aria-hidden="true">
      <svg className="defs" width="0" height="0" aria-hidden="true">
        <symbol id={petalId} viewBox="0 0 8 13" shapeRendering="crispEdges">
          <g fill="currentColor">
            <rect x="2" y="0" width="1" height="1" />
            <rect x="5" y="0" width="1" height="1" />
            <rect x="2" y="1" width="4" height="1" />
            <rect x="1" y="2" width="6" height="1" />
            <rect x="0" y="3" width="8" height="3" />
            <rect x="1" y="6" width="6" height="3" />
            <rect x="2" y="9" width="4" height="2" />
            <rect x="3" y="11" width="2" height="2" />
          </g>
          <g fill="#ffffff" fillOpacity="0.4">
            <rect x="1" y="3" width="2" height="1" />
            <rect x="1" y="4" width="2" height="1" />
            <rect x="2" y="5" width="1" height="1" />
          </g>
        </symbol>
      </svg>

      {petals.map((p, i) => (
        <span
          key={`${petalId}-${i}`}
          className="petal"
          style={
            {
              "--left": `${p.left}%`,
              "--size": `${p.size}px`,
              "--fall": `${p.fall}s`,
              "--delay": `${p.delay}s`,
              "--amp": `${p.amp}px`,
              "--swayDur": `${p.swayDur}s`,
              "--r0": `${p.r0}deg`,
              "--r1": `${p.r1}deg`,
              "--base": `${p.base}deg`,
              "--lift": `${p.lift}px`,
              "--op": p.op,
              color: p.tone,
            } as CSSProperties
          }
        >
          <svg className="blossom" viewBox="0 0 8 13" aria-hidden="true">
            <use href={`#${petalId}`} />
          </svg>
        </span>
      ))}
    </div>
  );
}
