'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { useConsent } from './ConsentProvider'
import { consentConfig } from '@/app/lib/consent/consent-config'

export function ConsentScriptLoader() {
  const { consent } = useConsent()

  const gaId = consentConfig.scripts.gaId

  return (
    <>
      {consent.analytics && gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  )
}
