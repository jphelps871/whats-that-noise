"use server"

import { z } from "zod"
import { registerUserSchema } from "@/lib/schemas/user"
import { prisma } from "@/prisma/lib/client"
import { errorValidation } from "@/lib/utils"
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

  // Check user does not already exist
  const user = await prisma.user.findUnique({where: {
    email: data.email
  }})

  if (user) {
    return {
      success: false,
      error: {
        fieldErrors: {
          email: ["Email already exists"]
        },
      }
    }
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  await prisma.user.create({ 
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  })

  redirect('/auth/login');
}
