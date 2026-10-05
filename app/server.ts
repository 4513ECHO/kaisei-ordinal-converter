import { Hono } from "hono";
import { renderToString } from "solid-js/web";
import Layout from "./layout.tsx";
import App from "./app.tsx";

const app = new Hono();

app.get("/", (c) => {
  return c.html(
    "<!DOCTYPE html>" + renderToString(() => Layout({ children: App() })),
  );
});

export default app;
