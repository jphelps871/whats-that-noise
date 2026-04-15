"use client"

import React from "react";

export const ToggleCardsOnMapContext = React.createContext<{
  showToggle: boolean
  toggle: () => void
} | null>(null);

export function ToggleCardsOnMapProvider({ children }: { children: React.ReactNode }) {
  const [showToggle, setShowToggle] = React.useState(false);

  return (
    <ToggleCardsOnMapContext.Provider value={{
      toggle: () => setShowToggle((v) => !v),
      showToggle
    }}>
      {children}
    </ToggleCardsOnMapContext.Provider>
  )
}

export function useToggleCardsOnMap() {
  const context = React.useContext(ToggleCardsOnMapContext);

  if (!context) {
    throw new Error("useToggleCardsOnMap must be used inside ToggleCardsOnMapProvider.");
  }

  return context;
}