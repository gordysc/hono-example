import { Hono } from "hono";
import { z } from "zod";

import { env } from "hono/adapter";
import { setCookie, deleteCookie } from "hono/cookie";
import { sign } from "hono/jwt";

const app = new Hono();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

app.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!loginSchema.safeParse(body).success) {
      return c.json({ message: "Invalid email or password" }, 400);
    }

    if (email !== "admin@example.com" || password !== "password") {
      return c.json({ message: "Invalid email or password" }, 401);
    }

    const secret = env<{ JWT_SECRET: string }>(c).JWT_SECRET;
    const token = await sign({ email, role: "admin" }, secret, "HS256");

    setCookie(c, "token", token, { httpOnly: true, secure: true });

    return c.json({ email, role: "admin" });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Invalid email or password" }, 401);
  }
});

app.delete("/logout", async (c) => {
  deleteCookie(c, "token");
  return c.json({});
});

export default app;
