import type { FastifyInstance } from "fastify";
import leadProcessorRoutes from "./lead.route.ts";

const API_PREFIX = process.env.API_PREFIX;

export async function registerRoutes(fastify: FastifyInstance) {
  const routes = [{ plugin: leadProcessorRoutes, prefix: `${API_PREFIX}/leads` }];

  for (const { plugin, prefix } of routes) {
    await fastify.register(plugin, { prefix });
  }
}