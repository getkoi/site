import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";

export function MdxBlockquote(props: ComponentProps<"blockquote">) {
  const className = ["dither-surface", "dither-alert", props.className].filter(Boolean).join(" ");
  return <blockquote {...props} className={className} data-slot="alert" data-status="accent" />;
}

function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return nodeText(props.children);
  }
  return "";
}

function isMermaidPre(props: ComponentProps<"pre">, childClass: string) {
  const dataLanguage =
    "data-language" in props ? String((props as { "data-language"?: string })["data-language"] ?? "") : "";
  return (
    childClass.includes("language-mermaid") ||
    Boolean(props.className?.includes("mermaid")) ||
    dataLanguage === "mermaid"
  );
}

export function MdxPre({ children, ...props }: ComponentProps<"pre">) {
  const child = Children.toArray(children).find((node) => isValidElement(node));
  const childClass =
    isValidElement(child) && typeof child.props === "object" && child.props && "className" in child.props
      ? String(child.props.className ?? "")
      : "";

  if (isMermaidPre(props, childClass)) {
    const source = nodeText(children).replace(/\n$/, "");
    return (
      <figure
        className="mermaid-frame pixel-frame dither-surface dither-diagram"
        data-slot="mermaid"
        data-mermaid-frame=""
      >
        <pre className="mermaid" data-mermaid-source="">
          {source}
        </pre>
      </figure>
    );
  }

  return (
    <figure className="code-frame" data-slot="code-block">
      <button
        type="button"
        className="copy"
        data-slot="copy-button"
        data-size="sm"
        data-surface="frame"
        aria-label="Copy code snippet"
      >
        copy
      </button>
      <pre {...props}>{children}</pre>
    </figure>
  );
}
