import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'

import { PostAuthor } from '../users/PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { fetchPosts, selectAllPosts, selectPostsStatus } from './postsSlice'

export const PostsList = () => {
  const dispatch = useAppDispatch()
  // Select the `state.posts` value from the store into the component
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <PostAuthor userId={post.user} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
