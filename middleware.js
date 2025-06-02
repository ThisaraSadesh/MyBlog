import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define routes that are accessible to the public
const publicRoutes = ['/login'];

// Define routes that require specific roles
const roleBasedRoutes = {
  '/admin': ['admin'],
  '/admin/sessions': ['admin'],
  '/manager': ['admin', 'manager'],
  '/api/admin': ['admin'],
};

// Define routes that any authenticated user can access
const authenticatedRoutes = ['/dashboard'];

export async function middleware(request) {
  // Handle root path - redirect based on authentication status
  if (request.nextUrl.pathname === '/') {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    if (token) {
      // Authenticated users go to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      // Unauthenticated users go to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Check if the route is public (should not be protected)
  const isPublicRoute = publicRoutes.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get the user's auth token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // If there is no token, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Check if the route is for authenticated users only (no specific role required)
  if (authenticatedRoutes.some(route => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }
  
  // Check if the route requires a specific role
  for (const [route, roles] of Object.entries(roleBasedRoutes)) {
    if (request.nextUrl.pathname.startsWith(route) && !roles.includes(token.role)) {
      // User doesn't have the required role
      return new NextResponse(
        JSON.stringify({ message: 'Access denied: Insufficient permissions' }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }
  }
  
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Apply to all routes except API routes, static files, fonts, and images
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)',
  ],
};