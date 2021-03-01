/**
 * client side api calling
 */

import {
  DEFAULT_COVER, DEFAULT_AVATAR, DEFAULT_THUMB
} from './constants'
import { cacheLoginUser } from './auth'

//page_number : posts_list
const BLOG_CACHE = {}
const BLOG_STATE = {
  currentPage : 0  // homepage paging number
}

/**
 * get cached posts in browser local storage to save network traffic
 * @param {string} page 
 */
export const getPostsBy = page => BLOG_CACHE[page]
/**
 * get cached post in browser local storage to save network traffic
 * @param {string} slug post id
 */
export const getPostBy  = slug => {
  const posts = BLOG_CACHE[BLOG_STATE.currentPage]
  if(!posts) return null

  let post = null
  posts.forEach(p => {
    if(p.slug == slug) post = p
  })
  return post
}
// iversoft blog obj --> ivery post obj
const blogTransformer = blog => {
  
  const post = {
    title      : 'Fake Title',
    coverImage : '',
    thumbImage  : '',
    date       : '',
    excerpt    : '',
    author     : {
      name     : '',
      picture  : ''
    },
    slug       : ''
  }
  post.title      = blog.title
  post.coverImage = blog.image?blog.image.file_sizes.large.url:DEFAULT_COVER
  post.thumbImage = blog.image?blog.image.file_sizes.thumb.url:DEFAULT_THUMB
  post.date       = blog.created_at
  post.excerpt    = blog.content.substr(0, 30)
  post.author.name= blog.author_user.name
  post.author.picture = DEFAULT_AVATAR
  post.slug       = blog.id

  return post
}

/**
 * cache current post list
 * @param {string|number} page page or user id
 * @param {Array} posts post list
 */
const cachePosts = (page, posts) => {
  BLOG_CACHE[page] = posts
}

/**
 * general api to fetch remote posts, support pagination
 * @param {number} size post size for one page
 * @param {string} userId user id
 * @param {number} page which page to fetch
 */
export async function fetchPostsBy(size = 10, userId = '', page = 0) {
  const offset = size * page
  const params = `offset=${offset}&limit=${size}&user_id=${userId}`
  const res = await fetch(`/api/blog/list?${params}`)
  if (res.status !== 200) return []

  const json = await res.json()
  const posts = json.data.map(blogTransformer)
  // cache current post list
  const currentPage = userId ? userId : page
  BLOG_STATE.currentPage = currentPage
  cachePosts(currentPage, posts)

  return posts
}

/**
 * fetch one post by slug/id
 * @param {string} id post slug/id
 */
export async function fetchPostBy(id) {
  const res = await fetch(`/api/blog/single?id=${id}`)
  if (res.status === 200) {
    const json = await res.json()
    if(json.error) return json // dose not exits

    return blogTransformer(json) // got it
  } else {
    return {error : 'Opps, something wrong!'}
  }
}

/**
 * login function
 * @param {string} email user registered email
 * @param {string } password user password
 */
export async function signin(email, password) {
  const res = await fetch(`/api/users/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email, password}),
  })
  if (res.status === 200) {
    const userObj = await res.json();
    if(userObj.error) return false // invalid_credentials

    const {token, expires, user} = userObj
    if(!token || !expires || !user) return

    cacheLoginUser(token, expires, user)
    return true
  } else {// backend error
    return false
  }
}

/**
 * signup function
 * @param {string} name user name
 * @param {string} email user registered email
 * @param {string } password user password
 */
export async function signup(name, email, password) {
  const res = await fetch(`/api/users/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name, email, password}),
  })
  if (res.status === 200) {
    const userObj = await res.json();
    if(userObj.error) return false // invalid_credentials

    const {token, expires, user} = userObj
    if(!token || !expires || !user) return

    cacheLoginUser(token, expires, user)
    return true
  } else {// backend error
    return false
  }
}

// TODO: ...
export async function updateUser(name, email, password) {

}
