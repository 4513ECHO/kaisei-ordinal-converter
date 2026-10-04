import type { ParentProps } from "solid-js";
import { Link, Script } from "./components/manifest_helper.tsx";

const title = "開成大運動会 序数変換ツール";
const description =
  "開成大運動会の開催年度・開催回数・各組が何代目かを相互に変換するツールです。";

export default function Layout(props: ParentProps) {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta
          name="og:link"
          content="https://kaisei-ordinal-converter.4513echo.dev/"
        />
        <link rel="icon" href="/favicon.ico" />
        <Script src="/app/client.tsx" />
        <Link rel="stylesheet" href="/app/styles.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
