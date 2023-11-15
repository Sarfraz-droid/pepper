import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './utils/api/getToken'

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token')

  if (!token || !verifyToken(token.value)) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/admin',
}
