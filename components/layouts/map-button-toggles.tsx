"use client"

import { Button } from "../ui/button";
import { useToggleCardsOnMap } from "@/providers/toggle-cards-on-map-provider";

export function MapButtonToggles() {
  const { toggle, showToggle } = useToggleCardsOnMap();

  return (
    <Button onClick={toggle} className="mt-4" variant="outline">{showToggle ? 'Hide' : 'Show'} Filters</Button>
  )
}