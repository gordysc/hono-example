import { Hono } from "hono";
import { showRoutes } from "hono/dev";

import auth from "./routes/auth";

const app = new Hono();

app.get("/health", (c) => c.text("OK"));

app.route("/auth", auth);

showRoutes(app);

export default {
  port: 3000,
  fetch: app.fetch,
};
