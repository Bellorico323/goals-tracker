export function decodeJwt<T>(token: string): T {
  const base64Payload = token.split('.')[1]

  const payload = Buffer.from(base64Payload, 'base64').toString('utf-8')

  return JSON.parse(payload)
}
