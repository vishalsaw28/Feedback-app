import { z } from "zod";

export const AcceptMessageScchema = z.object({
  acceptMessages: z.boolean(),
});
