import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerfify: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerfify) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  };
}
