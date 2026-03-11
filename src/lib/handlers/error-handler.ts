import { toast } from 'sonner'
import { AxiosError } from 'axios'
import type { UseFormSetError, FieldValues, Path } from 'react-hook-form'

interface ValidationErrorResponse {
  message?: string
  errors?: Record<string, string | string[]>
}

interface ErrorHandlerOptions<T extends FieldValues> {
  setError?: UseFormSetError<T>
}

export function handleError<T extends FieldValues>(
  error: unknown,
  options: ErrorHandlerOptions<T> = {}
) {
  const { setError } = options

  if (error instanceof AxiosError) {
    const status = error.response?.status
    const data = error.response?.data as ValidationErrorResponse | undefined

    // Standard REST validation errors (422)
    if (status === 422 && data?.errors && setError) {
      Object.entries(data.errors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages
        setError(field as Path<T>, {
          type: 'server',
          message,
        })
      })
      toast.error(data.message ?? 'Please fix the errors below.')
      return
    }

    const message = data?.message ?? getHttpErrorMessage(status)
    toast.error(message)
    return
  }

  if (error instanceof Error) {
    toast.error(error.message)
    return
  }

  toast.error('An unexpected error occurred.')
}

function getHttpErrorMessage(status?: number): string {
  switch (status) {
    case 400: return 'Bad request.'
    case 401: return 'You are not authenticated.'
    case 403: return 'You are not authorized to do this.'
    case 404: return 'Resource not found.'
    case 500: return 'Server error. Please try again later.'
    default:  return 'Something went wrong.'
  }
}
