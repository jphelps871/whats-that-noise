"use client";

import Link from "next/link"
import { AuthPage } from "@/components/auth/auth-page";
import { RegisterForm } from "@/components/forms/auth/register-form";

export default function Register() {
  return (
    <AuthPage title="Register" subtitle={
      <>
        Have an account? <Link href="/auth/login" className="text-blue-700 font-bold">Login</Link>
      </>
    }>

      <RegisterForm />

    </AuthPage >
  )
}