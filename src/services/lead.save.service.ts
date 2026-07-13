import { PutCommand, type DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { LeadDTO } from "../schemas/lead.schema.ts";

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