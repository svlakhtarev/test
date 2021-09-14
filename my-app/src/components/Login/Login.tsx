import React, {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/authReducer'
import {AppStateType} from '../../redux/reduxStore'
import style from './Login.module.css'
import {loginFormValueType, LoginReduxForm} from './LoginForm'

export const Login: FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmit = (formData: loginFormValueType) => {
    dispatch(login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    ))
  }

  if (isAuth) {
    return <Redirect to={'/profile'}/>
  }

  return <div className={style.login}>
    <h1>Login</h1>
    <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
  </div>
}
