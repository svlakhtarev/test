import {instance} from './api'

type getCaptchaUrlResType = {
  url: string
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<getCaptchaUrlResType>('security/get-captcha-url')
      .then(res => res.data)
  }
}
