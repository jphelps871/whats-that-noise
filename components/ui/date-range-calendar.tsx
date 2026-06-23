import * as React from "react"
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { enGB } from "react-day-picker/locale";

export function DateRangeCalendar({ ...props }) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  /* Better handles selecting past and present dates */
  const handleSelect = (nextRange: DateRange | undefined, selectedDay: Date) => {
    setDateRange((range) => {
      if (range?.from && range?.to) return { from: selectedDay };
      return nextRange;
    });
  };

  const ariaInvalidClasses = props["aria-invalid"] && "border-destructive ring-3 ring-destructive/20"

  return (
    <Calendar
      {...props}
      mode="range"
      selected={dateRange}
      onSelect={handleSelect}
      className={`rounded-lg border w-full ${ariaInvalidClasses}`}
      captionLayout="dropdown"
      locale={enGB}
      disabled={(date) =>
        date > new Date()
      }
    />
  )
}