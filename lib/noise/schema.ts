import { z } from "zod";

export const registerNoiseSchema = z.object({
  description: z.string().min(5, "Must be longer than 5 characters.").max(300, "Cannot be longer than 300 characters."),
  category: z.string("Must be a valid category"), // Handle wrong category from server
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  dateOfNoise: z.coerce.date().refine(
    (date) => date <= new Date(),
    {message: "Date cannot be in the future.",}
  ),
})

export const filterNoiseSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  
  dateRange: z.object({
    from: z.date({error: "Start date is required"}).refine(
      (date) => date <= new Date(),
      {message: "Date cannot be in the future.",}
    ),
    to: z.date({error: "End date is required"}).refine(
      (date) => date <= new Date(),
      {message: "Date cannot be in the future.",}
    ),
  }),
});

export type FilterForm = z.infer<typeof filterNoiseSchema>;
export type NoiseFormProps = z.input<typeof registerNoiseSchema>