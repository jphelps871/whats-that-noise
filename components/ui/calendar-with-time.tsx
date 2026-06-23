"use client"

import { Clock2Icon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Typography } from "./Typography"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useController } from "react-hook-form"
import type { Control } from "react-hook-form"
import { registerMarkerSchema } from "@/lib/schemas/marker"
import { z } from "zod"

type CalendarWithTimeProps = {
  control: Control<z.infer<typeof registerMarkerSchema>>
  name: "dateOfNoise"
}

export function CalendarWithTime({ control, name }: CalendarWithTimeProps) {
  const { field } = useController({
    control,
    name,
  });

  // Set default time
  const currentTime = field.value.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDateOnChange = (date = field.value) => {
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
    const [hours, minutes, seconds] = time.split(":").map(Number);

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
    <Card size="sm" className="w-full">
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
                aria-describedby="time-helper"
                onChange={(time) => handleTimeOnChange(time.target.value)}
                defaultValue={currentTime}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>

            {/* Note on time logic on submit */}
            <Typography
              id="time-helper"
              className="text-wrap">
              If you select a future date or time, it will automatically be
              changed to the current time.
            </Typography>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
