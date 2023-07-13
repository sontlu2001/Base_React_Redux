import { createAction, createReducer } from '@reduxjs/toolkit'
import { initialPostList } from '~/constants/blog'
import { Post } from '~/types/blog.type'

interface BlogState {
  postList: Post[]
}

const initialState: BlogState = {
  postList: initialPostList
}

export const addPost = createAction<Post>('blog/addPost')

const blogReducer = createReducer(initialState, (builder) => {
  builder.addCase(addPost, (state, action) => {
    state.postList.push(action.payload)
  })
})

export default blogReducer
