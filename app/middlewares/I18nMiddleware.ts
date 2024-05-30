// I18nInterMiddleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest, NextResponse } from 'next/server'
import type { NextFetchEvent } from 'next/server'
import { CustomMiddleware } from './chain'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'bg'],
  defaultLocale: 'en',
  // urlMappingStrategy: 'rewriteDefault',
})

export function I18nInterMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const result = await I18nMiddleware(request)
    if (result instanceof NextResponse) {
      return result
    }
    return middleware(request, event, response)
  }
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}