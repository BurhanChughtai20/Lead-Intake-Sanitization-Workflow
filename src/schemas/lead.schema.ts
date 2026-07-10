import { z } from "zod";

const MAX_NAME_LENGTH = 100;
const MAX_COMPANY_LENGTH = 150;
const MAX_JOB_TITLE_LENGTH = 100;
const MAX_SOURCE_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;
const PHONE_REGEX = /^\+?[0-9()\-\s]{7,20}$/;

const baseLeadFields = {
  firstName: z.string().trim().min(2).max(MAX_NAME_LENGTH),
  lastName: z.string().trim().min(2).max(MAX_NAME_LENGTH).optional(),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().regex(PHONE_REGEX).optional(),
  company: z.string().trim().max(MAX_COMPANY_LENGTH).optional(),
  jobTitle: z.string().trim().max(MAX_JOB_TITLE_LENGTH).optional(),
  source: z.string().trim().max(MAX_SOURCE_LENGTH).optional(),
  message: z.string().trim().max(MAX_MESSAGE_LENGTH).optional(),
};

// what the client sends — no leadId, they don't own that
export const CreateLeadSchema = z.object(baseLeadFields).strict();
export type CreateLeadDTO = z.infer<typeof CreateLeadSchema>;

// what we persist — server generates leadId
export const LeadSchema = z.object({
  leadId: z.string().uuid(),
  ...baseLeadFields,
}).strict();
export type LeadDTO = z.infer<typeof LeadSchema>;