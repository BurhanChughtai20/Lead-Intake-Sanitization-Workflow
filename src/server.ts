import Fastify from "fastify";
import envPlugin from "./config/env.js";

interface EnvConfig {
  PORT: number;
  HOST: string;
  NODE_ENV: string;
  AWS_REGION?: string;
  SQS_QUEUE_URL?: string;
  DYNAMODB_TABLE?: string;
}

const server = Fastify({
  logger: true,
});

await server.register(envPlugin);

server.get("/ping", async () => {
  return "pong\n";
});

const env = server.getEnvs() as EnvConfig;

await server.listen({
  port: env.PORT,
  host: env.HOST,
});

console.log(`🚀 Server running on ${env.HOST}:${env.PORT}`);