/**
 * auth utils function, handling local session state
 * 
 * @2021/02/26
 */

const USER_LOCSTORE_KEY   = 'nib:user'
const USER_SESSION_TOKEN  = 'nib:token'
const USER_SESSION_EXPIRY = 'nib:expiry'
const user = {}


export const tokens = {
  userToken: '',
  expires  : ''
}

// FIRST TO EXECUTE IN _app.js
// check local storage, init global consts
export const checkSession = () => {
  let cachedUser = localStorage.getItem(USER_LOCSTORE_KEY)
  if(cachedUser) Object.assign(user, JSON.parse(cachedUser))

  let cachedToken = localStorage.getItem(USER_SESSION_TOKEN)
  if(cachedToken) tokens.userToken = cachedToken

  let cachedExpiry = localStorage.getItem(USER_SESSION_EXPIRY)
  if(cachedExpiry) tokens.expires = cachedExpiry
}

// check token existence & expiry
export const isAuthenticated = () => {
  // first, check tokens.userToken
  if(!tokens.userToken) return false
  // then, check expiry
  const now = new Date()
  const expiryDate = new Date(tokens.expires)
  if(now.getTime() > expiryDate.getTime()) return false
  // else, logged in and not expired
  return true
}

/**
 * cache authenticated response for later use
 * 
 * @param {string} token user token
 * @param {string} expires expiry date
 * @param {object} user user profile
 */
export const cacheLoginUser = (token, expires, user) => {
  localStorage.setItem(USER_SESSION_TOKEN, token)
  localStorage.setItem(USER_SESSION_EXPIRY, expires)
  localStorage.setItem(USER_LOCSTORE_KEY, JSON.stringify(user))
}

// clear cached user info...
export const logout = () => {
  localStorage.removeItem(USER_SESSION_TOKEN)
  localStorage.removeItem(USER_SESSION_EXPIRY)
  localStorage.removeItem(USER_LOCSTORE_KEY)

  Object.keys(user).forEach(key => delete user[key])
  delete tokens.expires
  delete tokens.userToken
}


export const getUser = () => {
  return Object.keys(user).length ? user : null
}

export const isBrowser = typeof window !== "undefined"