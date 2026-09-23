import type { ReactNode } from "react";
import { CodeBlock } from "@/dotto/components";
import type { DottoKitPageCopy } from "@/dotto/kit-pages";

export function DottoKitArticle({
  page,
  children,
}: {
  page: DottoKitPageCopy;
  children: ReactNode;
}) {
  const paragraphs = page.description.trim().split(/\n\n+/);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex max-w-[62ch] flex-col gap-3">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="m-0 text-[1.05rem] text-fog">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="min-w-0">{children}</div>
      <CodeBlock
        code={page.usage.replace(/^\n/, "").replace(/\n$/, "")}
        language={page.language ?? "tsx"}
        title="usage"
        width="100%"
        hasCopyButton
        isWrapped
      />
    </div>
  );
}
