import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '~/types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi', //Ten field trong Redux state
  tagTypes: ['Posts'], //Những kiểu tag cho phép dùng trong blogAPi
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2023/' }),
  endpoints: (build) => ({
    // Generic type: response & argument
    getPosts: build.query<Post[], void>({
      query: () => 'posts', //method nay khong co argument
      /**
       * providesTags có thể là array hoặc callback return array
       * Nếu có bất kỳ một invalidatesTag nào match với providesTags này thì sẽ làm cho getPosts method chạy lại
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       */
      providesTags(result) {
        /**
         * Cái callback này sẽ chạy mỗi khi getPosts chạy
         * Mong muốn là sẽ return về một mảng kiểu
         * ```ts
         * interface Tags: {
         *    type: "Posts";
         *    id: string;
         *  }[]
         *```
         * vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
         */
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        return [{ type: 'Posts', id: 'LIST' }]
      }
    }),
    // Sử dụng mutation đối với các trường hợp POST, PUT, DELETE
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        return {
          url: 'posts',
          method: 'POST',
          body
        }
      },
      /**
       * invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó sẽ bị gọi lại
       * Trong trường hợp này getPosts sẽ chạy lại
       */
      invalidatesTags: (result, error, body) => [
        {
          type: 'Posts',
          id: 'LIST'
        }
      ]
    }),
    updatePost: build.mutation<Post, { id: string; body: Post }>({
      query(data) {
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      invalidatesTags: (result, error, data) => [
        {
          type: 'Posts',
          id: data.id
        }
      ]
    })
  })
})

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation, useUpdatePostMutation } = blogApi
