import type { FastifyInstance } from "fastify";

import envPlugin from "./env.ts";
import helmetPlugin from "./helmet.ts";
import corsPlugin from "./cors.ts";
import compressPlugin from "./compress.ts";
import rateLimitPlugin from "./rate-limit.ts";
import underPressurePlugin from "./under-pressure.ts";
import csrfPlugin from "./csrf.ts";

export async function registerPlugins(server: FastifyInstance) {
  await server.register(envPlugin);
  await server.register(helmetPlugin);
  await server.register(corsPlugin);
  await server.register(compressPlugin);
  await server.register(rateLimitPlugin);
  await server.register(underPressurePlugin);
  await server.register(csrfPlugin);
}