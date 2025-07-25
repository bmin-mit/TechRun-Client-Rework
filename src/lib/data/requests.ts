import axios from 'axios'
import Cookies from 'js-cookie'

const REQUEST_TIMEOUT = 1000

export const requests = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: REQUEST_TIMEOUT,
  headers: Cookies.get('accessToken')
    ? {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      }
    : {},
})
