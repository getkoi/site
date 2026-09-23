"use client";

import { type ReactNode, useLayoutEffect, useState } from "react";
import { Theme } from "@astryxdesign/core/theme";
import { dottoTheme } from "./dotto";
import "@/styles/layers.css";
import "./dotto.css";
import { hourMode } from "./palette";
import { applyHour, readHour } from "./hour";
import type { Hour } from "./palette";

type Props = {
  children: ReactNode;
};

/** Match `layout.tsx` SSR defaults. Reading `document` here hydrates hiru against yoru HTML. */
const SSR_HOUR: Hour = "yoru";

export function DottoTheme({ children }: Props) {
  const [hour, setHour] = useState<Hour>(SSR_HOUR);

  useLayoutEffect(() => {
    const current = readHour();
    setHour(current);
    applyHour(current, false, false);
    function onChange() {
      setHour(readHour());
    }
    document.addEventListener("koi:theme-change", onChange);
    return () => document.removeEventListener("koi:theme-change", onChange);
  }, []);

  return (
    <Theme theme={dottoTheme} mode={hourMode(hour)}>
      {children}
    </Theme>
  );
}
