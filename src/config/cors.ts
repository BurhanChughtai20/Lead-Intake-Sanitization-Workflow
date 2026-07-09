import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (server: FastifyInstance) => {
  await server.register(cors, {
    origin: true,
    credentials: true
  });
});