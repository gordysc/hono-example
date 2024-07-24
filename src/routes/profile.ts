import { Hono } from "hono";

import { useAuthentication } from "@/middleware/auth.middleware";

const app = new Hono();

app.use("*", useAuthentication);

app.get("/", async (c) => {
  const { email, role } = c.get("jwtPayload");
  return c.json({ email, role });
});

export default app;
