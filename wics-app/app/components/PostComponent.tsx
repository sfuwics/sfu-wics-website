import Link from 'next/link'
import React from 'react'
import { Post } from '../utils/Interface'

interface Props {
  posts: Post;
}

const PostComponent = ( {post}: Props ) => {
  return (
    <div className={cardStyle}>
      <Link href={`/posts/${post?.slug?.current}`}>
        <h2 className='text-2xl'>{post?.title}</h2>
        <p className='my-2 text-purple-800'>{post?.author}</p>
        <p className='my-2 text-purple-800'>{new Date(post?.publishedAt).toDateString()}</p>
        <p className='mb-4 line-clamp-2'>{post?.excerpt}</p>
      </Link>

      {/* TAGS */}

      <div>
        {post?.tags?.map((tag => (
          <span key={tag?._id} className='mr-2 p-1 rounded-sm text-sm lowercase border'>#{tag?.name}</span>
        )))}
      </div>

    </div>
  )
}

export default PostComponent

const cardStyle = `
mb-8
p-4
border
border-gray-900
rounded-md
shadow-sm
shadow-purple-950
hover:shadow-md
hover:bg-purple-500
hover:text-white
`