import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { history } from "./history";
import { validate } from "./validate";
import { metrics } from "./metrics";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/create", create);
  app.get("/history", history);
  app.patch("/validate/:checkInId", validate);
  app.get("/metrics", metrics);
}
