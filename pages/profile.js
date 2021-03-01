import React, { useState, useEffect } from 'react'

import Layout from '../components/layout'
import Container from '../components/container'
import PostPreview from '../components/post-preview'
import {getUser} from '../lib/auth'
import {fetchPostsBy} from '../lib/api'

export default function ProfilePage() {

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const cachedUser = getUser()
    setUser(cachedUser.name)
    setEmail(cachedUser.email)
    
    fetchPostsBy(10, cachedUser.id, 0).then(res => setPosts(res))

    return () => {}
  }, []);

  return (
    <Layout>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
          <h1 className="border-b-2 border-gray-600 text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            My Profile
          </h1>
          <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
            👤 - {user} <br/> 📪 - {email}
          </h4>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
            {!posts.length && 'No posts yet.'}
            {posts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                thumbImage={post.thumbImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        </section>
      </Container>
    </Layout>
  )
}