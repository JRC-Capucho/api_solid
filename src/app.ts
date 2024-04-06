import { fastify } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { fastifyJwt } from "@fastify/jwt";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);

app.register(gymsRoutes, {
  prefix: "gyms",
});

app.register(checkInsRoutes, {
  prefix: "check-ins",
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError)
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });

  if (env.NODE_ENV !== "prod") console.error(error);

  return reply.status(500).send({ message: "Internal server error." });
});
