import type { SVGProps } from "react";

type Pixel = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  fill: string;
};

const ACCENT = "var(--accent)";
const CORE = "var(--accent-core)";
const BLOOD = "var(--blood)";
const BONE = "var(--bone)";
const FOG = "var(--fog)";
const OBSIDIAN = "var(--obsidian)";
const STEEL = "var(--steel)";
const JADE = "var(--jade)";
const CHARCOAL = "var(--charcoal)";

function PixelSvg({
  size,
  pixels,
  className,
  title,
  style,
  ...rest
}: {
  size: number;
  pixels: readonly Pixel[];
  title?: string;
} & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...rest}
      style={{ imageRendering: "pixelated", ...style }}
    >
      {title ? <title>{title}</title> : null}
      {pixels.map((pixel, index) => (
        <rect
          key={`${pixel.x}-${pixel.y}-${index}`}
          x={pixel.x}
          y={pixel.y}
          width={pixel.w ?? 1}
          height={pixel.h ?? 1}
          fill={pixel.fill}
        />
      ))}
    </svg>
  );
}

const BOOK_24: Pixel[] = [
  { x: 3, y: 4, w: 3, h: 16, fill: OBSIDIAN },
  { x: 5, y: 4, w: 1, h: 16, fill: STEEL },
  { x: 6, y: 4, w: 14, h: 1, fill: STEEL },
  { x: 19, y: 4, w: 1, h: 16, fill: STEEL },
  { x: 6, y: 19, w: 14, h: 1, fill: STEEL },
  { x: 6, y: 5, w: 1, h: 14, fill: STEEL },
  { x: 7, y: 5, w: 12, h: 14, fill: ACCENT },
  { x: 7, y: 5, w: 12, h: 2, fill: CORE },
  { x: 3, y: 4, w: 3, h: 1, fill: STEEL },
  { x: 3, y: 19, w: 3, h: 1, fill: STEEL },
  { x: 20, y: 5, w: 1, h: 14, fill: BONE },
  { x: 21, y: 6, w: 1, h: 12, fill: FOG },
  { x: 10, y: 4, w: 2, h: 1, fill: BLOOD },
  { x: 10, y: 5, w: 2, h: 5, fill: BLOOD },
  { x: 15, y: 13, w: 3, h: 3, fill: BLOOD },
  { x: 16, y: 14, w: 1, h: 1, fill: BONE },
];

const ROBOT_16: Pixel[] = [
  { x: 7, y: 0, w: 2, h: 2, fill: STEEL },
  { x: 8, y: 2, w: 1, h: 1, fill: STEEL },
  { x: 4, y: 3, w: 8, h: 6, fill: CHARCOAL },
  { x: 4, y: 3, w: 8, h: 1, fill: STEEL },
  { x: 4, y: 8, w: 8, h: 1, fill: STEEL },
  { x: 4, y: 3, w: 1, h: 6, fill: STEEL },
  { x: 11, y: 3, w: 1, h: 6, fill: STEEL },
  { x: 6, y: 5, w: 2, h: 2, fill: ACCENT },
  { x: 9, y: 5, w: 2, h: 2, fill: ACCENT },
  { x: 3, y: 9, w: 10, h: 6, fill: OBSIDIAN },
  { x: 3, y: 9, w: 10, h: 1, fill: STEEL },
  { x: 3, y: 14, w: 10, h: 1, fill: STEEL },
  { x: 3, y: 9, w: 1, h: 6, fill: STEEL },
  { x: 12, y: 9, w: 1, h: 6, fill: STEEL },
  { x: 5, y: 11, w: 6, h: 1, fill: CORE },
  { x: 2, y: 11, w: 1, h: 3, fill: STEEL },
  { x: 13, y: 11, w: 1, h: 3, fill: STEEL },
];

const LANTERN_16: Pixel[] = [
  { x: 6, y: 1, w: 4, h: 1, fill: STEEL },
  { x: 5, y: 2, w: 6, h: 1, fill: STEEL },
  { x: 4, y: 3, w: 8, h: 1, fill: CHARCOAL },
  { x: 4, y: 4, w: 1, h: 7, fill: STEEL },
  { x: 11, y: 4, w: 1, h: 7, fill: STEEL },
  { x: 5, y: 4, w: 6, h: 7, fill: OBSIDIAN },
  { x: 7, y: 6, w: 2, h: 3, fill: ACCENT },
  { x: 7, y: 5, w: 2, h: 1, fill: CORE },
  { x: 4, y: 11, w: 8, h: 1, fill: STEEL },
  { x: 6, y: 12, w: 4, h: 2, fill: CHARCOAL },
  { x: 7, y: 14, w: 2, h: 1, fill: STEEL },
];

const PAGES_16: Pixel[] = [
  { x: 5, y: 2, w: 9, h: 4, fill: CHARCOAL },
  { x: 5, y: 2, w: 9, h: 1, fill: STEEL },
  { x: 13, y: 2, w: 1, h: 4, fill: STEEL },
  { x: 4, y: 6, w: 9, h: 4, fill: OBSIDIAN },
  { x: 4, y: 6, w: 9, h: 1, fill: STEEL },
  { x: 12, y: 6, w: 1, h: 4, fill: STEEL },
  { x: 3, y: 10, w: 9, h: 4, fill: CHARCOAL },
  { x: 3, y: 10, w: 9, h: 1, fill: ACCENT },
  { x: 3, y: 13, w: 9, h: 1, fill: STEEL },
  { x: 11, y: 10, w: 1, h: 4, fill: STEEL },
];

const FOX_16: Pixel[] = [
  { x: 3, y: 2, w: 3, h: 3, fill: STEEL },
  { x: 10, y: 2, w: 3, h: 3, fill: STEEL },
  { x: 4, y: 3, w: 1, h: 1, fill: BLOOD },
  { x: 11, y: 3, w: 1, h: 1, fill: BLOOD },
  { x: 4, y: 5, w: 8, h: 7, fill: CHARCOAL },
  { x: 4, y: 5, w: 8, h: 1, fill: STEEL },
  { x: 4, y: 11, w: 8, h: 1, fill: STEEL },
  { x: 5, y: 7, w: 2, h: 2, fill: ACCENT },
  { x: 9, y: 7, w: 2, h: 2, fill: ACCENT },
  { x: 7, y: 10, w: 2, h: 1, fill: BLOOD },
  { x: 6, y: 12, w: 4, h: 2, fill: OBSIDIAN },
  { x: 7, y: 14, w: 2, h: 1, fill: STEEL },
];

const GATE_16: Pixel[] = [
  { x: 2, y: 2, w: 2, h: 12, fill: STEEL },
  { x: 12, y: 2, w: 2, h: 12, fill: STEEL },
  { x: 2, y: 3, w: 12, h: 2, fill: CHARCOAL },
  { x: 2, y: 3, w: 12, h: 1, fill: STEEL },
  { x: 5, y: 6, w: 6, h: 2, fill: JADE },
  { x: 3, y: 13, w: 10, h: 1, fill: STEEL },
  { x: 2, y: 14, w: 3, h: 1, fill: OBSIDIAN },
  { x: 11, y: 14, w: 3, h: 1, fill: OBSIDIAN },
];

const BOX_16: Pixel[] = [
  { x: 4, y: 3, w: 8, h: 1, fill: STEEL },
  { x: 3, y: 4, w: 10, h: 1, fill: CHARCOAL },
  { x: 2, y: 5, w: 12, h: 9, fill: OBSIDIAN },
  { x: 2, y: 5, w: 12, h: 1, fill: STEEL },
  { x: 2, y: 13, w: 12, h: 1, fill: STEEL },
  { x: 2, y: 5, w: 1, h: 9, fill: STEEL },
  { x: 13, y: 5, w: 1, h: 9, fill: STEEL },
  { x: 4, y: 8, w: 8, h: 1, fill: ACCENT },
];

const HASH_16: Pixel[] = [
  { x: 5, y: 3, w: 2, h: 10, fill: STEEL },
  { x: 9, y: 3, w: 2, h: 10, fill: STEEL },
  { x: 3, y: 6, w: 10, h: 2, fill: FOG },
  { x: 3, y: 10, w: 10, h: 2, fill: FOG },
  { x: 5, y: 6, w: 2, h: 2, fill: ACCENT },
  { x: 9, y: 10, w: 2, h: 2, fill: ACCENT },
];

const LEAF_16: Pixel[] = [
  { x: 7, y: 2, w: 2, h: 1, fill: STEEL },
  { x: 6, y: 3, w: 4, h: 2, fill: CHARCOAL },
  { x: 5, y: 5, w: 6, h: 4, fill: CHARCOAL },
  { x: 6, y: 9, w: 4, h: 2, fill: OBSIDIAN },
  { x: 7, y: 11, w: 2, h: 2, fill: STEEL },
  { x: 7, y: 5, w: 2, h: 4, fill: ACCENT },
  { x: 8, y: 13, w: 1, h: 1, fill: STEEL },
];

const CHEVRON_LEFT: Pixel[] = [
  { x: 9, y: 2, w: 2, h: 2, fill: FOG },
  { x: 7, y: 4, w: 2, h: 2, fill: FOG },
  { x: 5, y: 6, w: 2, h: 4, fill: BONE },
  { x: 7, y: 10, w: 2, h: 2, fill: FOG },
  { x: 9, y: 12, w: 2, h: 2, fill: FOG },
];

const CHEVRON_RIGHT: Pixel[] = [
  { x: 5, y: 2, w: 2, h: 2, fill: FOG },
  { x: 7, y: 4, w: 2, h: 2, fill: FOG },
  { x: 9, y: 6, w: 2, h: 4, fill: BONE },
  { x: 7, y: 10, w: 2, h: 2, fill: FOG },
  { x: 5, y: 12, w: 2, h: 2, fill: FOG },
];

const MENU_16: Pixel[] = [
  { x: 3, y: 4, w: 10, h: 2, fill: FOG },
  { x: 3, y: 7, w: 10, h: 2, fill: BONE },
  { x: 3, y: 10, w: 10, h: 2, fill: FOG },
];

const CHECK_12: Pixel[] = [
  { x: 1, y: 6, w: 2, h: 2, fill: "currentColor" },
  { x: 3, y: 8, w: 2, h: 2, fill: "currentColor" },
  { x: 5, y: 6, w: 2, h: 2, fill: "currentColor" },
  { x: 7, y: 4, w: 2, h: 2, fill: "currentColor" },
  { x: 9, y: 2, w: 2, h: 2, fill: "currentColor" },
];

const CLOSE_12: Pixel[] = [
  { x: 2, y: 2, w: 2, h: 2, fill: "currentColor" },
  { x: 4, y: 4, w: 2, h: 2, fill: "currentColor" },
  { x: 6, y: 6, w: 2, h: 2, fill: "currentColor" },
  { x: 8, y: 8, w: 2, h: 2, fill: "currentColor" },
  { x: 10, y: 10, w: 2, h: 2, fill: "currentColor" },
  { x: 10, y: 2, w: 2, h: 2, fill: "currentColor" },
  { x: 8, y: 4, w: 2, h: 2, fill: "currentColor" },
  { x: 4, y: 8, w: 2, h: 2, fill: "currentColor" },
  { x: 2, y: 10, w: 2, h: 2, fill: "currentColor" },
];

type IconProps = { className?: string; title?: string };

export function BookMark({ className, title }: IconProps & { size?: number }) {
  return <PixelSvg size={24} pixels={BOOK_24} className={className} title={title} />;
}

export function RobotMark({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={ROBOT_16} className={className} title={title} />;
}

export function LanternIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={LANTERN_16} className={className} title={title} />;
}

export function PagesIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={PAGES_16} className={className} title={title} />;
}

export function FoxIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={FOX_16} className={className} title={title} />;
}

export function GateIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={GATE_16} className={className} title={title} />;
}

export function BoxIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={BOX_16} className={className} title={title} />;
}

export function HashIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={HASH_16} className={className} title={title} />;
}

export function LeafIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={LEAF_16} className={className} title={title} />;
}

export function ChevronLeftIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={CHEVRON_LEFT} className={className} title={title} />;
}

export function ChevronRightIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={CHEVRON_RIGHT} className={className} title={title} />;
}

export function MenuIcon({ className, title }: IconProps) {
  return <PixelSvg size={16} pixels={MENU_16} className={className} title={title} />;
}

export function CheckIcon({ className, title }: IconProps) {
  return <PixelSvg size={12} pixels={CHECK_12} className={className} title={title} />;
}

export function CloseIcon({ className, title }: IconProps) {
  return <PixelSvg size={12} pixels={CLOSE_12} className={className} title={title} />;
}

export const BOOK_SVG_INNER = BOOK_24.map(
  (pixel) =>
    `<rect x="${pixel.x}" y="${pixel.y}" width="${pixel.w ?? 1}" height="${pixel.h ?? 1}" fill="${pixel.fill}"/>`,
).join("");
