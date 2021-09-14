import {instance, APIResponceType, ResultCodesEnum, ResultCodesForCaptcha} from './api'

export const authAPI = {
  me() {
    return instance.get<APIResponceType<MeResponceDataType>>(`auth/me`)
      .then(res => res.data)
  },
  login(email: string,
        password: string,
        rememberMe: (boolean) = false,
        captcha: (string | null) = null) {
    return instance.post<APIResponceType<LoginResponceDataType, ResultCodesEnum | ResultCodesForCaptcha>>('auth/login',
      {
        email,
        password,
        rememberMe,
        captcha
      })
      .then(res => res.data)
  },
  logout() {
    return instance.delete('auth/login')
  }
}

type MeResponceDataType = {
  id: number
  email: string
  login: string
}
type LoginResponceDataType = {
  userID: number
}
