/**
 * hacked next/image:
 * 
 * - add style class to obtain the img element
 * - use interval to check image load complete, rather than using onload
 * 
 * cause to do this:
 * bigger image loading in page shows blank space, bad user expeience
 * so, the next/image component have quite improvement space toward Gatsby Image component
 * 
 * @2021/02/27
 * 
 * made a small change because of http thumbnail image url under https domain
 * using NXImage rather than html img
 * 
 * @2021/03/02
 */
import React, { useState, useEffect, useRef } from 'react'

import cn from 'classnames'
import Link from 'next/link'
import {default as NXImage} from 'next/image'
import {DEFAULT_THUMB, IMAGE_PLACE_HOLDER} from '../lib/constants'

export default function CoverImage({ title, src, slug, height, width, thumb }) {

  const [loaded, setLoaded] = useState(false);
  const timeRef = useRef(0)

  useEffect(() => {
    // QUERY IMAGE ELEMENT BY CLASS, ADDED IN NXImage BELOW 
    const target = document.querySelector(`.img-id-${slug}`)

    // **** TRICKY HERE TO DETECT IMAGE LOAD COMPLETE ***
    // TOOK COUPLES OF HOURS TO MAKE IT WORKS
    // COMMONLY USED EVENT `load` NOT WORKS ON IT!
    timeRef.current = setInterval(()=>{
      if(!target.complete) return

      clearInterval(timeRef.current) // detect complete
      setLoaded(true)
    }, 200)

    return () => clearInterval(timeRef.current) // in case of removed
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
      <div className="absolute top-0 left-0 z-10" >
        <NXImage 
          src={thumb?thumb:DEFAULT_THUMB}
          width={width}
          height={height}
          className="gray-filter"
        />
      </div>
    )
  }

  const ImgPlaceholder = () => {
    return (
      <div className="absolute top-0 left-0 z-10">
        <img src={IMAGE_PLACE_HOLDER} width={width} height={height} />
      </div>
    )
  }

  return (
    <div className="sm:mx-0 relative overflow-hidden">
      {!loaded && <ImgPlaceholder />}
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (image)
      }
    </div>
  )
}
