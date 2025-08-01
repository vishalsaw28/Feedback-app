import { z } from "zod";

export const signInScchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
