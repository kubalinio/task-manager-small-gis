import React from "react"

const isDev = process.env.NODE_ENV === "development"

if (isDev) {
  await import("@welldone-software/why-did-you-render").then(
    (whyDidYouRender) => {
      whyDidYouRender.default(React, {
        trackHooks: false,
        trackAllPureComponents: false,
        trackExtraHooks: [
          // Add specific hooks you want to track
          // ['useMemo'],
          // ['useCallback'],
        ],
        exclude: [
          // Exclude components that are known to cause circular references
          /^(RouterProvider|AuthContextController|ApiClientContextController|LocaleContextController)$/
        ],
        logOnDifferentValues: true,
        collapseGroups: true
      })
    }
  )
}
