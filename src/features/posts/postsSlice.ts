import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { RootState } from '@/app/store'

export interface Post {
  id: string
  title: string
  content: string
  date: string
  user: string
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', date: sub(new Date(), { minutes: 10 }).toISOString(), user: '0' },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    user: '2',
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Declare a "case reducer" named `postAdded`.
    // The type of `action.payload` will be a `Post` object.
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        // "Mutate" the existing state array, which is
        // safe to do here beause `createSlice` uses Immer inside.
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, content, date: new Date().toISOString(), user: userId },
        }
      },
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

// Export the auto-generated action creator with the same name
export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)
