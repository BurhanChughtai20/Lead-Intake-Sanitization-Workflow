import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import rateLimit from "@fastify/rate-limit";

export default fp(async (server: FastifyInstance) => {
  await server.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute"
  });
});