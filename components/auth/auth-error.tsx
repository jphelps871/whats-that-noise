// components/auth/auth-error.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Typography } from "@/components/ui/Typography";

export function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error !== "OAuthAccountNotLinked") return null;

  return (
    <Typography className="text-destructive text-sm">
      Sorry, something went wrong.
    </Typography>
  );
}