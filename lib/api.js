/**
 * client side api calling
 */

import { tokens } from './auth'
import { DEFAULT_COVER, DEFAULT_AVATAR, DEFAULT_THUMB} from './constants'

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

export async function getHomepagePosts(size = 10, userId = '') {
  const res = await fetch(`/api/blog/list?offset=0&limit=${size}&user_id=${userId}`)
  if (res.status === 200) {
    const json = await res.json()
    return json.data.map(blogTransformer)
  } else {
    return []
  }
}


// TODO: login with email & password
// save returned info to cache
// http://cms.iversoft.ca/api/authenticate
export async function signin(email, password) {

}

export async function signup(name, email, password) {

}

export async function updateUser(name, email, password) {

}



// ================= legacy functions to be deleted ====================

export function getPostSlugs() {
  return []
}

export function getPostBySlug(slug, fields = []) {
  return []
}

export function getAllPosts(fields = []) {
  return []
}
