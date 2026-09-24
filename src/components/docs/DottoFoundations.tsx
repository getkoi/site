import type { ReactNode } from "react";
import {
  BoxIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  FoxIcon,
  GateIcon,
  HashIcon,
  LanternIcon,
  LeafIcon,
  MenuIcon,
  PagesIcon,
  RobotMark,
} from "../../icons/docs/pixels";
import "@/styles/dotto-foundations.css";

const surfaces = [
  ["void", "page"],
  ["obsidian", "panel"],
  ["charcoal", "raised"],
  ["steel", "hover lift"],
  ["ash", "never copy"],
  ["fog", "secondary text"],
  ["bone", "body"],
] as const;

const accents = [
  ["accent", "action"],
  ["accent-core", "bloom"],
  ["blood", "halt"],
  ["jade", "seal / ok"],
  ["amber", "build / warn"],
  ["blossom", "atmosphere"],
] as const;

const roles = [
  ["plan", "plan act"],
  ["tool", "tool call"],
  ["file", "file edit"],
  ["judge", "judge"],
] as const;

const typeFaces = [
  {
    name: "Geist Pixel Square",
    token: "--font-display",
    use: "Titles, kickers, wordmarks. Kanji falls back to DotGothic16.",
    sampleClass: "pixel text-[clamp(1.6rem,4vw,2.4rem)] leading-none text-bone",
    sample: "dotto",
  },
  {
    name: "Geist",
    token: "--font-sans",
    use: "Body. 17px / 1.7 / -0.01em. AA on bone or fog over void.",
    sampleClass: "text-[1.0625rem] leading-[1.7] tracking-[-0.01em] text-bone",
    sample: "The filesystem is durable memory. The window is a disposable cache.",
  },
  {
    name: "Geist Mono",
    token: "--font-mono",
    use: "Labels, code, kickers. 0.8125rem / 1.5 / 0.02em.",
    sampleClass: "font-mono text-[0.8125rem] leading-normal tracking-[0.02em] text-fog",
    sample: "yokai doctor --probe",
  },
];

const space = [4, 8, 12, 16, 24, 32, 48, 64];

function Found({ children }: { children: ReactNode }) {
  return <div className="found">{children}</div>;
}

export function HoursFoundation() {
  return (
    <Found>
      <p className="found__note">
        Rail control: moon for yoru, sun for hiru. The document element is the source of truth.
      </p>
    </Found>
  );
}

export function ColorFoundation() {
  return (
    <Found>
      <div className="found__grid">
        {surfaces.map(([token, role]) => (
          <div className="found__swatch" key={token}>
            <i style={{ background: `var(--${token})` }} />
            <code>--{token}</code>
            <span>{role}</span>
          </div>
        ))}
      </div>
      <div className="found__grid">
        {accents.map(([token, role]) => (
          <div className="found__swatch" key={token}>
            <i style={{ background: `var(--${token})` }} />
            <code>--{token}</code>
            <span>{role}</span>
          </div>
        ))}
      </div>
      <div className="found__grid">
        {roles.map(([token, role]) => (
          <div className="found__swatch" key={token}>
            <i style={{ background: `var(--${token})` }} />
            <code>--{token}</code>
            <span>{role}</span>
          </div>
        ))}
      </div>
    </Found>
  );
}

export function LayoutFoundation() {
  return (
    <Found>
      <p className="found__note">
        Scale {space.join(" / ")}. Inline pad is <code>--pad</code>.
      </p>
      <div className="found__space">
        {space.map((n) => (
          <div className="found__space-item" key={n}>
            <i style={{ width: n, height: n }} />
            <code>{n}</code>
          </div>
        ))}
      </div>
    </Found>
  );
}

export function TypographyFoundation() {
  return (
    <Found>
      <div className="found__type">
        {typeFaces.map((face) => (
          <figure key={face.token}>
            <p className={face.sampleClass}>{face.sample}</p>
            <figcaption>
              <code>{face.token}</code>
              <span>
                {face.name}. {face.use}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Found>
  );
}

export function ElevationFoundation() {
  return (
    <Found>
      <div className="found__elev">
        <div data-slot="panel" className="found__elev-card" style={{ background: "var(--void)" }}>
          void
        </div>
        <div data-slot="panel" className="found__elev-card" style={{ background: "var(--obsidian)" }}>
          obsidian
        </div>
        <div data-slot="panel" className="found__elev-card" style={{ background: "var(--charcoal)" }}>
          charcoal
        </div>
      </div>
    </Found>
  );
}

export function MotionFoundation() {
  return (
    <Found>
      <p className="found__note">
        Tokens: <code>--ease-out</code>, <code>--ease-out-quint</code>, <code>--ease-out-expo</code>.
      </p>
    </Found>
  );
}

export function IconographyFoundation() {
  return (
    <Found>
      <div className="found__icons">
        <figure>
          <RobotMark />
          <figcaption>robot</figcaption>
        </figure>
        <figure>
          <LanternIcon />
          <figcaption>lantern</figcaption>
        </figure>
        <figure>
          <PagesIcon />
          <figcaption>pages</figcaption>
        </figure>
        <figure>
          <FoxIcon />
          <figcaption>fox</figcaption>
        </figure>
        <figure>
          <GateIcon />
          <figcaption>gate</figcaption>
        </figure>
        <figure>
          <BoxIcon />
          <figcaption>box</figcaption>
        </figure>
        <figure>
          <HashIcon />
          <figcaption>hash</figcaption>
        </figure>
        <figure>
          <LeafIcon />
          <figcaption>leaf</figcaption>
        </figure>
        <figure>
          <MenuIcon />
          <figcaption>menu</figcaption>
        </figure>
        <figure>
          <ChevronLeftIcon />
          <figcaption>prev</figcaption>
        </figure>
        <figure>
          <ChevronRightIcon />
          <figcaption>next</figcaption>
        </figure>
        <figure>
          <CheckIcon />
          <figcaption>check</figcaption>
        </figure>
        <figure>
          <CloseIcon />
          <figcaption>close</figcaption>
        </figure>
      </div>
    </Found>
  );
}
