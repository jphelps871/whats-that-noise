"use client";

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/app/actions/auth";
import { registerUserSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { applyServerErrors } from "@/lib/forms/applyServerErrors";

type UserFormProps = z.infer<typeof registerUserSchema>;

export function RegisterForm() {
  const { register, handleSubmit, setError, formState: { errors }, } = useForm<UserFormProps>({
    resolver: zodResolver(registerUserSchema)
  });

  const onSubmit: SubmitHandler<UserFormProps> = async (data) => {
    const res = await registerUser(data);

    if (!res) {
      setError("email", { message: "Something went wrong." });
      return
    }

    if (!res.success) {
      const { fieldErrors } = res.error
      applyServerErrors(fieldErrors, setError)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input {...register("name")} aria-invalid={!!errors.name} id="name" />
        {errors.name?.message && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </div>

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

      <Button className="mt-4 w-full">
        Submit
      </Button>
    </form>
  )
}