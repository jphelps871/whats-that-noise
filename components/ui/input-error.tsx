import { cn } from "@/lib/utils"

export function InputError({ message, className }: { message?: string, className?: string }) {
  return message && <p role="" className={cn("text-destructive text-sm", className)}>{message}</p>
}