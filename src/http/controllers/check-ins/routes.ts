import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { history } from "./history";
import { validate } from "./validate";
import { metrics } from "./metrics";
import { verifyUserRole } from "@/http/middlewares/verify-role";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/create/:gymId", create);
  app.get("/history", history);
  app.patch(
    "/validate/:checkInId",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate,
  );
  app.get("/metrics", metrics);
}
