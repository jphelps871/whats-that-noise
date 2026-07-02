"use client";

import { useToggleCardsOnMap } from "@/providers/toggle-cards-on-map-provider";
import { Card, CardContent } from "../../ui/card";
import { FilterNoiseForm } from "@/components/forms/noise/filter-noise-form";

export function Filters() {
  const { showToggle } = useToggleCardsOnMap();

  if (!showToggle) return;

  return (
    <Card className="w-full max-w-sm pointer-events-auto">
      <CardContent>
        <FilterNoiseForm />
      </CardContent>
    </Card>
  )
}