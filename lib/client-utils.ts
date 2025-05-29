'use client'

import React from 'react'
import { useEffect, useState } from 'react'

export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}

export function withHydration<P extends object>(Component: React.ComponentType<P>) {
  return function HydratedComponent(props: P) {
    const isHydrated = useHydration()
    
    if (!isHydrated) {
      return null // or a loading skeleton
    }
    
    return <Component {...props} />
  }
}
