"use client";

import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { enGB } from "react-day-picker/locale";

import * as React from "react"
import { useToggleCardsOnMap } from "@/providers/toggle-cards-on-map-provider";
import { Card, CardContent } from "../ui/card";

export default function Filters() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const { showToggle } = useToggleCardsOnMap();

  if (!showToggle) return;

  const handleSelect = (nextRange: DateRange | undefined, selectedDay: Date) => {
    setDateRange((range) => {
      if (range?.from && range?.to) return { from: selectedDay };
      return nextRange;
    });
  };

  return (
    <Card className="w-full max-w-sm pointer-events-auto">
      <CardContent>
        <Label className="mb-1" htmlFor="search">Date</Label>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          className="rounded-lg border w-full"
          captionLayout="dropdown"
          locale={enGB}
          disabled={(date) =>
            date > new Date()
          }
        />
      </CardContent>
    </Card>
  )
}