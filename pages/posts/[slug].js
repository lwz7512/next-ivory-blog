/**
 * each post display template:
 * first get post from cache, then turn to remote(in case of page refresh)
 */
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PlaceHolder from '../../components/placeholder'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import { getPostBy, fetchPostBy } from '../../lib/api'

export default function Post() {

  const router = useRouter()
  const { slug } = router.query
  const cachedPost = getPostBy(slug)
  const [post, setPost] = useState(cachedPost)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // console.log(post) // null, not cached
    // console.log(slug) // undefined, maybe refreshed post page
    if(post) return   // cached and no need to refetch
    if(!slug) return // check undefined, do nothing

    // TRING TO FETCH REMOTE POST...
    fetchPostBy(slug).then(res => {
      if (res.error) return setNotFound(true) // dose not exist at all!
      setPost(res) //got it finally!
    })

    return () => {}
  }, [slug]) // observe slug value: undefined -> n

  if (!slug) {
    return <ErrorPage statusCode={404} />
  }

  const pendingPost = notFound ? (
    <ErrorPage statusCode={404} title={`Opps, I couldn't find ${slug} for you!`} />
  ) : (<PlaceHolder/>)


  return (
    <Layout>
      <Container>
        {!post ? (pendingPost) : (
          <>
            <article className="mb-32 mt-16">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content || 'no content yet'} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}