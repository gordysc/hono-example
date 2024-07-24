import { Hono } from "hono";

import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { timing } from "hono/timing";

const app = new Hono();

app.use(logger());
app.use(requestId());
app.use(timing());

app.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;
    console.log({ email, password });
    if (email === "admin@example.com" && password === "password") {
      return c.json({ message: "Login successful" }, 200);
    } else {
      return c.json({ message: "Login failed" }, 401);
    }
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
});

export default app;
