import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

export default fp(async (fastify: FastifyInstance) => {
  await fastify.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: "object",
      required: ["PORT", "HOST", "NODE_ENV"],
      properties: {
        PORT: { type: "number", default: 8080 },
        HOST: { type: "string", default: "0.0.0.0" },
        NODE_ENV: { type: "string", default: "development" },
        AWS_REGION: { type: "string" },
        SQS_QUEUE_URL: { type: "string" },
        DYNAMODB_TABLE: { type: "string" }
      }
    }
  });
});