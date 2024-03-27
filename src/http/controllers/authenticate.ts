import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const autheticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = autheticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return reply.status(400).send({ message: err.message });
  }
}
