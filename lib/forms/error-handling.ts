import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import { ActionError } from "../types/actions";
import { z } from "zod";

function applyServerErrors<T extends FieldValues>(
  fieldErrors: Record<string, string[]>, 
  setError: UseFormSetError<T>
) {
  Object.entries(fieldErrors)
    .forEach(([fieldName, message]) => {
      const errorMessage = message?.[0]

      if (!errorMessage) {
        console.warn("Missing error message for field:", fieldName)
        return
      }

      setError(fieldName as Path<T>, {
        message: errorMessage
      })
    }
  )
}

// Handle and organise Zod created errors into frontend readable errors
const errorValidation = (error: z.ZodError): ActionError => {
  return {
    success: false,
    error: z.flattenError(error)
  }
}

type FlattenedError = {
  success: false,
  error: {
    fieldErrors: Record<string, string[]>
  }
}

// Handle user created errors
const errorCreation = (errors: Record<string, string>) => {
  const errorTemplate: FlattenedError = {
    success: false,
    error: {
      fieldErrors: {}
    }
  }

  Object.entries(errors).forEach(([field, message]) => {
    // Front end expects an array, so message is in single array
    errorTemplate.error.fieldErrors[field] = [message]
  })

  return errorTemplate
}

export {applyServerErrors, errorValidation, errorCreation}