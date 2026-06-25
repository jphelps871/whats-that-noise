"use server"

import { prisma } from "@/prisma/lib/client"
import { MarkerFormProps } from "@/lib/schemas/marker"
import { registerMarkerSchema } from "@/lib/schemas/marker"
import { errorCreation, errorValidation } from "@/lib/forms/error-handling"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function createMarker(data: MarkerFormProps) {
  const session = await auth();

  if (!session?.user) throw new Error("Unauthorised");
  const {id: userId} = session.user;

  const result = registerMarkerSchema.safeParse(data);

  if (!result.success) {
    return errorValidation(result.error)
  }

  // Category must exist
  const category = await prisma.category.findUnique({
    where: { name: data.category }
  })

  if (!category) {
    return errorCreation({category: `The category "${data.category}" does not exist, please select an existing category.`})
  }

  await prisma.noise.create({
    data: {
      userId: userId,
      categoryId: category.id,
      lat: data.lat,
      lng: data.lng,
      description: data.description,
      dateOfNoise: data.dateOfNoise as Date
    }
  })

  redirect("/");
}