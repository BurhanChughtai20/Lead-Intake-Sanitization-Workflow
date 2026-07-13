import fp from "fastify-plugin";
import { createSqsClient } from "./sqs.client.ts";

export default fp(
  async (fastify) => {
    const sqsClient = createSqsClient({
      region: fastify.config.AWS_REGION,
      accessKeyId: fastify.config.AWS_ACCESS_KEY_ID,
      secretAccessKey: fastify.config.AWS_SECRET_ACCESS_KEY,
    });

    fastify.decorate("sqs", sqsClient);
  },
  {
    name: "sqs",
    dependencies: ["@fastify/env"],
  }
);