import type {
  SQSEvent,
  SQSBatchResponse,
} from "aws-lambda";

import type { LeadDTO } from "../schemas/index.ts";
import { processLead } from "./services/lead.worker.service.ts";

export async function handler(
  event: SQSEvent,
): Promise<SQSBatchResponse> {
  const batchItemFailures: SQSBatchResponse["batchItemFailures"] = [];

  for (const record of event.Records) {
    try {
      const lead = JSON.parse(record.body) as LeadDTO;

      await processLead(lead);
    } catch (error) {
      console.error(
        `Failed to process SQS message: ${record.messageId}`,
        error,
      );

      batchItemFailures.push({
        itemIdentifier: record.messageId,
      });
    }
  }

  return {
    batchItemFailures,
  };
}