import { QueryCommand, type DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const isDuplicateLead = async (
  dynamoDb: DynamoDBDocumentClient,
  lead: { email: string },
): Promise<boolean> => {
  const command = new QueryCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    IndexName: "EmailIndex",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": lead.email,
    },
    Limit: 1,
  });

  const result = await dynamoDb.send(command);

  return (result.Items?.length ?? 0) > 0;
};