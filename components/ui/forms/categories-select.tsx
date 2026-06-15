import React from "react";
import type { Category } from "@prisma/client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectSeparator } from "../select";

const categoryGroups = ["infrastructure", "human", "animalsAndNature", "unclassified"] as const

const categoryGroupMap: Record<string, typeof categoryGroups[number]> = {
  "Infrastructure": "infrastructure",
  "Human": "human",
  "Animals & Nature": "animalsAndNature",
  "Unclassified": "unclassified"
}

type Categories = Record<typeof categoryGroups[number], string[]>

export function CategoriesSelect({ categories: flatCategories }: { categories: Category[] }) {

  // Convert flattened categories from DB into categories split by group
  const categories = flatCategories.reduce((output, category) => {
    const key = categoryGroupMap[category.group];

    if (key) {
      output[key].push(category.name);
    }

    return output;
  }, { infrastructure: [], human: [], animalsAndNature: [], unclassified: [] } as Categories)

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a noise category" />
      </SelectTrigger>
      <SelectContent>
        {categoryGroups.map((group, index) => (
          <React.Fragment key={group}>
            <SelectGroup>
              {categories[group].map(name => (
                <SelectItem value={name} key={name}>{name}</SelectItem>
              ))}
            </SelectGroup>

            {index !== categoryGroups.length - 1 && (
              <SelectSeparator />
            )}
          </React.Fragment>
        ))}
      </SelectContent>
    </Select>
  )
}