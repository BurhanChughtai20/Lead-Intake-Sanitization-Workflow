import fp from "fastify-plugin";
import { createDynamoDbClient } from "./dynamodb.client.ts";

export default fp(
  async (fastify) => {
    fastify.decorate(
      "dynamoDb",
      createDynamoDbClient({
        region: fastify.config.AWS_REGION,
        accessKeyId: fastify.config.AWS_ACCESS_KEY_ID,
        secretAccessKey: fastify.config.AWS_SECRET_ACCESS_KEY,
      })
    );
  },
  {
    name: "dynamodb",
  }
);