import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import csrf from "@fastify/csrf-protection";

export default fp(async (server: FastifyInstance) => {
  await server.register(csrf);
});