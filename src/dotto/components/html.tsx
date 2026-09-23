import type { ComponentProps, ComponentPropsWithoutRef } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_TAGS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export type HeadingProps = ComponentProps<"h1"> & { level: HeadingLevel };

export function Heading({ level, ...props }: HeadingProps) {
  const Tag = HEADING_TAGS[level];
  return <Tag {...props} />;
}

export type TextProps = ComponentPropsWithoutRef<"p"> & {
  as?: "p" | "span" | "div";
};

export function Text({ as: Tag = "p", ...props }: TextProps) {
  return <Tag {...props} />;
}

export type ListProps = ComponentPropsWithoutRef<"ol"> & { as?: "ul" | "ol" };

export function List({ as: Tag = "ul", ...props }: ListProps) {
  return <Tag {...props} />;
}

export function ListItem(props: ComponentProps<"li">) {
  return <li {...props} />;
}

export function Code(props: ComponentProps<"code">) {
  return <code {...props} />;
}

export function Strong(props: ComponentProps<"strong">) {
  return <strong {...props} />;
}

export function Em(props: ComponentProps<"em">) {
  return <em {...props} />;
}

export function Small(props: ComponentProps<"small">) {
  return <small {...props} />;
}

export function Kbd(props: ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" {...props} />;
}

export function Table(props: ComponentProps<"table">) {
  return <table data-slot="table" {...props} />;
}

export function TableHeader(props: ComponentProps<"thead">) {
  return <thead {...props} />;
}

export function TableBody(props: ComponentProps<"tbody">) {
  return <tbody {...props} />;
}

export function TableRow(props: ComponentProps<"tr">) {
  return <tr {...props} />;
}

export function TableHeaderCell(props: ComponentProps<"th">) {
  return <th {...props} />;
}

export function TableCell(props: ComponentProps<"td">) {
  return <td {...props} />;
}

export function Figure(props: ComponentProps<"figure">) {
  return <figure {...props} />;
}

export function FigureCaption(props: ComponentProps<"figcaption">) {
  return <figcaption {...props} />;
}

export function Image(props: ComponentProps<"img">) {
  return <img {...props} />;
}

export function Header(props: ComponentProps<"header">) {
  return <header {...props} />;
}

export function Nav(props: ComponentProps<"nav">) {
  return <nav {...props} />;
}

export function Main(props: ComponentProps<"main">) {
  return <main {...props} />;
}

export function Footer(props: ComponentProps<"footer">) {
  return <footer {...props} />;
}

export function Article(props: ComponentProps<"article">) {
  return <article {...props} />;
}

export function Section(props: ComponentProps<"section">) {
  return <section {...props} />;
}

export function Aside(props: ComponentProps<"aside">) {
  return <aside {...props} />;
}

export function Details(props: ComponentProps<"details">) {
  return <details {...props} />;
}

export function Summary(props: ComponentProps<"summary">) {
  return <summary {...props} />;
}

export function Dl(props: ComponentProps<"dl">) {
  return <dl {...props} />;
}

export function Dt(props: ComponentProps<"dt">) {
  return <dt {...props} />;
}

export function Dd(props: ComponentProps<"dd">) {
  return <dd {...props} />;
}

export function Label(props: ComponentProps<"label">) {
  return <label {...props} />;
}
