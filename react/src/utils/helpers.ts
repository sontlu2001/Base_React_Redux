import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
/**
 * Phương pháp Type Predicate: Dùng để thu hẹp phạm vi của một biến
 * Đầu tiên chúng ta sẽ khai báo một function check kiểm tra cấu trúc về mặt logic javascript.
 * Tiếp thjeo chúng ta khai báo thêm `parameterName is Type` làm kiểu return của function thay vì boolean
 * Khi dùng function kiẻm tra kiểu này, ngoài việc kiểm tra về mặt logic cấu trúc, nó còn chuyển kiểu
 */

/**
 * Kiểu ErrorFormObject dành cho trường hợp bao quát
 */

interface ErrorFormObject {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[]
}

interface EntityError {
  status: 422
  data: {
    error: ErrorFormObject
  }
}

// Thu hẹp một error có kiểu không xác định về `FetchBaseQueryError`

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}
/**
 * Thu hẹp một error có kiểu không xác định về một object với thuộc tính message: string (SerializedError)
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
}
/**
 * Thu hẹp một error có kiểu không xác định về lỗi liên quan đến POST PUT không đúng field (EntityError)
 */

export function isEntityError(error: unknown): error is EntityError {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 422 &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  )
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomError'
  }
}
