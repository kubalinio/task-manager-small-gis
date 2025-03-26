export interface StandardizedApiError {
  message: string
  code: string
  status: number
  details?: Record<string, unknown>
}

export class IndexDBError extends Error {
  code: string
  status: number
  details?: Record<string, unknown>

  constructor(
    message: string,
    code = "INDEXDB_ERROR",
    status = 500,
    details?: Record<string, unknown>
  ) {
    super(message)
    this.name = "IndexDBError"
    this.code = code
    this.status = status
    this.details = details
  }

  toStandardizedError(): StandardizedApiError {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
      details: this.details
    }
  }
}

export const handleIndexDBError = (error: unknown): StandardizedApiError => {
  if (error instanceof IndexDBError) {
    return error.toStandardizedError()
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: "UNKNOWN_ERROR",
      status: 500
    }
  }

  return {
    message: "An unknown error occurred",
    code: "UNKNOWN_ERROR",
    status: 500
  }
}

export const createNotFoundError = (
  resource: string,
  id: string
): IndexDBError => {
  return new IndexDBError(
    `${resource} with id ${id} not found`,
    "NOT_FOUND",
    404,
    { resourceId: id, resourceType: resource }
  )
}

export const createValidationError = (
  message: string,
  details?: Record<string, unknown>
): IndexDBError => {
  return new IndexDBError(message, "VALIDATION_ERROR", 422, details)
}
