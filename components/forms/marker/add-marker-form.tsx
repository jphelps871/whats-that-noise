"use client"

import type { Category } from "@prisma/client";

import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategoriesSelect } from "@/components/ui/forms/categories-select";
import { useForm, SubmitHandler } from "react-hook-form";
import { type MarkerFormProps, registerMarkerSchema } from "@/lib/schemas/marker";
import { CalendarWithTime } from "@/components/ui/calendar-with-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputError } from "@/components/ui/input-error";
import { createMarker } from "@/app/actions/marker/create-marker";
import { Button } from "@/components/ui/button";
import { applyServerErrors } from "@/lib/forms/error-handling";

export default function AddMarkerForm({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams(); // params from inner-map.tsx saved in URL
  const { register, handleSubmit, setError, control, formState: { errors } } = useForm<MarkerFormProps>({
    resolver: zodResolver(registerMarkerSchema),
    defaultValues: {
      dateOfNoise: new Date(),
      lat: Number(searchParams.get('lat') ?? ""),
      lng: Number(searchParams.get('lng') ?? ""),
    }
  })

  const onSubmit: SubmitHandler<MarkerFormProps> = async (data) => {
    const res = await createMarker(data);

    if (res && !res.success) {
      const { fieldErrors } = res.error
      applyServerErrors(fieldErrors, setError)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3">
        {/* There should always be lat and lng from URL, if not throw validation errors here */}
        <InputError message={errors?.lat?.message} />
        <InputError className="mb-3" message={errors?.lng?.message} />

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea {...register('description')} aria-invalid={!!errors.description} id="description" name="description" />
          <InputError message={errors?.description?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <CategoriesSelect control={control} id="category" name="category" aria-invalid={!!errors.category} categories={categories} />
          <InputError message={errors?.category?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="timeOfNoise">Date & Time</Label>
          <div className="sm:w-1/2">
            <CalendarWithTime control={control} name="dateOfNoise" aria-invalid={!!errors.dateOfNoise} />
          </div>
          <InputError message={errors?.dateOfNoise?.message} />
        </div>

        <div className="space-y-1.5">
          <Button className="w-full">Submit</Button>
        </div>
      </div>
    </form>
  )
}