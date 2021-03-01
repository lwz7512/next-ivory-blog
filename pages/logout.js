import Layout from '../components/layout'
import Container from '../components/container'
import PostTitle from '../components/post-title'
import { useRouter } from 'next/router'
import { logout } from '../lib/auth'

export default function LogoutPage() {

  logout()
  
  const router = useRouter()
  router.replace('/')

  return (
    <Layout>
      <Container>
        <h1 className="p-10" >forward to homepage...</h1>
      </Container>
    </Layout>
  )
}