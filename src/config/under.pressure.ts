import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import underPressure from "@fastify/under-pressure";

export default fp(async (server: FastifyInstance) => {
  await server.register(underPressure);
});