import { randomUUID } from "crypto";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { CreateLeadDTO, LeadDTO } from "../schemas/index.ts"; 
import { isBlockedEmail, sanitizeInput, sanitizeNumber } from "../utils/sanitize.utils.ts";
import { isDuplicateLead, saveLead } from "../utils/duplicates.lead.ts";

export class DuplicateLeadError extends Error {}
export class BlockedEmailError extends Error {}

export const isLeadProcessor = async (
  input: CreateLeadDTO,
  dynamoDb: DynamoDBDocumentClient,
): Promise<LeadDTO> => {
  if (isBlockedEmail(input.email)) throw new BlockedEmailError("Email domain is not allowed");
  if (await isDuplicateLead(dynamoDb, input.email)) throw new DuplicateLeadError("Lead with this email already exists");

  const lead: LeadDTO = {
    leadId: randomUUID(),
    ...input,
    firstName: sanitizeInput(input.firstName),
    lastName: input.lastName ? sanitizeInput(input.lastName) : undefined,
    company: input.company ? sanitizeInput(input.company) : undefined,
    jobTitle: input.jobTitle ? sanitizeInput(input.jobTitle) : undefined,
    message: input.message ? sanitizeInput(input.message) : undefined,
    phone: input.phone ? sanitizeNumber(input.phone) : undefined,
  };

  await saveLead(dynamoDb, lead);
  return lead;
};