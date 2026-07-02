import React from "react";
import type { Category } from "@prisma/client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectLabel } from "../select";
import { Select as SelectPrimitive } from "radix-ui"
import { Control, FieldValues, Path, useController } from "react-hook-form";

// CATEGORY_GROUPS must match groups in database seed @/prisma/seeders/categories.ts
export const CATEGORY_GROUPS = ["Infrastructure", "Human", "Animals & Nature", "Unclassified"] as const

const categoryGroupMap: Record<string, typeof CATEGORY_GROUPS[number]> = {
  "Infrastructure": "Infrastructure",
  "Human": "Human",
  "Animals & Nature": "Animals & Nature",
  "Unclassified": "Unclassified",
}

type Categories = Record<typeof CATEGORY_GROUPS[number], string[]>

type CategorySelectProps<T extends FieldValues> = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  categories: Category[],
  control: Control<T>,
  name: Path<T>
}

export function CategoriesSelect<T extends FieldValues>({ categories: flatCategories, control, name, ...props }: CategorySelectProps<T>) {
  // Handle setting form data using controller 
  const { field } = useController({
    control,
    name
  })

  // Convert flattened categories from DB into categories split by group
  const categories = flatCategories.reduce((output, category) => {
    const key = categoryGroupMap[category.group];

    if (key) {
      output[key].push(category.name);
    }

    return output;
  }, { "Infrastructure": [], "Human": [], "Animals & Nature": [], "Unclassified": [] } as Categories)

  return (
    <Select
      value={field.value ?? ""}
      onValueChange={field.onChange}
    >
      <SelectTrigger {...props} className="w-full">
        <SelectValue placeholder="Select a noise category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORY_GROUPS.map((group, index) => (
          <React.Fragment key={group}>
            <SelectGroup>
              <SelectLabel>{group}</SelectLabel>

              {categories[group].map(name => (
                <SelectItem value={name} key={name}>{name}</SelectItem>
              ))}
            </SelectGroup>

            {index !== CATEGORY_GROUPS.length - 1 && (
              <SelectSeparator />
            )}
          </React.Fragment>
        ))}
      </SelectContent>
    </Select>
  )
}