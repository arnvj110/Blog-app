import { z } from "zod";

export const createUserProfileSchema = z.object({
  username: z.string().min(3).max(24),
  bio: z.string().max(200).optional(),
  avatar: z.string().url().optional(),
});
