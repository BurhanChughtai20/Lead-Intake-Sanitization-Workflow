import type { Env } from "@fastify/env";

declare module "fastify" {
  interface FastifyInstance {
    config: Env;
    dynamoDb: DynamoDBDocumentClient;
    sqs: SQSClient;
  }
}