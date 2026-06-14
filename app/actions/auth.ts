"use server"

import { z } from "zod"
import { registerUserSchema } from "@/lib/schemas/user"
import { prisma } from "@/prisma/lib/client"
import { errorValidation, errorCreation } from "@/lib/forms/applyServerErrors"
import { createUser } from "@/prisma/lib/operations/auth"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs";

type UserFormProps = z.infer<typeof registerUserSchema>

type ActionResponse<T> = 
  | (T extends void
      ? { success: true }
      : { success: true; data: T })
  | {
      success: false
      error: {
        fieldErrors: Record<string, string[]>
        formErrors?: string[]
      }
    }

export async function registerUser(data: UserFormProps): Promise<ActionResponse<void>> {
  const result = registerUserSchema.safeParse(data);

  if (!result.success) {
    return errorValidation(result.error)
  }

  const user = await prisma.user.findUnique({where: {
    email: data.email
  }})

  if (user) {
    return errorCreation(false, {
      email: "Email already exists"
    })
  }

  await createUser(data)

  redirect('/auth/login');
}
