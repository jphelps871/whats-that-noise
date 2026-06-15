import bcrypt from "bcryptjs";
import { prisma } from "../client";

// Create
const createUser = async (user: {
  name: string,
  email: string,
  password: string
}) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);

  await prisma.user.create({ 
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword
    }
  })
}

// Read
// Update
// Delete

export {createUser}