import { Button } from "@/components/ui/button";
import { CalendarWithRange } from "@/components/ui/calendar-with-range";
import { CategoriesSelect } from "@/components/ui/forms/categories-select";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/providers/categories-provider";
import { SubmitHandler, useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterNoiseSchema, type FilterForm } from "@/lib/noise/schema"


const displayDateRange = (dateRange: DateRange) => {
  const fromDate = dateRange.from?.toDateString()
  const toDate = dateRange.to?.toDateString()

  return (
    <div className="flex justify-between text-xs">
      <div>
        <p className="font-bold">Start</p>
        <p>{fromDate}</p>
      </div>

      <div>
        <p className="font-bold">End</p>
        <p>{toDate}</p>
      </div>
    </div>
  )
}

export function FilterNoiseForm() {
  const { handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm<FilterForm>({
    resolver: zodResolver(filterNoiseSchema),
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: new Date(),
      }
    }
  });

  const categories = useCategories();
  // addAllOptionToCategories(useCategories())

  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <CategoriesSelect control={control} id="category" name="category" aria-invalid={!!errors.category} categories={categories} />
          <InputError message={errors?.category?.message} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="dateRange">Date range</Label>
          <div>{displayDateRange(watch("dateRange"))}</div>

          <div className="sm:w-1/1.5">
            <CalendarWithRange control={control} name="dateRange" aria-invalid={!!errors?.dateRange?.to || !!errors?.dateRange?.from} />
          </div>
          <InputError message={errors?.dateRange?.to?.message} />
          <InputError message={errors?.dateRange?.from?.message} />
        </div>

        <div className="space-y-2">
          <Button disabled={isSubmitting} className="w-full">{isSubmitting ? "...filtering results" : "Filter"}</Button>
        </div>
      </div>
    </form>
  )
}