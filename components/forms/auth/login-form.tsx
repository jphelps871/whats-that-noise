"use client";

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUserSchema } from "@/lib/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { redirect } from "next/navigation";

type UserFormProps = z.infer<typeof loginUserSchema>;

export function LoginForm() {
  const { register, handleSubmit, setError, formState: { errors }, } = useForm<UserFormProps>({
    resolver: zodResolver(loginUserSchema)
  });

  const onSubmit: SubmitHandler<UserFormProps> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (res?.error) {
      setError("email", { message: "Sorry, something went wrong." })
      setError("password", { message: "Sorry, something went wrong." })
      console.log("Login failed");
      return;
    }

    redirect("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-4" noValidate>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input {...register("email")} aria-invalid={!!errors.email} type="email" id="email" />
        {errors.email?.message && (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input {...register("password")} aria-invalid={!!errors.password} type="password" id="password" />
        {errors.password?.message && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="mt-4 w-full">
        Submit
      </Button>
    </form>
  )
}