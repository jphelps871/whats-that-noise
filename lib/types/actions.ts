export type ActionError = {
  success: false
  error: {
    fieldErrors: Record<string, string[]>
    formErrors?: string[]
  }
}

export type ActionResponse<T> = 
  | (T extends void
      ? { success: true; data: null }
      : { success: true; data: T })

  | ActionError
