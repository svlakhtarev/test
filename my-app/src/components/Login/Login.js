import React from 'react';
import s from './Login.module.css';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/formsContorls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.inputFields}>
                <Field placeholder={"Email"}
                       name={"email"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div className={s.inputFields}>
                <Field placeholder={"Password"}
                       name={"password"}
                       type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div className={s.inputLogin}>
                <Field component={Input}
                       name={'rememberMe'}
                       type={'checkbox'}
                       id={'input'}/> remember me
            </div>
            {props.error &&
            <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button className={s.button}>LogIn</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div className={s.login}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);