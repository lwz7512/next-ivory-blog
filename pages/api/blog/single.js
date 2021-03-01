/**
 * fetch one post
 */
import fetch from 'node-fetch'

export default async function single(req, res) {
  const postId = req.query.id
  const url    = `http://${process.env.API_DOMAIN}/api/blog/single/${postId}`
  const resp   = await fetch(url, {
    headers: {
      'Accept': `application/json`,
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
    method: `GET`,
  })
  const json = await resp.json()
  
  res.status(200).send(json)
}