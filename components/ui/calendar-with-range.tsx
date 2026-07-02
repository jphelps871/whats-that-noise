import * as React from "react"
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { enGB } from "react-day-picker/locale";
import { Control, useController, type FieldValues, type Path } from "react-hook-form";
import { DayPicker } from "react-day-picker";

type CalendarWithRangeProps<T extends FieldValues> = React.ComponentProps<typeof DayPicker> & {
  control: Control<T>,
  name: Path<T>,
  ['aria-invalid']: boolean,
}

export function CalendarWithRange<T extends FieldValues>({ control, name, ...props }: CalendarWithRangeProps<T>) {
  const { field } = useController({ control, name })
  // const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  /* Better handles selecting past and present dates */
  const handleSelect = (nextRange: DateRange | undefined, selectedDay: Date) => {
    if (field.value?.from && field.value?.to) {
      field.onChange({ from: selectedDay, to: undefined });
      return
    }

    field.onChange(nextRange);
  };

  const ariaInvalidClasses = props['aria-invalid'] && "border-destructive ring-3 ring-destructive/20";

  return (
    <Calendar
      {...props}
      mode="range"
      selected={field.value}
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