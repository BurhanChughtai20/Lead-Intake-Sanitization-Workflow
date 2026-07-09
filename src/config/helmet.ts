import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import helmet from "@fastify/helmet";

export default fp(async (server: FastifyInstance) => {
  await server.register(helmet);
});