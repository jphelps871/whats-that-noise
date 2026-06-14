import { UseFormSetError, FieldValues, Path } from "react-hook-form";
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

const errorValidation = (error: z.ZodError) => {
  return {
    success: false,
    error: z.flattenError(error)
  }
}

type FlattenedError = {
  success: boolean,
  error: {
    fieldErrors: Record<string, string[]>
  }
}

const errorCreation = (success: boolean, errors: Record<string, string>) => {
  const errorTemplate: FlattenedError = {
    success,
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