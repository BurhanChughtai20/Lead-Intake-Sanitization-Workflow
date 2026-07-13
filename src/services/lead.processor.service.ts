import type { LeadDTO } from "../schemas/lead.schema.ts";

export type LeadProcessResult =
  | {
      status: "created";
      lead: LeadDTO;
    }
  | {
      status: "duplicate";
      reason: string;
    }
  | {
      status: "blocked";
      reason: string;
    };