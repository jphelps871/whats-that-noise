"use client"

import type { Category } from "@prisma/client";

import { useSearchParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategoriesSelect } from "@/components/ui/forms/categories-select";
import { useForm, SubmitHandler } from "react-hook-form";
import { type NoiseFormProps, registerNoiseSchema } from "@/lib/noise/schema";
import { CalendarWithTime } from "@/components/ui/calendar-with-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputError } from "@/components/ui/input-error";
import { createNoise } from "@/lib/noise/actions/create";
import { Button } from "@/components/ui/button";
import { applyServerErrors } from "@/lib/forms/error-handling";
import { useSWRConfig } from "swr";

export default function AddNoiseForm({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams(); // params from inner-map.tsx saved in URL
  const router = useRouter();

  const lat = Number(searchParams.get("lat") ?? 0);
  const lng = Number(searchParams.get("lng") ?? 0);

  const { mutate } = useSWRConfig();

  const { register, handleSubmit, setError, control, formState: { errors, isSubmitting } } = useForm<NoiseFormProps>({
    resolver: zodResolver(registerNoiseSchema),
    defaultValues: {
      dateOfNoise: new Date(),
      lat,
      lng,
    }
  })

  const onSubmit: SubmitHandler<NoiseFormProps> = async (data) => {
    const res = await createNoise(data);

    if (res && !res.success) {
      const { fieldErrors } = res.error;
      applyServerErrors(fieldErrors, setError);
      return;
    }

    await mutate(
      // Force data refresh on 'display-markers.tsx'
      (key) => typeof key === "string" && key.startsWith("/api/noise")
    );
    router.back();
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
          <Button disabled={isSubmitting} className="w-full">{isSubmitting ? "...adding noise" : "Submit"}</Button>
        </div>
      </div>
    </form>
  )
}