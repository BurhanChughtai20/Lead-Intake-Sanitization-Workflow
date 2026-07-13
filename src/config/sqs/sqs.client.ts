import { SQSClient } from "@aws-sdk/client-sqs";

interface CreateSqsClient {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export function createSqsClient(config: CreateSqsClient) {
  const client = new SQSClient({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  return client;
}