"use client";

import Link from "next/link"
import { LoginForm } from "@/components/forms/auth/login-form";
import { AuthPage } from "@/components/auth/auth-page";

export default function Login() {
  return (
    <AuthPage title="Login" subtitle={
      <>
        Don't have an account? <Link href="/auth/register" className="text-blue-700 font-bold">Sign up</Link>
      </>
    }>

      <LoginForm />

    </AuthPage >
  )
}