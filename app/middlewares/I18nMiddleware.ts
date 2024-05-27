// I18nInterMiddleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'
 
const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'bg'],
  defaultLocale: 'en',
  // urlMappingStrategy: 'rewriteDefault',
})
 
export function I18nInterMiddleware(request: NextRequest) {
  return I18nMiddleware(request)
}
 
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}