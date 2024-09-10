'use server'

import { env } from '@goals/env'
import { redirect } from 'next/navigation'

export async function signInWithGoogle() {
  const googleSignInURL = new URL(
    '/o/oauth2/v2/auth',
    'https://accounts.google.com',
  )

  googleSignInURL.searchParams.set('client_id', env.GOOGLE_CLIENT_ID)
  googleSignInURL.searchParams.set(
    'redirect_uri',
    env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI,
  )
  googleSignInURL.searchParams.set('response_type', 'code')

  googleSignInURL.searchParams.set(
    'scope',
    'https://www.googleapis.com/auth/userinfo.email',
  )

  googleSignInURL.searchParams.set('access_type', 'offline')

  redirect(googleSignInURL.toString())
}
