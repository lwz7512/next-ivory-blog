import React, { useState, useEffect, useRef } from 'react'

import cn from 'classnames'
import Link from 'next/link'
import {default as NXImage} from 'next/image'
import {DEFAULT_THUMB} from '../lib/constants'

export default function CoverImage({ title, src, slug, height, width, thumb }) {

  const [loaded, setLoaded] = useState(false);
  const timeRef = useRef(0)

  useEffect(() => {
    // query current image to listen image load event
    const target = document.querySelector(`.img-id-${slug}`)
    // **** TRICKY HERE TO DETECT IMAGE LOAD COMPLETE ***
    // TOOK COUPLES OF HOURS TO WORKS
    // NORMAL EVENT load NOT WORKS!
    timeRef.current = setInterval(()=>{
      if(!target.complete) return

      clearInterval(timeRef.current)
      setLoaded(true)
    }, 200)

    return () => clearInterval(timeRef.current)
  }, []);
  
  const image = (
    <NXImage
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug,
      }, `img-id-${slug}`)}
      layout="responsive"
      width={width}
      height={height}
    />
  )

  const ThumbImg = () => {
    return (
      <img 
        src={thumb ? thumb : DEFAULT_THUMB}
        width={width*0.65}
        height={height*0.65}
        className={`absolute top-0 left-0 z-10 ${loaded?'hidden':'block'} gray-filter`}
      />
    )
  }

  return (
    <div className="sm:mx-0 relative">
      <ThumbImg />
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (image)
      }
    </div>
  )
}
