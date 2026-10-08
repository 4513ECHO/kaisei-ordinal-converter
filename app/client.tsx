/* @refresh reload */
// TODO: Use island architecture and hydration
import { render } from "solid-js/web";
import Form from "./client/form.tsx";

const root = document.getElementById("form");
render(() => <Form />, root!);
