import { UseFormSetError, FieldValues, Path } from "react-hook-form"

export function applyServerErrors<T extends FieldValues>(
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