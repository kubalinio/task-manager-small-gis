import type { ExtendedQueryMeta } from "api/types/types"
import type { StandardizedApiError } from "api/utils/error-handler"

import { handleIndexDBError } from "api/utils/error-handler"

export const useHandleQueryErrors = () => {
  const handleErrors = (error: StandardizedApiError) => {
    if (handleIndexDBError(error)) {
      // show translated error message in toast/snackbar
      console.error(error.message)
    }
  }

  const shouldHandleGlobalError = (
    metaError?: ExtendedQueryMeta["error"],
    errorCode?: number
  ) => {
    if (!errorCode || !metaError) {
      return false
    }

    return (
      metaError.showGlobalError && !metaError.excludedCodes.includes(errorCode)
    )
  }

  return { handleErrors, shouldHandleGlobalError }
}
