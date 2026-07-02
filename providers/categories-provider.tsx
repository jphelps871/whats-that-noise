"use client"

import React, { useContext, createContext } from "react";
import { Category } from "@prisma/client";

const CategoriesContext = createContext<Category[] | null>(null)

export function CategoriesProvider({ children, categories }: { children: React.ReactNode, categories: Category[] }) {
  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) throw new Error("useCategories must be used inside CategoriesProvider.");
  return context;
}