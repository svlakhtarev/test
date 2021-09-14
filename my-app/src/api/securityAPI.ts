import {instance} from './api'

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<getCaptchaUrlResType>('security/get-captcha-url')
      .then(res => res.data)
  }
}

type getCaptchaUrlResType = {
  url: string
}
