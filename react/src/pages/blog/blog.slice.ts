import {
  createAction,
  createReducer,
  current,
  nanoid,
  createSlice,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit'
import { initialPostList } from '~/constants/blog'
import { Post } from '~/types/blog.type'
import http from '~/utils/http'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: [],
  editingPost: null
}

export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const response = await http.get<Post[]>('/posts', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const addPost = createAsyncThunk('blog/addPost', async (body:Omit<Post,'id'>, thunkAPI) => {
  // Json Server auto generate postId
  const response = await http.post<Post>('/posts',body, {
    signal: thunkAPI.signal
  })
  return response.data
})

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) state.postList.splice(foundPostIndex, 1)
    },
    startEditingPost: (state, action) => {
      const postId = action.payload
      const foundPostIndex = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPostIndex
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(addPost.fulfilled,(state,action)=>{
        state.postList.push(action.payload)
      })
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log(current(state))
        }
      )
      .addDefaultCase((state, action) => {
        // console.log('Action default')
      })
  }
})

export const {cancelEditingPost, deletePost, finishEditingPost, startEditingPost } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
