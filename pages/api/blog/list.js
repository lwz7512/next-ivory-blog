/**
 * ivory api for client to call iversoft api
 */
import fetch from 'node-fetch'

export default async function(req, res) {
  const size = req.query.limit
  const user = req.query.user_id
  const url  = `http://${process.env.API_DOMAIN}/api/blog/list?offset=0&limit=${size}&user_id=${user}`
  const resp = await fetch(url, {
    headers: {
      'Accept': `application/json`,
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
    method: `GET`,
  })
  const json = await resp.json()

  res.status(200).send(json)
}