"use client";

import { Label } from "@/components/ui/label";
import { DateRangeCalendar } from "@/components/ui/date-range-calendar";

import { useToggleCardsOnMap } from "@/providers/toggle-cards-on-map-provider";
import { Card, CardContent } from "../../ui/card";

export default function Filters() {
  const { showToggle } = useToggleCardsOnMap();

  if (!showToggle) return;

  return (
    <Card className="w-full max-w-sm pointer-events-auto">
      <CardContent>
        <Label className="mb-1" htmlFor="search">Date</Label>
        <DateRangeCalendar />
      </CardContent>
    </Card>
  )
}