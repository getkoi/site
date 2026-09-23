"use client";

import type { ComponentProps } from "react";
import { Kbd as AstryxKbd } from "@astryxdesign/core/Kbd";
import type { KbdProps as AstryxKbdProps } from "@astryxdesign/core/Kbd";

type NativeKbdProps = ComponentProps<"kbd"> & { keys?: never };

export function Kbd(props: NativeKbdProps | AstryxKbdProps) {
  if ("keys" in props && props.keys) {
    return <AstryxKbd {...props} />;
  }
  return <kbd data-slot="kbd" {...props} />;
}
