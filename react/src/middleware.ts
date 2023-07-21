import { AnyAction, isRejected, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { isEntityError } from './utils/helpers'

function isPayLoadErrorMessage(payload: unknown): payload is {
  data: {
    error: string
  }
  status: number
} {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data?.error === 'string'
  )
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  /**
   * `isRejectedWithValue` là một function giúp chúng ta kiểm tra những action có rejectedWithValue = true từ createAsyncThunk
   * RTK Query sử dụng `createAsyncThunk` bên trong nên chúng ta có thể dùng `isRejectedWithValue`.
   * Những lỗi từ server thì action nó mới có isRejectedWithValue= true
   * Còn những action liên quan đến việc caching mà bị rejected thì isRejectedWithValue = false
   */
  if (isRejected(action)) {
    if (action.error.name === 'CustomError') {
      // Các lỗi quan đến quá trình thực thi
      toast.warning(action.error.message)
    }
  }
  if (isRejectedWithValue(action)) {
    // Lỗi reject từ server
    if (isPayLoadErrorMessage(action.payload)) {
      toast.warn(action.payload.data.error)
    }
  }
  return next(action)
}
