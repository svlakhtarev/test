import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createField, GetStringKeys, Input, MyButtonString} from '../common/FormsControls/formsContorls'
import {required} from '../../utils/validators/validators'
import {login} from '../../redux/authReducer'
import {AppStateType} from '../../redux/reduxStore'
import style from './Login.module.css'

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean
}
type MapDispatchPropsType = {
  login: (email: string,
          password: string,
          rememberMe: boolean,
          captcha: string) => void
}
type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<loginFormValueType, LoginFormOwnProps> & LoginFormOwnProps>
  = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={style.inputFields}>
        {createField<LoginFormValueTypeKeys>('Email',
          'email',
          [required],
          Input)}
      </div>
      <div className={style.inputFields}>
        {createField<LoginFormValueTypeKeys>('Password',
          'password',
          [required],
          Input,
          {type: 'password'})}
      </div>
      <div className={style.inputLogin}>
        {createField<LoginFormValueTypeKeys>(undefined,
          'rememberMe',
          null,
          Input,
          {type: 'checkbox'}, 'remember me')}
      </div>
      {captchaUrl && <img alt={''} src={captchaUrl}/>}
      {captchaUrl && createField<LoginFormValueTypeKeys>('Captcha', 'captcha', [required], Input)}
      {error &&
      <div className={style.formSummaryError}>
        {error}
      </div>}
      <div>
        <MyButtonString title={'LogIn'}/>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<loginFormValueType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm)

export type loginFormValueType = {
  captcha: string
  rememberMe: boolean
  password: string
  email: string
}
type LoginFormValueTypeKeys = GetStringKeys<loginFormValueType>

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: loginFormValueType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    )
  }

  if (props.isAuth) {
    return <Redirect to={'/profile'}/>
  }

  return <div className={style.login}>
    <h1>Login</h1>
    <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
  </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)
