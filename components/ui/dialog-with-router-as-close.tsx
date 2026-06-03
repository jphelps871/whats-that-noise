"use client"

import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function DialogWithRouterAsClose({ ...props }: React.ComponentProps<typeof Dialog>) {
  const router = useRouter();

  return <Dialog data-slot="dialog" onOpenChange={() => router.back()} {...props} />
}