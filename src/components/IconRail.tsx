"use client";

import { Tooltip } from "@astryxdesign/core/Tooltip";
import { Github } from "pixelarticons/react/Github.js";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../icons/docs/pixels";
import { surfaceFromPath, type Surface } from "../lib/surface";
import { applyHour, readHour, toggleHour } from "../dotto/hour";
import { isHour, type Hour } from "../dotto/palette";
import { AppLink } from "./AppLink";

const STORAGE_KEY = "koi-rail-collapsed";
const GH = "https://github.com/getkoi/koi";

function RailTip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip content={label} placement="end" delay={200}>
      {children}
    </Tooltip>
  );
}

type RailItem = {
  id: Surface;
  href: string;
  name: string;
  ariaLabel: string;
  kind: "img";
  src?: string;
};

const ITEMS: RailItem[] = [
  { id: "koi", href: "/", name: "koi", ariaLabel: "koi — home", kind: "img", src: "/yoru-koi.svg" },
  {
    id: "junji",
    href: "/junji",
    name: "junji",
    ariaLabel: "junji — the method",
    kind: "img",
    src: "/yoru-sentinel.svg",
  },
  { id: "yokai", href: "/yokai", name: "yokai", ariaLabel: "yokai", kind: "img", src: "/yoru-kitsune.svg" },
];

function itemCurrent(item: RailItem, surface: Surface, pathname: string) {
  return surface === item.id;
}

function RailIcon({ item }: { item: RailItem }) {
  return (
    <img
      className="icon-rail__img"
      src={item.src}
      alt=""
      width={28}
      height={28}
      decoding="async"
    />
  );
}

function ThemeToggle({ id, collapsed }: { id: string; collapsed: boolean }) {
  const [hour, setHour] = useState<Hour>("yoru");

  useEffect(() => {
    setHour(readHour());
    function onChange(event: Event) {
      const theme = (event as CustomEvent<{ theme?: string }>).detail?.theme;
      setHour(isHour(theme) ? theme : readHour());
    }
    document.addEventListener("koi:theme-change", onChange);
    return () => document.removeEventListener("koi:theme-change", onChange);
  }, []);

  function onToggle() {
    applyHour(toggleHour(readHour()), true);
  }

  const next = toggleHour(hour);
  const label = `Switch to ${next}`;

  const inner = (
    <>
      <span className="theme-toggle__glyph" aria-hidden="true">
        <span className="theme-toggle__dot" data-h="yoru" />
        <span className="theme-toggle__dot" data-h="hiru" />
      </span>
      {collapsed ? null : <span className="icon-rail__name">{hour}</span>}
    </>
  );

  const button = (
    <button
      type="button"
      className="theme-toggle"
      id={id}
      aria-label={label}
      title={`Theme: ${hour} — click for ${next}`}
      suppressHydrationWarning
      onClick={onToggle}
    >
      {inner}
    </button>
  );

  if (!collapsed) return button;
  return <RailTip label={hour}>{button}</RailTip>;
}

function GitHubLink({ collapsed }: { collapsed: boolean }) {
  const inner = (
    <>
      <Github
        width={24}
        height={24}
        fill="currentColor"
        aria-hidden="true"
        className="icon-rail__pixelicon"
        style={{ imageRendering: "pixelated" }}
      />
      {collapsed ? null : <span className="icon-rail__name">GitHub</span>}
    </>
  );

  const link = (
    <a className="icon-rail__gh" href={GH} target="_blank" rel="noopener" aria-label="koi on GitHub">
      {inner}
    </a>
  );

  if (!collapsed) return link;
  return <RailTip label="GitHub">{link}</RailTip>;
}

function RailLink({
  item,
  current,
  collapsed,
}: {
  item: RailItem;
  current: boolean;
  collapsed: boolean;
}) {
  const inner = (
    <>
      <RailIcon item={item} />
      {collapsed ? null : <span className="icon-rail__name">{item.name}</span>}
    </>
  );

  const link = (
    <AppLink
      className="icon-rail__link"
      href={item.href}
      aria-current={current ? "page" : undefined}
      data-surface={item.id}
      aria-label={collapsed ? item.ariaLabel : undefined}
    >
      {inner}
    </AppLink>
  );

  if (!collapsed) return link;
  return <RailTip label={item.name}>{link}</RailTip>;
}

function ExpandToggle({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const label = collapsed ? "Expand sidebar" : "Collapse sidebar";
  const button = (
    <button
      type="button"
      className="icon-rail__expand"
      aria-label={label}
      aria-expanded={!collapsed}
      onClick={onToggle}
    >
      {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      {collapsed ? null : <span className="icon-rail__name">Collapse</span>}
    </button>
  );
  if (!collapsed) return button;
  return <RailTip label={label}>{button}</RailTip>;
}

export default function IconRail() {
  const pathname = usePathname() ?? "/";
  const [collapsed, setCollapsed] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) !== "0");
    } catch {
      /* storage is optional */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const value = collapsed ? "true" : "false";
    document.documentElement.dataset.railCollapsed = value;
    const shell = document.querySelector<HTMLElement>(".site-shell");
    if (shell) shell.dataset.railCollapsed = value;
  }, [collapsed, ready]);

  useEffect(() => {
    document.dispatchEvent(new CustomEvent("koi:rail-ready"));
  }, [collapsed]);

  function toggle() {
    const shell = document.querySelector<HTMLElement>(".site-shell");
    const reduce = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = globalThis.matchMedia("(min-width: 961px)").matches;
    if (shell && !reduce && desktop) {
      shell.dataset.railMotion = "true";
      document.documentElement.dataset.railMotion = "true";
      globalThis.setTimeout(() => {
        delete shell.dataset.railMotion;
        delete document.documentElement.dataset.railMotion;
      }, 200);
    }
    setCollapsed((currentCollapsed) => {
      const next = !currentCollapsed;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* storage is optional */
      }
      return next;
    });
  }

  const links: ReactNode = ITEMS.map((item) => (
    <RailLink
      key={item.id}
      item={item}
      current={itemCurrent(item, surfaceFromPath(pathname), pathname)}
      collapsed={collapsed}
    />
  ));

  return (
    <aside className="icon-rail" id="icon-rail" data-expanded={collapsed ? "false" : "true"}>
      <div className="icon-rail__main">
        <ExpandToggle collapsed={collapsed} onToggle={toggle} />
        <nav className="icon-rail__nav" aria-label="Primary">
          {links}
        </nav>
      </div>
      <div className="icon-rail__tools">
        <details className="icon-rail__more">
          <summary className="icon-rail__more-btn" aria-label="Theme and GitHub">
            <span className="icon-rail__more-dots" aria-hidden="true" />
          </summary>
          <div className="icon-rail__more-panel">
            <ThemeToggle id="theme-toggle" collapsed />
            <GitHubLink collapsed />
          </div>
        </details>
        <div className="icon-rail__desktop-tools">
          <ThemeToggle id="theme-toggle-desktop" collapsed={collapsed} />
          <GitHubLink collapsed={collapsed} />
        </div>
      </div>
    </aside>
  );
}
