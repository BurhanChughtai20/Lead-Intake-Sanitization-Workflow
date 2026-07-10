import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { LeadSchema, type LeadDTO } from "../schemas/index.ts";

export interface LeadSchemaRequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  source?: string;
  message?: string;
}

type RouteHandler<T = LeadSchemaRequestBody> = (
  request: FastifyRequest<{ Body: T }>,
  reply: FastifyReply,
) => Promise<unknown>;

export default async function leadProcessorRoutes(
  server: FastifyInstance,
) {
  function registerPost<T>(
    url: string,
    handler: RouteHandler<T>,
  ) {
    server.post(url, async (request, reply) => {
      try {
        await handler(request as FastifyRequest<{ Body: T }>, reply);
      } catch (error) {
        server.log.error(error);

        return reply.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
      }
    });
  }

  registerPost<LeadDTO>("/", async (request, reply) => {
    const data = request.body as LeadDTO;
    const lead = LeadSchema.parse(data);

    return reply.status(201).send({
      success: true,
      result: lead,
    });
  });
}
