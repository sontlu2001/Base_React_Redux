import { unwrapResult } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/store'
import { Post } from '~/types/blog.type'
import { isEntityError } from '~/utils/helpers'
import { useAddPostMutation, useGetPostQuery, useUpdatePostMutation } from '../blog.service'
// import { addPost, cancelEditingPost, editPost } from '../blog.slice'

const initialState: Post = {
  id: '',
  featuredImage: '',
  publishDate: '',
  title: '',
  description: '',
  isPublic: false
}
// copy cac key initialState de lam key cho FormError
type FormError = { [key in keyof typeof initialState]: string } | null

const CreatePost = () => {
  const [formData, setFormData] = useState<Omit<Post, 'id'> | Post>(initialState)
  const [addPost, addPostResult] = useAddPostMutation()
  const postId = useSelector((state: RootState) => state.blog.postId)
  const { data } = useGetPostQuery(postId, { skip: !postId })
  const [updatePost, updatePostResult] = useUpdatePostMutation()
  const dispatch = useAppDispatch()

  const errorForm: FormError = useMemo(() => {
    const errorResult = postId ? updatePostResult.error : addPostResult.error
    // Vì errorResult có thể là FetchBaseQueryError | SerializedError | undefined nên cần kiểm tra để hiển thị cho đúng
    if (isEntityError(errorResult)) {
      return errorResult.data.error as FormError
    }
    return null
  }, [postId, addPostResult, updatePostResult])

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (postId) {
        // EditPost mode
        await updatePost({
          id: postId,
          body: formData as Post
        }).unwrap()
        setFormData(initialState)
      } else {
        // AddPost mode
        await addPost(formData).unwrap()
        setFormData(initialState)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='p-5' onSubmit={handleSubmit}>
      <div className='mb-6'>
        <label
          htmlFor='title'
          className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
          onClick={() => dispatch({ type: ' blog/clickTitle' })}
        >
          Title
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          required
          value={formData.title}
          onChange={(event) => setFormData((pre) => ({ ...pre, title: event.target.value }))}
        />
      </div>
      <div className='mb-6'>
        <label htmlFor='featuredImage' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Featured Image
        </label>
        <input
          type='text'
          id='featuredImage'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Url image'
          required
          value={formData.featuredImage}
          onChange={(event) => setFormData((pre) => ({ ...pre, featuredImage: event.target.value }))}
        />
      </div>
      <div className='mb-6'>
        <div>
          <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Description
          </label>
          <textarea
            id='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Your description...'
            required
            value={formData.description}
            onChange={(event) => setFormData((pre) => ({ ...pre, description: event.target.value }))}
          />
        </div>
      </div>
      <div className='mb-6'>
        <label
          htmlFor='publishDate'
          className={classNames('mb-2 block text-sm font-medium dark:text-gray-300', {
            'text-red-700': Boolean(errorForm?.publishDate),
            'text-gray-900': !Boolean(errorForm?.publishDate)
          })}
        >
          Publish Date
        </label>
        <input
          type='datetime-local'
          id='publishDate'
          className={classNames('block w-56 rounded-lg border p-2.5 text-sm', {
            'border-red-500 bg-red-50 text-red-600 placeholder-red-600 focus:border-red-500 focus:ring-red-500':
              Boolean(errorForm?.publishDate),
            'border-gray-300 bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 ':
              !Boolean(errorForm?.publishDate)
          })}
          placeholder='.featuredImage'
          required
          value={formData.publishDate}
          onChange={(event) => setFormData((pre) => ({ ...pre, publishDate: event.target.value }))}
        />
        {errorForm?.publishDate && (
          <p className='mt-2 text-sm text-red-600'>
            <span className='font-medium'>Lỗi!</span>
            {errorForm.publishDate}
          </p>
        )}
      </div>
      <div className='mb-6 flex items-center'>
        <input
          id='publish'
          type='checkbox'
          className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
          checked={formData.isPublic}
          onChange={(event) => setFormData((pre) => ({ ...pre, isPublic: event.target.checked }))}
        />
        <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
          Publish
        </label>
      </div>
      <div>
        {Boolean(postId) && (
          <>
            <button
              type='submit'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Update Post
              </span>
            </button>
            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Cancel
              </span>
            </button>
          </>
        )}
        {!Boolean(postId) && (
          <button
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            type='submit'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Publish Post
            </span>
          </button>
        )}
      </div>
    </form>
  )
}

export default CreatePost
