import { QueryCommand, PutCommand, type DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { LeadDTO } from "../schemas/index.ts";

export const isDuplicateLead = async (
  dynamoDb: DynamoDBDocumentClient,
  email: string,
): Promise<boolean> => {
  const command = new QueryCommand({
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: "EmailIndex",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: { "#email": "email" },
    ExpressionAttributeValues: { ":email": email },
    Limit: 1,
  });
  const result = await dynamoDb.send(command);
  return (result.Items?.length ?? 0) > 0;
};

export const saveLead = async (
  dynamoDb: DynamoDBDocumentClient,
  lead: LeadDTO,
): Promise<void> => {
  await dynamoDb.send(new PutCommand({
    TableName: process.env.DYNAMODB_TABLE,
    Item: lead,
    ConditionExpression: "attribute_not_exists(leadId)",
  }));
};