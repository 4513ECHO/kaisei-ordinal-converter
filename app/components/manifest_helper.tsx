import type { ComponentProps } from "solid-js";
import type { Manifest } from "vite";

// based on https://github.com/honojs/honox/blob/main/src/server/components/script.tsx
const MANIFEST = import.meta.glob<Manifest>(
  "/dist/.vite/manifest.json",
  { eager: true, import: "default" },
)["/dist/.vite/manifest.json"];

function lookupManifest(file: string): string | undefined {
  if (!MANIFEST) return;
  const scriptInManifest = MANIFEST[file.replace(/^\//, "")];
  if (scriptInManifest) {
    return "/" + scriptInManifest.file;
  }
}

export function Script(props: ComponentProps<"script"> & { src: string }) {
  if (import.meta.env.PROD) {
    const src = lookupManifest(props.src);
    if (src) {
      return <script type="module" {...props} src={src} />;
    }
    return null;
  } else {
    return <script type="module" {...props} />;
  }
}

export function Link(props: ComponentProps<"link"> & { href: string }) {
  if (import.meta.env.PROD) {
    const href = lookupManifest(props.href);
    if (href) {
      return <link {...props} href={href} />;
    }
    return null;
  } else {
    return <link {...props} />;
  }
}
