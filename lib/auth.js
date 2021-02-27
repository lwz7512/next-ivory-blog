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
  apiBase  : '',
  apiToken : '',
  userToken: '',
  expires  : ''
}

// FIRST TO EXECUTE IN _app.js
// check local storage, init global consts
export const checkSession = () => {
  console.log('>>> check session on dom ready !')

  let cachedUser = localStorage.getItem(USER_LOCSTORE_KEY)
  if(cachedUser) Object.assign(user, JSON.parse(cachedUser))

  let cachedToken = localStorage.getItem(USER_SESSION_TOKEN)
  if(cachedToken) tokens.userToken = cachedToken

  let cachedExpiry = localStorage.getItem(USER_SESSION_EXPIRY)
  if(cachedExpiry) tokens.expires = cachedExpiry
}

// TODO: check token existence & expiry
export const isAuthenticated = () => {
  // first, check tokens.userToken

  // then, check expiry

  // else, return false
  return !!tokens.userToken
}


export const logout = () => {}


export const getUser = () => {
  console.log('>>> got user!')
  return Object.keys(user).length ? user : null
}

export const isBrowser = typeof window !== "undefined"