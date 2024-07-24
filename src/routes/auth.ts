import { Hono } from "hono";

import { env } from "hono/adapter";
import { setCookie, deleteCookie } from "hono/cookie";
import { sign } from "hono/jwt";

const app = new Hono();

app.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (email !== "admin@example.com" || password !== "password") {
      return c.json({ message: "Login failed" }, 401);
    }

    const secret = env<{ JWT_SECRET: string }>(c).JWT_SECRET;
    const token = await sign({ email, role: "admin" }, secret, "HS256");

    setCookie(c, "token", token, { httpOnly: true, secure: true });

    return c.json({});
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
});

app.delete("/logout", async (c) => {
  deleteCookie(c, "token");
  return c.json({});
});

export default app;
