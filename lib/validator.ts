import * as z from "zod";

export const roomFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  restaurantUrl: z.string().url(),
  expiredAt: z.date(),
});
