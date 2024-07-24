import { Hono } from "hono";

import { showRoutes } from "hono/dev";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { timing } from "hono/timing";

import auth from "./routes/auth";
import profile from "./routes/profile";

const app = new Hono();

app.use(prettyJSON());
app.use(requestId());
app.use(timing());

app.get("/health", (c) => c.text("OK"));
app.route("/auth", auth);
app.route("/profile", profile);

showRoutes(app);

export default {
  port: 3000,
  fetch: app.fetch,
};
