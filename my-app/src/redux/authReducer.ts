import {ResultCodesEnum, ResultCodesForCaptcha} from '../api/api'
import {stopSubmit} from 'redux-form'
import {authAPI} from '../api/authAPI'
import {securityAPI} from '../api/securityAPI'
import {BaseThunkType, InferActionsTypes} from './reduxStore'

let initialState = {
  userID: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
}

export type initialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>
type ActionsTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export const actions = {
  setAuthUserData: (userID: number | null,
                    email: string | null,
                    login: string | null,
                    isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    payload: {userID, email, login, isAuth}
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: {captchaUrl}
  } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me()
  if (meData.resultCode === ResultCodesEnum.Success) {
    let {id, login, email} = meData.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login = (email: string,
                      password: string,
                      rememberMe: boolean,
                      captcha: string): ThunkType => async (dispatch) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha)
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData())
  } else {
    if (loginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let massege = loginData.messages.length > 0
      ? loginData.messages[0]
      : 'Some error'
    dispatch(stopSubmit('login', {_error: massege}))
  }
}

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl()
  const captchaUrl = data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
