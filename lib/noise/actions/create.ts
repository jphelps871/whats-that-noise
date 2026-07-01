"use server"

import { type NoiseFormProps, registerNoiseSchema } from "@/lib/noise/schema"
import { errorCreation, errorValidation } from "@/lib/forms/error-handling"
import { noiseRepository } from "@/lib/noise/repository"
import { auth } from "@/lib/auth/config"
import { ActionResponse } from "@/lib/types/actions"
import { type Noise } from "@prisma/client"

export async function createNoise(data: NoiseFormProps): Promise<ActionResponse<Noise>> {
  const session = await auth();

  if (!session?.user) throw new Error("Unauthorised");
  const {id: userId} = session.user;

  const result = registerNoiseSchema.safeParse(data);

  if (!result.success) {
    return errorValidation(result.error)
  }

  // Category must exist
  const category = await noiseRepository.findCategoryByName(data.category)
  if (!category) {
    return errorCreation({category: `The category "${data.category}" does not exist, please select an existing category.`})
  }

  const noise = await noiseRepository.createNoise({
    userId: userId,
    categoryId: category.id,
    lat: data.lat,
    lng: data.lng,
    description: data.description,
    dateOfNoise: data.dateOfNoise as Date
  })

  return { success: true, data: noise }
}