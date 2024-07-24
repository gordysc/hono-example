import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";

export const useAuthentication = createMiddleware(async (c, next) => {
  const secret = env<{ JWT_SECRET: string }>(c).JWT_SECRET;
  const jwtMiddleware = jwt({ secret, cookie: "token" });

  return jwtMiddleware(c, next);
});
