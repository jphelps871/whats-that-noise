"use client"

import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Category } from "@prisma/client";
import { CategoriesSelect } from "@/components/ui/forms/categories-select";
import { DateRangeCalendar } from "@/components/ui/date-range-calendar";

type AddMarkerFormProps = {
  categories: Category[]
}

export default function AddMarkerForm({ categories }: AddMarkerFormProps) {
  const searchParams = useSearchParams(); // Params from inner-map.tsx

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <form action="">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Category</Label>
          <CategoriesSelect categories={categories} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Time</Label>
          <div className="sm:w-1/2">
            <DateRangeCalendar />
          </div>
        </div>

      </div>
    </form>
  )
}