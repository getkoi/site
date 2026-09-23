"use client";

import { useState, type ReactNode } from "react";
import { Banner } from "@astryxdesign/core/Banner";
import { BottomSheet } from "@astryxdesign/core/BottomSheet";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Layout, LayoutContent, LayoutFooter } from "@astryxdesign/core/Layout";
import { Tooltip } from "@astryxdesign/core/Tooltip";
import {
  Badge,
  Blockquote,
  Button,
  Card,
  Citation,
  ClickableCard,
  CodeBlock,
  Collapsible,
  Dialog,
  DialogHeader,
  Divider,
  Kbd,
  SelectableCard,
  TextArea,
  TextInput,
  Timestamp,
} from "@/dotto/components";
import { CloseIcon } from "@/icons/docs/pixels";

function Frame({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function ButtonDemo() {
  return (
    <Frame>
      <div className="flex flex-wrap items-center gap-3">
        <Button label="Secondary" variant="secondary" />
        <Button label="Primary" variant="primary" />
        <Button label="Ghost" variant="ghost" />
        <Button label="Outline" variant="outline" />
        <Button label="Destructive" variant="destructive" />
        <Button label="Disabled" variant="secondary" isDisabled />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button label="Notch" variant="notch" />
      </div>
    </Frame>
  );
}

export function IconButtonDemo() {
  return (
    <Frame>
      <IconButton label="Close" icon={<CloseIcon />} />
    </Frame>
  );
}

export function CardDemo() {
  return (
    <Frame>
      <Card padding={3} maxWidth={360}>
        Static card. Tokens remap with the hour.
      </Card>
    </Frame>
  );
}

export function ClickableCardDemo() {
  return (
    <Frame>
      <ClickableCard label="Open docs" href="/koi/docs" padding={3} maxWidth={360}>
        Clickable card. Goes to docs.
      </ClickableCard>
    </Frame>
  );
}

export function SelectableCardDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <Frame>
      <SelectableCard
        label="Select this card"
        isSelected={selected}
        onChange={setSelected}
        padding={3}
        maxWidth={360}
      >
        Selectable card. {selected ? "Selected." : "Click to select."}
      </SelectableCard>
    </Frame>
  );
}

export function CollapsibleDemo() {
  return (
    <Frame>
      <Collapsible trigger="Section" defaultIsOpen>
        <p className="px-2 py-2 text-fog">Panel body.</p>
      </Collapsible>
    </Frame>
  );
}

export function BlockquoteDemo() {
  return (
    <Frame>
      <Blockquote cite="junji">
        The filesystem is durable memory. The context window is a disposable cache.
      </Blockquote>
    </Frame>
  );
}

export function CitationDemo() {
  return (
    <p className="text-fog">
      Drive the phase list through yokai
      <Citation number={1} source={{ title: "yokai run", url: "/yokai/docs/run" }} /> and keep the
      contract on disk
      <Citation number={2} variant="number" source={{ title: "junji" }} />.
    </p>
  );
}

export function CodeBlockDemo() {
  return (
    <CodeBlock code={"koi doctor --probe"} language="bash" title="probe" width="100%" />
  );
}

export function KbdDemo() {
  return (
    <p className="text-fog">
      Native chord <Kbd>/</Kbd> and Astryx shortcuts <Kbd keys="mod+k" />{" "}
      <Kbd keys="shift+enter" />.
    </p>
  );
}

export function TimestampDemo() {
  return (
    <p className="text-fog">
      Sealed <Timestamp value="2026-09-14T17:00:00Z" format="relative" />.
    </p>
  );
}

export function TextInputDemo() {
  const [phase, setPhase] = useState("");
  return (
    <TextInput
      label="Name"
      description="Uses Astryx TextInput."
      placeholder="phase-12"
      value={phase}
      onChange={setPhase}
      width="100%"
    />
  );
}

export function TextAreaDemo() {
  const [notes, setNotes] = useState("");
  return (
    <TextArea
      label="Notes"
      placeholder="gate notes"
      value={notes}
      onChange={setNotes}
      width="100%"
    />
  );
}

export function CheckboxDemo() {
  const [chip, setChip] = useState(true);
  return (
    <CheckboxInput
      label="Enable gate"
      value={chip}
      onChange={(checked) => setChip(checked)}
    />
  );
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge label="neutral" />
      <Badge label="success" variant="success" />
      <Badge label="warning" variant="warning" />
      <Badge label="error" variant="error" />
      <Badge label="plan" variant="plan" />
      <Badge label="tool" variant="tool" />
      <Badge label="file" variant="file" />
      <Badge label="judge" variant="judge" />
    </div>
  );
}

export function BannerDemo() {
  return <Banner status="info" title="A callout uses Astryx Banner." collapsible={false} />;
}

export function DividerDemo() {
  return (
    <Frame>
      <p className="text-fog">Above.</p>
      <Divider />
      <p className="text-fog">Below.</p>
    </Frame>
  );
}

export function DialogDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Frame>
      <Button label="Open dialog" variant="secondary" onClick={() => setDialogOpen(true)} />
      <Dialog isOpen={dialogOpen} onOpenChange={setDialogOpen} width={420}>
        <Layout
          header={
            <DialogHeader title="Seal" subtitle="Confirm the gate." onOpenChange={setDialogOpen} />
          }
          content={<LayoutContent>Every sensor must exit 0.</LayoutContent>}
          footer={
            <LayoutFooter hasDivider>
              <Button label="Cancel" variant="ghost" onClick={() => setDialogOpen(false)} />
              <Button label="Seal" variant="primary" onClick={() => setDialogOpen(false)} />
            </LayoutFooter>
          }
        />
      </Dialog>
    </Frame>
  );
}

export function TooltipDemo() {
  return (
    <Tooltip content="Tooltip" placement="above">
      <Button label="Hover me" variant="secondary" />
    </Tooltip>
  );
}

export function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Frame>
      <Button label="Open sheet" variant="secondary" onClick={() => setOpen(true)} />
      <BottomSheet isOpen={open} onOpenChange={setOpen} label="Sheet" height="capped">
        <p className="px-4 pb-6 text-fog">Docs mobile nav uses this sheet.</p>
      </BottomSheet>
    </Frame>
  );
}

export function DottoInteractiveDemo({ id }: { id: string }) {
  switch (id) {
    case "button":
      return <ButtonDemo />;
    case "icon-button":
      return <IconButtonDemo />;
    case "card":
      return <CardDemo />;
    case "clickable-card":
      return <ClickableCardDemo />;
    case "selectable-card":
      return <SelectableCardDemo />;
    case "collapsible":
      return <CollapsibleDemo />;
    case "blockquote":
      return <BlockquoteDemo />;
    case "citation":
      return <CitationDemo />;
    case "code-block":
      return <CodeBlockDemo />;
    case "kbd":
      return <KbdDemo />;
    case "timestamp":
      return <TimestampDemo />;
    case "text-input":
      return <TextInputDemo />;
    case "text-area":
      return <TextAreaDemo />;
    case "checkbox":
      return <CheckboxDemo />;
    case "badge":
      return <BadgeDemo />;
    case "banner":
      return <BannerDemo />;
    case "divider":
      return <DividerDemo />;
    case "dialog":
      return <DialogDemo />;
    case "tooltip":
      return <TooltipDemo />;
    case "bottom-sheet":
      return <BottomSheetDemo />;
    default:
      return null;
  }
}
