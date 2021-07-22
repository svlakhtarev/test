import axios from 'axios'
import {UserType} from '../Types/Types'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {'API-KEY': '8b2693d0-3960-41c2-b1a0-c956832ad2e4'}
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}
export enum ResultCodesForCaptcha {
  CaptchaIsRequired = 10
}

export type getItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
export type APIResponceType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}