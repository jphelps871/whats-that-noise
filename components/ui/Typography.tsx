import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const TypographyVariants = cva(
  "scroll-m-20 text-center tracking-tight text-balance",
  {
    variants: {
      variant: {
        h1: "text-4xl font-extrabold",
        h2: "text-3xl font-semibold",
        p: "text-md font-medium"
      }
    },
    defaultVariants: {
      variant: "p"
    }
  }
)

type TypographyProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof TypographyVariants>

export function Typography({ className, variant = 'p', ...props }: TypographyProps) {
  const Component = variant ?? 'p'

  return (
    <Component {...props} className={TypographyVariants({ variant, className })} />
  )
}