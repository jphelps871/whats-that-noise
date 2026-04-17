'use client'

import React from "react";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AddMarker() {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogTitle>Add Noise</DialogTitle>
        <DialogDescription>
          You have just dropped down a marker, to save the noise fill out this form.
        </DialogDescription>

        <Card className="w-full max-w-sm">
          <CardContent>
            <p>Add marker form</p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}