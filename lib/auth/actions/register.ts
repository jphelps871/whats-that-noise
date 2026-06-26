"use server"

import { type UserFormProps, registerUserSchema } from "@/lib/schemas/user"
import { prisma } from "@/prisma/lib/client"
import { errorValidation, errorCreation } from "@/lib/forms/error-handling"
import { createUser } from "@/prisma/lib/operations/auth"
import { redirect } from "next/navigation"
import { ActionResponse } from "../types"

export async function registerUser(data: UserFormProps): Promise<ActionResponse<void>> {
  const result = registerUserSchema.safeParse(data);

  if (!result.success) {
    return errorValidation(result.error)
  }

  const user = await prisma.user.findUnique({where: {
    email: data.email
  }})

  if (user) {
    return errorCreation({
      email: "Email already exists"
    })
  }

  await createUser(data)

  redirect('/auth/login');
}
