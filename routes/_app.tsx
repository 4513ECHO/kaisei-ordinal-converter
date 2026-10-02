import { define } from "@/utils.ts";

const title = "開成大運動会 序数変換ツール";
const description =
  "開成大運動会の開催年度・開催回数・各組が何代目かを相互に変換するツールです。";

export default define.page(({ Component }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
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
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
