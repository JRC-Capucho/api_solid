import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyCheckInsBodyParams = z.object({
    page: z.number(),
  });

  const { page } = historyCheckInsBodyParams.parse(request.query);

  const historyCheckInsUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await historyCheckInsUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
