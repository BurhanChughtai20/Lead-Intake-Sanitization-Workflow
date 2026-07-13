import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { isLeadProcessor, DuplicateLeadError, BlockedEmailError } from "../controller/lead.processor.controller.ts";
import { CreateLeadSchema, type CreateLeadDTO } from "../schemas/index.ts";

type RouteHandler<T> = (request: FastifyRequest<{ Body: T }>, reply: FastifyReply) => Promise<unknown>;

export default async function leadProcessorRoutes(
  server: FastifyInstance,
  _opts: FastifyPluginOptions,
) {
  function registerPost<T>(url: string, handler: RouteHandler<T>) {
    server.post(url, async (request, reply) => {
      try {
        return await handler(request as FastifyRequest<{ Body: T }>, reply);
      } catch (error) {
        if (error instanceof DuplicateLeadError) {
          return reply.status(409).send({ success: false, message: error.message });
        }
        if (error instanceof BlockedEmailError) {
          return reply.status(422).send({ success: false, message: error.message });
        }
        server.log.error(error);
        return reply.status(500).send({ success: false, message: "Internal Server Error" });
      }
    });
  }

  registerPost<CreateLeadDTO>("/", async (request, reply) => {
    const input = CreateLeadSchema.parse(request.body);
     const lead = await isLeadProcessor(
    input,
    request.server.dynamoDb,
    request.server.sqs,
    request.server.config.SQS_QUEUE_URL
  );
    return reply.status(201).send({ success: true, result: lead });
  });
}