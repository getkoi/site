import type { Metadata } from "next";
import { FAVICON_SVG, FOUC_SCRIPT } from "@/lib/fouc";
import { SITE_ORIGIN } from "@/lib/site";
import { SiteShell } from "@/components/shell/SiteShell";
import "@/styles/layers.css";
import "@/styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "koi — drive long projects across disposable context windows",
    template: "%s",
  },
  description:
    "koi is a small set of tools that plug into the project and harness you already use. The filesystem is durable memory; the context window is a disposable cache.",
  icons: { icon: FAVICON_SVG },
  openGraph: {
    type: "website",
    images: ["/yoru-koi.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-hour="yoru"
      data-astryx-theme="dotto"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark light" />
        <meta name="theme-color" content="#131a2a" />
        <link
          rel="preload"
          href="/fonts/Geist-Latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: FOUC_SCRIPT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
