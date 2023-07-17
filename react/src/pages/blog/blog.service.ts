import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '~/types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi', //Ten field trong Redux state
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2023/' }),
  endpoints: (build) => ({
    // Generic type: response & argument
    getPosts: build.query<Post[], void>({
      query: () => 'posts' //method nay khong co argument
    })
  })
})

export const { useGetPostsQuery } = blogApi
