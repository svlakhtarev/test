import React from 'react';
import style from './Login.module.css';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {createField, Input, MyButton} from '../common/FormsControls/formsContorls';
import {required} from '../../utils/validators/validators';
import {login} from '../../redux/authReducer';

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={style.inputFields}>
        {createField("Email",
          "email",
          [required],
          Input)}
      </div>
      <div className={style.inputFields}>
        {createField("Password",
          "password",
          [required],
          Input,
          {type: "password"})}
      </div>
      <div className={style.inputLogin}>
        {createField(null,
          "rememberMe",
          null,
          Input,
          {type: "checkbox"}, "remember me")}
      </div>
      {captchaUrl && <img alt={''} src={captchaUrl}/>}
      {captchaUrl && createField("Captcha", "captcha", [required], Input)}

      {error &&
      <div className={style.formSummaryError}>
        {error}
      </div>}
      <div>
        <MyButton title={'LogIn'}/>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if (props.isAuth) {
    return <Redirect to={'/profile'}/>
  }

  return <div className={style.login}>
    <h1>Login</h1>
    <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
  </div>
}

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);
