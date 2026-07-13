import { SendMessageCommand } from "@aws-sdk/client-sqs";
import type { SQSClient } from "@aws-sdk/client-sqs";
import type { LeadDTO } from "../schemas/index.ts";


interface SendLeadToQueue {
  sqs: SQSClient;
  queueUrl: string;
  lead: LeadDTO;
}


export async function sendLeadToQueue({
  sqs,
  queueUrl,
  lead,
}: SendLeadToQueue): Promise<void> {

  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(lead),
  });


  await sqs.send(command);
}