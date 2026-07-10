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
        PORT: { type: "number", default: process.env.PORT },
        HOST: { type: "string", default: process.env.HOST},
        NODE_ENV: { type: "string", default: process.env.NODE_ENV },
        AWS_REGION: { type: "string" },
        AWS_ACCESS_KEY_ID: { type: "string" },
        AWS_SECRET_ACCESS_KEY: { type: "string" },
        SQS_QUEUE_URL: { type: "string" },
        DYNAMODB_TABLE: { type: "string" }
      }
    }
  });
});