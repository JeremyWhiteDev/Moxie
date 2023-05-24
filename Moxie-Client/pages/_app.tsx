import '@/styles/globals.css'
import { AuthProvider } from '@/utils/AuthProvider'
import { ViewDirectorBasedOnAuth } from '@/utils/ViewDirector'
import type { AppProps } from 'next/app'
import { Router, useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <ViewDirectorBasedOnAuth Component={Component} pageProps={pageProps} />
    </AuthProvider>)


}
