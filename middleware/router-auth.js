// This is `@middleware/router-auth.js`
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

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === 'admin')) {
    return true
  }
}
