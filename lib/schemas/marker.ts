import { z } from "zod";
import { CATEGORIES } from "@/prisma/seeders/categories";

export const registerMarkerSchema = z.object({
  description: z.string().min(5, "Must be longer than 5 characters.").max(300, "Cannot be longer than 300 characters."),
  category: z.string(), // Handle wrong category from server
  lat: z.string("No location selected."),
  lng: z.string("No location selected."),
  dateOfNoise: z.date().refine(
    (date) => date <= new Date(),
    {message: "Date cannot be in the future.",}
  ),
})