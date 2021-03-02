import React, { useEffect } from 'react'

import Layout from '../components/layout'
import Container from '../components/container'
import PostTitle from '../components/post-title'
import { useRouter } from 'next/router'
import { logout } from '../lib/auth'

export default function LogoutPage() {

  const router = useRouter()
  
  useEffect(() => {
    logout()
    router.replace('/')
    return () => {}
  }, []);

  return (
    <Layout>
      <Container>
        <h1 className="p-10" >forward to homepage...</h1>
      </Container>
    </Layout>
  )
}