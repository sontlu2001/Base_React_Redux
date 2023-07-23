import axios, { AxiosError } from "axios"

// type predicate
export function isAxiosError<T>(error:unknown): error is AxiosError<T>{
    return axios.isAxiosError(error)
}
