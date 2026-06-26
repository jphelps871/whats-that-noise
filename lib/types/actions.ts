export type ActionResponse<T> = 
  | (T extends void
      ? { success: true }
      : { success: true; data: T })
  | {
      success: false
      error: {
        fieldErrors: Record<string, string[]>
        formErrors?: string[]
      }
    }
