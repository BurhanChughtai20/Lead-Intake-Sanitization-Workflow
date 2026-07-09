import Fastify from "fastify";

import { registerPlugins } from "./config/index.ts";

interface EnvConfig {
  PORT: number;
  HOST: string;
  NODE_ENV: string;
  AWS_REGION?: string;
  SQS_QUEUE_URL?: string;
  DYNAMODB_TABLE?: string;
}

async function startServer() {

const server = Fastify({
  logger: true,
});

await registerPlugins(server);

await registerRoutes( server);

const env = server.getEnvs() as EnvConfig;

await server.listen({
  port: env.PORT,
  host: env.HOST,
});

server.log.info(`🚀 Server running on http://${env.HOST}:${env.PORT}`);
};

startServer().catch((err: Error|any) => {
  console.error(err);
  process.exit(1);
});
