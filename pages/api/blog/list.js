/**
 * general function to fetch blog posts
 */
import fetch from 'node-fetch'

export default async function list(req, res) {
  const offset = req.query.offset?req.query.offset:0
  const size   = req.query.limit?req.query.limit:10
  const user   = req.query.user_id?req.query.user_id:''
  const params = `offset=${offset}&limit=${size}&user_id=${user}`
  const url    = `http://${process.env.API_DOMAIN}/api/blog/list?${params}`
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