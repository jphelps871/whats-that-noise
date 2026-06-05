"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapButtonToggles } from "@/components/map/ui/map-button-toggles";

export function TopNav() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center">
      <MapButtonToggles />

      <div className="flex gap-2">
        {!session ? (
          <Button asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
        ) : (
          <Button variant="outline" onClick={() => signOut()}>
            Sign out
          </Button>
        )}
      </div>
    </div>
  );
}