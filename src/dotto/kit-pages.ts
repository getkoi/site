/** Per-entry kit docs copy. Sidebar ledes stay in nav.ts. */

export type DottoKitPageCopy = {
  description: string;
  usage: string;
  language?: string;
};

export const DOTTO_KIT_PAGES: Record<string, DottoKitPageCopy> = {
  hours: {
    language: "tsx",
    description: `Hours are yoru and hiru. They remap the same token names on html[data-hour]. Astryx mode is dark on yoru and light on hiru; that attribute is an implementation detail, not a third hour.

Toggle the pair in the icon rail. Do not invent extra hours or name this "dark mode."`,
    usage: `import { applyHour } from "@/dotto/hour";

applyHour("hiru", true);
// html[data-hour="hiru"] data-theme="light"`,
  },
  color: {
    language: "css",
    description: `Body copy is bone or fog on void. Ash is a border/hover token, never text. Jade and amber are status; blood is halt; accent is action.

Do not put jade or amber on a button. Pairings live in palette.ts and tokens.json.`,
    usage: `color: var(--bone);
background: var(--void);
/* status only */
color: var(--jade);`,
  },
  layout: {
    language: "css",
    description: `Spacing is a 4px base: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. The stage is one centered column (--maxw: 1120px) with --pad and the icon rail on the left.

Breakpoints are 560px (narrow prev/next) and 960px (docs sidebar). This is not a 12-column board.`,
    usage: `.stage {
  max-width: var(--maxw);
  padding-inline: var(--pad);
  gap: 16px;
}`,
  },
  typography: {
    language: "css",
    description: `Geist Pixel Square is display (titles, kickers, wordmarks; DotGothic16 for kanji). Geist is body at 17px / 1.7. Geist Mono is labels, code, and kickers.

Ledes wrap around 56–62ch. Do not size body with the display clamp.`,
    usage: `h1 {
  font-family: var(--font-display);
}
p {
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  line-height: 1.7;
}`,
  },
  elevation: {
    language: "css",
    description: `Stack by tone: void, then obsidian, then charcoal, then steel. Chrome is the 2px --btn-line border, not a gray drop-shadow.

Do not filter: drop-shadow text-bearing chrome. That reprints every glyph. Glow is --glow-accent, not shade.`,
    usage: `.panel {
  background: var(--obsidian);
  border: 2px solid var(--btn-line);
}
/* z: header 50, rail 60, drawer 70, tooltip 80 */`,
  },
  motion: {
    language: "css",
    description: `Short feedback, longer scenes. Instant 120ms, feedback 160ms, hour toggle ≤180ms, state 240ms, scene 520ms. Ambient loops 6–12s.

prefers-reduced-motion: reduce kills ambient motion, notch dither, and drawer height transitions.`,
    usage: `.chip {
  transition: background 160ms var(--ease-out);
}
@media (prefers-reduced-motion: reduce) {
  .chip { transition: none; }
}`,
  },
  iconography: {
    description: `Filled pixel rects on a 16px box (12px for check and close), crispEdges. Name the file by job (play, not triangle). Pair with Geist Mono labels.

Reserved marks: circling koi (product), The Sentinel (junji), The Kitsune (yokai), closed book (docs).`,
    usage: `import { GateIcon } from "@/icons/docs/pixels";

<GateIcon className="size-4" />`,
  },
  button: {
    description: `Astryx Button in the dotto theme. Variants: secondary, primary, ghost, outline, destructive, notch. Notch is the marketing CTA: pixel corner plus dither.

Disabled is isDisabled, not a variant. Jade and amber stay off buttons; those tokens are status.`,
    usage: `import { Button } from "@/dotto/components";

<Button label="Primary" variant="primary" />
<Button label="Notch" variant="notch" />`,
  },
  "icon-button": {
    description: `Astryx IconButton for icon-only chrome (close, prev, next). It is not in the kit barrel yet; import it from Astryx until it is.

If the action has words, use Button.`,
    usage: `import { IconButton } from "@astryxdesign/core/IconButton";
import { CloseIcon } from "@/icons/docs/pixels";

<IconButton label="Close" icon={<CloseIcon />} />`,
  },
  link: {
    description: `Kit Link is AppLink. In-app routes client-navigate; hash, mailto, http, and /llms.txt stay a native <a>. Astryx Link remains on chrome that goes through LinkProvider.

MDX anchors use this export so prose does not hydrate StyleX onto every link.`,
    usage: `import { Link } from "@/dotto/components";

<Link href="/koi/docs">guide</Link>
<Link href="https://github.com/getkoi/koi">GitHub</Link>`,
  },
  card: {
    description: `Static Astryx Card. Tokens remap with the hour. Use it when the surface does not navigate or toggle.

If the whole card is a target, use ClickableCard or SelectableCard.`,
    usage: `import { Card } from "@/dotto/components";

<Card padding={3} maxWidth={360}>
  Static card. Tokens remap with the hour.
</Card>`,
  },
  "clickable-card": {
    description: `Whole-card navigation or action. The label is the accessible name.

Do not nest another button or link inside it.`,
    usage: `import { ClickableCard } from "@/dotto/components";

<ClickableCard label="Open docs" href="/koi/docs" padding={3} maxWidth={360}>
  Clickable card. Goes to docs.
</ClickableCard>`,
  },
  "selectable-card": {
    description: `Toggle selection with an inset ring. Controlled: isSelected plus onChange.

This is not a radio group. Several cards may be selected unless you wire exclusive state yourself.`,
    usage: `import { useState } from "react";
import { SelectableCard } from "@/dotto/components";

function Example() {
  const [selected, setSelected] = useState(false);
  return (
    <SelectableCard
      label="Select this card"
      isSelected={selected}
      onChange={setSelected}
      padding={3}
      maxWidth={360}
    >
      Click to select.
    </SelectableCard>
  );
}`,
  },
  collapsible: {
    description: `Astryx disclosure for nav and UI chrome. The kit sidebar uses it for catalog groups.

MDX optional detail stays native <details> (ADR-0002). Do not swap those.`,
    usage: `import { Collapsible } from "@/dotto/components";

<Collapsible trigger="Section" defaultIsOpen>
  <p>Panel body.</p>
</Collapsible>`,
  },
  heading: {
    description: `Native h1–h6 via level. Server component, so MDX headings can use it without hydrating the reading room.

Pass the HTML heading props through. Do not use Astryx display styles as a substitute for rank.`,
    usage: `import { Heading } from "@/dotto/components";

<Heading level={2}>Heading level 2</Heading>
<Heading level={3}>Heading level 3</Heading>`,
  },
  text: {
    description: `Native p (or span/div via as). Strong, Em, and Small are the matching tags.

This is body copy in the kit, not an Astryx Text primitive.`,
    usage: `import { Em, Small, Strong, Text } from "@/dotto/components";

<Text>
  Body <Strong>strong</Strong>, <Em>emphasis</Em>, and <Small>small</Small>.
</Text>`,
  },
  blockquote: {
    description: `Astryx Blockquote for UI quotes. cite is a visible source line.

MDX blockquotes stay MdxBlockquote. Do not route prose through this export.`,
    usage: `import { Blockquote } from "@/dotto/components";

<Blockquote cite="junji">
  The filesystem is durable memory. The context window is a disposable cache.
</Blockquote>`,
  },
  citation: {
    description: `Inline source chip or number. Pair it with running text, not as a standalone badge.

Badge is status. Citation is a pointer.`,
    usage: `import { Citation } from "@/dotto/components";

Drive the phase list through yokai
<Citation number={1} source={{ title: "yokai run", url: "/yokai/docs/run" }} />.
<Citation number={2} variant="number" source={{ title: "junji" }} />`,
  },
  code: {
    description: `Native inline <code>. Fenced blocks in MDX stay MdxPre. Longer listings in UI use CodeBlock.

Do not put multi-line samples in Code.`,
    usage: `import { Code, Text } from "@/dotto/components";

<Text>
  Inline <Code>koi doctor --probe</Code>.
</Text>`,
  },
  "code-block": {
    description: `Astryx CodeBlock: titled listing, optional copy, optional wrap. This kit page uses it for usage snippets.

Fenced MDX \`\`\` stays MdxPre so Shiki style strings do not hydrate through a client tree.`,
    usage: `import { CodeBlock } from "@/dotto/components";

<CodeBlock
  code="koi doctor --probe"
  language="bash"
  title="probe"
  width="100%"
/>`,
  },
  kbd: {
    description: `Dual API. Children render a native <kbd> (chords in prose). keys= renders Astryx shortcut glyphs.

MDX kbd stays the native server tag. Do not pass keys into MDX.`,
    usage: `import { Kbd } from "@/dotto/components";

<Kbd>/</Kbd>
<Kbd keys="mod+k" />
<Kbd keys="shift+enter" />`,
  },
  timestamp: {
    description: `Astryx Timestamp. Pass an ISO value; it does not read children as a time.

format="relative" is the common UI. Do not put raw Date.now() in SSR without a fixed value.`,
    usage: `import { Timestamp } from "@/dotto/components";

Sealed <Timestamp value="2026-09-14T17:00:00Z" format="relative" />.`,
  },
  figure: {
    description: `Native figure, img, and figcaption. Kit Image is a plain <img>.

Astryx Thumbnail is a different control. Do not use it for these names.`,
    usage: `import { Figure, FigureCaption, Image } from "@/dotto/components";

<Figure>
  <Image src="/yoru-koi.png" alt="Circling koi mark" width={160} height={160} />
  <FigureCaption>Product mark on the void.</FigureCaption>
</Figure>`,
  },
  "text-input": {
    description: `Astryx TextInput. Label and description are part of the control.

This is not a native <input> unstyled. Pair with Label only when you need a separate native <label> around non-Astryx fields.`,
    usage: `import { useState } from "react";
import { TextInput } from "@/dotto/components";

function Example() {
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
}`,
  },
  "text-area": {
    description: `Astryx TextArea for multi-line fields. Same labeling rules as TextInput.

Do not use it for code. CodeBlock is read-only; a real editor is out of kit.`,
    usage: `import { useState } from "react";
import { TextArea } from "@/dotto/components";

function Example() {
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
}`,
  },
  checkbox: {
    description: `Astryx CheckboxInput. Used in chrome; not in the kit barrel yet.

value/onChange are booleans. Native <input type="checkbox"> stays for leftover chip slots.`,
    usage: `import { useState } from "react";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";

function Example() {
  const [enabled, setEnabled] = useState(true);
  return (
    <CheckboxInput
      label="Enable gate"
      value={enabled}
      onChange={setEnabled}
    />
  );
}`,
  },
  label: {
    description: `Native <label>. Astryx FieldLabel is a different API and is not this export.

Use htmlFor with a sibling control, or wrap the control.`,
    usage: `import { Label } from "@/dotto/components";

<Label htmlFor="dotto-label-demo">
  Phase
  <input id="dotto-label-demo" defaultValue="12" />
</Label>`,
  },
  badge: {
    description: `Status plus harness roles: plan, tool, file, judge. Neutral, success, warning, error ride the same component.

Jade/amber/blood belong here (and on Banner), not on Button.`,
    usage: `import { Badge } from "@/dotto/components";

<Badge label="neutral" />
<Badge label="success" variant="success" />
<Badge label="plan" variant="plan" />`,
  },
  banner: {
    description: `Astryx Banner for page-level callouts. Used in the gallery; not in the kit barrel yet.

Prefer this over the leftover data-slot="alert" for new UI.`,
    usage: `import { Banner } from "@astryxdesign/core/Banner";

<Banner status="info" title="A callout uses Astryx Banner." collapsible={false} />`,
  },
  divider: {
    description: `Astryx Divider. MDX hr maps to this export. It is not a native <hr> in UI.

Use it between blocks, not as a layout grid.`,
    usage: `import { Divider } from "@/dotto/components";

<p>Above.</p>
<Divider />
<p>Below.</p>`,
  },
  landmarks: {
    description: `Native Header, Nav, Main, Footer, Article, Section, Aside. Server tags for document outline.

Do not use Astryx Section, Layout, AppShell, or TopNav for these names.`,
    usage: `import {
  Article,
  Aside,
  Footer,
  Header,
  Main,
  Nav,
  Section,
} from "@/dotto/components";

<Header>Header</Header>
<Nav aria-label="Example">Nav</Nav>
<Main>Main</Main>
<Article>Article</Article>
<Section>Section</Section>
<Aside>Aside</Aside>
<Footer>Footer</Footer>`,
  },
  breadcrumbs: {
    language: "tsx",
    description: `Presentational data-slot breadcrumb markup. Not Astryx Breadcrumbs.

The kit entry pages use DocsBreadcrumbs, which is the same slot language.`,
    usage: `import { AppLink } from "@/components/AppLink";

<nav data-slot="breadcrumb" aria-label="Example breadcrumb">
  <ol data-slot="breadcrumb-list">
    <li data-slot="breadcrumb-item">
      <AppLink data-slot="breadcrumb-link" href="/dotto">dotto</AppLink>
    </li>
    <li data-slot="breadcrumb-item">
      <span data-slot="breadcrumb-current" aria-current="page">
        Breadcrumbs
      </span>
    </li>
  </ol>
</nav>`,
  },
  dialog: {
    description: `Astryx Dialog plus DialogHeader. Compose body and footer with Astryx Layout.

This is a modal. BottomSheet is the narrow-viewport drawer used by kit mobile nav.`,
    usage: `import { useState } from "react";
import { Button, Dialog, DialogHeader } from "@/dotto/components";
import { Layout, LayoutContent, LayoutFooter } from "@astryxdesign/core/Layout";

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open dialog" variant="secondary" onClick={() => setOpen(true)} />
      <Dialog isOpen={open} onOpenChange={setOpen} width={420}>
        <Layout
          header={
            <DialogHeader title="Seal" subtitle="Confirm the gate." onOpenChange={setOpen} />
          }
          content={<LayoutContent>Every sensor must exit 0.</LayoutContent>}
          footer={
            <LayoutFooter hasDivider>
              <Button label="Cancel" variant="ghost" onClick={() => setOpen(false)} />
              <Button label="Seal" variant="primary" onClick={() => setOpen(false)} />
            </LayoutFooter>
          }
        />
      </Dialog>
    </>
  );
}`,
  },
  tooltip: {
    description: `Astryx Tooltip. Used on the icon rail; not in the kit barrel yet.

Keep content short. Do not put forms or links that need hover-only discovery.`,
    usage: `import { Tooltip } from "@astryxdesign/core/Tooltip";
import { Button } from "@/dotto/components";

<Tooltip content="Tooltip" placement="above">
  <Button label="Hover me" variant="secondary" />
</Tooltip>`,
  },
  "bottom-sheet": {
    description: `Astryx BottomSheet. Docs and kit mobile nav use it. Not in the kit barrel yet.

Dialog stays the desktop modal. Do not use AppShell drawers for this job.`,
    usage: `import { useState } from "react";
import { BottomSheet } from "@astryxdesign/core/BottomSheet";
import { Button } from "@/dotto/components";

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open sheet" variant="secondary" onClick={() => setOpen(true)} />
      <BottomSheet isOpen={open} onOpenChange={setOpen} label="Sheet" height="capped">
        <p>Docs mobile nav uses this sheet.</p>
      </BottomSheet>
    </>
  );
}`,
  },
  list: {
    description: `Native ul/ol and li. as="ol" switches the list tag. Not the Astryx data list.

MDX lists use these exports.`,
    usage: `import { List, ListItem } from "@/dotto/components";

<List>
  <ListItem>Unordered</ListItem>
  <ListItem>Items</ListItem>
</List>
<List as="ol">
  <ListItem>Ordered</ListItem>
  <ListItem>Items</ListItem>
</List>`,
  },
  table: {
    description: `Native table family: Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell. Not the Astryx data grid.

MDX tables map here.`,
    usage: `import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/dotto/components";

<Table>
  <TableHeader>
    <TableRow>
      <TableHeaderCell>Hour</TableHeaderCell>
      <TableHeaderCell>Sense</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>yoru</TableCell>
      <TableCell>deep night</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  details: {
    description: `Native details and summary. Optional docs detail (ADR-0002). Stays in the document and in LLM feeds.

Collapsible is the Astryx control for app chrome. Do not replace MDX details with it.`,
    usage: `import { Details, Summary, Text } from "@/dotto/components";

<Details>
  <Summary>Optional detail</Summary>
  <Text>Native details stay in the document and in LLM feeds.</Text>
</Details>`,
  },
  "description-list": {
    description: `Native dl, dt, and dd. Use for term/definition pairs, not for layout columns.

A list of links is List, not this.`,
    usage: `import { Dd, Dl, Dt } from "@/dotto/components";

<Dl>
  <Dt>hour</Dt>
  <Dd>yoru or hiru</Dd>
  <Dt>gate</Dt>
  <Dd>every sensor exits 0</Dd>
</Dl>`,
  },
  chip: {
    language: "html",
    description: `Leftover data-slot="chip" markup, not an Astryx primitive. New filter chips should wait for a kit name.

The demo is the slot CSS the docs already ship.`,
    usage: `<label data-slot="chip">
  <input data-slot="checkbox" type="checkbox" defaultChecked />
  <span data-slot="chip-label">rust</span>
</label>`,
  },
  alert: {
    language: "html",
    description: `Leftover data-slot="alert". Prefer Banner for new UI.

data-status="accent" is the old callout skin, not Badge status.`,
    usage: `<div data-slot="alert" data-status="accent">
  A callout uses the alert slot.
</div>`,
  },
  panel: {
    language: "html",
    description: `Leftover data-slot="panel". Card is the kit surface for new work.

This slot is still used by a few docs frames.`,
    usage: `<div data-slot="panel" className="p-4">
  Panel.
</div>`,
  },
  mermaid: {
    language: "html",
    description: `Diagram scene for docs and this kit, not a primitive. Source lives in a <pre class="mermaid">; mermaid-render paints it after hydrate.

Labels stay bone on charcoal. This is not an Astryx chart.`,
    usage: `<figure data-slot="mermaid" data-mermaid-frame="">
  <pre class="mermaid" data-mermaid-source="">
flowchart LR
  tokens[tokens.css] --> slots[data-slot CSS]
  </pre>
</figure>`,
  },
};

export function getDottoKitPage(id: string): DottoKitPageCopy | undefined {
  return DOTTO_KIT_PAGES[id];
}
