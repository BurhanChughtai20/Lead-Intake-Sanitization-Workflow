import { randomUUID } from "crypto";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { CreateLeadDTO, LeadDTO } from "../schemas/index.ts"; 
import { saveLead } from "../services/lead.save.service.ts";
import type { SQSClient } from "@aws-sdk/client-sqs";
import { sendLeadToQueue } from "../services/lead.queue.service.ts";
import type { LeadProcessResult } from "../services/lead.processor.service.ts";
import { isBlockedEmail, sanitizeInput, sanitizeNumber } from "../services/sanitize.service.ts";
import { isDuplicateLead } from "../services/duplicates.lead.service.ts";

export class DuplicateLeadError extends Error {}
export class BlockedEmailError extends Error {}

export const isLeadProcessor = async (
  input: CreateLeadDTO,
  dynamoDb: DynamoDBDocumentClient,
  sqs: SQSClient,
  queueUrl: string,
): Promise<LeadProcessResult> => {


  if (isBlockedEmail(input.email)) {
    return {
      status: "blocked",
      reason: "Email domain blocked",
    };
  }


  if (await isDuplicateLead(dynamoDb, input.email)) {
    return {
      status: "duplicate",
      reason: "Lead already exists",
    };
  }


  const lead: LeadDTO = {
    leadId: randomUUID(),
    ...input,
    firstName: sanitizeInput(input.firstName),
    lastName: input.lastName
      ? sanitizeInput(input.lastName)
      : undefined,
    company: input.company
      ? sanitizeInput(input.company)
      : undefined,
    jobTitle: input.jobTitle
      ? sanitizeInput(input.jobTitle)
      : undefined,
    message: input.message
      ? sanitizeInput(input.message)
      : undefined,
    phone: input.phone
      ? sanitizeNumber(input.phone)
      : undefined,
  };


  await saveLead(dynamoDb, lead);


  await sendLeadToQueue({
    sqs,
    queueUrl,
    lead,
  });


  return {
    status: "created",
    lead,
  };
};