"use client"

import { Clock2Icon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useController } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"

type CalendarWithTimeProps<T extends FieldValues> = React.ComponentProps<"div"> & {
  control: Control<T>
  name: Path<T>
}

export function CalendarWithTime<T extends FieldValues>({ control, name, ...props }: CalendarWithTimeProps<T>) {
  const { field } = useController({ control, name });

  if (!field.value) return <p className="text-destructive font-bold">No default date or time set!</p>

  // Set value for time input
  const currentTime = field.value.toLocaleTimeString("en-GB");

  const handleDateOnChange = (date: Date | undefined) => {
    // date should never be undefined
    if (!date) {
      console.error("Date is empty from Calendar");
      return
    }

    const current = field.value;

    const updated = new Date(current);
    updated.setFullYear(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    field.onChange(updated);
  }

  const handleTimeOnChange = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number); // ensure is Number for date to be handled

    const updated = new Date(field.value);
    updated.setHours(hours, minutes, seconds, 0);

    const now = new Date();

    if (updated > now) {
      field.onChange(now);
      return;
    }

    field.onChange(updated);
  }

  return (
    <Card {...props} size="sm" className="w-full aria-invalid:border aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40">
      <CardContent>
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={(date) => handleDateOnChange(date)}
          className="p-0 w-full"
          disabled={(date) =>
            date > new Date()
          }
        />
      </CardContent>
      <CardFooter className="border-t bg-card">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="time">Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time"
                type="time"
                step="1"
                value={currentTime}
                onChange={(time) => handleTimeOnChange(time.target.value)}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
