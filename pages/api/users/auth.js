/**
 * authenticate user with email and password
 */
import fetch from 'node-fetch'
import FormData from 'form-data'

export default async function auth(req, res) {
  const email  = req.body.email
  const passwd = req.body.password
  const form = new FormData()
  form.append('email', email)
  form.append('password', passwd)
  const url    = `http://${process.env.API_DOMAIN}/api/authenticate`
  const resp   = await fetch(url, {
    headers: {
      'Accept': `application/json`,
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
    method: `POST`,
    body  : form
  })
  const json = await resp.json()
  // exception occured
  if(json.exception) return res.status(500).json({exception:json.exception})

  res.status(200).send(json)
}