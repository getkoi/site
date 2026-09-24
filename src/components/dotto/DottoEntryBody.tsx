import type { ReactNode } from "react";
import { AppLink } from "@/components/AppLink";
import {
  ColorFoundation,
  ElevationFoundation,
  HoursFoundation,
  IconographyFoundation,
  LayoutFoundation,
  MotionFoundation,
  TypographyFoundation,
} from "@/components/docs/DottoFoundations";
import { DottoInteractiveDemo } from "./DottoDemos";
import {
  Article,
  Aside,
  Code,
  Dd,
  Details,
  Dl,
  Dt,
  Em,
  Figure,
  FigureCaption,
  Footer,
  Header,
  Heading,
  Image,
  Label,
  Link,
  List,
  ListItem,
  Main,
  Nav,
  Section,
  Small,
  Strong,
  Summary,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from "@/dotto/components";

function NativeFrame({ children }: { children: ReactNode }) {
  return <div className="flex max-w-[62ch] flex-col gap-4 text-fog">{children}</div>;
}

export function DottoEntryBody({ id }: { id: string }) {
  switch (id) {
    case "hours":
      return <HoursFoundation />;
    case "color":
      return <ColorFoundation />;
    case "layout":
      return <LayoutFoundation />;
    case "typography":
      return <TypographyFoundation />;
    case "elevation":
      return <ElevationFoundation />;
    case "motion":
      return <MotionFoundation />;
    case "iconography":
      return <IconographyFoundation />;
    case "link":
      return (
        <NativeFrame>
          <Text>
            Inline <Link href="/koi/docs">guide</Link>
            {" · "}
            <Link href="https://github.com/getkoi/koi">GitHub</Link>
          </Text>
        </NativeFrame>
      );
    case "heading":
      return (
        <NativeFrame>
          <Heading className="pixel m-0 text-bone" level={2}>
            Heading level 2
          </Heading>
          <Heading className="pixel m-0 text-lg text-bone" level={3}>
            Heading level 3
          </Heading>
        </NativeFrame>
      );
    case "text":
      return (
        <NativeFrame>
          <Text>
            Body <Strong>strong</Strong>, <Em>emphasis</Em>, and <Small>small</Small>.
          </Text>
        </NativeFrame>
      );
    case "code":
      return (
        <NativeFrame>
          <Text>
            Inline <Code>yokai doctor --probe</Code>.
          </Text>
        </NativeFrame>
      );
    case "figure":
      return (
        <NativeFrame>
          <Figure>
            <Image src="/yoru-koi.png" alt="Circling koi mark" width={160} height={160} />
            <FigureCaption>Product mark on the void.</FigureCaption>
          </Figure>
        </NativeFrame>
      );
    case "label":
      return (
        <NativeFrame>
          <Label htmlFor="dotto-label-demo">
            Phase
            <input id="dotto-label-demo" className="ml-2" defaultValue="12" />
          </Label>
        </NativeFrame>
      );
    case "landmarks":
      return (
        <NativeFrame>
          <Header>Header</Header>
          <Nav aria-label="Example">Nav</Nav>
          <Main>Main</Main>
          <Article>Article</Article>
          <Section>Section</Section>
          <Aside>Aside</Aside>
          <Footer>Footer</Footer>
        </NativeFrame>
      );
    case "breadcrumbs":
      return (
        <nav data-slot="breadcrumb" aria-label="Example breadcrumb">
          <ol data-slot="breadcrumb-list">
            <li data-slot="breadcrumb-item">
              <AppLink data-slot="breadcrumb-link" href="/dotto">
                dotto
              </AppLink>
            </li>
            <li data-slot="breadcrumb-item">
              <span data-slot="breadcrumb-current" aria-current="page">
                Breadcrumbs
              </span>
            </li>
          </ol>
        </nav>
      );
    case "list":
      return (
        <NativeFrame>
          <List>
            <ListItem>Unordered</ListItem>
            <ListItem>Items</ListItem>
          </List>
          <List as="ol">
            <ListItem>Ordered</ListItem>
            <ListItem>Items</ListItem>
          </List>
        </NativeFrame>
      );
    case "table":
      return (
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
            <TableRow>
              <TableCell>hiru</TableCell>
              <TableCell>day courtyard</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    case "details":
      return (
        <NativeFrame>
          <Details>
            <Summary>Optional detail</Summary>
            <Text>Native details stay in the document and in LLM feeds.</Text>
          </Details>
        </NativeFrame>
      );
    case "description-list":
      return (
        <NativeFrame>
          <Dl>
            <Dt>hour</Dt>
            <Dd>yoru or hiru</Dd>
            <Dt>gate</Dt>
            <Dd>every sensor exits 0</Dd>
          </Dl>
        </NativeFrame>
      );
    case "chip":
      return (
        <label data-slot="chip">
          <input data-slot="checkbox" type="checkbox" defaultChecked />
          <span data-slot="chip-label">rust</span>
        </label>
      );
    case "alert":
      return (
        <div data-slot="alert" data-status="accent">
          A callout uses the alert slot.
        </div>
      );
    case "panel":
      return (
        <div data-slot="panel" className="p-4 text-fog">
          Panel.
        </div>
      );
    case "mermaid":
      return (
        <figure
          className="mermaid-frame pixel-frame dither-surface dither-diagram"
          data-slot="mermaid"
          data-mermaid-frame=""
        >
          <pre className="mermaid" data-mermaid-source="">
            {`flowchart LR
  accTitle: Hour remap
  accDescr: Tokens remap under each hour; mermaid labels stay bone on charcoal.
  tokens[tokens.css] --> slots[data-slot CSS]
  slots --> pages[docs recipes CTAs]`}
          </pre>
        </figure>
      );
    default:
      return <DottoInteractiveDemo id={id} />;
  }
}
