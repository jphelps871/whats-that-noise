"use client";

import React from 'react';
import { SessionProvider as SessionProviderAuth } from "next-auth/react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviderAuth>
      {children}
    </SessionProviderAuth>
  )
}