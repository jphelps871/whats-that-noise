import { prisma } from "@/prisma/lib/client"
import { Prisma } from "@prisma/client"

type RegisterUser = Prisma.UserUncheckedCreateInput

export const registerUserRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({where: { email }})
  },

  registerUser(data: RegisterUser) {
    return prisma.user.create({data})
  }
}