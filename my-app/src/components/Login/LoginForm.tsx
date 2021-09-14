import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import style from './Login.module.css'
import {createField, GetStringKeys, InputArea, MyButtonString} from '../common/FormsControls/formsContorls'
import {required} from '../../utils/validators/validators'

const LoginForm: FC<InjectedFormProps<loginFormValueType, LoginFormOwnProps> & LoginFormOwnProps>
  = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={style.inputFields}>
        {createField<LoginFormValueTypeKeys>('Email',
          'email',
          [required],
          InputArea)}
      </div>
      <div className={style.inputFields}>
        {createField<LoginFormValueTypeKeys>('Password',
          'password',
          [required],
          InputArea,
          {type: 'password'})}
      </div>
      <div className={style.inputLogin}>
        {createField<LoginFormValueTypeKeys>(undefined,
          'rememberMe',
          null,
          InputArea,
          {type: 'checkbox'}, 'remember me')}
      </div>
      {captchaUrl && <img alt={''} src={captchaUrl}/>}
      {captchaUrl && createField<LoginFormValueTypeKeys>('Captcha', 'captcha', [required], InputArea)}
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

export const LoginReduxForm = reduxForm<loginFormValueType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm)

type LoginFormOwnProps = {
  captchaUrl: string | null
}
export type loginFormValueType = {
  captcha: string
  rememberMe: boolean
  password: string
  email: string
}
type LoginFormValueTypeKeys = GetStringKeys<loginFormValueType>
