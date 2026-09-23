import {
  Article,
  Button,
  Code,
  Details,
  Divider,
  Footer,
  Header,
  Heading,
  Kbd,
  Link,
  List,
  ListItem,
  Section,
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

export function DottoHtmlKit() {
  return (
    <Section className="mt-12 flex flex-col gap-6" aria-labelledby="html-kit">
      <Header>
        <Heading className="pixel m-0 text-xl text-bone" level={2} id="html-kit">
          HTML primitives
        </Heading>
        <Text className="mt-2 max-w-[62ch] text-fog">
          Named after the tag. Document nodes are native elements so MDX prose
          stays in the reading room. Interactive nodes wrap Astryx.
        </Text>
      </Header>

      <Article className="flex max-w-[62ch] flex-col gap-4 text-fog">
        <Heading className="pixel m-0 text-lg text-bone" level={3}>
          Artifact
        </Heading>
        <Text>
          Compose a page from <Code>Heading</Code>, <Code>Text</Code>,{" "}
          <Code>List</Code>, and <Link href="/docs">Link</Link>. Press{" "}
          <Kbd>/</Kbd> to search docs.
        </Text>
        <List>
          <ListItem>
            <Strong>Native:</Strong> headings, lists, tables, details.
          </ListItem>
          <ListItem>
            <Strong>Astryx:</Strong> Button, Card, Badge, Dialog, Divider.
          </ListItem>
        </List>
        <List as="ol">
          <ListItem>Import from <Code>@/dotto</Code>.</ListItem>
          <ListItem>Render tags, not class maps.</ListItem>
        </List>
        <Divider />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Export</TableHeaderCell>
              <TableHeaderCell>Tag</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Heading</TableCell>
              <TableCell>h1–h6</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Summary</TableCell>
              <TableCell>summary</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Details>
          <Summary>Optional detail</Summary>
          <Text>Native details stay in the document and in LLM feeds.</Text>
        </Details>
        <div className="flex flex-wrap items-center gap-3">
          <Button label="Secondary" variant="secondary" />
        </div>
      </Article>
      <Footer className="text-sm text-fog">dotto HTML kit</Footer>
    </Section>
  );
}
