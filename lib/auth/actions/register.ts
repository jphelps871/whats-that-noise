"use server"

import { type UserFormProps, registerUserSchema } from "@/lib/auth/schema"
import { errorValidation, errorCreation } from "@/lib/forms/error-handling"
import { registerUserRepository } from "../repository"
import { redirect } from "next/navigation"
import { ActionResponse } from "@/lib/types/actions"

export async function registerUser(data: UserFormProps): Promise<ActionResponse<void>> {
  const result = registerUserSchema.safeParse(data);

  if (!result.success) {
    return errorValidation(result.error)
  }

  const user = await registerUserRepository.findUserByEmail(data.email)

  if (user) {
    return errorCreation({
      email: "Email already exists"
    })
  }

  await registerUserRepository.registerUser(data);

  redirect('/auth/login');
}
