/**
 * @module Middleware-router-auth
 * @desc Router middleware that supports authentication based redirects, both for SSR and static pages.
 * - Checks if the request is being made on server side or client side
 * - It accordingly parses cookies to obtain the logged-in user info
 * - If user is authenticated and route is login, redirect to admin page
 * - If user is unauthenticated and the `isAdminRoute = true`, redirect to login page
 */
import Cookie from 'js-cookie'
import cookieparser from 'cookieparser'

export default function({ store, redirect, route, req }) {
  var owner = null
  var cookie = null

  if (process.server && req) {
    // Server side
    if (req.headers.cookie) {
      cookie = cookieparser.parse(req.headers.cookie)
    }
  } else {
    // Client side (For static pages)
    cookie = Cookie.get()
  }

  try {
    owner = JSON.parse(cookie.owner)
  } catch (err) {
    // No valid cookie found
  }

  if (owner !== null && route.name === 'login') {
    redirect('admin')
  }
  if (owner === null && isAdminRoute(route)) {
    redirect('login')
  }
}
/**
 * Checks if the route is accessible by authenticated user (Admin)
 * @param {Object} route
 * @returns {Boolean}
 */
function isAdminRoute(route) {
  if (route.matched.some(record => record.path === 'admin')) {
    return true
  }
}
