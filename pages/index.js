/**
 * Homepage for Ivory blog
 */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import PlaceHolder from '../components/placeholder'
import { fetchPostsBy } from '../lib/api'
import { CMS_NAME, BLOG_LIST_LEN } from '../lib/constants'


export default function Index() {
  const [allPosts, setAllPosts] = useState([]);
  const heroPost = allPosts[0]?allPosts[0]:null
  const morePosts = allPosts.slice(1)?allPosts.slice(1):[]
  
  useEffect(() => {
    fetchPostsBy(BLOG_LIST_LEN).then(posts => setAllPosts(posts))
    return () => {}
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>Ivory Blog | {CMS_NAME}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Container>
          <Intro />
          {!heroPost && <PlaceHolder />}
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              thumbImage={heroPost.thumbImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}