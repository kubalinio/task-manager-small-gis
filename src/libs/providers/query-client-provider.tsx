import { useMemo } from "react"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider
} from "@tanstack/react-query"

import type { StandardizedApiError } from "api/utils/error-handler"

const metaErrorConfig = { error: { showGlobalError: true, excludedCodes: [] } }

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  // const { handleErrors, shouldHandleGlobalError } = useHandleQueryErrors();

  const mutationCache = new MutationCache({
    onError: (err, variables, context, mutation) => {
      const error = err as unknown as StandardizedApiError
      // shouldHandleGlobalError((mutation.meta as ExtendedQueryMeta)?.error, error?.statusCode) && handleErrors(error);
      console.log("error", error)
    }
  })

  const queryCache = new QueryCache({
    onError: (err, query) => {
      const error = err as unknown as StandardizedApiError
      console.log("error", error)
      // shouldHandleGlobalError((query.meta as ExtendedQueryMeta)?.error, error?.statusCode) && handleErrors(error);
    }
  })

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, meta: metaErrorConfig }
        },
        mutationCache,
        queryCache
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  )
}

export { QueryClientProvider }
