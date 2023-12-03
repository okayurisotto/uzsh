import { render } from "preact";
import "./index.css";
import { App } from "./App";

render(
  <App />,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById("app")!,
);
